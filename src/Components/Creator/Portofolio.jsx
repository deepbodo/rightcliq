import React, { useContext, useState, useEffect } from "react";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import UserContext from "./UserContext";
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
import {
  createCreatorDetail,
  updateCreatorDetail,
} from "../../graphql/mutations";
import uuid from "react-uuid";
import CreatorDetailForm from "./CreatorDetailForm";
import styled from "styled-components";
import { creatorDataByQuerryID, listCategories } from "../../graphql/queries";
import Background from "./Background";
import GridLoader from "react-spinners/GridLoader";
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
`;
const Left = styled.div`
  width: 65%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Left2 = styled.div`
  width: 65%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  text-align: center;
  margin-bottom: -20px;
`;
const Logo2 = styled.img`
  width: 15%;
  margin-right: 4px;
  margin: 15px;
  margin-bottom: 30px;
`;
const Logo = styled.img`
  width: 15%;
  margin-right: 4px;
`;
const Right = styled.div`
  width: 35%;
  height: 100%;
  background-color: #8cdacd;
`;
const P = styled.h1`
  font-weight: 50;
  font-size: 2rem;
  font-weight: 400;
  margin-left: 8px;
  letter-spacing: 1px;
`;
const Title = styled.h2`
  margin: -4px;
  margin-top: -5px;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 2.2rem;
  letter-spacing: 3.5px;
`;
const Title2 = styled.h2`
  margin: -4px;
  margin-top: -5px;
  margin-bottom: -10px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  letter-spacing: 3.5px;
`;
const Div = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
  display: flex;
  width: 500px;
  background-color: #8cdacd;
  align-items: center;
  height: 100px;
  border-radius: 10px;
  justify-content: center;
  text-align: center;
