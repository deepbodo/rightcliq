import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import FormCreate from "./FormCreate";
import { Auth, Hub } from "aws-amplify";

import { Routes, Route, useNavigate, Link } from "react-router-dom";
const Container = styled.div`
  padding-top: 0rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
`;
const Banner = styled.div`
  background-size: contain;
  border-radius: 10px;
  height: auto;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-top: 3px;
`;
const Section = styled.div`
  border-radius: 10px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: #f1f1f1;
  // background-color: rgba(129, 205, 252, 0.5);
  padding: 10px;
  margin-top: 3px;
  justify-content: space-around;
`;
const P = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 35px;
  z-index: 1;
  font-size: 1.2rem;
  text-align: left;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  margin: 0px;
  letter-spacing: 2px;
`;
const Create = () => {
  const nav = useNavigate();
  const [user, updateUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      setIsAuthenticated(true);
      console.log("got user", user);
    } catch (err) {
      console.log("checkUser error", err);
    }
  };
  const handleLogout = async () => {
    try {
      await Auth.signOut({ global: true });
      nav("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Container>
      <Banner>
        <H>Project Details</H>
      </Banner>
      <Section>
        {/* <Card /> */}
        <FormCreate />
      </Section>
    </Container>
  );
};

export default Create;
