import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { dataByQuerryID } from "../graphql/queries";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
const Container1 = styled.div`
  height: auto;
  padding: 0;

  @media (max-width: 800px) {
    overflow-x: hidden;
  }
`;

const Who = styled.div`
  height: auto;
  background-color: #fbf9f4;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 80px;
  @media (max-width: 800px) {
    overflow-x: hidden;
    padding: 2rem;
    height: auto;
  }
`;
const Div = styled.div`
  height: 600px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 800px) {
    height: auto;
    width: auto;
    align-items: center;
    flex-direction: column;
  }
`;

const Para = styled.p`
  color: #464d53;
  width: 800px;
  font-size: 1.5rem;
  @media (max-width: 800px) {
    font-size: 1.5rem;
    width: 100%;
    font-weight: 470;
  }
`;
const Title = styled.h2`
  font-family: "Ubuntu", sans-serif;
  font-size: 4rem;
  width: 800px;
  margin-bottom: 30px;
`;
const About = () => {
  let { id } = useParams();
  const [data, setData] = useState(false);
  useEffect(() => {
    API.graphql(
      graphqlOperation(dataByQuerryID, {
        QId: id,
      })
    ).then((response) => {
      const items = response?.data?.dataByQuerryID?.items;
      console.log(items);
      if (items.length !== 0) {
        setData(true);
      }
    });
  }, []);

  return (
    <>
      <Navbar />

      <Container1>
        <Who>
          <Div>
            <Title>Every Company Is A Content Company</Title>
            <Para>
              We’re on our way to become the world’s largest content company,
              diligently building the technological plumbing that will power all
              content ever created.
            </Para>
          </Div>
        </Who>
      </Container1>
    </>
  );
};

export default About;
