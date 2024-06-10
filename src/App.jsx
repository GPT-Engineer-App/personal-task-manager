import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EmptyPage from "./pages/EmptyPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/empty" element={<EmptyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
