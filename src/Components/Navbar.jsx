import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Log from "../Images/rightcli2logo.png";
import data from "../Data/Categories.json";
import CategoryList from "./Category/CategoryList";
import { GrFormClose } from "react-icons/gr";
import "./Category/cat.css";
import { RiArrowDropDownLine } from "react-icons/ri";

const Container = styled.div`
  background-color: none;
  height: 80px;
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  padding-left: 0rem;
  padding-right: 5rem;
  justify-content: space-between;
`;
const Left = styled.div`
  width: 28%;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 50%;
`;
const Right = styled.div`
  width: 60%;
  align-items: center;
  display: flex;
  justify-content: space-around;
`;
const NavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  font-size: 1.5rem;
  font-weight: 50;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  font-weight: 500;
  &:focus {
  }
  &.active {
    color: #000000;
    font-weight: bold;
  }
`;
const Div = styled.div`
  background-color: #a3d5f2;
  display: flex;
  width: 25rem;
  margin-top: 1rem;
  position: absolute;
  padding: 0.6rem;
  flex-direction: column;
  box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.5);
`;
const HelpDiv = styled.div`
  text-align: right;
`;
const Button = styled.button`
  color: #090167;
  width: 10rem;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 8px;
  background-color: #a3d5f2;
  padding-left: 8px;
  font-size: 1.1rem;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #090167;
    color: #fff;
  }
`;
const NavLink2 = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  color: #000;
  width: 10rem;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fba5a4;
  text-decoration: none;
  font-size: 1.1rem;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #fba5a4;
    color: #000;
  }
`;
const Navbar = (props) => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dashboardOpen = () => {
    navigate("/business");
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Left>
          <Logo src={Log} />
        </Left>
        <Right>
          <NavLink to="/home/">Home</NavLink>
          <div>
            <NavLink onClick={handleOpen}>
              Categories
              {/* <RiArrowDropDownLine size="23px" /> */}
            </NavLink>
            {open ? (
              <Div>
                <HelpDiv>
                  {" "}
                  <GrFormClose
                    style={{
                      top: "20px",
                      right: "20px",
                    }}
                    onClick={handleMenuOne}
                    size="20px"
                    color="white"
                  />
                </HelpDiv>

                <CategoryList data={data} open={open} />
              </Div>
            ) : null}
          </div>
          <NavLink>
            Resources
            {/* <RiArrowDropDownLine size="23px" /> */}
          </NavLink>
          <NavLink to="/about/">
            About Us
            {/* <RiArrowDropDownLine size="23px" /> */}
          </NavLink>
          <NavLink2 to="/sign/">GET STARTED</NavLink2>
        </Right>
      </Container>
    </>
  );
};

export default Navbar;
