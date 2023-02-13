import "./App.css";
import Navbar from "./components/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import TransactionTable from "./components/TransactionTable";
import Transaction from "./pages/Transaction";
import B2B from "./pages/B2B";
import B2BCorporate from "./pages/B2B_Corporate";
import B2BRetail from "./pages/B2B_Retail";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/b2b" element={<B2B />} />
          <Route
            path="/b2bcorporate"
            element={<B2BCorporate />}
          />
          <Route path="/b2bretail" element={<B2BRetail />} />
          <Route path="/tabletransaction" element={<TransactionTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
