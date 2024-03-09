import { useState } from "react";
import AppBar from "../components/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updatedPostSchema } from "@saurabh412/index";
import { UserPosts } from "./UserPosts";

export function UpdatedPost() {
    const { id } = useParams();
    // @ts-ignore
    const [updatedTitle, setUpdatedTitle] = useState(UserPosts.title);
    //@ts-ignore
    const [updatedContent, setUpdatedContent] = useState(UserPosts.content);
    const [errors, setErrors] = useState({ title: "", content: "" });

    const navigate = useNavigate();

    function handleSubmit(e: any) {
        e.preventDefault()

        const data = { title: updatedTitle, content: updatedContent };
        const { success } = updatedPostSchema.safeParse(data);
        if (!success) {
            alert("Max Limit For Title Is 100 Words")
            return setErrors(errors);
        }
        else {
            axios.put(`https://backend.saurabhgupta0122.workers.dev/api/v1/post/update/${id}`, data, {
                headers: { "Authorization": localStorage.getItem('token') }
            })
                .then(() => {
                    alert('Post Updated Successfully!')
                    navigate('/posts', { replace: true })
                }).catch(() => alert('Network Error!'))
        }
    }
    return (
        <div>
            <AppBar></AppBar>
            <div className="container mx-auto p-8 bg-slate-200 h-screen">
                <div className="text-3xl font-bold mb-4">
                    <h1>Update your post here</h1>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title: </label>
                    <input type='text' onChange={(e) => setUpdatedTitle(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" /><br />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Content: </label><br />
                    <textarea  onChange={(e) => setUpdatedContent(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea><br />
                </div>
    
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Update</button>
            </div>
        </div>
    
        )
}