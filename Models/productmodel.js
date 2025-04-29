import mongoose from "mongoose";
import Counter from "./countermodel.js";

const productSchema= new mongoose.Schema({
    name: {type:String,required:true,minlength: 3},
    description: {type:String,required:true,minlength: 10,maxlength:50},
    price: {type:Number,required:true},
    image: {type:String,required:true},
    category: {type:String,required:true,lowercase: true,},
    productId: {type:String,required:true,unique: true},
    ownerId: {type:String,required:true},
},
{timestamps:true});

productSchema.pre('save', async function (next) {
    if (this.isNew) {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'product' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      const sequence = String(counter.sequence_value).padStart(3, '0');
      this.productId = `PROD${sequence}`;
    }
    next();
});

const Product = mongoose.model('Product',productSchema);

export default Product

