import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import bcrypt from "bcryptjs";
dotenv.config();


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
      type:Boolean,
      default:false,
    },

});

const uri = process.env.USER_PROFILES
//connecting
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




//? generating JWT tokens for authentication puposes
userSchema.methods.generateToken =  function async (){
try {
  return Jwt.sign(
    {
      userId: this._id.toString(),
      email:this.email,
      isAdmin:this.isAdmin,
    },
  process.env.JWT_SECRET_KEY,
  {
    expiresIn:'30d'
  }
  )
} catch (error) {
  console.error(`Error in JWT, Error: ${error}`);
}
}

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const genSalt = await bcrypt.genSalt(14);
    const hashPassword = await bcrypt.hash(this.password, genSalt);
    this.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});


const User = new mongoose.model('User', userSchema);

export default User;