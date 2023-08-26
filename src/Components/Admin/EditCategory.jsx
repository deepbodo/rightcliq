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
import { Button as button } from "react-bootstrap";
import {
  createProjectApproved,
  deleteNote,
  updateCategories,
  updateTemplate,
} from "../../graphql/mutations";
import UpdateCategoryImage from "./UpdateCategoryImage";
const Container = styled.div`
  padding: 20px;
  display: flex;
  margin-top: 30px;
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
  font-size: 1rem;
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
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const P = styled.p`
  color: #007acc;
  font-weight: 600;
  margin-left: 5px;
`;

const EditCategory = () => {
  const nav = useNavigate();
  const { id, categoryId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({});
  const [ID, setID] = useState();
  const [categoryname, setCategoryName] = useState();
  const [categorydetail, setCategoryDetail] = useState();
  const [categoryprice, setCategoryPrice] = useState();
  const [newDetails, setNewDetails] = useState({
    id: "",
    categorydetail: "",
    categoryname: "",
    categoryprice: 1,
    image: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  useEffect(() => {
    API.graphql(
      graphqlOperation(categoryDetailByCategoryID, {
        categoryId: categoryId,
      })
    ).then((response) => {
      const items = response?.data?.categoryDetailByCategoryID?.items;
      console.log(items);
      if (items.length !== 0) {
        items.map((item) => {
          setData(item);

          setID(item.id);
          setNewDetails({
            id: item.id,
            categorydetail: item.categorydetail,
            categoryname: item.categoryname,
            categoryprice: item.categoryprice,
          });
        });
      }
    });
  }, []);
  async function updateCategory(event) {
    event.preventDefault();
    console.log(newDetails);
    const newTodo = await API.graphql({
      query: updateCategories,
      variables: { input: newDetails },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(newTodo);
    alert("Category Updated!");
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Upload the file to the CategoryImage folder in S3 using the Amplify Storage module

    const result = await Storage.put(`CategoryImage/${file.name}`, file, {
      contentType: file.type,
    });
    console.log(result);
    setImage(result.key);
    setNewDetails({ id: data.id, image: result.key });
    setLoading(false);
  };
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
            <Div6>
              <Label2> Upload New Image</Label2>

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
            <Div>
              <Label> Category Name</Label>
              <Input2
                name="categoryname"
                variation="quiet"
                required
                defaultValue={data.categoryname}
                onChange={(event) =>
                  setNewDetails((prev) => ({
                    ...prev,
                    categoryname: event.target.value,
                  }))
                }
              />
            </Div>
            <Div>
              <Label> Category Price</Label>
              <Input2
                variation="quiet"
                required
                defaultValue={data.categoryprice}
                onChange={(event) =>
                  setNewDetails((prev) => ({
                    ...prev,
                    categoryprice: event.target.value,
                  }))
                }
              />
            </Div>
            <Div2>
              <Label>Category Detail</Label>
              <Input3
                variation="quiet"
                required
                defaultValue={data.categorydetail}
                onChange={(event) =>
                  setNewDetails((prev) => ({
                    ...prev,
                    categorydetail: event.target.value,
                  }))
                }
              />
            </Div2>
          </Left>
          <Right>
            {/* <Button2 to={`/admin/${id}/panel/editbusiness/`}>
              <FaUserEdit size="20" />
              Edit Category
            </Button2>
            <Button2 to={`/admin/${id}/panel/editbusiness/`}>
              <FaUserEdit size="20" />
              Add New Template
            </Button2> */}
          </Right>
        </Container>
        <Div3>
          <Button onClick={updateCategory}>SAVE</Button>
          {/* <Button onClick={approveProject}>APPROVE & ASSIGN</Button>
          <Button onClick={declineProject}>DECLINE</Button> */}
        </Div3>
      </div>
      {/* )} */}
    </>
  );
};

export default EditCategory;

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
