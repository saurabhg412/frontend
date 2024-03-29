import { useState } from "react";
import { Headings } from "../components/signinHeading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signinSchema } from "@saurabh412/index";
import FakeProgressBar from "../components/Progress-bar";

function Signin() {
    const [formData,setFormData] = useState<signinSchema>({
        email : ''   ,   password: ''
    })
    const navigate = useNavigate()

    function handleChange(e:any){
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    async function handleSubmit(e:any){
        e.preventDefault();
        const {success} = signinSchema.safeParse(formData)
         if(!success) {
            return alert("Invalid Inputs")
         };
        try{
            const response = await axios.post("https://backend.saurabhgupta0122.workers.dev/api/v1/user/signin", formData)
        if (response.status == 200) {
            localStorage.setItem("token", response.data.jwt);
            alert(`Welcome ${response.data.user.name}`);
            navigate("/posts")
        } 
        } catch{
            alert(`You Don't Have Account Create A New Account`);
            navigate('/')
        }   
    }

return (
    <div>
        <FakeProgressBar></FakeProgressBar>
    <div className="bg-gradient-to-r from-blue-400 via-red-300 to-green-300 h-screen flex items-center justify-center">
        <div className="bg-gradient-to-r from-green-300 to-blue-300 rounded-lg shadow-lg p-10 max-w-sm">
            {/* Headings Component */} 
            <Headings></Headings>

            <form onSubmit={handleSubmit} className="mt-6"> 
                <div className="mb-4"> 
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="mb-4"> 
                    <input 
                        type="password"  
                        name="password" 
                        placeholder="Password" 
                        className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={handleChange} 
                    />
                </div>

                {/* Forgot Password Link*/}
                <div className="flex justify-start mt-2 text-sm text-cyan-600 font-semi-bold">
                    <Link to="/update" className="hover:text-red-500 transition ease-out duration-100">Forgot password?</Link>
                </div>

                {/* Login Button */}
                <button 
                    type="submit"
                    className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                >
                    Login
                </button>

                {/* OR Divider */}
                <div className="flex items-center justify-center mt-8">
                    <hr className="flex-1 border-gray-600" />
                    <span className="px-4 text-gray-900">OR</span>
                    <hr className="flex-1 border-gray-600" />
                </div>

                {/* Sign Up Section */}
                <div className="mt-8 text-center">
                    <p className="text-md text-gray-700">
                        Don't have an account?
                        <Link to="/" className="text-cyan-600 hover:text-cyan-900 font-bold ml-2">Sign up</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
    </div>
);

}
export default Signin;