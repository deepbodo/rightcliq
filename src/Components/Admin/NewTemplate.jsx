import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation, Storage } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import { FaUserEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import {
  categoryDetailByCategoryID,
  listCategories,
  projectByProjectID,
  templateByCategoryID,
} from "../../graphql/queries";
import { Button as button } from "react-bootstrap";
import uuid from "react-uuid";
import {
  createCategories,
  createProjectApproved,
  createTemplate,
  deleteNote,
  updateCategories,
} from "../../graphql/mutations";
import UpdateCategoryImage from "./UpdateCategoryImage";
const Container = styled.div`
  padding: 20px;
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  background-color: #f1f1f1;
`;
const Left = styled.div`
  width: 80%;
`;
const Right = styled.div`
  width: 20%;
  display: flex;
  height: auto;
  flex-direction: column;
`;
const Box = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 3.5rem;
  letter-spacing: 1px;
  margin-top: 20px;
  margin-bottom: 00px;
  margin-left: 25px;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
`;
const Div6 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
`;
const Label2 = styled.label`
  width: 30%;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  color: #676767;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;
const Label = styled.label`
  width: 30%;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  color: #676767;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;
const Input = styled.input.attrs({ type: "checkbox" })`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: red;
  border-color: purple;
  border-radius: 3px;
  transition: all 150ms;
`;
const Input2 = styled.input`
  border-radius: 10px;
  height: auto;
  margin: 10px;
  width: 410px;
  border: none;
  padding: 3px;
  padding-left: 10px;
  font-size: 1.3rem;
  text-align: left;
  background-color: #9b9b9b;
`;
const Input3 = styled.textarea`
  border-radius: 10px;
  height: 200px;
  margin: 8px;
  width: 410px;
  border: none;
  padding-left: 10px;
  display: flex;
  padding: 3px;
  font-size: 1.3rem;
  text-align: left;
  background-color: #9b9b9b;
`;
const Div2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
`;
const Div3 = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  width: 100%;
  padding: 20px;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const P = styled.p`
  color: #007acc;
  font-weight: 600;
  margin-left: 5px;
`;

const NewTemplate = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [image, setImage] = useState();
  const [categoryId, setCategoryId] = useState();
  const [templatename, setTemplateName] = useState();
  const [image1, setImage1] = useState();
  const [templateDetail, setTemplateDetail] = useState();

  const fetchCatagories = async () => {
    //fetch the recipes from the server
    const todoData = await API.graphql(graphqlOperation(listCategories));
    let todos = todoData.data.listCategories.items;
    // for all todos get the pre-signURL and store in images field
    setData(todos);
    console.log(data);
  };
  useEffect(() => {
    fetchCatagories();
  }, []);
  async function newTemplate(event) {
    const details = {
      templateId: uuid(),
      categoryId: categoryId,
      templatename: templatename,
      image: image,
      image1: image1,
      templatedetail: templateDetail,
    };
    event.preventDefault();
    console.log(details);
    const newTodo = await API.graphql({
      query: createTemplate,
      variables: { input: details },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log("new Template", newTodo);
    notify();
    nav(`/admin/${id}/panel/editbusiness/`);
  }
  ////////////////////////////////////////////////!!!!!!!!!!!!//////////////////////////////////////////////////////////////////
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await Storage.put(`TemplateImage/${file.name}`, file, {
      contentType: file.type,
    });
    setImage(result.key);
    setLoading(false);
  };
  const handleFileChange2 = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    setLoading2(true);
    const result = await Storage.put(`TemplateImage1/${file.name}`, file, {
      contentType: file.type,
    });
    setImage1(result.key);
    setLoading2(false);
  };
  const notify = () => {
    toast.success("Template Created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <>
      <div>
        <Box>
          {" "}
          <H>Add New Template</H>
        </Box>
        <Container>
          <Left>
            <Div6>
              <Label2>Template Image</Label2>
              <Div5>
                {" "}
                <Form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleFileChange} />
                  <button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                  {image ? <P>Uploaded</P> : <p></p>}
                </Form>
              </Div5>
            </Div6>
            <Div6>
              <Label2>Template Detail Image</Label2>
              <Div5>
                {" "}
                <Form onSubmit={handleSubmit2}>
                  <input type="file" onChange={handleFileChange2} />
                  <button variant="primary" type="submit" disabled={loading2}>
                    {loading2 ? "Uploading..." : "Upload"}
                  </button>
                  {image1 ? <P>Uploaded</P> : <p></p>}
                </Form>
              </Div5>
            </Div6>
            <Div>
              <Label> Template Name</Label>
              <Input2
                type="text"
                name="templatename"
                variation="quiet"
                required
                onChange={(event) => setTemplateName(event.target.value)}
              />
            </Div>
            <Box>
              <Label>Select Category</Label>{" "}
              <Select
                name="industry"
                variation="quiet"
                required
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <option>None</option>
                {data.map((datas) => (
                  <option value={datas.categoryId}>{datas.categoryname}</option>
                ))}
              </Select>
            </Box>
            <Div2>
              <Label>Template Detail</Label>
              <Input3
                type="text"
                variation="quiet"
                required
                onChange={(event) => setTemplateDetail(event.target.value)}
              />
            </Div2>
          </Left>
          <Right></Right>
        </Container>
        <Div3>
          <Button onClick={newTemplate}>SAVE</Button>
        </Div3>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* )} */}
    </>
  );
};

export default NewTemplate;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 100px;
  padding: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #292929;
  font-size: 1.2rem;
  border: none;
  font-weight: 500;
  margin: auto;
  border-radius: 10px;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
const Image = styled.img`
  width: 250px;
  height: 250px;
  align-items: center;
  border: 2px solid #000;
  border-radius: 10px;
`;
const Div5 = styled.div`
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: center;
  width: 600px;
`;
const Button2 = styled(Link)`
  color: #fff;
  width: 200px;
  height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 20px;
  margin-bottom: 30px;
  margin-left: 50px;
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
const Select = styled.select`
  font-size: 25px;
  width: 410px;
  background-color: #9b9b9b;
  padding-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
`;
