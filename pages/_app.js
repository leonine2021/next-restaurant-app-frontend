import { useContext, useState } from "react";
import "../styles/globals.css";
import Layout from "../components/layout";
import Head from "next/head";
import AppContext from "../components/context";

function MyApp({ Component, pageProps }) {
  var { cart, addItem, removeItem, user, setUser } = useContext(AppContext);
  const [state, setState] = useState({
    cart: cart,
  });
  const [currUser, setCurrUser] = useState({ user: null });

  setUser = (userInfo) => {
    setCurrUser({ user: userInfo });
  };

  addItem = (item) => {
    let { items } = state.cart;
    let foundItem = true;
    let newCart = { items: [], total: 0, numItem: 0 };
    if (items && items.length > 0) {
      foundItem = items.find((i) => i.id === item.id);
      if (!foundItem) foundItem = false;
    } else {
      foundItem = false;
    }
    console.log(`Found Item value: ${JSON.stringify(foundItem)}`);

    if (!foundItem) {
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      newCart = {
        items: [...state.cart.items, temp],
        total: state.cart.total + item.price,
        numItem: state.cart.numItem + 1,
      };

      console.log(newCart);
      setState({ cart: newCart });
    } else {
      console.log(2);
      newCart = {
        items: items.map((item) => {
          if (item.id === foundItem.id) {
            return Object.assign({}, item, { quantity: item.quantity + 1 });
          } else {
            return item;
          }
        }),
        total: state.cart.total + item.price,
        numItem: state.cart.numItem + 1,
      };
    }
    setState({ cart: newCart });
  };

  removeItem = (item) => {
    let { items } = state.cart;
    const foundItem = items.find((i) => i.id === item.id);
    let newCart = { items: [], total: 0, numItem: 0 };
    if (foundItem.quantity > 1) {
      newCart = {
        items: items.map((item) => {
          if (item.id === foundItem.id) {
            return Object.assign({}, item, { quantity: item.quantity - 1 });
          } else {
            return item;
          }
        }),
        total: state.cart.total - item.price,
        numItem: state.cart.numItem - 1,
      };
    } else {
      console.log("Try remove item", foundItem);
      const index = items.findIndex((i) => i.id === foundItem.id);
      items.splice(index, 1);
      newCart = {
        items: items,
        total: state.cart.total - item.price,
        numItem: state.cart.numItem - 1,
      };
    }
    setState({ cart: newCart });
  };

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        addItem: addItem,
        removeItem: removeItem,
        isAuthenticated: false,
        user: currUser.user,
        setUser: setUser,
      }}
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
