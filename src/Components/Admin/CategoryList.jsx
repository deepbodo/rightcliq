import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { listCategories, listNotes } from "../../graphql/queries";
import SubmitedLis from "./SubmitedLis";
import { IoMdRadioButtonOn } from "react-icons/io";
import GridLoader from "react-spinners/GridLoader";
import Pagination2 from "../Pagination2";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #8bd1c9;
  padding: 25px;
  border-radius: 25px;
`;
const Card = styled.div`
  width: 300px;
  margin: 10px;
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
  align-items: center;
  display: flex;
  width: 280px;
  letter-spacing: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
`;

const CategoryList = () => {
  const { id } = useParams();
  const [projects, setProjectData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  async function listProjects() {
    API.graphql(graphqlOperation(listCategories)).then((response) => {
      const items = response?.data?.listCategories?.items;
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
      <Div>
        <H>Available Categories</H>
        {projects.map((data) => (
          <Card>
            {/* <IoMdRadioButtonOn size={15} /> */}
            <H2> {data.categoryname} </H2>
            <NavLink to={`/admin/${id}/panel/editbusiness/${data.categoryId}/`}>
              REVIEW
            </NavLink>
          </Card>
        ))}
      </Div>
      {/* )} */}
    </>
  );
};

export default CategoryList;

const NavLink = styled(Link)`
  text-decoration: none;
  background-color: #2a2a2a;
  font-family: "Mukta", sans-serif;
  font-weight: 700;
  padding: 2px;
  font-size: 0.8rem;
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
  font-size: 22px;
  letter-spacing: 1px;
  margin-bottom: 14px;
  text-transform: uppercase;
`;
const Div2 = styled.div`
  width: 100%;
`;
