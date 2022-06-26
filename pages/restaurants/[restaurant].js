import { useRouter } from "next/router";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Dishes from "../../components/dishes";

import { Button, CardImg, Container, Row, Col } from "reactstrap";

import Link from "next/link";
export default function Restaurant() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ao-li-restaurantapp-backend.herokuapp.com";
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  const router = useRouter();
  const { name, id, url } = router.query;
  return (
    <ApolloProvider client={client}>
      <Container fluid style={{ marginTop: "90px" }}>
        <Row>
          <Col lg={8}>
            <Row xs="3">
              <Col lg={8}>
                <h1>{name}</h1>
              </Col>
              <Col lg={4}>
                <Link href="/">
                  <Button
                    color="info"
                    style={{
                      height: "2.5rem",
                      marginTop: "10px",
                      width: "100%",
                      marginRight: 0,
                      paddingRight: 0,
                    }}
                  >
                    Back to Restaurants
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row style={{ display: "block" }}>
              <CardImg
                top={true}
                style={{ height: 600, marginTop: "10px" }}
                src={`https://ao-li-restaurantapp-backend.herokuapp.com` + url}
              />
            </Row>
            <Row>
              <Row xs="3">
                <h3 style={{ marginTop: "30px" }}>Menu</h3>
              </Row>
              <Row xs="3" style={{ width: "100%" }}>
                <Dishes restId={id}></Dishes>
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}
