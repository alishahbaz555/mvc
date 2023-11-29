import { generateKey } from "crypto";
import client from "../Databases/database.js";
import User from "../models/userModel.js";

const userDataController = {
  // Registration
  register: async (req, res) => {
    try {
      await client.connect();

  //checking existance of email
  const userExists = await User.findOne({ email: req.body.email});
  if (userExists) {
    return res.status(400).json({
        msg: "This email already exists! Please use another email or Try logging in.",
      });
  }

      //Saving in Model

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin:req.body.isAdmin,
      });
    
      const addedUser = await newUser.save();
      const userToken = await newUser.generateToken();

      res.status(201).json({ msg: "User registered successfully!", finalResult: addedUser, userToken:userToken });

    } catch (error) { 
      console.log(`There was an error in registering ERROR:${error}`);
      res.status(500).json({ Error_Message: `There was an internal Server Error in Registering! ERROR:${error}`});
    } finally {
     await client.close();
    }
  },

  get: async (req, res) => {
    try {
      // await client.connect();
      // const userProfiles = client.db("user_profiles");
      // const accountDetails = userProfiles.collection("account_details");

      const result = await User.find({});
      res.status(200).json(result);
    } catch (error) {
      console.log(`Internal server Error, failed to GET: ${error}`);
    } finally {
      await client.close();
    }
  },
};

export default userDataController;
