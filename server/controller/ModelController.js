import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import resultModel from '../models/resultModel.js';
import generateToken from '../utils//generateToken.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

OpenAI.apiKey=process.env.OPENAI_API_KEY;
const openai = new OpenAI();

const requestQuestion=asyncHandler(async(req,res)=>{
    const topic=req.params.topic;
    // console.log(req.body)
    // const result=await session.prompt(`Genrate 10 question on ${topic} with difficulty level and 4 answer 1 correct and 3 incorrect in form of JSON object`)
    // console.log(result);
    // res.send(result);


    const completion =  await openai.chat.completions.create({
        messages: [{ role: "user", content: `Generate 10 multiple-choice questions on the topic of "${topic}," each with a unique questionId, topic, question , correct answer from 4 options in options options in array, and difficulty level, formatted as a JSON object name questions` }],
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0]);
      res.send(completion.choices[0].message.content);
})
const getTopics=asyncHandler(async(req,res)=>{
    const {_id}=req.body;
    const user=await User.findOne({_id});
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }else{
        res.status(200).json(user.topics);
    }
})
const storeResult=asyncHandler(async(req,res)=>{
    const {_id}=req.body;
    const {score,topics}=req.body;
    console.log(_id);
    const userExists = await User.findOne({_id});
    console.log(userExists.username)
    if(!userExists){
        res.status(404);
        throw new Error("User not found");
    }else{
        console.log(userExists.username)
        const result=resultModel.create({
            userName:userExists.username,
            score,
            topics
        })
        res.status(201).json({
            _id: result._id,
            user: result.user,
            score: result.score,
            topics: result.topics
        });
    }
})

export {requestQuestion,storeResult}