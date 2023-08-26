import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import Congrat from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/congrats.png";
import { projectByProjectApprovedID } from "../../graphql/queries";
import { createNotification } from "../../graphql/mutations";
const Container = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  background-color: #747474;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  padding: 20px;
  height: 80%;
  flex-direction: column;
  background-color: #fff;
  justify-content: center;
`;
const Image = styled.img`
  width: 40%;
`;
const Label = styled.label`
  width: 80%;
  text-align: center;
  font-size: 1.4rem;
  color: #676767;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;
const Congrats = () => {
  const nav = useNavigate();
  const { id, cId, pId, uuid } = useParams();
  const [data, setData] = useState([]);
  const [notification2, setNotification2] = useState({
    QId: "",
    messagetype: "New Project",
    message: "New Project Has Been Assigned",
    cId: "",
    pId: "",
    projectname: "",
  });
  const [notification, setNotification] = useState({
    QId: "",
    messagetype: "",
    message: "",
    cId: "",
    pId: "",
    projectname: "",
  });
  useEffect(() => {
    async function getData() {
      const result = await API.graphql(
        graphqlOperation(projectByProjectApprovedID, {
          id: pId,
        })
      );
      const items = result?.data?.projectByProjectApprovedID?.items;
      if (items.length !== 0) {
        items.map((item) => {
          setData(item);
        });
        console.log(notification);
      }
    }
    getData();
  }, []);
  // function assignNotification() {
  //   const newTodo =  API.graphql(
  //     graphqlOperation(createNotification, { input: notification})
  //   );
  // }
  async function creatorNotification() {
    const details = {
      QId: uuid,
      messagetype: "New Project",
      message: "Project " + `${data.projectname}` + " Has Been Assigned",
      cId: cId,
      pId: pId,
      projectname: data.projectname,
    };
    const newTodo = API.graphql(
      graphqlOperation(createNotification, { input: details })
    );
    console.log(newTodo);
    if (newTodo) {
      nav(`/admin/${id}/panel/`);
    }
  }
  async function submit() {
    const newTodo = API.graphql(
      graphqlOperation(createNotification, { input: notification })
    );
    console.log(newTodo);
    if (newTodo) {
      creatorNotification();
    }
  }
  return (
    <Container>
      <Box>
        <Image src={Congrat} />
        <Label>
          Creator <i>{cId} </i>has been assigned to project Id:<i>{pId}</i>
        </Label>
        <Div>
          <input
            type="checkbox"
            onChange={(event) =>
              setNotification((prev) => ({
                ...prev,
                QId: `${data.username}`,
                messagetype: "Project Approved And Creator Assigned",
                message:
                  `${cId}` +
                  "has been assigned to your project" +
                  `${data.projectname}`,
                cId: cId,
                pId: pId,
                projectname: `${data.projectname}`,
              }))
            }
          />
          <p>Agree to send Notification to both client and creator.</p>
        </Div>

        <Button onClick={submit}>GO TO MY DASHBOARD</Button>
      </Box>
    </Container>
  );
};
// to={`/admin/${id}/panel/`}
export default Congrats;
const Div = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
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
