import { useParams } from "react-router-dom";
import AppBar from "../components/Appbar";
import { useAuthorPosts } from "../hooks/useAuthorposts-hook";
import { Link } from "react-router-dom";
import FakeProgressBar from "../components/Progress-bar";
import Skeleton from "react-loading-skeleton";

export function AuthorPosts(){
    const {id} = useParams();
    const { posts, loading }: { posts: any[], loading: boolean } = useAuthorPosts({id});

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
            );
    }
    return (
        <div>
            <div className="mb-2">
            <FakeProgressBar></FakeProgressBar>
                <AppBar></AppBar>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
                    {posts.map(function (post: any) {
                        return (
                            <Link key={post.id} to={`/posts/${post.id}`}>
                            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg overflow-hidden" key={post.id}>
                                <div className="flex justify-start items-center">
                                    <span className="text-gray-500 text-md mr-2">{post.id}<span className="font-bold text-black">.</span></span>
                                    <h3 className="font-bold text-lg">Author : {post.author.name}</h3>
                                </div>
                                <h2 className="text-xl font-medium mb-3 line-clamp-1">title : {post.title}</h2>
                                <p className="text-gray-700 line-clamp-1">content : {post.content}</p>
                            </div>
                            </Link>
                        )
                    })}
                </div>
        </div>
    );
}