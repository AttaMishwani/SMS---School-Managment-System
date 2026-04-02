
const URL = "http://localhost:5000/api/admindashboard/studentsList"
const fetchStudentsList = async (token)=>{
  try {
    const res  = await fetch(URL , {
      method : "GET",
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
        if(!res.ok) throw new Error(res?.message || "Failed to fetch students list.");
    const response  = await res.json();

    return response.students
  } catch (error) {
    console.log(error)
  }
}


export default fetchStudentsList