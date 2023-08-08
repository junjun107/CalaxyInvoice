const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_INVOICES":
      return {
        ...state,
        loading: false,
        invoices: action.payload,
      };
    case "GET_INVOICE":
      return {
        ...state,
        loading: false,
        invoice: action.payload,
      };
    case "ADD_INVOICE":
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
      };
    case "UPDATE_INVOICE":
      console.log(action.payload);
      return {
        ...state,
        invoice: state.invoices.map((invoice) =>
          invoice._id === action.payload._id ? action.payload : invoice
        ),
      };
    case "DELETE_INVOICE":
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        ),
      };
    case "SET_CURRENT":
      return {
        ...state,
        current: action.payload,
      };
    case "CLEAR_CURRENT":
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};

export default AppReducer;
