import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../services/api';
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext({});

function AuthProvider({children}){
   const [data, setData ] = useState({});

   async function signIn({ email, password}){

    try{
        const response = await api.post("/sessions", { email, password })
        const { user, token } = response.data;

        localStorage.setItem("@foodexplorer:user", JSON.stringify(user));
        localStorage.setItem("@foodexplorer:token",token );

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setData({ user, token })

    } catch (error) {
        let errorMessage 
    
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
    
        throw new Error(errorMessage);
      }
     
   }

   function signOut(){
    localStorage.removeItem("@foodexplorer:token" );
    localStorage.removeItem("@foodexplorer:user" );

    setData({});
   }


   useEffect(() => {
    const token =  localStorage.getItem("@foodexplorer:token" );
    const user =  localStorage.getItem("@foodexplorer:user" );

    if(token && user){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setData({
           token,
           user: JSON.parse(user)
        });
    }

   }, [])

   useEffect(() => {
    const token = localStorage.getItem('@foodexplorer:token');
    if (token) {
        const decodedToken = jwt_decode(token);
        if (Date.now() >= decodedToken.exp * 1000) {
            localStorage.removeItem('@foodexplorer:token');
            setData({});
        }
    }
}, []);

    return (
<AuthContext.Provider value={{ 
    signIn, 
    user: data.user,
    signOut
     }}>
    {children}
</AuthContext.Provider>
    )   
}

function useAuth(){
    const context =  useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };