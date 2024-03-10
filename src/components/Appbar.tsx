import { Link, useNavigate } from 'react-router-dom';
// import usePost from './useposts-hook';

export default function AppBar() {
  const navigate = useNavigate();
  // const { username }:any = usePost();
  // const user = username[0].author.name
  // console.log(user)
  async function handleLogout() {
    localStorage.removeItem('token');
    navigate('/signin')
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-10"> 
      <div className="container mx-auto px-4 flex items-center justify-between py-3">

        <Link to="/post" className="font-bold text-xl mr-3">Medium</Link>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-4">
          <li className='ml-4 mr-6 pr-4 text-left'>
            <input type="text" placeholder='Search your posts...' className="border border-gray-300 rounded-md px-28 py-2 w-full text-left md:block hidden"/>
          </li>
          <li >
            <Link to="/post">Home</Link>
          </li>
          <li>
            <Link to="/publish">New Post</Link>
          </li>
          <li>
            <Link to="/Posts">My Posts</Link>
          </li>
          {/* Add more links if needed (About, Contact, etc.) */}

          {/* User Profile (optional) */}
          <li>
            <button className="bg-gray-200 hover:bg-blue-400 px-3 py-1 rounded-md">
                <span className="font-medium mr-2 "><Link to="/profile">Profile</Link></span>
            </button>
          </li>
          <li>
            <button className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md" onClick={handleLogout}>Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}