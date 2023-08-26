import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import AnimatedNumber from "animated-number-react";
import { listCategories, listTemplates } from "../../graphql/queries";
import CategoryList from "./CategoryList";
import { FaUserEdit } from "react-icons/fa";
import TemplateListAv from "./TemplateListAv";
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4.9rem;
  letter-spacing: 2px;
  margin-bottom: -40px;
`;
const H3 = styled.h2`
  color: #717171;
  font-weight: 370;
  font-size: 2rem;
`;
const Banner = styled.div`
  border-radius: 8px;
  height: 200px;
  margin-top: -10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 5px;
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
const H2 = styled.p`
  color: #8e8b8b;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 19px;
  font-size: 25px;
  font-family: "Mukta", sans-serif;
  text-decoration: underline;
  text-decoration-color: #646464;
  text-underline-offset: 8px;
  text-decoration-thickness: 0.1em;
`;
const Value = styled.h2`
  color: #000;
  font-weight: bold;
  margin-top: -10px;
  margin-left: 30px;
  font-size: 65px;
  font-family: sans-serif;
`;
const Card = styled.div`
  width: auto;
  height: 100px;
  display: flex;
  padding: 0px;
  margin-right: 30px;
  flex-direction: column;
`;
const Wrapper = styled.div`
  height: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
`;
const Button = styled(Link)`
  color: #fff;
  width: 180px;
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
const EditBusiness = () => {
  const { id } = useParams();
  const [datas, setData] = useState([]);
  const [templates, setTemplates] = useState([]);
  const fetchCatagories = async () => {
    //fetch the recipes from the server
    const todoData = await API.graphql(graphqlOperation(listCategories));
    let todos = todoData.data.listCategories.items;
    // for all todos get the pre-signURL and store in images field
    // todos = await Promise.all(
    //   todos.map(async (todo) => {
    //     const imageKey = await Storage.get(todo.image);
    //     console.log(imageKey);
    //     todo.image = imageKey;
    //     return todo;
    //   })
    // );
    setData(todos);
    console.log(datas);
  };
  const fetchTemplates = async () => {
    //fetch the recipes from the server
    const todoData = await API.graphql(graphqlOperation(listTemplates));
    let todos = todoData.data.listTemplates.items;
    setTemplates(todos);
    console.log(datas);
  };
  useEffect(() => {
    fetchTemplates();
    fetchCatagories();
  }, []);
  return (
    <>
      <Wrapper>
        <Banner>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <H>Dashboard</H>
            <H3>Welcome back, Admin!</H3>
          </div>
          <Button to={`/admin/${id}/panel/editbusiness/newCategory/`}>
            <FaUserEdit size="20" />
            Add Category
          </Button>
          <Button to={`/admin/${id}/panel/editbusiness/newTemplate/`}>
            <FaUserEdit size="20" />
            Add Template
          </Button>
        </Banner>
        <Container2>
          <Card>
            <H2>Total Categories</H2>
            <Value>
              {" "}
              <AnimatedNumber
                value={datas.length}
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
            <H2>Total Templates</H2>
            <Value>
              {" "}
              <AnimatedNumber
                value={templates.length}
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
        <Container3>
          <CategoryList />
          <TemplateListAv />
        </Container3>
      </Wrapper>
    </>
  );
};

export default EditBusiness;
const Hr = styled.hr`
  width: 100%;
  margin-top: 70px;
  border: none;
  height: 4px;
  background-color: #d0d0d0;
`;
const Container3 = styled.div`
  display: flex;
  padding: 0px;
  margin: 50px;
  width: 100%;
  padding-left: 70px;
  padding-right: 70px;
  justify-content: space-between;
  background-color: #f1f1f1;
`;
