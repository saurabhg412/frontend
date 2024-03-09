import axios from "axios";
import { useEffect, useState } from "react";

export function useAuthorPosts({id}:any){
    const [loading,setLoading] = useState(true)
    const [posts,setPosts] = useState([]);
    const [post,setPost] = useState('')

    useEffect(function(){
        axios.get(`https://backend.saurabhgupta0122.workers.dev/api/v1/post/author/${id}`,{
            headers:{"Authorization":localStorage.getItem('token')}
        })
        .then(response =>{
            setPosts(response.data);
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching posts:", error); 
            // Optionally: Set an error state to display feedback to the user
            setLoading(false);
            });
    },[id])

    useEffect(function(){
        axios.get(`https://backend.saurabhgupta0122.workers.dev/api/v1/post/posts/${id}`,{
            headers:{"Authorization":localStorage.getItem('token')}
        })
        .then(response =>{
            setPost(response.data);
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching posts:", error); 
            // Optionally: Set an error state to display feedback to the user
            setLoading(false);
            });
    },[id])
    return(
        { posts, loading,post}
     )
} 