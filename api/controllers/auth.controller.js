import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data:{
                email,
                username,
                password:hashedPassword
            }
        })
        console.log(newUser);
        res.status(200).json({message:'User created successfully'})
        
    } catch (error) {
        res.status(500).json({message:`Some credentials are already used( ${error}`})
        
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email:email

            }
        })
        if(!user){
            res.status(404).json({message:`Incorrect credentials( ${error}`})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.status(404).json({message:`Incorrect credentials( ${error}`})
        }
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign({
            id:user.id,
            isAdmin:false
        }, process.env.JWT_SECRET_KEY,{expiresIn:age})
        const {password: userPassword, ...userInfo} = user
        res
        .cookie("token", token, {
          httpOnly: true,
          maxAge:age,
          secure: true, // Работает только через HTTPS
          sameSite: 'None' // Поддерживает кросс-доменное использование
        })
        .status(200)
        .json(userInfo);      
    } catch (error) {
        res.status(500).json({message:`Incorrect credentials( ${error}`})
    }
}
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message:"logout successful"})
}