import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className=" bg-gray-900 text-slate-400 flex justify-between">
      <h2 className="text-4xl p-5">Blogs</h2>
      <div className="p-5 flex justify-evenly">
        <Link to={"/"} className="p-2">Blogs</Link>
        <Link to={"/users"} className="p-2">Users</Link>
      </div>
    </div>
  );
};

export default Navigation;
