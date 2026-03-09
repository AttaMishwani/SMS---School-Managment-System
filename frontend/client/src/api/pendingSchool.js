
const BASE = "http://localhost:5000/api/schools";
const PENDING_SCHOOLS_URL = `${BASE}/pendingschools`;
 const fetchPendingSchools = async () => {
    try {
      const res = await fetch(PENDING_SCHOOLS_URL);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch pending schools.");

      return data
    } catch (err) {
   console.log(err)
    }
  };

  export default fetchPendingSchools