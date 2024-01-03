import User from '../models/user.js';
import jsonwebtoken from 'jsonwebtoken';

export const login = async(req,res)=> {

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            console.log("Email não encontrado");
            return res.status(401).json({message:"Nome de usuário e ou senha inválidos"});
        }
        if(user.password !== password){
            console.log("Senha inválida");
            return res.status(401).json({message:"Nome de usuário e ou senha inválidos"});
        }
        const token = jsonwebtoken.sign({userId: user._id},process.env.JWT_SECRET);
        
       res.status(200).json({token});
    } catch (error) {
        console.log("Login failed",error);
        res.status(500).json({message:"Login failed"});
    }
    
}


export const register = async(req,res)=> {

    try {
        const {name,email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            console.log("Email já cadastrado.");
        }
        const newUser = new User({name,email,password});
        await newUser.save();
        res.status(201).json({message:"User registered."});
    } catch (error) {
        console.log("Erro ao registrar novo usuário",error);
        res.status(500).json({message:"Registration failed"});
    }


}
