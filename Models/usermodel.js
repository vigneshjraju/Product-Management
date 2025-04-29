import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";
import Counter from "./countermodel.js";

const userschema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['user','admin'],default:'user'},
    userId:{type:String,unique:true}


})

userschema.pre('save',async function (next){

    if(this.isNew){
        if(this.role ==='admin'){
            this.userId='ADMIN01';
        } 
        
        else{
            const counter = await Counter.findByIdAndUpdate(
                {_id:'user'},
                {$inc:{sequence_value: 1 }},
                {new: true, upsert:true}
            );
            const sequence = String(counter.sequence_value).padStart(3,'0');
            this.userId = `USER${sequence}`;
        } 
    }

    next();

})

const User = mongoose.model('User',userschema)

export default User