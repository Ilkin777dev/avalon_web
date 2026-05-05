import ProtectedRoute from "./components/ProtectedRoute"
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Careers from './pages/Careers'
import Projects from './pages/Projects'
import ProjectPage from "./pages/ProjectPage";
import Appartments from "./pages/Appartments"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/admin" element={ <ProtectedRoute> <Admin /> </ProtectedRoute> } />
      <Route path="/login" element={<Login />} />
      <Route path="/appartments" element={<Appartments />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project/:id" element={<ProjectPage />} />
    </Routes>
  )
}

export default App