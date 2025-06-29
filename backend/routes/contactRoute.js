const express=require("express");
const router = express.Router();
const {
     getContacts, 
     createContact,
     getContact,
     updateContact ,
     deleteContactById
    } =require("../controllers/contact_controller");
    const validateToken = require("../middleware/validateTokenHandler");

    router.use(validateToken);
//get all contacts 
//create contact
router.route("/").get(getContacts).post(createContact)


//get contact by id
//update contact for id
//delete contact by id
router.route("/:id").get(getContact).put(updateContact).delete(deleteContactById)




module.exports = router;