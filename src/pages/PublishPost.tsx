import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar";
import { postSchema } from "@saurabh412/index";

export function Publish() {
    const [postData, setPostData] = useState({ title: "", content: "" });
    
    const navigate = useNavigate();

    function changeHandler(e: any) {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    function submitHandler(e: any) {
        e.preventDefault();
        const { success } = postSchema.safeParse(postData);

        if (!success) {
            return alert("Please Fill Out All Fields." )
        }
        
        try {
            axios.post("https://backend.saurabhgupta0122.workers.dev/api/v1/post/create", postData, {
                headers: { "Authorization": localStorage.getItem('token') }
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        alert('Post Published Successfully!')
                        navigate('/post', { replace: true })
                    } else {
                        alert('Error Occured while publishing the Post!')
                    }
                })
        } catch (error) {
            () => alert('Network Error!')
        }
    }

return (
    <div className="bg-gradient-to-r from-blue-400 to-green-300">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <AppBar />
        </div>

        <div className="container mx-auto p-8  h-screen">
            <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-500 to-blue-300 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-6">Publish A New Blog Post</h1>

                <form onSubmit={submitHandler}> 
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-lg font-bold mb-2">Title:</label>
                        <input 
                            type="text"
                            placeholder="Title..."
                            id="title" 
                            name="title" 
                            onChange={changeHandler} 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="content" className="block text-gray-700 text-lg font-bold mb-2">Content:</label>
                        <textarea 
                            id="content"
                            placeholder="Publish Your Content Here . . ."
                            name="content" 
                            onChange={changeHandler} 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 h-48"
                        ></textarea> 
                    </div>

                    <button 
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        Publish
                    </button>
                </form>
            </div>
        </div>
    </div>
);

}
