const User = require("../Models/user");
const UserDTO = require("../dto/user");
const bcrypt=require("bcryptjs")
const Joi = require("joi");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const userController={
    async AllUsers(req,res,next){
      try{
       const users= await User.find({});
       const userDto = [];

       for (let i = 0; i < users.length; i++) {
         const dto = new UserDTO(users[i]);
         userDto.push(dto);
       }
       console.log("user")
 
       return res.status(200).json({users: userDto });
     } catch (error) {
       return next(error);
     }
   },
   async deleteUser(req,res,next){
    
   },
   async updateProfile(req,res,next){
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    let user;
    const { id }=req.params

    const { error } = getByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }
    try {
      // match username
      user = await User.findOne({ _id: id });

      if (!user) {
        const error = {
          status: 401,
          message: "user not found",
        };

        return next(error);
      }
    }catch(error){
      return next(error);
    }
    let { name, email, password, number } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    password=hashedPassword
    try {

       await User.updateOne({_id:id},{name,email,number,password});
   }catch(error){
    return next(error)
   }
   return res.status(201).json({message:"User updated!" })

},
async getUserId(req, res, next) {
  const getByIdSchema = Joi.object({
    id: Joi.string().regex(mongodbIdPattern).required(),
  });

  const { error } = getByIdSchema.validate(req.params);

  if (error) {
    return next(error);
  }

  let user;

  const { id } = req.params;

  try {
    user = await User.findOne({ _id: id });
  } catch (error) {
    return next(error);
  }

  const userDto = new UserDTO(user);
  console.log("byidUSER")

  return res.status(200).json({ user: userDto });
},

}
module.exports = userController;

