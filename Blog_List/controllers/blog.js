const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/users')


blogRouter.get('/',async (request,response,next)=>{
  try{
    const blogs = await Blog.find({}).populate('user',{username:1,name:1})
  response.json(blogs)    
  }
  catch(exception){
    next(exception)
  }
    
})

blogRouter.post("/",async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(request.user.id)
  
  if(body.title==null){
    
    response.status(400).end("No title")
    return
  }
  if(body.url==null){
    response.status(400).end("No url")
    return
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user:user._id
  });
  try{
    let savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    savedBlog = await Blog.findById(savedBlog._id).populate('user')
      response.status(201).json(savedBlog)
  }
  catch(exception){
    next(exception)
  }
  
});

blogRouter.get('/:id',async(request,response,next)=>{
  try{
    const blog = await Blog.findById(request.params.id)
    if(blog){
      response.json(blog)

    }else{
      response.status(404).end()
    }
  }catch(exception){
    next(exception)
  }
})

blogRouter.delete('/:id',async(request,response,next)=>{
  try {
    const blogToDelete = await Blog.findById(request.params.id);
    const user = await User.findById(request.user.id)
    console.log("delete part here",blogToDelete)
    // Check if the blog exists
    if (!blogToDelete) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    console.log(request.user.id)
    // Check if the user attempting to delete the blog is the blog's creator
    if (blogToDelete.user.toString() !== request.user.id) {
      return response.status(403).json({ error: 'Unauthorized: You are not the creator of this blog' });
    }

    // Delete the blog
    user.blogs = user.blogs.filter(b => b.toString() !== blogToDelete.id.toString() )
    await user.save()
    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
})
blogRouter.post('/:id/comments',async(request,response,next)=>{
  const body = request.body.comments
  const blog = await Blog.findById(request.params.id)
  blog.comments= blog.comments.concat(body)
  console.log(body)
  const res = await blog.save()
  console.log(res)
  response.status(201).json(res)
 return
})
blogRouter.put('/:id',async(request, response, next)=>{
  const body = request.body
  const blog={
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }
  if(body.title==null){
    response.status(400).end("No title")
    return
  }
  if(body.url==null){
    response.status(400).end("No url")
    return
  }
  try{
    const updatedBlogs = await Blog.findByIdAndUpdate(request.body._id,blog,{new:true})
    response.status(204).json(updatedBlogs).end()
  }
  catch(exception){
    next(exception)
  }
})

module.exports = blogRouter;