`;
const Input = styled.select`
  width: 500px;
  height: 40px;
  padding-left: 15px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  appearance: none;
  background-image: linear-gradient(45deg, #e8e8e8 100%, transparent 100%),
    url("data:image/svg+xml,%3Csvg fill='%239C92AC' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z'/%3E%3C/svg%3E");
  background-position-x: 98%;
  background-position-y: 50%;
  margin-top: 0.5rem;
  margin-bottom: 20px;
  background-size: 25px;
  outline: none;
  &:hover {
    border: none;
  }

  &:focus {
    border: none;
    box-shadow: 0 0 0 0.1rem rgba(101, 84, 192, 0.25);
  }
  & option {
    color: #555;
    font-size: 0.9rem;
    background-color: #e8e8e8;
    transition: all 0.2s;

    &:hover {
      background-color: #f4f4f4;
    }

    &:disabled {
      color: #999;
    }
  }
`;

const Input2 = styled.input`
  border-top-right-radius: 10px;
  height: 40px;
  margin-left: 5px;
  width: 245px;
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  border-radius: 10px;
  background-color: #e8e8e8;
  border: none;
  outline: none;
`;
const Input3 = styled.input`
  border-radius: 10px;
  height: 40px;
  margin-top: 14px;
  margin-bottom: 20px;
  width: 500px;
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  background-color: #e8e8e8;
  border: none;
  outline: none;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  color: #fff;
  width: 500px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 8px;
  letter-spacing: 2px;
  background-color: #2a2a2a;
  padding-left: 8px;
  font-size: 1.2rem;
  margin: 20px;
  border: none;
  font-weight: 500;
  margin-bottom: 10px;
  border-radius: 20px;
  &:hover {
    background-color: #2a2a2a;
    color: #fff;
  }
`;
const Log = styled.p`
  margin: -5px;
  font-weight: bold;
  color: #090167;
`;
const Button2 = styled.button`
  background-color: #fff;
  border: none;
  margin: -15px;
  color: #000;
  font-weight: bold;
  pointer: cursor;
`;
const H2 = styled.p`
  color: #000;
  font-weight: 590;
  margin-left: 10px;
  font-size: 20px;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
`;
const H3 = styled.p`
  color: #000;
  font-weight: 590;
  margin-left: 0px;
  margin-bottom: 30px;
  font-size: 20px;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Portofolio = () => {
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const [creatorDetails, setCreatorDetails] = useState({});
  const [formState, updateFormState] = useState("portfolio");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [Portofolio, setPortofolio] = useState({
    id: "",
    function: "",
    whatsapp: "",
    resume: "",
    linkedin: "",
  });
  useEffect(() => {
    const getCategories = async () => {
      const todoData = await API.graphql(graphqlOperation(listCategories));
      let todos = todoData.data.listCategories.items;
      // for all todos get the pre-signURL and store in images field
      setCategory(todos);
    };
    const getData = async () => {
      const todo = await API.graphql(
        graphqlOperation(creatorDataByQuerryID, {
          QId: id,
        })
      );
      const newtodo = todo?.data?.creatorDataByQuerryID?.items;
      console.log(newtodo);
      if (newtodo) {
        newtodo.map((data) => {
          setCreatorDetails(data);
          setPortofolio({
            id: data.id,
            function: data.function,
            linkedin: data.linkedin,
            whatsapp: data.whatsapp,
          });
        });
      }
    };
    getCategories();
    getData();
    // console.log(props.detail);
  }, []);

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
    // console.log(result);
    setImage(result.key);
    console.log(result.key);
    setLoading(false);
  };
  async function updateUserDetails(event) {
    event.preventDefault();
    const details = {
      id: creatorDetails.id,
      function: Portofolio.function,
      resume: image,
      whatsapp: Portofolio.whatsapp,
      linkedin: Portofolio.linkedin,
    };
    console.log(Portofolio);
    const newTodo = await API.graphql({
      query: updateCreatorDetail,
      variables: { input: details },
    });
    console.log(newTodo);
    alert("Creator Updated!");
    updateFormState("background");
  }
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 6000);
  }, []);
  if (showLoader) {
    <ContainerCenter>
      <GridLoader size={15} color="#00e6e6" />
    </ContainerCenter>;
  } else
    return (
      <>
        {formState === "portfolio" && (
          <Container>
            <Left>
              {" "}
              <Title>Your Portofolio</Title>
              {/* <Header>
            <Logo src={LogoImage} />
            <H2>for Creator</H2>
          </Header> */}
              <Label>
                Upload Your Resume <i>(*in pdf format)</i>
              </Label>
              <Div>
                <Form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    accept=".pdf, .txt"
                    onChange={handleFileChange}
                  />
                  <Button3 variant="primary" type="submit">
                    {loading ? "Uploading..." : "Upload"}
                  </Button3>
                  {image ? <p>Uploaded</p> : <p></p>}
                </Form>
              </Div>
              <Input3
                type="text"
                name="linkedin"
                onChange={(event) =>
                  setPortofolio(() => ({
                    id: creatorDetails.id,
                    linkedin: event.target.value,
                  }))
                }
                placeholder="Share your linkedin/behance link"
              />
              <Input
                name="function"
                onChange={(event) =>
                  setPortofolio((prev) => ({
                    ...prev,
                    function: event.target.value,
                  }))
                }
                autocomplete="off"
                defaultValue=""
                placeholder="Select Job Function"
              >
                <option>Select Job Function</option>
                {category.map((data) => (
                  <option key={data.id} value={data.categoryId}>
                    {data.categoryname}
                  </option>
                ))}
              </Input>
              <Input3
                type="text"
                name="whatsapp"
                onChange={(event) =>
                  setPortofolio((prev) => ({
                    ...prev,
                    whatsapp: event.target.value,
                  }))
                }
                placeholder="Whatsapp Number"
              />
              <Button onClick={updateUserDetails}>NEXT</Button>
            </Left>
            <Right></Right>
          </Container>
        )}
        {formState === "background" && <Background />}
      </>
    );
};

export default Portofolio;
const NavLink3 = styled(Link)`
  text-decoration: none;
  color: #2a2a2a;
  pointer: cursor;
`;
const NavLink4 = styled.button`
  text-decoration: none;
  border: none;
  pointer: cursor;
  background-color: transparent;
`;
const Button3 = styled.button`
  border-radius: 6px;
  width: 100px;
  font-size: 1rem;
  border: none;
  background-color: #292929;
  padding: 2px;
  color: #ffff;
`;
const Label = styled.div`
  width: 500px;
  font-size: 1rem;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 0px;
  margin-left: 30px;
`;
const Bar = styled.div`
  width: 500px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
