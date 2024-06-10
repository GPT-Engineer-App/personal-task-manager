import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Projects from "./pages/Projects.jsx";
import Todos from "./pages/Todos.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId/todos" element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;
