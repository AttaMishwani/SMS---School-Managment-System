const School = require("../models/school-model");
const User = require("../models/user-model");

const login = async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = (req.body?.password || "").trim();

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const ok = await userExist.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const isSuperAdmin =
      userExist.role === "SUPER_ADMIN" && userExist.schoolId === null;
    const isSchoolAdmin =
      userExist.role === "SCHOOL_ADMIN" && userExist.schoolId !== null;

    return res.status(200).json({
      message: "successfully logged in",
      isSuperAdmin,
      isSchoolAdmin,
      user: {
        id: userExist._id.toString(),
        email: userExist.email,
        role: userExist.role,
        schoolId: userExist.schoolId,
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

    res.status(201).json({
      message:"sign up sucessfull,  waiting for superadmin approval",
      schoolId:school._id,
      userId:user._id,
      status:school.status
    })
    
  } catch (error) {
    
  }

return  res.status(200).json({msg:"sign up controller working"})
}
module.exports = { login , signup };
