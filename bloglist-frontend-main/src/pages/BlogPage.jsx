import {
    useParams
} from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";

import {
    addComment,
  updateLikesAction,
} from "../reducers/blogReducer";
import { useState } from 'react';

const BlogPage = ()=>{
    const [comment,setComment] = useState('')
    const dispatch = useDispatch()
    const id = useParams().id
    const blogs = useSelector(state=>state.blogs)
    
    const blog = blogs.filter(blog=>blog._id==id)[0]
    if(!blog){
        return null
      }
    const updateLikes = (obj) => {
        dispatch(updateLikesAction(obj));
      };
      const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(comment)
        dispatch(addComment(comment,id))
        setComment('')
      }
      
    return(
        <div className='bg-gray-800 p-10 text-white'>
            <h1 className='mb-2 text-3xl font-semibold text-gray-900 dark:text-white'>{blog.title}</h1>
            <div>Added By--{blog.user.name}</div>
            <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={blog.url}>LINK</a>
            <div>
            <button onClick={()=>{updateLikes(blog)}}>👍 {blog.likes}</button>
            </div>
            
            <h3>Comments</h3>
            <form onSubmit={handleSubmit}>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 " type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
            <button type='submit' className="text-gray-900 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-0.5 m-2">Submit</button>
            </form>
            
            <ul>{ blog.comments.map((comment)=><li key={blog.id}>{comment}</li>)}</ul>

        </div>
    )
}

export default BlogPage