import axios from "axios";
import { useEffect, useState } from "react";

export default function useProfile(){
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState('')

    useEffect(function(){
        axios.get("https://backend.saurabhgupta0122.workers.dev/api/v1/user/profile",{
            headers:{"Authorization":localStorage.getItem('token')}
        })
        .then(response =>{
            setUser(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error); 
            // Optionally: Set an error state to display feedback to the user
            setLoading(false);
            });
    },[])
    return(
        {user,loading}
    )
}