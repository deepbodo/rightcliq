import { API, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { createNotification } from "../../graphql/mutations";
import Log from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/submit.png";
const Container = styled.div`
  background-color: #f3f3f3;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Box = styled.div`
  width: 800px;
  height: 550px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;
const Title = styled.h2`
  margin: -4px;
  margin-top: -5px;
  margin-bottom: 0px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  letter-spacing: 3.5px;
`;
const H2 = styled.p`
  color: #8e8b8b;
  margin-top: 10px;
  margin-left: 19px;
  font-size: 20px;
  width: 345px;
  text-align: center;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
`;
const Img = styled.img`
  width: 300px;
  margin-top: -60px;
`;
const Button = styled.button`
  color: #fff;
  width: 250px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 2px;
  letter-spacing: 2px;
  background-color: #2a2a2a;
  padding-left: 2px;
  font-size: 1rem;
  margin: 0px;
  border: none;
  font-weight: 500;
  margin-bottom: 10px;
  border-radius: 20px;
  &:hover {
    background-color: #2a2a2a;
    color: #fff;
  }
`;
const Submit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [notification, setNotification] = useState({
    QId: "a3348f86-320d-4c1b-a7c3-f25b7686fd08",
    messagetype: "new user",
    message: "New creator waiting for approval, ID:" + `${id}`,
    cId: id,
  });
  async function newNotification() {
    const newTodo = API.graphql(
      graphqlOperation(createNotification, { input: notification })
    );
    console.log(newTodo);
    if (newTodo) {
      nav(`/creatoruser/details/${id}/dashboard/`);
    }
  }
  return (
    <>
      <Container>
        <Box>
          <Img src={Log} />
          <Title>THANKS FOR SUBMITTING</Title>
          <H2>
            Your Form Is Under Review.Please Wait For Confirmation From Admin
          </H2>
          <Button onClick={newNotification}>GO TO PROFILE</Button>
        </Box>
      </Container>
    </>
  );
};

export default Submit;
