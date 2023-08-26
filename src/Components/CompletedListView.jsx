import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

import { IoMdRadioButtonOn } from "react-icons/io";
import GridLoader from "react-spinners/GridLoader";
import { projectApprovedByUserID } from "../graphql/queries";
const Div = styled.div`
  padding: 30px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #debda7;
`;
const Card = styled.div`
  width: 1000px;
  margin-top: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center; ;
`;
const H2 = styled.p`
  font-family: "Mukta", sans-serif;
  font-weight: 700;
  margin: 5px;
  font-size: 1.2rem;
  align-items: center;
  display: flex;
  width: 800px;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
`;
const CompletedList = () => {
  const { id } = useParams();
  const [projects, setProjectData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [articlesList, setArticlesList] = useState();
  async function listProjects() {
    const filter = { accepted: { eq: "Yes" }, delivered: { eq: "Yes" } };
    API.graphql(
      graphqlOperation(projectApprovedByUserID, {
        username: id,
        filter,
      })
    ).then((response) => {
      const items = response?.data?.projectApprovedByUserID?.items;
      console.log(items);
      const newData = items.sort((a, b) =>
        a.createdAt.localeCompare(b.updatedAt)
      );
      setProjectData(newData);
    });
  }
  // useEffect(() => {
  //   listProjects();
  // }, []);
  useEffect(() => {
    setShowLoader(true);
    listProjects();
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);

  return (
    <>
      <Div>
        <H>Completed List</H>
        {projects.map((data) => (
          <Card>
            <IoMdRadioButtonOn size={15} />
            <H2> Project {data.projectname} completed!</H2>
            <NavLink
              to={`/business/${id}/projectarrivingdetails/${data.id}/completeddetails/`}
            >
              Details
            </NavLink>
          </Card>
        ))}
      </Div>
    </>
  );
};

export default CompletedList;

const NavLink = styled(Link)`
  text-decoration: none;
  background-color: #2a2a2a;
  font-family: "Mukta", sans-serif;
  font-weight: 700;
  padding: 0px;
  width: 80px;
  border-radius: 8px;
  color: #fff;
  &:focus {
  }
  &.active {
    color: #000000;
    font-weight: bold;
  }
`;
const H = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 4.5rem;
  letter-spacing: 2px;
  margin-top: 10px;
  margin-bottom: 30px;
`;
