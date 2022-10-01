import express from "express"
import mongoose from "mongoose"
import router from "./link.routes.js"
import * as  UserController from "./Controllers/UserController.js"
import { validationLogin, validationRegister } from "./validation.js"
import ValidationErrors from "./util/ValidationErrors.js"
import * as LinkRoter  from "./link.routes.js"
import checkAuth from "./util/checkAuth.js"
import redirect from "./redirect.routes.js"


 const app = express()

 app.use(express.json())
 app.use("/api/link",router )
 app.use("/t", redirect)

 mongoose.connect("mongodb+srv://Viktoriia:1234qwer@cluster0.uer49ir.mongodb.net/me_link?retryWrites=true&w=majority")
 .then(()=> console.log("db ok!"))
 .catch((err) => console.log(err))


 app.post("/auth/register",validationRegister, ValidationErrors, UserController.register)
 app.post("/auth/login",validationLogin, ValidationErrors, UserController.login)


 



 
 app.listen(3000, (err)=> {
    if(err){
        return console.log(err)
    }
    console.log("SERVER START")
 })
