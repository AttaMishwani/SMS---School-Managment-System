const School = require("../models/school-model");


const pendingSchools = async (req, res) => {

    try {
        const pendingSchools = await School.find({status:"PENDING"});

        if(!pendingSchools){
            res.status(404).json({message:"No pending schools found"});
            return;
        }

      return   res.status(200).json(pendingSchools);
    } catch (error) {
      return   res.status(500).json({message:"Internal server error"});
        console.log(error);
       
    }
}

const updateSchoolStatus = async (req, res) => {
  try {
    const {id} =  req.params;
    const {status} = req.body
    console.log(status)

    const allowed = ["PENDING", "ACTIVE", "SUSPENDED"];
    if(!allowed.includes(status)){
      return res.status(400).send({message:"invalid status"})
    }
    const school  = await School.findByIdAndUpdate(id , {status}, {new:true});

    if(!school){
      return res.status(400).json({message:"school not found"});

    }

    return res.status(200).json({message:"school status updated" , school})

} catch (error) {
    console.log(error)
  }
}

module.exports = { pendingSchools, updateSchoolStatus };