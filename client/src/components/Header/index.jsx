import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";
import { Link } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.data);
  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };
  const RegisterHeader = () => {
    return (
      <div className="header">
        <Navbar bg="white" className="p-0">
          <Nav className="m-auto">
            <Nav.Link className="fs-3 text-primary">SocialNetwork</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  };
  const CommonHeader = () => {
    return (
      <div className="header">
        <Navbar expand="md" bg="white">
          <Container>
            <Navbar.Brand className="text-primary fs-4">
              <Link className="text-decoration-none" to="/">
                SocialNetwork
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className=" flex-grow-0">
              <Nav>
                <NavDropdown
                  title={
                    userStatus === "loaded" ? (
                      `${userData.fullName}`
                    ) : (
                      <SkeletonTheme inline>
                        <Skeleton
                          style={{ width: "100px" }}
                          className="rounded-2 me-2"
                        />
                      </SkeletonTheme>
                    )
                  }
                  id="navbarScrollingDropdown"
                  className="me-md-5 grey-200 rounded-3 text-center mt-2 mt-md-0"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                    <span>Выйти</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  };

  if (window.localStorage.getItem("token")) {
    if (userStatus === "error") {
      return <RegisterHeader />;
    }
    return <CommonHeader />;
  } else {
    return <RegisterHeader />;
  }
}
export default Header;
