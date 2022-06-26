import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";
import { logout } from "./auth";
import Cart from "./cart";
import { useRouter } from "next/router";

const Layout = (props) => {
  const appContext = useContext(AppContext);
  const { user } = appContext;
  let router = useRouter();
  // console.log("AppContext in layout", appContext);
  const title = "Welcome to Nextjs";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h6 {
              color: white;
              padding-top: 8px;
              font-style: italic;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark fixed-top">
          <NavItem className="ml-3">
            <Link href="/">
              <a className="navbar-brand">Home</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            {user ? (
              <h6>{`Welcome,  ${
                user.username.charAt(0).toUpperCase() + user.username.slice(1)
              }!`}</h6>
            ) : (
              <Link href="/register">
                <a className="nav-link"> Sign up</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    // setUser(null);
                    appContext.setUser(null);
                    appContext.isAuthenticated = false;
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">Sign in</a>
              </Link>
            )}
          </NavItem>
          <NavItem>{router.pathname === "/success" ? null : <Cart />}</NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
