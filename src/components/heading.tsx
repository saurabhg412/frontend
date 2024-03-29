import { Link } from "react-router-dom"
export function Heading(){
    return (
        <div>
            <div className="font-bold text-4xl p-2 m-4 text-center">
                Create Account
            </div>
            <div className="font-medium text-lg py-4 text-gray-700 text-center">
                Already Have An Account? <Link to={'/signin'} className="text-blue-600 cursor-pointer hover:underline">Login</Link>
            </div>
        </div>
    )
}