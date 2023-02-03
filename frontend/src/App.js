import "./App.css";
import Navbar from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import ChannelContribution from "./pages/ChannelContribution";
import ProductContribution from "./pages/ProductContribution";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/channelscontribution"
            element={<ChannelContribution />}
          />
           <Route
            path="/productcontribution"
            element={<ProductContribution />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
