import "./App.css";
import Navbar from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import ChannelContribution from "./pages/ChannelContribution";
import ProductContribution from "./pages/ProductContribution";
import ProductRanked from "./pages/ProductRanked";
import RevenueGrowthPerSource from "./pages/RevenueGrowthPerSource";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/revenuegrowthpersource"
            element={<RevenueGrowthPerSource />}
          />
          <Route
            path="/channelscontribution"
            element={<ChannelContribution />}
          />
          <Route
            path="/productcontribution"
            element={<ProductContribution />}
          />
          <Route path="/productranked" element={<ProductRanked />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
