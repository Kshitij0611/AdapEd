import asyncHandler from "express-async-handler";

const protectQuiz=asyncHandler(async(req,res,next)=>{
    let uid;
    try{
        uid=req.body.uid;
        if(uid){
            req.user=await User.findById(uid).select('-password');
            next();
        }else{
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }catch(error){
        res.status(401);
        throw new Error("Not authorized, invalid token");
    }
    }
)
export {protectQuiz}