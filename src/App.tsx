import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import {AllPosts} from "./pages/AllPosts"
import { UserPosts } from "./pages/UserPosts"
import {Postid} from "./pages/Postid"
import Signup from "./pages/Signup"
import { UpdatedPost } from "./pages/UpdatedPost"
import { UpdatedUser } from "./pages/UpdateUser"
import { Publish } from "./pages/PublishPost"
import { NotFound } from "./utils/NotFound"
import { AuthorPosts } from "./pages/AuthorPosts"
import { PostRead } from "./pages/PostRead"
import { UserProfile } from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/user/:id" element={<UpdatedUser/>}></Route>
        <Route path="/posts" element={<AllPosts/>}></Route>
        <Route path="/post" element={<UserPosts/>}></Route>
        <Route path="/publish" element={<Publish/>}></Route>
        <Route path="/post/:id" element={<Postid/>}></Route>
        <Route path="/posts/:id" element={<PostRead/>}></Route>
        <Route path="/update/:id" element={<UpdatedPost/>}></Route>
        <Route path="/author/:id" element={<AuthorPosts></AuthorPosts>}></Route>
        <Route path="/profile/:id" element={<UserProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
