import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import UserModel from "../Model/UserModel.js"

export const register = async(req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email : req.body.email,
            passwordHash: hash
        })


        const user = await doc.save()

        const token = jwt.sign(
            {
                _id : user._id
            },
            "secret123",
            {
                expiresIn: "1d"
            }
        )
        const {passwordHash, ...userData} = user._doc
        res.json({...userData, token})

    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Пользователь уже существует"})
    }
}

export const login = async(req, res) => {
    try {
    
    const user = await UserModel.findOne({email : req.body.email})
    if(!user){
        return res.status(404).json({message: " Пользователь не найден"})
    }

    const validPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
    if(!validPassword){
        return res.status(404).json({message: " Не венрый пользователь или пароль"})
    }

    const token = jwt.sign(
        {
          _id : user._id,  
        },
        "secret123",
        {
            expiresIn : "1d"
        },
     );

     const {passwordHash, ...userData} = user._doc
     res.json({...userData, token})
    } catch (error) {
        return res.status(404).json({message: "Не удалось зарегистриоваться "})
    }
}

export const getMe = async(req, res) =>{
    
}