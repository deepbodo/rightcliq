import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import AnimatedNumber from "animated-number-react";
import img from "../Images/banner.png";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import {
  dataByQuerryID,
  projectApprovedByUserID,
  projectByUserID,
} from "../graphql/queries";
import { Routes, Route, useNavigate } from "react-router-dom";
import ArrivingSoon from "./ArrivingSoon";
import PendingApprovals from "./PendingApprovals";
import CompletedList from "./CompletedList";
const Container = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  padding-left: 2rem;
  padding-right: 3rem;
  justify-content: space-between;
  //   background-color: red;
`;
const Hr = styled.hr`
  width: 100%;
  margin-top: 30px;
  border: none;
  height: 4px;
  background-color: #d0d0d0;
`;
const Div = styled.div`
  margin: 5px;
  text-align: left;
  display: inline-flex;
  width: 15rem;
  padding-left: 2.4rem;
  flex-direction: column;
`;
const NavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  font-size: 1.2rem;
  display: flex;
  font-weight: 200;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  &:hover {
  }
`;
const Input = styled.input`
  border-radius: 8px;
  width: 300px;
  border-width: 1.6px;
`;
const Div2 = styled.div`
  display: inline-flex;
  width: 350px;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  height: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
`;
const Banner = styled.div`
  border-radius: 8px;
  height: 170px;
  margin-top: -8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 5px;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4.5rem;
  letter-spacing: 2px;
  margin-bottom: -40px;
`;
const H3 = styled.h2`
  color: #717171;
  font-weight: 370;
  font-size: 2rem;
  font-family: "Inter", sans-serif;
`;
const Value = styled(Link)`
  color: #000;
  text-decoration: none;
  font-weight: bold;
  margin-top: -10px;
  margin-left: 30px;
  font-size: 50px;
  font-family: sans-serif;
`;
const H2 = styled.p`
  color: #8e8b8b;
  font-weight: 400;
  margin-top: 10px;
  margin-left: 19px;
  font-size: 18px;
  letter-spacing: 2px;
  font-family: "Montserrat", sans-serif;
  text-decoration: underline;
  text-decoration-color: #646464;
  text-underline-offset: 8px;
  text-decoration-thickness: 0.1em;
`;
const Button = styled(Link)`
  color: #fff;
  width: 180px;
  height: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 20px;
  margin-top: 0px;
  background-color: #2a2a2a;
  padding-left: 20px;
  border: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
  font-weight: 500;
  border-radius: 10px;
  // &:hover {
  //   background-color: #090167;
  //   color: #fff;
  // }
`;
const DashboardPage = () => {
  const { id } = useParams();
  const [user, updateUser] = useState({});
  const [data, setData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [projectApprovedData, setProjectApprovedData] = useState({});
  const [length, setLength] = useState();
  const [approvedlength, setApprovedlength] = useState();
  useEffect(() => {
    API.graphql(
      graphqlOperation(dataByQuerryID, {
        QId: id,
      })
    ).then((response) => {
      const items = response?.data?.dataByQuerryID?.items;
      console.log(items);
      if (items.length !== 0) {
        items.map((item) => {
          setData(item);
        });
      }
    });
  }, []);
  useEffect(() => {
    API.graphql(
      graphqlOperation(projectByUserID, {
        username: id,
      })
    ).then((response) => {
      const items = response?.data?.projectByUserID?.items;
      if (items.length !== 0) {
        setLength(items.length);
        items.map((item) => {
          setProjectData(item);
        });
      }
    });
  }, []);
  useEffect(() => {
    API.graphql(
      graphqlOperation(projectApprovedByUserID, {
        username: id,
      })
    ).then((response) => {
      const items = response?.data?.projectApprovedByUserID?.items;
      console.log("Projects", items);
      if (items.length !== 0) {
        setApprovedlength(items.length);
        items.map((item) => {
          setProjectApprovedData(item);
        });
      }
    });
  }, []);
  return (
    <>
      <Wrapper>
        <Banner>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <H>Dashboard</H>
            <H3>
              Welcome back, {data.fisrtname} {data.lastname}!
            </H3>
          </div>
          <Button to={`/business/${id}/editprofile/${data.id}/`}>
            <FaUserEdit size="20" />
            Edit Profile
          </Button>
        </Banner>

        <Container2>
          <Card>
            <H2>Total Projects</H2>
            <Value>
              {" "}
              <AnimatedNumber
                value="0"
                style={{
                  fontSize: "40px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
          <Card>
            <H2>Total Content Pieces</H2>
            <Value>0</Value>
          </Card>
          <Card>
            <H2>Pending Approvals</H2>
            <Value to={`/business/${id}/pendinglist/`}>
              <AnimatedNumber
                value={length}
                style={{
                  fontSize: "40px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
          <Card>
            <H2>Arriving Soon</H2>
            <Value to={`/business/${id}/arrivinglist/`}>
              {" "}
              <AnimatedNumber
                value={approvedlength}
                style={{
                  fontSize: "40px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
        </Container2>
        <Hr />
        <Container3>
          <PendingApprovals />
          <ArrivingSoon />
          <CompletedList />
        </Container3>
      </Wrapper>
    </>
  );
};

export default DashboardPage;

const Card = styled.div`
  width: auto;
  height: 100px;
  display: flex;
  padding: 0px;
  margin-right: 30px;
  flex-direction: column;
`;
const Container2 = styled.div`
  display: flex;
  padding: 0px;
  margin: 20px;
  width: 100%;
  gap: 10px;
  background-color: #f1f1f1;
  padding-left: 60px;
  padding-right: 70px;
`;
const Container3 = styled.div`
  display: flex;
  padding: 0px;
  margin: 20px;
  gap: 20px;
  min-height: 400px;
  width: 100%;
  background-color: #f1f1f1;
  padding-left: 40px;
  padding-right: 40px;
  justify-content: space-between;
`;
