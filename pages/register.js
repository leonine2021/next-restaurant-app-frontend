import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { useState, useContext } from "react";
import AppContext from "../components/context";
import { registerUser } from "../components/auth";
import Link from "next/link";

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
  return (
    <Container style={{ marginTop: "90px" }}>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <section className="wrapper">
            {error.constructor === Object &&
              Object.entries(error).length !== 0 &&
              error.message && (
                <div style={{ marginBottom: 10 }}>
                  <small style={{ color: "red" }}>{error.message}</small>
                </div>
              )}
            <Form>
              <h5>User Registration</h5>
              <fieldset>
                <FormGroup>
                  <Label>Username:</Label>
                  <Input
                    disabled={loading}
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                    value={data.username}
                    type="text"
                    name="username"
                    style={{ height: 50, fontSize: "1.2em" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email:</Label>
                  <Input
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    value={data.email}
                    type="email"
                    name="email"
                    style={{ height: 50, fontSize: "1.2em" }}
                  />
                </FormGroup>
                <FormGroup style={{ marginBottom: 30 }}>
                  <Label>Password:</Label>
                  <Input
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                    value={data.password}
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: "1.2em" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col>
                      <span>
                        <a href="">
                          <small>Forgot Password?</small>
                        </a>
                      </span>
                      <br></br>
                      <span>
                        <Link href="/login">
                          <a>
                            <small>Already have an account?</small>
                          </a>
                        </Link>
                      </span>
                    </Col>
                    <Col>
                      <Button
                        style={{ float: "right", width: 120, marginTop: 6 }}
                        color="primary"
                        disabled={loading}
                        onClick={() => {
                          setLoading(true);
                          registerUser(data.username, data.email, data.password)
                            .then((res) => {
                              appContext.setUser(res.data.user);
                              setLoading(false);
                              console.log(
                                `registered user: ${JSON.stringify(res.data)}`
                              );
                            })
                            .catch((error) => {
                              console.log(
                                `error registering user: ${error.response.data.message}`
                              );
                              setLoading(false);
                              setError({
                                message: error.response.data.message,
                              });
                            });
                        }}
                      >
                        {loading ? "Loading.." : "Submit"}
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
};

export default Register;
