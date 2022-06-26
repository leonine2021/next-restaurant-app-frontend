/* pages/checkout.js */

import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";

function Checkout() {
  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51HaLhVGgpfLkdZwmHVQcCOdUzwLWqV7umg9EbicemJqLOcLBPDrPtszruyxf4UzqH0lKwaNj5se3tHldNx92nPjI00Zoi8VgBN"
  );

  return (
    <Row>
      <Col style={{ marginLeft: "10%" }} sm={{ size: 6, order: 2 }}>
        <h1 style={{ marginTop: "100px", marginBottom: "-60px" }}>Checkout</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
}
export default Checkout;
