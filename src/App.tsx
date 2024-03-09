import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import {AllPosts} from "./pages/AllPosts"
import { UserPosts } from "./pages/UserPosts"
import Postid from "./pages/Postid"
import Signup from "./pages/Signup"
// import {UserProfile} from "./pages/Profile"
import { UpdatedPost } from "./pages/UpdatedPost"
// import { UpdatedUser } from "./pages/UpdateUser"
import { Publish } from "./pages/PublishPost"
import { NotFound } from "./utils/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        {/* <Route path="/update" element={<UpdatedUser/>}></Route> */}
        <Route path="/post" element={<AllPosts/>}></Route>
        <Route path="/posts" element={<UserPosts/>}></Route>
        <Route path="/post/:id" element={<Postid/>}></Route>
        <Route path="/publish" element={<Publish/>}></Route>
        <Route path="/update/:id" element={<UpdatedPost/>}></Route>
        {/* <Route path="/profile" element={<UserProfile/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
