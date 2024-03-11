import { updatedUserSchema } from "@saurabh412/index";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import useProfile from "../hooks/getprofiledata-hook";
// import { UserProfile } from "./Profile";

export function UpdatedUser(){
    const {user}:any = useProfile()
    const {id} = useParams();
    const navigate = useNavigate()
    
    const [updatedName,setUpdatedName] = useState(user.name);
    const  [updatedEmail, setUpdatedEmail]=useState(user.email);
    const [updatedPassword,setUpdatedPassword] = useState(user.password)
    const [errors, setErrors] = useState({ name: "", password: "",email:'' });

    function handleSubmit(e: any) {
        e.preventDefault()

        const userdata = { name: updatedName, email: updatedEmail,password: updatedPassword};
        const { success } = updatedUserSchema.safeParse(userdata);
        if (!success) {
            alert("Min Password length is 6 Characters")
            return setErrors(errors);
        }
        else {
            axios.put(`https://backend.saurabhgupta0122.workers.dev/api/v1/user/update/${id}`, userdata, {
                headers: { "Authorization": localStorage.getItem('token') }
            })
                .then(() => {
                    alert('User Updated Successfully!')
                    navigate(`/profile/${id}`, { replace: true })
                }).catch(() => alert('Network Error!'))
        }
        }

        return (
            <div className="h-screen bg-gradient-to-r from-blue-500 to-green-300 rounded-xl shadow-lg p-10 flex flex-col sm:flex-row gap-6 items-center justify-center">
                <div className="bg-slate-200 rounded-lg shadow-md p-10 max-w-sm">
                    <h2 className="text-4xl font-bold mb-4 text-center">Update Profile</h2>
        
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-1">Name:</label>
                            <input 
                                type="text" 
                                id="name"
                                placeholder="Name" 
                                value={updatedName} // Bind to state
                                onChange={(e) => setUpdatedName(e.target.value)} 
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
        
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Email" 
                                value={updatedEmail} // Bind to state
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500" 
                             />
                        </div>
        
                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Password" 
                                value={updatedPassword} // Bind to state 
                                onChange={(e) => setUpdatedPassword(e.target.value)} 
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-row justify-around">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4">
                                Update
                            </button>
                            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4">
                                <Link to='/profile/*'>Cancel</Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
        
}
