import { useState, useEffect } from "react";
import axios from "axios"; // Or your preferred data fetching library
import {useNavigate, useParams } from "react-router-dom";
import { updatedUserSchema } from "@saurabh412/index";

interface User{
    email : string,
    password : string,
    name : string
}
export function UserProfile() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState<User>({
        name: "",
        email: "",
        password: ""
    });
    const [isEditting, setIsEditting] = useState(false);

    const [updateEmail, setUpdateEmail] = useState(profileData.email);
    const [updatePassword, setUpdatePassword] = useState(profileData.password);
    const [updateName, setUpdateName] = useState(profileData.name);

   async function handleSubmit(e:any) {
    e.preventDefault();
    const updatedData = {
        email: updateEmail, password: updatePassword, name: updateName
    }
    const {success} = updatedUserSchema.safeParse(updatedData);
     if (!success){
        return alert('invalid inputs')
     } 
        try {
           await axios.put(`https://backend.saurabhgupta0122.workers.dev/api/v1/user/update/${id}`, updatedData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                alert("Profile updated successfully!");
                navigate('/profile',{ replace: true })
                setIsEditting(false) 
        }  catch (err) {
            alert('found err')
        }
    }

    async function handleDelete(){
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            try {
              await axios.delete(`https://backend.saurabhgupta0122.workers.dev/api/v1/user/delete/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
              });
              alert("Account deleted successfully.");
              localStorage.clear();
              navigate('/')
              // Handle redirection or logout as needed
      
            } catch (error) {
              alert("An error occurred while deleting your account.");
              console.error(error);
            }
          }
    }

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await axios.get("https://backend.saurabhgupta0122.workers.dev/api/v1/user/profile", {
                headers: { 'Authorization': localStorage.getItem("token") },
            })
            setProfileData(response.data);
        };
        fetchUserData();
    }, []);
    


    // ... (functions to handle form submission, API calls, etc.)

    return (
        <div className="container mx-auto p-6">
            {profileData ? (
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                    {!isEditting ? (
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="flex-grow">
                                <p>Name : {profileData.name}</p>
                            </div>
                            <div>
                                <p>Email : {profileData.email}</p>
                            </div>
                            <div>
                                <p>Password :{profileData.password}</p>
                            </div>
                            {/* Display profileData.username, profileData.id, etc. */}
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEditting(true)}>Edit</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleDelete}>Delete Account</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="updateEmail">New Email:</label>
                                <input type="text" id="updateEmail" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="updatePassword">New Password:</label>
                                <input type="password" id="updatePassword" value={updatePassword} onChange={(e) => setUpdatePassword(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="updatename">New Name:</label>
                                <input type="text" id="updatename" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-2">
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                <button type="button" onClick={() => setIsEditting(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            ) : (
                "Loading profile..."
            )}
        </div>
    );
}