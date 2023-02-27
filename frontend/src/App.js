import "./App.css";
import Navbar from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Transaction from "./pages/Transaction";
import B2B from "./pages/B2B";
import B2BCorporate from "./pages/B2B_Corporate";
import B2BRetail from "./pages/B2B_Retail";
import OwnShop from "./pages/OwnShop";
import OwnShopCommerce from "./pages/OwnShop_Commerce";
import OwnShopCorner from "./pages/OwnShop_Corner";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/b2b" element={<B2B />} />
          <Route path="/b2bcorporate" element={<B2BCorporate />} />
          <Route path="/b2bretail" element={<B2BRetail />} />
          <Route path="/ownshop" element={<OwnShop />} />
          <Route path="/ownshopcommerce" element={<OwnShopCommerce />} />
          <Route path="/ownshopcorner" element={<OwnShopCorner />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
