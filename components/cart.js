import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Button, Badge } from "reactstrap";
import AppContext from "./context";
import Link from "next/link";
import { Offcanvas } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  let router = useRouter();

  let { cart, addItem, removeItem } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const renderItems = () => {
    let { items } = cart;
    // console.log("render items", items);
    if (items && items.length) {
      let itemList = cart.items.map((item) => {
        if (item.quantity > 0) {
          return (
            <div
              className="items-one"
              style={{ marginBottom: 15 }}
              key={item.id}
            >
              <div>
                <span id="item-price">&nbsp; ${item.price}</span>
                <span id="item-name">&nbsp; {item.name}</span>
              </div>
              <div>
                <Button
                  style={{
                    height: 50,
                    padding: 0,
                    width: 15,
                    marginRight: 5,
                    marginLeft: 10,
                  }}
                  onClick={() => {
                    addItem(item);
                  }}
                  color="link"
                >
                  +
                </Button>
                <Button
                  style={{
                    height: 50,
                    padding: 0,
                    width: 15,
                    marginRight: 10,
                  }}
                  onClick={() => {
                    removeItem(item);
                  }}
                  color="link"
                >
                  -
                </Button>
                <span style={{ marginLeft: 5 }} id="item-quantity">
                  {item.quantity}x
                </span>
              </div>
            </div>
          );
        }
      });
      return itemList;
    } else {
      return <div></div>;
    }
  };

  const checkoutItems = () => {
    return (
      <div>
        <Badge style={{ width: 200, padding: 10 }}>
          <h5 style={{ fontWeight: 100 }}>Total:</h5>
          <h3>${cart.total.toFixed(2)}</h3>
        </Badge>
        {router.pathname === "/checkout" ? null : (
          <Link href="/checkout/">
            <Button style={{ width: "60%", marginTop: "30px" }} color="primary">
              <a>Checkout</a>
            </Button>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginRight: "30px", marginLeft: "30px" }}>
        <Button
          color="info"
          variant="primary"
          onClick={handleShow}
          style={{ height: "35px" }}
        >
          <ShoppingCartOutlinedIcon />
          {cart.numItem > 0 && (
            <div
              style={{
                borderRadius: "50%",
                background: "red",
                transform: "translate(20px, -40px)",
                color: "white",
              }}
            >
              {cart.numItem}
            </div>
          )}
        </Button>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton style={{ marginTop: "60px" }}>
          <Offcanvas.Title style={{ margin: 10 }}>Your Order:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: 10 }}>
          <div style={{ margin: 10 }}>
            <h6>Items:</h6>
          </div>
          <div>{renderItems()}</div>
        </Offcanvas.Body>
        <Offcanvas.Body>
          <div>{checkoutItems()}</div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default Cart;
