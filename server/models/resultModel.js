import mongoose from "mongoose";

const resultSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    topics:{
        type:Array,
        required:true
    },
    weakTopics:{
        type:Array
    },
    assementGiven:{
        type:String
    },
    timeSpent:{
        type:String
    },
    strek:{
        type:String
    },
    score:{
        type:Number
    }

})

const result = mongoose.model('Result',resultSchema);

export default result;