const asynchandler = require("express-async-handler");
const Contact = require("../Models/ContactModel");
//@desc get all contact
//route GET api/contacts
// access private

const getContacts =asynchandler(async(req,res)=>{
    const contacts =await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts);
});

//@desc Create new contact
//route POST api/contacts
// access private

const createContact =asynchandler(async(req,res)=>{
    console.log("created contact",req.body)
    const{name,email,phone,tag}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        tag,  // include this
        user_id:req.user.id
    });
    res.status(201).json(contact);
});
//@desc get contact by id
//route GET api/contacts/id
// access private

const getContact =asynchandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){  
        res.status(404);
        throw new Error("Contact Not Found");
    } 
    res.status(200).json(contact);
});

//@desc updatecontact
//route PUT api/contacts/id
// access private

const updateContact =asynchandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){  
        res.status(404);
        throw new Error("Contact Not Found");
    }  
    if(contact.user_id.toString()!==req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to update other user contact");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
);

    res.status(201).json(updatedContact);
});

//@desc delete contact  by id
//route GET api/contacts/id
// access private

const deleteContactById =asynchandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){  
        res.status(404);
        throw new Error("Contact Not Found");
    }
    
    if(contact.user_id.toString()!==req.user.id) {
        res.status(403);
        throw new Error("user don't have permission to update other user contact");
    }
      await Contact.deleteOne({_id:req.params.id});
      res.status(203).json(contact);
});
 



module.exports={getContacts,createContact,getContact,updateContact,deleteContactById}