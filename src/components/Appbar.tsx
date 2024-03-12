import { Link, useNavigate } from 'react-router-dom';
import useProfile from '../hooks/getprofiledata-hook';
import Skeleton from 'react-loading-skeleton';
import FakeProgressBar from './Progress-bar';

export default function AppBar() {
  const navigate = useNavigate();
  const {user,loading} = useProfile()

  if(loading){
    return(
        <Skeleton />
    )
  }
  async function handleLogout() {
    localStorage.removeItem('token');
    navigate('/signin')
  };

  //@ts-ignore
  const id = user.id
  //@ts-ignore
  const name = user.name
  
  return (
      <div className="bg-white shadow-md sticky top-0 z-10">
                <FakeProgressBar></FakeProgressBar>
          <div className="container mx-auto px-4 flex items-center justify-between py-3">
              <Link to="/posts" className="font-bold text-xl text-blue-600 hover:text-blue-800">
                  Medium
              </Link>
  
              {/* Search Bar */}
              <div className="border border-gray-300 rounded-md px-3 py-2 md:block hidden w-2/5">
                  <input type="text" placeholder='Search your posts...' className="ml-2 w-full bg-transparent focus:outline-none" />
              </div>
  
              {/* Navigation Links */}
              <ul className="flex items-center space-x-4">
                  <li>
                      <Link to="/posts" className="hover:text-blue-600">Home</Link>
                  </li>
                  <li>
                      <Link to="/publish" className="hover:text-blue-600">New Post</Link>
                  </li>
                  <li>
                      <Link to="/post" className="hover:text-blue-600">My Posts</Link>
                  </li>
  
                  {/* User Profile */}
                  <li className="flex items-center">
                      {/* <Link to={`/profile/${id}`} className="font-medium mr-2 hover:text-blue-600">Profile</Link> */}
                      <button className="bg-blue-200 hover:bg-blue-500 px-2 py-1 rounded-md text-sm">
                      <Link to={`/profile/${id}`}>{name}</Link>
                      </button>
                  </li>
                  <li>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded-md" onClick={handleLogout}>Logout</button>
                  </li>
              </ul>
          </div>
      </div>
  );
  
}