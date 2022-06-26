import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import AppContext from "./context";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const Dishes = ({ restId }) => {
  const { addItem } = useContext(AppContext);
  const router = useRouter();
  const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
      restaurant(id: $id) {
        id
        name
        dishes {
          id
          name
          description
          price
          image {
            url
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    // console.log(error);
    return <p>ERROR here</p>;
  }
  if (!data) return <p>Not found</p>;

  // console.log(data.restaurant);
  let restaurant = data.restaurant;

  if (restId > 0) {
    return (
      <>
        {restaurant.dishes.map((res) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: "0 10px", height: "100%" }}>
              <CardImg
                top={true}
                style={{ width: "100%", maxHeight: "180px" }}
                src={`https://ao-li-restaurantapp-backend.herokuapp.com${res.image.url}`}
              />
              <CardBody>
                <CardTitle>
                  <strong>{res.name}</strong>
                </CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button color="info" outline onClick={() => addItem(res)}>
                  + Add To Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </>
    );
  } else {
    return <h1>No Dishes</h1>;
  }
};
export default Dishes;
