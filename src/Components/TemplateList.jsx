import React, { useEffect, useState, CSSProperties, onChange } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { graphqlOperation } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import Pagination2 from "./Pagination2";
import { v4 as uuid } from "uuid";
import { Storage, API } from "aws-amplify";
import { listCategories, templateByCategoryID } from "../graphql/queries";
import PregressiveImage from "./ProgressiveImage";
import Hero from "../Images/hero.png";
import Load from "../Images/load.webp";
import { IoConstructOutline } from "react-icons/io5";
import TemplateCard from "./TemplateCard";
const Container = styled.div`
  background-color: #f1f1f1;
  display: flex;
  padding: 0px;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`;
const P = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 35px;
  z-index: 1;
  height: 25px;
  margin-top: 6px;
  font-size: 1.1rem;
  text-align: left;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 3rem;
  letter-spacing: 2px;
  margin-top: 10px;
  margin-bottom: 40px;
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
  width: 100%;
`;
const Image = styled.img`
  width: 250px;
  height: 180px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Cover = styled.div`
  padding: 0px;
  height: 100%;
  width: 100%;
`;
const Wrapper = styled.div`
  background-color: #f1f1f1;
  display: flex;
  height: 100%;
  padding: 6px;
  width: 100%;
  flex-direction: column;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const TemplateList = () => {
  const { id, categoryId, name } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const todoData = await API.graphql(
        graphqlOperation(templateByCategoryID, {
          categoryId: `${categoryId}`,
        })
      );
      let todos = todoData.data.templateByCategoryID.items;
      todos = await Promise.all(
        todos.map(async (todo) => {
          const imageKey = await Storage.get(todo.image);
          console.log(imageKey);
          todo.image = imageKey;
          return todo;
        })
      );
      console.log(todos);
      setPosts(todos);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);
  return (
    <>
      {showLoader ? (
        <ContainerCenter>
          {" "}
          <GridLoader size={10} color="#00e6e6" />
        </ContainerCenter>
      ) : (
        <Container>
          <H>Templates</H>
          <Cover>
            <Wrapper>
              <TemplateCard
                posts={currentPosts}
                loading={loading}
                data={id}
                data1={categoryId}
                data2={name}
              />
              <Pagination2
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
              />
            </Wrapper>
          </Cover>
        </Container>
      )}
    </>
  );
};

export default TemplateList;
