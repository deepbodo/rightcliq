import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation, Storage } from "aws-amplify";

import GridLoader from "react-spinners/GridLoader";
import { FaUserEdit } from "react-icons/fa";
import {
  categoryDetailByCategoryID,
  projectByProjectID,
  templateByCategoryID,
} from "../../graphql/queries";
import { createProjectApproved, deleteNote } from "../../graphql/mutations";
const Container = styled.div`
  padding: 20px;
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  background-color: #f1f1f1;
`;
const Left = styled.div`
  width: 70%;
`;
const Right = styled.div`
  width: 30%;
  display: flex;
  height: auto;
  flex-direction: column;
`;
const Box = styled.div`
  padding: 20px;
  display: flex;
  margin-top: -20px;
  margin-bottom: -80px;
  background-color: #f1f1f1;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4rem;
  letter-spacing: 1px;
  margin-top: 20px;
  margin-bottom: 40px;
  margin-left: 25px;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
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
  width: 400px;
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
  margin: 10px;
  width: 400px;
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
const CategoryDetail = () => {
  const nav = useNavigate();
  const { id, categoryId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState("");
  const [imagee, setImage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await API.graphql(
        graphqlOperation(categoryDetailByCategoryID, {
          categoryId: categoryId,
        })
      );
      const getItem = data?.data?.categoryDetailByCategoryID?.items[0];
      console.log(getItem);
      setData(getItem);
      const imagex = getItem.image;
      console.log(imagex);
      const url = await Storage.get(imagex);
      setImage(url);
      console.log(url);
    };
    fetchData();
    // const getDetails = async () => {
    //   await API.graphql(
    //     graphqlOperation(categoryDetailByCategoryID, {
    //       categoryId: categoryId,
    //     })
    //   ).then((response) => {
    //     const items = response?.data?.categoryDetailByCategoryID?.items;
    //     console.log(items[0]);
    //     setData(items[0]);
    //     // if (items.length !== 0) {
    //     //   items.map(async (item) => {
    //     //     setData(item);
    //     //     const imageKey = await Storage.get(item.image);
    //     //     console.log(imageKey);
    //     //     setImage(imageKey);
    //     //   });
    //     //   console.log(data);
    //     // }
    //   });
    //   const url = await Storage.get(data.image);
    //   setImage(url);
    //   console.log(url);
    // };
    // // async function getImage() {
    // //   const url = await Storage.get(data.image);
    // //   setImage(url);
    // //   console.log(url);
    // // }
    // getDetails();
    // getImage();
  }, []);
  useEffect(() => {
    API.graphql(
      graphqlOperation(templateByCategoryID, {
        categoryId: categoryId,
      })
    ).then((response) => {
      const items = response?.data?.templateByCategoryID?.items;
      setTemplate(items.length);
    });
  }, []);

  return (
    <>
      {/* {showLoader ? (
        <ContainerCenter>
          <GridLoader size={10} color="#7AB8B1" />
        </ContainerCenter>
      ) : ( */}
      <div>
        <Box>
          {" "}
          <H>Category Details</H>
        </Box>
        <Container>
          <Left>
            <Div>
              <Label> Category Image</Label>
              <Div5>
                {" "}
                <Image src={imagee} />
              </Div5>
            </Div>
            <Div>
              <Label> Category Name</Label>
              <Input2 value={data.categoryname} />
            </Div>
            <Div>
              <Label> Category Price</Label>
              <Input2 value={data.categoryprice} />
            </Div>
            <Div>
              <Label>Number of Templates</Label>
              <Input2 value={template} />
            </Div>
            <Div2>
              <Label>Category Detail</Label>
              <Input3 value={data.categorydetail} />
            </Div2>
          </Left>
          <Right>
            <Button2 to={`/admin/${id}/panel/editbusiness/${categoryId}/edit/`}>
              <FaUserEdit size="20" />
              Edit Category
            </Button2>
            {/* <Button2 to={`/admin/${id}/panel/editbusiness/`}>
              <FaUserEdit size="20" />
              Add New Template
            </Button2> */}
          </Right>
        </Container>
        <Div3>
          {/* <Button onClick={approveProject}>APPROVE & ASSIGN</Button>
          <Button onClick={declineProject}>DECLINE</Button> */}
        </Div3>
      </div>
      {/* )} */}
    </>
  );
};

export default CategoryDetail;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: auto;
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #292929;
  font-size: 1.2rem;
  border: none;
  font-weight: 500;
  margin: auto;
  border-radius: 25px;
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
  width: 400px;
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
