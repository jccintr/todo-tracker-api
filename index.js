import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import router from './routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(router);

app.get('/', function(req, res) {
    res.send('Bem vindo a api Todo Tracker');
  });

await mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('Conectado ao banco de dados com sucesso !');
}).catch((error)=>{
    console.log("Falha ao conectar ao banco de dados.");
})

app.listen(process.env.PORT,()=>{console.log('Servidor ouvindo a porta '+ process.env.PORT + '!')});
