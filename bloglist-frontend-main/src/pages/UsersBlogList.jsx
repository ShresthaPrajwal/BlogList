import {
    useParams
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom"
const UserBlogList = ()=>{
    const id = useParams().id
    const users = useSelector(state=>state.users)
    const user = users.filter(user=>user.id===id)[0]
    if (!user) {
        return null
      }
    return(
        <div className='p-10 bg-gray-800'>
            <h2 className='text-3xl text-white text-center'>{user.name}</h2>
            <div className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>Added blogs</div>
            <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>
                {user.blogs.map((blog)=>{
                    return(
                        <li><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></li>
                    )
                })}
            
            </ul>
            
        </div>
    )
}

export default UserBlogList