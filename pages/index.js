import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import RestaurantList from "../components/restaurantList";
import Cart from "../components/cart";

function Home() {
  const [query, setQuery] = useState("");
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ao-li-restaurantapp-backend.herokuapp.com";
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  return (
    <ApolloProvider client={client}>
      <div className="search" style={{ marginTop: "90px" }}>
        <h2> Local Restaurants</h2>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">search</InputGroup.Text>
          <FormControl
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            value={query}
          />
        </InputGroup>
        <br></br>
      </div>
      <RestaurantList search={query} client={client} />
    </ApolloProvider>
  );
}
export default Home;
