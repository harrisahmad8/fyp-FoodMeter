const User = require("../Models/user");
const UserDTO = require("../dto/user");

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
    
   }
}
module.exports = userController;

