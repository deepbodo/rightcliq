import React, { useEffect, useState, CSSProperties } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Log from "../Images/rightcli2logo.png";
import { GoMail } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { CiTrophy, CiLogout } from "react-icons/ci";

import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import {
  dataByQuerryID,
  notificationByQuerryID,
  projectByUserID,
} from "../graphql/queries";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgTemplate } from "react-icons/cg";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import Modal from "./Category/Modal";
import LogOut from "./LogOut";
import NewUserForm from "../Components/NewUserForm";
const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Left = styled.div`
  width: 20%;
  padding-top: 25px;
  align-items: center;
  position: fixed;
  top: 0;
  height: 100vh;
  text-align: center;
  background-color: #fff; ;
`;
const Right = styled.div`
  width: 80%;
  margin-left: 20%;
  background-color: #f1f1f1;
`;
const Logo = styled.img`
  width: 50%;
  margin-bottom: 10px;
`;
const Hr = styled.hr`
  width: 100%;
  margin-top: -10px;
`;
const Div = styled.div`
  margin: 5px;
  text-align: left;
  display: inline-flex;
  padding-left: 0px;
  flex-direction: column;
`;
const NavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  width: 250px;
  border-radius: 10px;
  font-size: 1.3rem;
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
  letter-spacing: 1.5px;
  padding-left: 50px;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 10px;
  margin-bottom: 2px;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const Div2 = styled.div`
  display: flex;
  width: 5.2rem;
  justify-content: space-between;
`;
const Button = styled.button`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  width: 250px;
  border: none;
  border-radius: 10px;
  font-size: 1.3rem;
  background: transparent;
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
  letter-spacing: 1.5px;
  padding-left: 50px;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 8px;
  margin-bottom: 2px;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
const NavLink2 = styled(Link)``;
const Dashboard = () => {
  const { id } = useParams();
  const nav = useNavigate();
  // const [id, updateId] = useState();
  const [Id, setId] = useState(null);
  const [data, setData] = useState(false);
  const [notification, setNotification] = useState(false);
  async function fetchId() {
    const user = await Auth.currentAuthenticatedUser();
    setId(user.attributes.sub);
  }
  useEffect(() => {
    fetchId();
  }, []);
  useEffect(() => {
    async function checkData() {
      const result = await API.graphql(
        graphqlOperation(dataByQuerryID, { QId: id })
      );
      const todos = result.data.dataByQuerryID.items;
      if (todos.length > 0) {
        setData(true);
      } else {
        setData(false);
      }
    }
    checkData();
    getData();
  }, []);
  async function signOut() {
    try {
      await Auth.signOut();
      nav("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function getData() {
    const response = await API.graphql(
      graphqlOperation(notificationByQuerryID, {
        QId: id,
      })
    );
    const items = response?.data?.notificationByQuerryID?.items;
    console.log(items.length);
    if (items.length > 0) {
      setNotification(true);
    }
  }
  return (
    <>
      {data ? (
        <Container>
          <Left>
            <NavLink2 to="/">
              <Logo src={Log} />
            </NavLink2>

            <Div>
              <NavLink to={`/business/${Id}/`}>
                <MdDashboard size="26" />
                Dashboard
              </NavLink>
              <NavLink to={`/business/${Id}/create/`}>
                <MdOutlineCreateNewFolder size="26" />
                Create Project
              </NavLink>
              <NavLink to={`/business/${Id}/templates/`}>
                <CgTemplate size="26" />
                Templates
              </NavLink>
              <NavLink to={`/business/${Id}/inbox/`}>
                <GoMail size="26" />
                Inbox
              </NavLink>
              <NavLink>
                <AiOutlineStar size="26" />
                Ratings
              </NavLink>
              <NavLink>
                <CiTrophy size="26" />
                Rewards
              </NavLink>
              <NavLink to={`/business/${Id}/notification/`}>
                <IoNotificationsOutline size="26" />
                Notifications
                <span>{notification ? <Numb></Numb> : <div></div>}</span>
              </NavLink>
              <Button onClick={signOut}>
                <CiLogout size="26" />
                Log Out
              </Button>
            </Div>
          </Left>
          <Right>
            <Outlet />
          </Right>
        </Container>
      ) : (
        <div>
          <NewUserForm />
        </div>
      )}
    </>
  );
};

export default Dashboard;

const Numb = styled.div`
  background-color: red;
  width: 8px;
  height: 8px;
  align-items: center;
  text-align: center;
  display: flex;
  margin-top: -5px;
  border-radius: 100%;
`;
