import { createContext, useEffect, useState } from "react";
const URL = "http://localhost:5000/api/auth/user"

export const AuthContext   = createContext();

export const AuthProvider  = ({children})=>{
    const [token , setToken] = useState(localStorage.getItem("token"));
const [user, setuser] = useState([])
    const storeTokenInLs  = (serverToken)=>{
        const nextToken  = serverToken;
        localStorage.setItem("token" , nextToken);
        setToken(nextToken);
    }
    const userAuthentication = async ()=>{
        try {
            const response = await fetch(URL, {
                method:"GET",
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })

            if(response.ok){
                const data = await response.json();
                console.log("got user data in userauthentication");
setuser(data);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
    userAuthentication();
    }, [])
    
let isLoggedIn = !!token;


    return <AuthContext.Provider value={{storeTokenInLs , token , isLoggedIn}}>{children}</AuthContext.Provider>
};

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    
 if(!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
 }
    return authContextValue;
}