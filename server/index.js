
import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import connectDB from './Config/db.js';
import { notFound,errorHandler } from './middleware/ErrorHandler.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { LlamaModel, LlamaContext, LlamaChatSession} from 'node-llama-cpp'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/UserRoute.js';
import cors from 'cors';
import OpenAI from 'openai';
import expressAsyncHandler from 'express-async-handler';
import { protect } from './middleware/authMiddleware.js';
import ModelRoutes from './routes/ModelRoute.js';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log(__dirname);
// const model =new LlamaModel({
//     modelPath:path.join(__dirname,"model","notus-7b-v1.Q4_K_M.gguf")
// })
// const context = new LlamaContext({model})
// const session = new LlamaChatSession({context})

dotenv.config();
OpenAI.apiKey=process.env.OPENAI_API_KEY;
const openai = new OpenAI();
const app = express();
const serve=createServer(app);
const io = new Server(serve);
connectDB();
app.use(cookieParser());
console.log(process.env.MONGO_URI)
// app.use(errorHandler)
// app.use(notFound)
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/users',userRoutes);
app.get('/',(req,res)=>{
    console.log('Hello World');
    res.send('Hello World');
})
app.use('/api/model',ModelRoutes);
// app.get('/api/model/question/:topic',async(req,res)=>{
//     const topic=req.params;
//     // console.log(req.body)
//     console.log(topic)
//     // const result=await session.prompt(`Genrate 10 question on ${topic} with difficulty level and 4 answer 1 correct and 3 incorrect in form of JSON object`)
//     // console.log(result);
//     // res.send(result);


//     const completion =  await openai.chat.completions.create({
//         messages: [{ role: "user", content: `Generate 10 multiple-choice questions on the topic of "${topic}," each with a unique questionId, topic, question , correct answer from 4 options in options options in array, and difficulty level, formatted as a JSON object` }],
//         model: "gpt-3.5-turbo",
//       });
//       console.log(completion.choices[0]);
//       res.send(completion.choices[0].message.content);
// })
// app.get('/api/model/question/level',async(req,res)=>{
//     // const {topic,level}=req.body;
//     // const result=await session.prompt(`Genrate 10 question on ${topic} with difficulty level ${level} and 4 answer 1 correct and 3 incorrect in form of JSON object`)
//     // console.log(result);
// }) 
const Port=process.env.PORT || 8080;
app.listen(Port, () => {console.log(`Server is running on port ${Port}`)});

