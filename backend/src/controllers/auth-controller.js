const School = require("../models/school-model");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs")

const login = async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = (req.body?.password || "").trim();
    console.log(email , password)

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      console.log("user doesnt exist")
      return res.status(401).json({ message: "invalid email or password" });
    }
    const ok = await userExist.comparePassword(password);
    if (!ok) {
      console.log("pass didnt match")
      return res.status(401).json({ message: "invalid email or password" });
    }
    console.log("data form login controoler : ",userExist)
// console.log("school id attached to current logged in user : " ,userExist.schoolId.toString())
    const isSuperAdmin =
      userExist.role === "SUPER_ADMIN" && userExist.schoolId === null;
    const isSchoolAdmin =
      userExist.role === "SCHOOL_ADMIN" && userExist.schoolId !== null;

      if(isSchoolAdmin){
        const currentSchool = await School.findById(userExist.schoolId.toString());
        console.log(currentSchool);
        if(currentSchool.status === "PENDING"){
         return res.status(401).json({message:"school status is pending"})
        }else if(currentSchool.status === "SUSPENDED"){
          return res.status(403).json({message:"new school request was rejected"})
        }else{
          
        }
      }

    return res.status(200).json({
      message: "successfully logged in",
      isSuperAdmin,
      isSchoolAdmin,
      user: {
        id: userExist._id.toString(),
        email: userExist.email,
        role: userExist.role,
        schoolId: userExist.schoolId,
        token  : await userExist.generateToken()

      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const signup = async (req,res)=>{

  const {schoolName , adminName , email , password} = req.body;

  try {

    if (!schoolName || !adminName || !email || !password) {
      return res.status(400).json({ message: "schoolName, adminName, email and password are required" });
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({message:"Email is already registered"});
    }

    const existingSchool = await School.findOne({ownerEmail : email});

    if(existingSchool){
      return res.status(400).json({message:"a school with this owner email already exists"});
    }

    // creating new school

    const school = await School.create({
      name:schoolName,
      ownerEmail : email,
      status:"PENDING",
      plankey:"FREE",
     subscription:{
      isActive:false,
      expiresAt:null,
     } 
    });

    

    const passwordHash = await bcrypt.hash(password , 10);

    const user = await User.create({
      schoolId:school._id,
      name:adminName,
      email:email,
      passwordHash,
      role:"SCHOOL_ADMIN",
      isActive:true
    })
console.log("data from sign up controller",user)
    if(user & school){
      console.log("user and school created")
    }
    res.status(201).json({
      message:"sign up sucessfull,  waiting for superadmin approval",
      schoolId:school._id,
      userId:user._id,
      status:school.status
    })
    
  } catch (error) {
    console.log(error)
  }

return  res.status(200).json({msg:"sign up controller working"})
}

const user = async (req , res) =>{

  try {
    const userData = req.user;
    console.log("user data from user controller", userData);

    return res.status(200).json({msg:"user data sent successfully" , userData})
  } catch (error) {
    
  }
}
module.exports = { login , signup , user };
