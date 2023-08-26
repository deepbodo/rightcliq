import React, {
  Component,
  useEffect,
  useState,
  CSSProperties,
  onChange,
} from "react";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { IoNotificationsSharp } from "react-icons/io5";
import { CgTemplate } from "react-icons/cg";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import Log from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/rightcli2logo.png";
import { GoMail } from "react-icons/go";
import {
  AiOutlineStar,
  AiTwotoneFolderAdd,
  AiFillWallet,
} from "react-icons/ai";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { CiTrophy, CiLogout } from "react-icons/ci";
import { BiMessageAltDots } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
import { notificationByQuerryID } from "../../graphql/queries";
const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Left = styled.div`
  width: 20%;
  padding-top: 20px;
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
  width: 60%;
  margin-bottom: 10px;
`;
const Hr = styled.hr`
  width: 100%;
  margin-top: -10px;
`;
const Div = styled.div`
  margin: 5px;
  margin-top: -5px;
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

const NavLinks = styled.div`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  font-size: 1rem;
  display: flex;
  font-weight: 200;
  flex-direction: column;
  text-align: left;
  cursor: pointer;
  width: 100%;
  margin-right: 0px;
  margin-top: 1px;
  margin-bottom: 1px;
`;
const InnerLink = styled(Link)`
  text-decoration: none;
  color: #000;
  width: 250px;
  border-radius: 10px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding-top: 8px;
  padding-bottom: 8px;
  letter-spacing: 1.5px;
  padding-left: 50px;
  cursor: pointer;
  margin-left: 25px;
  margin-right: 0px;
  &:hover {
    color: #b5b5b5;
  }
`;
const Div2 = styled.div`
  display: flex;
  width: 5.2rem;
  justify-content: space-between;
`;
const Button = styled.button`
  text-decoration: none;
  background-color: transparent;
  color: #000;
  width: 250px;
  border: none;
  border-radius: 10px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
  letter-spacing: 1.5px;
  padding-left: 50px;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 180px;
  margin-bottom: 10px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
const NavLink2 = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const P = styled.p`
  margin-top: -20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
`;
const CreatorPanel = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [notification, setNotification] = useState(false);
  const [tennant, setTenant] = useState(false);
  async function fetchTenant() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { accessToken } = await Auth.currentSession();
      const cognitogroups = accessToken.payload["cognito:groups"];
      const tenant = cognitogroups[0];
      console.log(user);
      if (tenant == "Creator") {
        setTenant(true);
      }
    } catch (err) {
      console.log(err);
      nav("/creator/login/");
    }
  }
  function navigation() {
    nav("/creator/login/");
  }

  useEffect(() => {
    fetchTenant();
    getData();
  }, []);
  async function signOut() {
    try {
      await Auth.signOut();
      nav("/creator/login/");
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
      {tennant ? (
        <Container>
          <Left>
            <NavLink2>
              <Logo src={Log} />
              <P>for Creator</P>
            </NavLink2>
            <Div>
              <NavLink to={`/creatoruser/details/${id}/dashboard/`}>
                <MdDashboard size="26" />
                Dashboard
              </NavLink>

              <NavLink to={`/creatoruser/details/${id}/dashboard/assignment/`}>
                <AiTwotoneFolderAdd size="26" />
                Assignment
              </NavLink>
              <NavLink
                to={`/creatoruser/details/${id}/dashboard/343fghzsvxfdmessaging/`}
              >
                <TbMessages size="26" />
                Messaging
              </NavLink>
              <NavLink
                to={`/creatoruser/details/${id}/dashboard/343fghzsvxfdwallet/`}
              >
                <AiFillWallet size="26" />
                Wallet
              </NavLink>
              <NavLink
                to={`/creatoruser/details/${id}/dashboard/notification/`}
              >
                <IoNotificationsSharp size="26" />
                Notifications
                <span>{notification ? <Numb></Numb> : <div></div>}</span>
              </NavLink>
              <Button onClick={signOut}>
                <RiLogoutBoxRFill size="26" />
                Log Out
              </Button>
            </Div>
          </Left>
          <Right>
            <Outlet />
          </Right>
        </Container>
      ) : (
        <div>not admin</div>
      )}{" "}
    </>
  );
};

export default CreatorPanel;
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
