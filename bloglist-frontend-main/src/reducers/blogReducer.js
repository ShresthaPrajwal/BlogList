import {createSlice} from '@reduxjs/toolkit'
import blogservices from '../services/blogs'


const BlogSlice= createSlice({
    name:'blogs',
    initialState:[],
    reducers:{
        getBlogs(state,action){
            return action.payload
        },
        addNew(state,action){
            const newBlog = {
                ...action.payload
            }
            console.log(newBlog)
            return state.concat(newBlog)
        },
        updateLikes(state,action){
            const id = action.payload
            console.log(state)
            const newblogs = state.map((item)=>{
                if(item._id===id){
                  return {...item,'likes':item.likes+1}
                }
                else{
                  return item
                }
              })
              return newblogs
        },
        deleteBlog(state,action){
            
            const id = action.payload._id
            const newblogs = state.filter((item)=>item._id!==id)
            return newblogs
        },
        updateComments(state,action){
            console.log(action)
            const id = action.payload.id
            const newblogs = state.map((item)=>{
                if(item._id === id){
                    return {...item,'comments':item.comments.concat(action.payload.obj)}
                }
                else{
                    return item
                }
            })
            return newblogs
            
        }
    }
})

export const {getBlogs, addNew , updateLikes ,deleteBlog, updateComments} = BlogSlice.actions

//Action creators

export const getBlogsAction= ()=>{
    return async dispatch=>{
        const blogs = await blogservices.getAll()
        dispatch(getBlogs(blogs))
    }
}

export const addBlogAction = blog =>{
    return async dispatch =>{
        const response = await blogservices.create(blog)
        console.log('response',response)
        dispatch(addNew(response))
    }
}
export const updateLikesAction = obj=>{
    return async dispatch =>{
        await blogservices.likepost(obj)
        console.log(obj)
        dispatch(updateLikes(obj._id))
    }
}

export const deleteBlogAction = obj =>{
    return async dispatch =>{
        await blogservices.deletepost(obj)
        dispatch(deleteBlog(obj))
    }
}

export const addComment = (obj,id) =>{
    return async dispatch =>{
        await blogservices.commentPost(obj,id)
        dispatch(updateComments({obj,id}))
    }
}
export default BlogSlice.reducer