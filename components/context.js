// set backup default for isAuthenticated if none is provided in Provider
import { createContext } from "react";
const AppContext = createContext({
  isAuthenticated: false,
  cart: { items: [], total: 0, numItem: 0 },
  addItem: () => {},
  removeItem: () => {},
  user: null,
  setUser: () => {},
});
export default AppContext;
