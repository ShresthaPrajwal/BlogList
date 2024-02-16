import { useState } from "react"
import { Link }from 'react-router-dom'

const Blog = ({ blog , updateLikes, deletePost ,user}) =>{
  const blogStyle = {
    // border: 'solid',
    // borderWidth: 1,
    borderRadius: 10
  }
  // const [visible,setVisible]=useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }
  // const showDetails=()=>{
  //   setVisible(!visible)
  // }

  // const handleLike=async ()=>{
  //   updateLikes(blog)
  // }

  const handleDelete=async ()=>{
    if(window.confirm("Do You really want to delete this post?")){
      try{
        deletePost(blog)
      }
    catch(error){
      window.alert('You are not allowed to delete this.')
    }
    }
    
  }

  return (
    <div style={blogStyle} className="m-3 p-5 text-xl flex justify-between bg-white">
      
      <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      <button onClick={()=>handleDelete()} className="text-red-400 ">DELETE</button>
      {/* <button onClick={showDetails} style={hideWhenVisible}>👁️</button>
      <button onClick={showDetails} style={showWhenVisible}>Hide</button>
      {visible && <>
        {user?.name === blog.user.name && <button onClick={()=>handleDelete()}>🚮</button>}
      
      </>} */}  
    </div>  
  )
} 

export default Blog