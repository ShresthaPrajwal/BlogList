import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null;

const setToken = newToken =>{
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject =>{
  const config = {
    headers:{Authorization: token},
  }
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}

const likepost = async (newObject) =>{
  
  const postId = newObject._id
  const config = {
    headers:{Authorization: token},
  }
  newObject = {
    ...newObject,
    'likes':newObject.likes+1,
    'user':newObject.user.id
  }
  delete newObject.__v;
  const response = await axios.put(baseUrl+`/${postId}`,newObject,config);
  return response.data
}

const deletepost = async(deleteobj)=>{
  const postId = deleteobj._id;
  const config = {
    headers:{Authorization: token},
  }
  const response = await axios.delete(baseUrl+`/${postId}`,config)
  return response.data
}

const commentPost = async (obj,id)=>{
  const comment = {
    "comments":obj
  }
  const response = await axios.post(baseUrl+`/${id}`+'/comments',comment)
  return response
}
export default { getAll ,setToken, create , likepost , deletepost ,commentPost}