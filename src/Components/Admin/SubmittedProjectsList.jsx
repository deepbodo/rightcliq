import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { listNotes } from "../../graphql/queries";
import SubmitedLis from "./SubmitedLis";
import { IoMdRadioButtonOn } from "react-icons/io";
import GridLoader from "react-spinners/GridLoader";
import Pagination2 from "../Pagination2";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fa9e9f;
  padding: 25px;
  border-radius: 25px;
`;
const Card = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 80px;
  display: flex;
  padding-left: 60px;
  padding-right: 60px;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid #9b9b9b;
  justify-content: space-around;
`;
const H2 = styled.p`
  font-family: "Mukta", sans-serif;
  font-weight: 700;
  margin: 5px;
  font-size: 1.6rem;
  align-items: center;
  display: flex;
  width: 70%;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
`;
const SubmittedProjectsList = () => {
  const { id } = useParams();
  const [projects, setProjectData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  async function listProjects() {
    API.graphql(graphqlOperation(listNotes)).then((response) => {
      const items = response?.data?.listNotes?.items;
      console.log(items);
      const newData = items.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
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
      {/* {showLoader ? (
        <ContainerCenter>
          <GridLoader size={10} color="#7AB8B1" />
        </ContainerCenter>
      ) : ( */}
      <Div2>
        {projects.map((data) => (
          <Card>
            {/* <IoMdRadioButtonOn size={15} /> */}
            <H2> Client {data.companyname} requested a project!</H2>
            <NavLink to={`/admin/${id}/panel/${data.id}/details/`}>
              REVIEW
            </NavLink>
          </Card>
        ))}
      </Div2>

      {/* )} */}
    </>
  );
};

export default SubmittedProjectsList;

const NavLink = styled(Link)`
  text-decoration: none;
  background-color: #2a2a2a;
  font-family: "Mukta", sans-serif;
  font-weight: 700;
  padding: 0px;
  font-size: 1.2rem;
  width: 100px;
  letter-spacing: 1px;
  border-radius: 8px;
  align-items: center;
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
  font-size: 20px;
  letter-spacing: 2px;
  margin-bottom: 14px;
`;
const Div2 = styled.div`
  width: 100%;
`;
