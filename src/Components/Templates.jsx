import React, { useEffect, useState, CSSProperties, onChange } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { graphqlOperation } from "aws-amplify";
import { listCategories, projectByUserID } from "../graphql/queries";
import { v4 as uuid } from "uuid";
import { Storage, API } from "aws-amplify";
import { createCategories } from "../graphql/mutations";
import Pagination from "./Pagination";
import ProgressiveImage from "../Components/ProgressiveImage";
import Load from "../Images/load.webp";
import GridLoader from "react-spinners/GridLoader";
const Container = styled.div`
  background-color: #f1f1f1;
  display: flex;
  padding: 20px;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`;
const P = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 40px;
  z-index: 1;
  height: 28px;
  font-size: 1.4rem;
  text-align: left;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Hr = styled.div`
  background-color: rgba(129, 205, 252, 0.5);
  height: 5px;
  margin-top: -10px;
  width: 100%;
`;
const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 90%;
`;
const Image = styled.img`
  width: 250px;
  height: 180px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Cover = styled.div`
  padding: 15px;
  height: 100%;
  width: 100%;
`;
const Wrapper = styled.div`
  background-color: #f1f1f1;
  display: flex;
  height: 100%;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;
const Templates = () => {
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [imgData, setImgData] = useState();
  const [showPerPage, setShowPerPage] = useState(8);
  const [audioURL, setAudioURL] = useState("");
  const [datas, setData] = useState([]);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  const fetchCatagories = async () => {
    //fetch the recipes from the server
    const todoData = await API.graphql(graphqlOperation(listCategories));
    let todos = todoData.data.listCategories.items;
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
    console.log(datas);
  };
  useEffect(() => {
    fetchCatagories();
  }, []);
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);
  return (
    <>
      {/* {showLoader ? (
        <ContainerCenter>
          {" "}
          <GridLoader size={10} color="#00e6e6" />
        </ContainerCenter>
      ) : ( */}
      <Container>
        {" "}
        <H>Create Project</H>
        <Cover>
          {" "}
          <Wrapper>
            {" "}
            <Div>
              {datas.slice(pagination.start, pagination.end).map((data) => {
                return (
                  <Card>
                    {" "}
                    {/* <Image src={data.image} /> */}
                    <ProgressiveImage
                      imgSrc={data.image}
                      previewSrc={data.image}
                      width={250}
                      height={180}
                    />
                    <NavLink
                      to={`/business/${id}/templates/${data.categoryId}/${data.categoryname}`}
                    >
                      <Title>{data.categoryname}</Title>
                    </NavLink>
                  </Card>
                );
              })}
            </Div>
            <Divs>
              {" "}
              <Pagination
                showPerPage={showPerPage}
                onPaginationChange={onPaginationChange}
                total={datas.length}
              />
            </Divs>
          </Wrapper>
        </Cover>
      </Container>
      {/* )} */}
    </>
  );
};

export default Templates;

const Card = styled.div`
  width: 250px;
  height: 180px;
  margin: auto;
  text-align: center;
`;
const Divs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 3.5rem;
  letter-spacing: 2px;
  margin-top: 5px;
  margin-bottom: 30px;
`;
const Title = styled.p`
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: -7px;
  text-transform: uppercase;
  background-color: #2a2a2a;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: #8fd8cf;
  background-color: #2a2a2a;
`;
