import { Container, Button } from "reactstrap";
import Router from "next/router";
import AppContext from "../components/context";
import { useContext } from "react";

export default function Success() {
  let appContext = useContext(AppContext);

  const handleClick = () => {
    appContext.cart.items = [];
    appContext.cart.numItem = 0;
    appContext.cart.total = 0;
    Router.push("/");
  };

  return (
    <Container
      style={{
        marginTop: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Thank you for your order!</h1>
      <h5 style={{ color: "gray" }}>
        Your payment has been successfully processed
      </h5>
      <Button
        style={{ width: "35%", marginTop: "30px" }}
        color="primary"
        onClick={handleClick}
      >
        <a>Back to Home</a>
      </Button>
    </Container>
  );
}
