import Notification from "./components/Notification";
import BlogsPage from "./pages/BlogsPage";
import BlogPage from "./pages/BlogPage";
import Auth from "./components/Auth";
import UsersPage from "./pages/UsersPage";
import UserBlogList from "./pages/UsersBlogList";
import Navigation from "./components/Navigation";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
const App = () => {
  
  return (
    <Router>
      <>
      <Navigation/>
      
      <Notification />
      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserBlogList />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Routes>
      <Auth />
    </>
    </Router>
    
  );
};

export default App;
