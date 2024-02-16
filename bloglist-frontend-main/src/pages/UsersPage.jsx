import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAction } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import { getBlogsAction } from "../reducers/blogReducer";
const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(getBlogsAction());
  }, []);

  return (
    <div className="">
      {/* <h1 className="text-7xl text-center">Users</h1> */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:bg-gray-900">
        <thead>
          <tr className="">
            <th className="px-6 py-3">Users</th>
            <th className="px-6 py-3">Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
            
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td className="px-6 py-4">{user.blogs.length}</td>
                </tr>
              
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
