import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub, Storage } from "aws-amplify";
import { GrInProgress } from "react-icons/gr";
import { API, graphqlOperation } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import {
  projectByProjectApprovedID,
  projectByProjectID,
} from "../../graphql/queries";
import uuid from "react-uuid";
import {
  createCreatorChats,
  createNotification,
  createProjectApproved,
  deleteNote,
  updateProjectApproved,
} from "../../graphql/mutations";
const Container = styled.div`
  padding: 20px;
  display: flex;
  overflow-x: hidden;
  flex-direction: row;
  gap: 60px;
  background-color: #f1f1f1;
`;
const Left = styled.div`
  width: 50%;
`;
const Right = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
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
  letter-spacing: 2px;
  margin-top: 0px;
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
const DeadlineSubmit = () => {
  const nav = useNavigate();
  const { id, pId } = useParams();
  const [username, setUsername] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({});
  const [project, setProjectDetails] = useState({
    id: "",
    username: "",
    projectname: "",
    industry: "",
    firstname: "ff",
    lastname: "ff",
    preference: "",
    companyname: "",
    templateId: "x",
    category: "",
    moredetail: "vv",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [loading2, setLoading2] = useState(false);
  const [image2, setImage2] = useState();
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      setLoading(true);

      // Upload the file to the CategoryImage folder in S3 using the Amplify Storage module

      const result = await Storage.put(`ProjectDemo/${file.name}`, file, {
        contentType: file.type,
      });
      // console.log(result);
      const input = { id: pId, demo: result.key, status: "Waiting" };

      const newTodo = await API.graphql({
        query: updateProjectApproved,
        variables: { input },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(newTodo);
      let todos = newTodo?.data?.updateProjectApproved;
      setImage(result);
      const notifyuser = {
        QId: data.username,
        cId: id,
        pId: pId,
        messagetype: "dmeo",
        message:
          "Creator Submitted Project Demo Of Project " + `${data.projectname}`,
        projectname: data.projectname,
      };
      const response = await API.graphql(
        graphqlOperation(createNotification, {
          input: notifyuser,
        })
      );
      const notifyadmin = {
        QId: "a3348f86-320d-4c1b-a7c3-f25b7686fd08",
        cId: id,
        pId: pId,
        messagetype: "demo",
        message:
          "Creator Submitted Project Demo Of Project " + `${data.projectname}`,
        projectname: data.projectname,
      };
      const response2 = await API.graphql(
        graphqlOperation(createNotification, {
          input: notifyadmin,
        })
      );
      setLoading(false);
    }
  };
  const handleFileChange2 = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    if (file) {
      setLoading2(true);

      // Upload the file to the CategoryImage folder in S3 using the Amplify Storage module

      const result = await Storage.put(`ProjectFinal/${file.name}`, file, {
        contentType: file.type,
      });
      // console.log(result);
      const input = { id: pId, final: result.key };

      const newTodo = await API.graphql({
        query: updateProjectApproved,
        variables: { input },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(newTodo);
      let todos = newTodo?.data?.updateProjectApproved;
      setImage2(result);
      const notifyuser = {
        QId: data.username,
        cId: id,
        pId: pId,
        messagetype: "dmeo",
        message:
          "Creator Submitted Project Final Of Project " + `${data.projectname}`,
        projectname: data.projectname,
      };
      const response = await API.graphql(
        graphqlOperation(createNotification, {
          input: notifyuser,
        })
      );
      const notifyadmin = {
        QId: "a3348f86-320d-4c1b-a7c3-f25b7686fd08",
        cId: id,
        pId: pId,
        messagetype: "demo",
        message:
          "Creator Submitted Project Final Of Project " + `${data.projectname}`,
        projectname: data.projectname,
      };
      const response2 = await API.graphql(
        graphqlOperation(createNotification, {
          input: notifyadmin,
        })
      );
      setLoading2(false);
    }
  };
  useEffect(() => {
    API.graphql(
      graphqlOperation(projectByProjectApprovedID, {
        id: pId,
      })
    ).then((response) => {
      const items = response?.data?.projectByProjectApprovedID?.items;
      if (items.length !== 0) {
        items.map((item) => {
          setData(item);
        });
        console.log(data);
      }
    });
  }, []);
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);
  async function approveProject() {
    console.log(project);
    const details = {
      id: pId,
      accepted: "Yes",
    };
    const newTodo = await API.graphql({
      query: updateProjectApproved,
      variables: { input: details },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(newTodo);
    let todos = newTodo?.data?.updateProjectApproved;
    console.log(todos);
    if (todos) {
      alert("Project Approved");
      // createConnection();
    }
  }

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
          <H>Submit Work</H>
        </Box>
        <Container>
          <Left>
            <Div>
              <Label> Category</Label>
              <Input2 value={data.category} />
            </Div>
            <Div>
              <Label> Project Name</Label>
              <Input2 value={data.projectname} />
            </Div>
            <Div>
              <Label> Industry</Label>
              <Input2 value={data.industry} />
            </Div>
            <Div>
              <Label> Company Name</Label>
              <Input2 value={data.companyname} />
            </Div>
            <Div>
              <Label> Preference</Label>
              <Input2 value={data.preference} />
            </Div>
            <Div>
              <Label> Template Code</Label>
              <Input2 value={data.templateId} />
            </Div>
            <Div2>
              <Label>More Detail</Label>
              <Input3 value={data.moredetail} />
            </Div2>
          </Left>
          <Right>
            <Bar>
              <GrInProgress size="18" color="#DE89DA" />
              Status: <b>{data.status}</b>
            </Bar>
            {data.demo ? (
              <DropBox>
                <Title>Upload Demo Version</Title>
                {/* <Form onSubmit={handleSubmit}>
                      <input type="file" onChange={handleFileChange} />
                      {image ? ( */}
                <Button2>Uploaded</Button2>
                {/* ) : (
                        <Button2 variant="primary" type="submit">
                        
                          {" "}
                          {loading ? "Uploading..." : "Upload"}
                        </Button2>
                      )} */}
                {/* </Form> */}
              </DropBox>
            ) : (
              <DropBox>
                <Title>Upload Demo Version</Title>
                <Form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleFileChange} />
                  {image ? (
                    <Button2>Uploaded</Button2>
                  ) : (
                    <Button2 variant="primary" type="submit">
                      {" "}
                      {loading ? "Uploading..." : "Upload"}
                    </Button2>
                  )}
                </Form>
              </DropBox>
            )}
            {data.status === "Waiting" && (
              <DropBox2>
                <Title>Upload Final Version</Title>
                {/* <Form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                {image ? (
                  <Button2>Uploaded</Button2>
                ) : (
                  <Button2 variant="primary" type="submit">
                    {" "}
                    {loading ? "Uploading..." : "Upload"}
                  </Button2>
                )}
              </Form> */}
              </DropBox2>
            )}
            {data.status === "Submit" && (
              <DropBox2>
                <Title>Upload Final Version</Title>
                {data.final ? (
                  <Button2>Uploaded</Button2>
                ) : (
                  <Form onSubmit={handleSubmit2}>
                    <input type="file" onChange={handleFileChange2} />
                    {image2 ? (
                      <Button2>Uploaded</Button2>
                    ) : (
                      <Button2 variant="primary" type="submit">
                        {" "}
                        {loading2 ? "Uploading..." : "Upload"}
                      </Button2>
                    )}
                  </Form>
                )}
              </DropBox2>
            )}
          </Right>
        </Container>
        {/* <Div3>
          <Button onClick={approveProject}>ACCEPT</Button>
        </Div3> */}
      </div>
      {/* )} */}
    </>
  );
};

export default DeadlineSubmit;
const Bar = styled.div`
  width: 300px;
  background-color: #fba5a4;
  display: flex;
  padding: 5px;
  height: 40px;
  color: #000;
  font-size: 20px;
  align-items: center;
  flex-direction: row;
  border-radius: 15px;
  justify-content: center;
  gap: 10px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  text-align: center;
  align-items: center;
  height: 200px;
  justify-content: center;
  gap: 5px;
  flex-direction: column;
`;
const DropBox = styled.div`
  width: 450px;
  background-color: #79b7b0;
  height: 280px;
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
const DropBox2 = styled.div`
  width: 450px;
  background-color: #de89da;
  height: 280px;
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

const Title = styled.h2`
  text-transform: uppercase;
  margin: 0px;
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
  font-size: 1.2rem;
  border: none;
  font-weight: 500;
  border-radius: 10px;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
