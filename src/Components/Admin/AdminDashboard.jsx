import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import img from "./Images/banner.png";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { FaUserEdit } from "react-icons/fa";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  dataByQuerryID,
  listNotes,
  listProjectApproveds,
} from "../../graphql/queries";
import AnimatedNumber from "animated-number-react";
import { FaPercentage } from "react-icons/fa";
import SubmittedProjects from "./SubmittedProjects";
import OngoingProjects from "../OngoingProjects";
import CompletedListA from "./CompletedListA";
const Container = styled.div`
  display: flex;
  padding: 18px;
  width: 100%;
  justify-content: space-between;
`;
const Hr = styled.hr`
  width: 100%;
  margin-top: 80px;
  border: none;
  height: 4px;
  background-color: #d0d0d0;
`;
const Div = styled.div`
  margin: 0px;
  text-align: left;
  display: inline-flex;
  width: 15rem;
  padding-left: 1px;
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
  justify-content: space-between;
`;
const Wrapper = styled.div`
  height: auto;
  align-items: center;
  display: flex;
  background-color: #f1f1f1;
  flex-direction: column;
`;
const Banner = styled.div`
  border-radius: 8px;
  height: 200px;
  margin-top: 10px;
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
  font-family: inter;
  font-family: "Montserrat", sans-serif;
  font-size: 4.9rem;
  letter-spacing: 2px;
  margin-bottom: -40px;
`;
const H3 = styled.h2`
  color: #717171;
  font-weight: 370;
  font-size: 2rem;
  font-family: "Inter", sans-serif;
`;
const H2 = styled.p`
  color: #8e8b8b;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 19px;
  font-size: 25px;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
  text-decoration: underline;
  text-decoration-color: #646464;
  text-underline-offset: 8px;
  text-decoration-thickness: 0.1em;
`;
const Value = styled(Link)`
  color: #000;
  text-decoration: none;
  font-weight: bold;
  margin-top: -10px;
  margin-left: 30px;
  font-size: 65px;
  font-family: sans-serif;
`;
const Button = styled(Link)`
  color: #fff;
  width: 160px;
  height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 20px;
  margin-top: 0px;
  background-color: #2a2a2a;
  padding-left: 20px;
  border: none;
  font-size: 1rem;
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
const AdminDashboard = () => {
  const { id } = useParams();
  const [user, updateUser] = useState({});
  const [data, setData] = useState({});
  const [projects, setProjectData] = useState({});
  const [ongoingProjects, setOngoingProjectData] = useState({});
  const [completed, setCompletedData] = useState({});
  const [value, setValue] = useState();
  useEffect(() => {
    API.graphql(
      graphqlOperation(dataByQuerryID, {
        QId: id,
      })
    ).then((response) => {
      const items = response?.data?.dataByQuerryID?.items;
      if (items.length !== 0) {
        items.map((item) => {
          setData(item);
        });
      }
    });
  }, []);
  useEffect(() => {
    API.graphql(graphqlOperation(listNotes)).then((response) => {
      const items = response?.data?.listNotes?.items;
      setProjectData(items);
    });
    API.graphql(graphqlOperation(listProjectApproveds)).then((response) => {
      const items = response?.data?.listProjectApproveds?.items;
      setOngoingProjectData(items);
    });
    const filter = { accepted: { eq: "Yes" }, delivered: { eq: "Yes" } };
    API.graphql(graphqlOperation(listProjectApproveds, { filter })).then(
      (response) => {
        const items = response?.data?.listProjectApproveds?.items;
        setCompletedData(items);
      }
    );
  }, []);

  return (
    <>
      <Wrapper>
        <Banner>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <H>Dashboard</H>
            <H3>Welcome back, Admin!</H3>
          </div>
          <Button to={`/admin/${id}/panel/editbusiness/`}>
            <FaUserEdit size="20" />
            Edit Business
          </Button>
          <Button to={`/admin/${id}/panel/editprofile/${data.id}/`}>
            <FaUserEdit size="20" />
            Edit Creator
          </Button>
          <Button to={`/admin/${id}/panel/editprofile/${data.id}/`}>
            <FaUserEdit size="20" />
            Edit Profile
          </Button>
        </Banner>
        <Container2>
          <Card>
            <H2>Ongoing Project</H2>
            <Value to={`/admin/${id}/panel/343fghzsvxfd ongoings/`}>
              {" "}
              <AnimatedNumber
                value={ongoingProjects.length}
                style={{
                  fontSize: "45px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
          <Card>
            <H2>Completed Project</H2>
            <Value to={`/admin/${id}/panel/343fghzsvxfd complted/`}>
              {" "}
              <AnimatedNumber
                value={completed.length}
                style={{
                  fontSize: "45px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
          <Card>
            <H2>Pending Approvals</H2>
            <Value to={`/admin/${id}/panel/343fghzsvxfd p e n d  i ngs/`}>
              <AnimatedNumber
                value={projects.length}
                style={{
                  fontSize: "45px",
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
            <Value>
              {" "}
              <AnimatedNumber
                value="0"
                style={{
                  fontSize: "45px",
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
        {/* <Container3>
          <Linked to={`/admin/${id}/panel/`}>Submitted Projects</Linked>
          <Linked>For Remark</Linked>
          <Linked>Cancelled</Linked>
        </Container3> */}
        <Container3>
          <SubmittedProjects />
          <OngoingProjects />
          <CompletedListA />
        </Container3>
      </Wrapper>
    </>
  );
};

export default AdminDashboard;

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
  margin: 4px;
  width: 100%;
  background-color: #f1f1f1;
  padding-left: 70px;
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
const Linked = styled(Link)`
  height: 40px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  background-color: rgba(129, 205, 252, 0.5);
  width: 350px;
  margin-top: -8px;
  text-align: center;
  letter-spacing: 1px;
  border-radius: 8px;
  justify-content: center;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  font-family: "Mukta", sans-serif;
  align-items: center;
`;
