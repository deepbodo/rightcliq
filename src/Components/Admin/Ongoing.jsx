import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { listNotes, listProjectApproveds } from "../../graphql/queries";
import SubmitedLis from "./SubmitedLis";
import { IoMdRadioButtonOn } from "react-icons/io";
import GridLoader from "react-spinners/GridLoader";
import Pagination2 from "../Pagination2";
const Div = styled.div`
  padding: 30px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #e9e9e9;
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
const Container = styled.div`
  display: flex;
  padding: 18px;
  width: 100%;
`;

const Ongoing = () => {
  const { id } = useParams();
  const [projects, setProjectData] = useState([]);
  const [data, setData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  async function listProjects() {
    API.graphql(
      graphqlOperation(listProjectApproveds, {
        filter: { delivered: { ne: "Yes" } },
        sortDirection: "AESC",
      })
    ).then((response) => {
      const items = response?.data?.listProjectApproveds?.items;
      console.log(items);
      // setProjectData(items);
      const newData = items.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setData(newData);
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
  // useEffect(()=>{

  // },[])
  return (
    <>
      <Div>
        <H>Ongoing Projects</H>
        {showLoader ? (
          <ContainerCenter>
            <GridLoader size={10} color="#7AB8B1" />
          </ContainerCenter>
        ) : (
          <div>
            {data.map((datas) => (
              <Card>
                <IoMdRadioButtonOn size={15} />
                <H2>
                  {" "}
                  Project {datas.projectname} is ongoing under Creator{" "}
                  {datas.creatorName}
                  <span>
                    {datas.creatorId === "0" ? <Numb></Numb> : <div></div>}
                  </span>
                  {datas.demo && (
                    <span>{datas.demo ? <Numb2></Numb2> : <div></div>}</span>
                  )}
                </H2>
                <NavLink to={`/admin/${id}/panel/${datas.id}/ongoingdetails/`}>
                  Review
                </NavLink>
              </Card>
            ))}
          </div>
        )}
      </Div>
    </>
  );
};

export default Ongoing;

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
const Numb = styled.div`
  background-color: red;
  width: 8px;
  height: 8px;
  align-items: center;
  text-align: center;
  display: flex;
  margin-left: 3px;
  margin-top: -5px;
  border-radius: 100%;
`;
const Numb2 = styled.div`
  background-color: red;
  width: 8px;
  height: 8px;
  align-items: center;
  text-align: center;
  display: flex;
  margin-left: 3px;
  margin-top: -5px;
  border-radius: 100%;
`;
