import Home from "./components/Home";
import Invoice from "./components/InvoiceForm";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GlobalProvider } from "./context/GlobalState";
import InvoiceEdit from "./components/InvoiceEdit";

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoiceform" element={<Invoice />} />
            <Route path="/:id" element={<InvoiceEdit />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </LocalizationProvider>
  );
}

export default App;
