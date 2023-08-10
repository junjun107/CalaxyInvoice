import Home from "./components/Home";
import Invoice from "./components/InvoiceForm";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GlobalProvider } from "./context/GlobalState";
import InvoiceEdit from "./components/InvoiceEdit";
import InvoiceView from "./components/InvoiceView";

function App({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoiceform" element={<Invoice />} />
            <Route path="/:id" element={<InvoiceEdit />} />
            <Route path="/:id/view" element={<InvoiceView />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </LocalizationProvider>
  );
}

export default App;
