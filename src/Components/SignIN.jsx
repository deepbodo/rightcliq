import React, { useState } from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoImage from "../Images/right-cliq-textual.png";
const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Left = styled.div`
  width: 60%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  align-items: center;
  text-align: center;
`;
const Logo = styled.img`
  width: 20%;
  margin-right: 4px;
`;
const Right = styled.div`
  width: 40%;
  background-image: linear-gradient(
    180deg,
    hsl(240deg 100% 20%) 72%,
    hsl(250deg 82% 23%) 86%,
    hsl(253deg 67% 27%) 92%,
    hsl(255deg 57% 31%) 95%,
    hsl(257deg 49% 34%) 98%,
    hsl(258deg 42% 38%) 99%,
    hsl(259deg 37% 42%) 100%,
    hsl(260deg 32% 45%) 101%,
    hsl(261deg 28% 49%) 101%,
    hsl(261deg 27% 53%) 101%,
    hsl(262deg 27% 56%) 102%,
    hsl(262deg 27% 60%) 102%,
    hsl(263deg 27% 64%) 102%,
    hsl(263deg 28% 68%) 102%,
    hsl(264deg 28% 72%) 101%,
    hsl(264deg 28% 76%) 101%,
    hsl(264deg 28% 80%) 101%,
    hsl(264deg 28% 84%) 101%,
    hsl(265deg 29% 88%) 101%,
    hsl(265deg 29% 92%) 100%,
    hsl(265deg 29% 96%) 100%,
    hsl(0deg 0% 100%) 100%
  );
`;
const P = styled.h1`
  font-weight: 50;
  font-size: 2rem;
  font-weight: 400;
  margin-left: 8px;
  letter-spacing: 1px;
`;
const Title = styled.h1`
  font-weight: 360;
  font-size: 2rem;
`;
const Div = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Input = styled.input`
  border-top-left-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 280px;
  padding: 1rem;
  text-align: left;
  border-bottom-left-radius: 10px;
  font-size: 1.3rem;
`;
const Input2 = styled.input`
  border-top-right-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 280px;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  border-bottom-right-radius: 10px;
`;
const Input3 = styled.input`
  border-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 400px;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  color: #fff;
  width: 400px;
  margin: 20px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 8px;
  background-color: #090167;
  padding-left: 8px;
  font-size: 1.4rem;
  border: none;
  font-weight: 500;
  border-radius: 18px;
  &:hover {
    background-color: #090167;
    color: #fff;
  }
`;
const Log = styled.p`
  margin: -5px;
  font-weight: bold;
  color: #090167;
`;
const SignIN = () => {
  const navigate = useNavigate();
  const onClickFunc = () => {
    navigate("/home");
  };
  return (
    <Container>
      <Left>
        <Header>
          <Logo src={LogoImage} />
          {/* <P> for business</P> */}
        </Header>
        <Title>Log In To Your Account</Title>
        <Form>
          <Input3 type="email" id="email" placeholder="Email" />
          <Input3 type="password" id="password" placeholder="Password" />
          <Button onClick={onClickFunc}>LOG IN</Button>
        </Form>
        <p>Don't have an account?</p>
        <Link to="/">
          <Log>SIGN UP</Log>
        </Link>
      </Left>
      <Right></Right>
    </Container>
  );
};

export default SignIN;
