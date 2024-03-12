import { useParams } from "react-router-dom";
import AppBar from "../components/Appbar";
import { useAuthorPosts } from "../hooks/useAuthorposts-hook";
import Skeleton from "react-loading-skeleton";

export function PostRead(){
    const {id} = useParams();
    const {post,loading,error}:{ post: any, loading: boolean,error:any } =useAuthorPosts({id})

    if (loading) {
        return (
            <div>
                <div>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                </div>
                <div>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                </div>
                <div>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                </div>
            </div>
            );
    } else if (error){
            return <div className="error-message">Error: {error}</div>;
    } else if (post){
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

                <p className="text-lg text-gray-600 block mb-4">{post.author.name}</p>
                <p className="text-base">{post.content}</p>

            </div>
        </div>
    );
    }
    else{
        return <div>No post found.</div>;
    }
}