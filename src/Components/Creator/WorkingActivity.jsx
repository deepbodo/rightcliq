import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import {
  listNotes,
  listProjectApproveds,
  projectApprovedByCreatorID,
} from "../../graphql/queries";
import { IoMdRadioButtonOn } from "react-icons/io";
import GridLoader from "react-spinners/GridLoader";
import Pagination2 from "../Pagination2";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fa9e9f;
  padding: 3px;
  align-items: center;
  width: 350px;
  border-radius: 25px;
`;
const Card = styled.div`
  width: 300px;
  margin: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center; ;
`;
const H2 = styled.p`
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  margin: 5px;
  align-items: center;
  display: flex;
  width: 280px;
  font-size: 15px;
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
const View = styled(Link)`
  background-color: #292929;
  padding: 4px;
  height: 35px;
  font-weight: 600;
  width: 100px;
  align-items: center;
  text-align: center;
  margin: 6px;
  font-size: 18px;
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
`;
const WorkingActivity = () => {
  const { id } = useParams();
  const [projects, setProjectData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [articlesList, setArticlesList] = useState();
  async function listProjects() {
    const filter = { accepted: { ne: "Yes" } };
    API.graphql(
      graphqlOperation(projectApprovedByCreatorID, {
        creatorId: id,
        filter,
        limit: 6,
      })
    ).then((response) => {
      const items = response?.data?.projectApprovedByCreatorID?.items;
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
          <GridLoader size={10} color="#00e6e6" />
        </ContainerCenter>
      ) : ( */}
      <Div>
        <H>WORKING ACTIVITY</H>
        {projects.map((data) => (
          <Card>
            <IoMdRadioButtonOn size={15} />
            <H2> Project {data.projectname} has been assigned to you!</H2>
            <NavLink
              to={`/creatoruser/details/${id}/dashboard/projectreview/${data.id}/`}
            >
              Review
            </NavLink>
          </Card>
        ))}
        <View to={`/creatoruser/details/${id}/dashboard/assignmentlist/`}>
          View All
        </View>
      </Div>
      {/* )} */}
    </>
  );
};

export default WorkingActivity;

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
  font-size: 20px;
  letter-spacing: 2px;
  margin-bottom: 14px;
`;
