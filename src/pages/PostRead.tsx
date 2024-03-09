import { useParams } from "react-router-dom";
import AppBar from "../components/Appbar";
import { useAuthorPosts } from "../hooks/useAuthorposts-hook";

export function PostRead(){
    const {id} = useParams();
    const {post,loading}:{ post: any, loading: boolean } =useAuthorPosts({id})
    if(loading) return <div>Loading...</div>;
    return (
        <div className="container mx-auto">
            <div className="mb-4">
                <AppBar />
            </div>

            <div className="border border-gray-200 rounded-lg p-6 shadow-md m-10"> {/* Added shadow */}
                <div className="flex items-center justify-between mb-4"> {/* For title and button layout */}
                    <h1 className="font-bold text-3xl border-l-4 border-gray-500 pl-4">
                        Title : {post.title}
                    </h1>
                </div>

                <span className="text-lg text-gray-600 block mb-4">{post.author.name}</span>
                <p className="text-base">{post.content}</p>

            </div>
        </div>
    );
}