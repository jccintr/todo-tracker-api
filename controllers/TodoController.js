import Todo from '../models/todo.js';
import User from '../models/user.js';
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';


export const index = async(req,res)=> {

    const token = req.headers.token;

    if(!token){
      return  res.status(403).json({message:"Não autorizado"});
    }

    try {
        var decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET);
    } catch (error) {
       return res.status(403).json({message:"Não autorizado"});
    }
    
    const userId = decoded.userId;

    try {
        
        
        const user = await User.findById(userId).populate("todos",'title status category dueDate createdAt',null,{sort:{title:1}});
        if(!user){
           return res.status(404).json({message: "User not found"});
        } else {
           return res.status(200).json({todos: user.todos});
        }
    } catch (error) {
         console.log("falha ao listar todos",error);
        res.status(500).json({message:"Falha ao listar todos."});
    }
}


export const store = async(req,res)=> {

    const token = req.headers.token;

    if(!token){
      return  res.status(403).json({message:"Não autorizado"});
    }

    try {
        var decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET);
    } catch (error) {
       return res.status(403).json({message:"Não autorizado"});
    }
    
    const userId = decoded.userId;
 

     try {
        
        const {title,category} = req.body;

        const newTodo = new Todo({title,category,dueDate:moment().format('YYYY-MM-DD')});
        await newTodo.save();
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({message:"User not found."});
        }
        user?.todos.push(newTodo._id);
        await user.save();
         res.status(200).json({message:"Todo added.",todo:newTodo});

    } catch (error) {

        console.log("falha ao add todo",error);
        res.status(500).json({message:"Falha ao adicionar todo."});

    } 
};

export const complete = async (req,res) => { 

    try {
        const todoId = req.params.todoId;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId,{status: "completed"},{new:true});
       
        if(!updatedTodo){
            return res.status(404).json({message: "Todo not found"});
        } else {
            return res.status(200).json({message:"Todo marked as completed",todo: updatedTodo});
        }

    } catch (error) {
        console.log("falha ao alterar todo",error);
        res.status(500).json({message:"Falha ao alterar todo."});
    }
};