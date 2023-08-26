import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import AfterNav from "../Images/afternav.png";
import { Auth, Hub } from "aws-amplify";
import Hero from "../Images/hero.png";
import { BsArrowRight } from "react-icons/bs";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Partner from "./Partner";
import About from "./About";
import Services from "./Services";
const Container = styled.div`
  height: calc(100vh - 5rem);
  background-color: #f1ead8;
  padding: 2rem;
  display: flex;
`;
const Left = styled.div`
  width: 50%;
  padding-left: 6rem;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
`;
const Right = styled.div`
  width: 50%;
  align-items: center;
  text-align: center;
`;
const Div = styled.div`
  width: 100%;
  align-items: left;
  display: flex;
`;
const Title = styled.h2`
  font-family: "Ubuntu", sans-serif;
  font-size: 4rem;
  text-align: left;
  margin-bottom: -12px;
`;
const P = styled.p`
  font-family: "Ubuntu", sans-serif;
  font-size: 1.3rem;
  text-align: left;
  color: #464d53;
`;
const Img = styled.img`
  width: 100%;
`;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 200px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #1700e6;

  font-size: 1.3rem;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #1700e6;
    color: #fff;
  }
`;
const NavLink = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  color: #000;
  width: 200px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fba5a4;
  text-decoration: none;
  font-size: 1.3rem;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #fba5a4;
    color: #fff;
  }
`;
const Home = () => {
  const nav = useNavigate();
  const [user, updateUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Navigator = () => {
    nav("/business/" + "bjkhjkh");
  };
  // const checkUser = async () => {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser();

  //     updateUser(user.attributes.sub);
  //     setIsAuthenticated(true);
  //   } catch (err) {
  //     console.log("checkUser error", err);
  //   }
  //   // console.log("got user", user);
  // };
  // useEffect(() => {
  //   checkUser();
  // }, []);
  // if (isAuthenticated) {
  return (
    <>
      <Navbar id={user} />
      <Container>
        <Left>
          <Title>Content marketing made easy</Title>
          <P>
            Create an impactful brand image by creating and publishing
            high-quality content, at speed and scale Get Started
          </P>
          <Div>
            {" "}
            {/* <NavLink to={`/business/${user}`}>
                Get Started <BsArrowRight size="33" />
              </NavLink> */}
          </Div>
        </Left>
        <Right>
          <Img src={Hero} />
        </Right>
      </Container>
      <Partner />
      <Services users={user} />
    </>
  );
  // } else {
  //   return <button>Login</button>;
  // }
};

export default Home;
