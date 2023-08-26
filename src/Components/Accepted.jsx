import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, Link } from "react-router-dom";
import Congrats from "../Images/congrats.png";
const Container = styled.div`
  padding: 80px;
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  background-color: #747474;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  padding: 20px;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
  justify-content: center;
`;
const Image = styled.img`
  width: 60%;
`;

const Accepted = () => {
  const nav = useNavigate();
  return (
    <Container>
      <Box>
        <Image src={Congrats} />
        <Button to={"/"}>GO TO MY DASHBOARD</Button>
      </Box>
    </Container>
  );
};

export default Accepted;
const Button = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: auto;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #2a2a2a;
  font-size: 1.2rem;
  border: none;
  font-weight: 500;
  text-decoration: none;
  padding-left: 14px;
  padding-right: 14px;
  margin: auto;
  border-radius: 15px;
  pointer: cursor;
  &:hover {
    background-color: #2a2a2a;
    color: #fff;
  }
`;
