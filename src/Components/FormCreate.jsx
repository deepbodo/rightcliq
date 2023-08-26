import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import "../Components/Category/Input.css";
import GridLoader from "react-spinners/GridLoader";
import {
  listCategories,
  listNotes,
  getUserDetail,
  dataByQuerryID,
} from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import {
  createNote as createNoteMutation,
  createNotification,
  deleteNote as deleteNoteMutation,
} from "../graphql/mutations";
import { Auth, Hub } from "aws-amplify";

import { Routes, Route, Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #f1f1f1;
`;
const Input = styled.input`
  border-radius: 10px;
  height: 40px;
  margin: 10px;
  width: 400px;
  border: 0.5px solid;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  background-color: #fff;
`;
const Left = styled.div`
  width: 50%;
  padding-left: 1rem;
  align-items: center;
  background-color: #f1f1f1;
`;
const Right = styled.div`
  width: 50%;
  padding-left: 1rem;
  align-items: center;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const P = styled.p`
  margin-bottom: -15px;
  height: 10px;
  font-family: "Montserrat", sans-serif;
  padding: 0;
  background-color: #fff;
  width: 130px;
  margin-left: 35px;
  z-index: 1;
  position: relative;
  text-align: center;
`;
const Div = styled.div`
  margin: 20px;
`;
const Select = styled.select`
  border-radius: 10px;
  height: 50px;
  margin: 14px;
  width: 400px;
  border: 0.5px solid;
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  background-color: #fff;
`;
const options = [
  {
    label: "None",
    value: "na",
  },
  {
    label: "IT",
    value: "it",
  },
  {
    label: "Content Writing",
    value: "content",
  },
  {
    label: "Ecommerce",
    value: "ecom",
  },
  {
    label: "Marketting",
    value: "market",
  },
];

const Textarea = styled.textarea`
  border-radius: 10px;
  height: 250px;
  margin-top: 14px;
  width: 400px;
  border: 0.5px solid;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  background-color: #fff;
`;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 200px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #292929;
  text-decoration: none;
  font-size: 1.3rem;
  border: none;
  font-weight: 500;
  border-radius: 15px;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
const Div2 = styled.div`
  align-items: center;
  text-align: center;
`;
const Form = styled.form`
  width: 100%;
  background-color: #f1f1f1;
`;
const Div3 = styled.div`
  display: none;
`;
const FormCreate = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [projectId, setProjectId] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [user, updateUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  // const x = id;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [category, setCategory] = useState([]);
  const [userData, setUserData] = useState({});
  const [companyname, setCompany] = useState();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    username: id,
    projectname: "",
    industry: "",
    moredetail: "",
    templateId: "",
    preference: "",
    companyname: "",
    category: "",
    firstname: ``,
    lastname: ``,
  });
  const [pId, setpId] = useState();

  const fetchCatagories = async () => {
    //fetch the recipes from the server
    const todoData = await API.graphql(graphqlOperation(listCategories));
    let todos = todoData.data.listCategories.items;
    // for all todos get the pre-signURL and store in images field
    setCategory(todos);
    console.log(category);
  };
  useEffect(() => {
    fetchCatagories();
  }, []);
  const fetchUserData = async () => {
    //fetch the recipes from the server
    API.graphql(
      graphqlOperation(dataByQuerryID, {
        QId: id,
      })
    ).then((response) => {
      console.log(response);
      const items = response?.data?.dataByQuerryID?.items;
      if (items.length !== 0) {
        items.map((item) => {
          setUserData(item);
          setCompany(item.companyname);
        });
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const createProject = async (event) => {
    event.preventDefault();
    const details = {
      username: id,
      projectname: orderDetails.projectname,
      industry: orderDetails.industry,
      moredetail: orderDetails.moredetail,
      templateId: orderDetails.templateId,
      preference: orderDetails.preference,
      companyname: companyname,
      category: orderDetails.category,
      firstname: orderDetails.firstname,
      lastname: orderDetails.lastname,
    };
    const newTodo = await API.graphql(
      graphqlOperation(createNoteMutation, { input: details })
    );
    console.log(newTodo);
    let todos = newTodo?.data?.createNote;
    if (todos) {
      setpId(todos.id);
    }

    newNotification();
    setNaviagte(todos);
  };
  async function newNotification() {
    const details = {
      QId: "577a6340-d615-44be-88ce-143840b94757",
      messagetype: "new project",
      message: "New Project Waiting for approval, ID:" + `${pId}`,
      pId: pId,
    };
    const newTodo = API.graphql(
      graphqlOperation(createNotification, { input: details })
    );
    console.log(newTodo);
  }
  function setNaviagte(todos) {
    var pId = "";
    if (todos) {
      pId = todos.id;
      console.log(pId);
      nav(`/business/${id}/create/summary/${pId}/`);
    } else {
      console.log("no todos");
    }
  }

  // useEffect(() => {
  //   checkUser();
  // }, []);
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };
  function handleFileSelection(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }
  function handleFileRemoval() {
    setSelectedFile(null);
  }
  const handleSubmit = async (event) => {};
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
        <Form onSubmit={createProject}>
          <Container>
            <Left>
              <div class="input-container">
                <input
                  type="text"
                  required
                  onChange={(event) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      projectname: event.target.value,
                    }))
                  }
                />
                <label>Project Name*</label>
              </div>
              <div class="input-container">
                <input
                  type="text"
                  required
                  onChange={(event) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      preference: event.target.value,
                    }))
                  }
                />
                <label>Preference*</label>
              </div>
              <div class="input-container">
                <input
                  type="text"
                  required
                  defaultValue={userData.companyname}
                  onChange={(event) =>
                    setOrderDetails(() => ({
                      companyname: event.target.value,
                    }))
                  }
                />
                <label>Company Name</label>
              </div>

              <div class="input-container">
                <input
                  type="text"
                  required
                  onChange={(event) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      templateId: event.target.value,
                    }))
                  }
                />
                <label>Template Code</label>
              </div>
              <div class="input-container">
                <textarea
                  type="text"
                  placeholder="Use 0 if you have not selected a template!"
                  onChange={(event) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      moredetail: event.target.value,
                    }))
                  }
                />
                <label>More Details</label>
              </div>
              {/* <div class="input-container">
                <input type="text" required="" />
                <label>Template Code</label>
              </div> */}
            </Left>
            <Right>
              <div class="input-container">
                <select
                  name="industry"
                  variation="quiet"
                  required
                  onChange={(event) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      industry: event.target.value,
                    }))
                  }
                >
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
                <label>Industry*</label>
              </div>
              <div class="input-container">
                <select
                  name="industry"
                  variation="quiet"
                  required
                  onChange={(event) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      category: event.target.value,
                      firstname: userData.fisrtname,
                      lastname: userData.lastname,
                    }))
                  }
                >
                  <option>None</option>
                  {category.map((category) => (
                    <option value={category.categoryname}>
                      {category.categoryname}
                    </option>
                  ))}
                </select>
                <label>Select Project Category*</label>
              </div>
              <DropBox>
                <Title>Upload Final Version</Title>
                <Form2>
                  <input type="file" onChange={handleFileSelection} />
                  {/* 
                  {file ? (
                    <Button2>Uploaded</Button2>
                  ) : ( */}
                  <Button2 variant="primary" type="submit">
                    {" "}
                    {loading ? "Uploading..." : "Upload"}
                  </Button2>
                  {/* )} */}
                  <button onClick={handleFileRemoval}>&#9746;</button>
                </Form2>
              </DropBox>
              <Div2>
                <Button>SUBMIT</Button>
              </Div2>
            </Right>
          </Container>
        </Form>
      )}
    </>
  );
};

export default FormCreate;
const Form2 = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  height: 180px;
  justify-content: center;
  gap: 5px;
  flex-direction: column;
`;
const DropBox = styled.div`
  width: 450px;
  background-color: #79b7b0;
  height: 240px;
  flex-direction: column;
  font-weight: 600;
  display: flex;
  gap: 0px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  font-family: "Ubuntu", sans-serif;
  letter-spacing: 1px;
  margin: 10px;
`;
const Button2 = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 150px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #292929;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  border-radius: 10px;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
const Title = styled.h2`
  text-transform: uppercase;
  margin-top: 40px;
`;
