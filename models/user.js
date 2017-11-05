const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose; //above line and this line represents same

const userSchema = new Schema({
  googleID: String,
  googleName:String,
  credits: {type:Number,default:0}
});

mongoose.model('users',userSchema);
