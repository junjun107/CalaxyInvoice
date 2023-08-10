import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  invoices: [],
  invoice: {},
  loading: true,
  error: null,
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //ACTIONS
  async function addInvoice(newInvoice) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "https://calaxy-invoice-web.onrender.com",
        newInvoice,
        config
      );

      dispatch({
        type: "ADD_INVOICE",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "INVOICE_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function getInvoices() {
    try {
      const res = await axios.get("https://calaxy-invoice-web.onrender.com");
      dispatch({
        type: "GET_INVOICES",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "INVOICE_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function getInvoice(id) {
    try {
      const res = await axios.get(
        `https://calaxy-invoice-web.onrender.com/${id}`
      );

      dispatch({
        type: "GET_INVOICE",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "INVOICE_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function updateInvoice(id, updatedInvoice) {
    try {
      const res = await axios.patch(
        `https://calaxy-invoice-web.onrender.com/${id}`,

        updatedInvoice
      );
      dispatch({
        type: "UPDATE_INVOICE",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "INVOICE_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteInvoice(id) {
    try {
      await axios.delete(`https://calaxy-invoice-web.onrender.com/${id}`);

      dispatch({
        type: "DELETE_INVOICE",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "INVOICE_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        invoices: state.invoices,
        loading: state.loading,
        current: state.current,
        invoice: state.invoice,
        getInvoices,
        getInvoice,
        deleteInvoice,
        addInvoice,
        updateInvoice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
