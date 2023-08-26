import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub, Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import ProgressiveImage from "../ProgressiveImage";

import {
  createNotification,
  updateProjectApproved,
} from "../../graphql/mutations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsInfoCircle } from "react-icons/bs";
import { listCreatorApproveds } from "../../graphql/queries";
const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9e9e9;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4rem;
  letter-spacing: 2px;
  margin-top: -20px;
`;
const Card = styled.div`
  width: 250px;
  height: 260px;
  margin: auto;
  margin-bottom: 60px;
  background-color: #fff;
  align-items: center;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -40px;
  height: auto;
  width: 80%;
`;
const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 60px;
  align-items: center;
  z-index: 1000;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: -6px;
  flex-direction: column;
  color: #fff;
  text-transform: uppercase;
  background-color: #292929;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Button = styled.button`
  color: #fff;
  width: auto;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: -3px;
  margin-bottom: 6px;
  padding-right: 5px;
  background-color: #434242;
  padding-left: 5px;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  border-radius: 10px;
  &:hover {
    background-color: #ffff;
    color: #000;
  }
`;
const Navlink = styled(Link)`
  text-decoration: none;
  pointer: cursor;
  color: #fff;
`;
const AssignCreator = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [datas, setData] = useState([]);
  useEffect(() => {
    async function getCreators() {
      const newtodo = await API.graphql(graphqlOperation(listCreatorApproveds));
      let todos = newtodo.data.listCreatorApproveds.items;
      // for all todos get the pre-signURL and store in images field
      todos = await Promise.all(
        todos.map(async (todo) => {
          const imageKey = await Storage.get(todo.image);
          console.log(imageKey);
          todo.image = imageKey;
          return todo;
        })
      );
      setData(todos);
    }
    getCreators();
  }, []);

  const notify = () => {
    toast.warn(
      "No project selected for assigning! Visit Ongoing or Pending Projects",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  return (
    <>
      <Container>
        <H>Assign Creator</H>
        <Div>
          {datas.map((data, index) => {
            return (
              <Card>
                <Image src={data.image} />
                <Title>
                  <Div2>
                    {data.fisrtname}
                    {/* <Input
                      type="checkbox"
                      //   onChange={(event) =>
                      //     setCreator((prev) => ({
                      //       ...prev,
                      //       creatorId: data.QId,
                      //       creatorName: data.fisrtname,
                      //     }))
                      //   }
                    /> */}
                  </Div2>
                  <Button onClick={notify}>ASSIGN</Button>
                </Title>
              </Card>
            );
          })}
        </Div>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default AssignCreator;

const Div2 = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  align-items: center;
  justify-content: center; ;
`;
const Input = styled.input`
  height: 15px;
  width: 15px;
`;
