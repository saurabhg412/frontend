import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Quote } from "../components/quote";
import { Heading } from "../components/heading";
import { signupSchema } from "@saurabh412/index";



function Signup() {
    const [formData, setFormData] = useState<signupSchema>({
        name: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    let navigate = useNavigate()
    function handleChange(e: any) {
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    async function submitHandler(e: any) {
        e.preventDefault();

        // Validation 
        const { success } = signupSchema.safeParse(formData);
        if (!success) {
            alert("Error in signing up! Please check your credentials.")
            return setErrors(errors);
        }
        else {
            try {
                const response = await axios.post("https://backend.saurabhgupta0122.workers.dev/api/v1/user/signup",
                    formData);
                localStorage.setItem("token", response.data.jwt);
                alert(`Account Created Successfully For ${formData.email}`)
                navigate("/post")
            }
            catch (err) {
                alert("Error in signing up! Please check your credentials.")
            }
        }
    }

    return (
        <div className="grid grid-cols-12 h-screen box-content">
      <div className="h-screen w-full flex items-center justify-center col-span-12 md:col-span-8 flex-col rounded-lg bg-gradient-to-r from-blue-400 via-red-400 to-green-300">
        <div className="p-6 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-gradient-to-r from-green-300 to-blue-400">
          <Heading ></Heading>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input name="name" type="text" placeholder="John" className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow-sm" onChange={handleChange} required/>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input name="email" type="email" placeholder="John@gmail.com" className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow-sm" onChange={handleChange} required/>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Password:</label>
            <input type="password" name="password" placeholder="******" className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow-sm" onChange={handleChange} required/>
          </div>

          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={submitHandler}>Signup</button>
          </div>
        </div>
      </div>
      <div className="md:block hidden col-span-4">
        <div className="text-xl h-screen flex flex-col items-center justify-center font-serif p-20 bg-gradient-to-r from-green-400 to-blue-400">
          <Quote></Quote>
                </div>
            </div>
        </div>
    )
}
export default Signup;