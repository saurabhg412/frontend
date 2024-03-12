import axios from "axios"; // Or your preferred data fetching library
import { Link, useNavigate, useParams } from "react-router-dom";
import useProfile from "../hooks/getprofiledata-hook";
import AppBar from "../components/Appbar";
import FakeProgressBar from "../components/Progress-bar";


export function UserProfile() {
    const navigate = useNavigate()
    const {id} = useParams()
    const {user}:any = useProfile()
    
      const handleDelete = async () => { 
        if (user && window.confirm(`Delete profile for ${user.name}?`)) { 
          try {
            await axios.delete(`https://backend.saurabhgupta0122.workers.dev/api/v1/user/delete/${id}`, { 
                headers: { 
                    'Authorization': localStorage.getItem('token')}
            });
            alert('Account Deleted Successfully')
            localStorage.clear()
            navigate('/')
            
          } catch (err) {
            console.error(err);
            // Handle delete error
          }
        }
      };
      

      return (
        <div>
          <FakeProgressBar></FakeProgressBar>
          <AppBar />
        <div className="h-98vh bg-gradient-to-r from-blue-500 to-green-300 rounded-xl shadow-lg p-10 flex flex-col sm:flex-row gap-6 items-center mt-4">
          <div>
            {/* Consider adding an image for the user here */}
            <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover border-blue-800 border-2" />
          </div>
          <div className="grid grid-cols-1">
            <h2 className="text-5xl font-bold mb-2 text-black">{user.name}</h2>
            <div className="mt-4">
              <p className="font-medium text-gray-200 text-2xl">Name:</p>
              <p className="text-black pb-4 text-2xl font-semibold">{user.name}</p>
            </div>
            <div className="mt-3">
              <p className="font-medium text-gray-200 text-2xl">Email:</p>
              <p className="text-black text-2xl font-semibold">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-row gap-10 mt-8 sm:ml-auto">
            <Link to={`/user/${id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Account
              </button>
            </Link>
            <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
              Delete Account
            </button>
          </div>
        </div>
        </div>
      );
    }