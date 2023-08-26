import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { MdAssignmentTurnedIn, MdSubdirectoryArrowRight } from "react-icons/md";

import GridLoader from "react-spinners/GridLoader";
import {
  projectApprovedByUserID,
  projectByProjectApprovedID,
} from "../graphql/queries";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  background-color: #f1f1f1;
`;
const Left = styled.div`
  width: 60%;
`;
const Right = styled.div`
  width: 40%;
  width: 40%;
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
const ArrivingDetails = () => {
  const nav = useNavigate();
  const { id, pId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({});
  const [demo, setdemoUrl] = useState();
  const [demoName, setdemoName] = useState();
  const [final, setfinalUrl] = useState();
  const [finalName, setfinalName] = useState();
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
  useEffect(() => {
    API.graphql(
      graphqlOperation(projectByProjectApprovedID, {
        id: pId,
      })
    ).then((response) => {
      const items = response?.data?.projectByProjectApprovedID?.items;
      if (items.length !== 0) {
        items.map(async (item) => {
          setData(item);
          const demoKey = await Storage.get(item.demo);
          const finalKey = await Storage.get(item.final);
          setdemoUrl(demoKey);
          setfinalUrl(finalKey);
          setdemoName(item.demo);
          setfinalName(item.final);
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
  const downloadDemo = () => {
    const link = document.createElement("a");
    link.href = demo;
    link.target = "_blank";
    link.download = demoName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadFinal = () => {
    const link = document.createElement("a");
    link.href = final;
    link.target = "_blank";
    link.download = finalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div>
        <Box>
          {" "}
          <H>Review</H>
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
              {/* <Input
                type="checkbox"
                onChange={(event) =>
                  setProjectDetails((prev) => ({
                    ...prev,
                    projectname: data.projectname,
                  }))
                }
              /> */}
              <Label> Creator Name</Label>
              <Input2 value={data.creatorName} />
            </Div>
            <Div>
              {/* <Input
                type="checkbox"
                onChange={(event) =>
                  setProjectDetails((prev) => ({
                    ...prev,
                    industry: data.industry,
                  }))
                }
              /> */}
              <Label> Industry</Label>
              <Input2 value={data.industry} />
            </Div>
            <Div>
              {/* <Input
                type="checkbox"
                onChange={(event) =>
                  setProjectDetails((prev) => ({
                    ...prev,
                    companyname: data.companyname,
                  }))
                }
              /> */}
              <Label> Company Name</Label>
              <Input2 value={data.companyname} />
            </Div>
            <Div>
              {/* <Input
                type="checkbox"
                onChange={(event) =>
                  setProjectDetails((prev) => ({
                    ...prev,
                    preference: data.preference,
                  }))
                }
              /> */}
              <Label> Preference</Label>
              <Input2 value={data.preference} />
            </Div>
            <Div>
              {/* <Input
                type="checkbox"
                onChange={(event) =>
                  setProjectDetails((prev) => ({
                    ...prev,
                    templateId: data.templateId,
                  }))
                }
              /> */}
              <Label> Template Code</Label>
              <Input2 value={data.templateId} />
            </Div>
            <Div2>
              {/* <Input
                type="checkbox"
                onChange={(event) =>
                  setProjectDetails((prev) => ({
                    ...prev,
                    moredetail: data.moredetail,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    id: data.id,
                    username: data.username,
                  }))
                }
              /> */}
              <Label>More Detail</Label>
              <Input3 value={data.moredetail} />
            </Div2>
          </Left>
          <Right>
            {" "}
            {data.demo && (
              <Button onClick={downloadDemo}>
                <MdAssignmentTurnedIn size="20" />
                DOWNLOAD DEMO
              </Button>
            )}
            {data.final && (
              <Button onClick={downloadFinal}>
                <MdAssignmentTurnedIn size="20" />
                DOWNLOAD FINAL
              </Button>
            )}
            {data.demo && (
              <>
                {" "}
                {data.delivered === "Yes" ? (
                  <Button2>PROJECT CLOSED</Button2>
                ) : (
                  <Button2
                    to={`/business/${id}/projectarrivingdetails/${pId}/arrivingdetails/next/`}
                  >
                    <MdSubdirectoryArrowRight size="20" />
                    NEXT STEP
                  </Button2>
                )}
              </>
            )}
          </Right>
        </Container>
      </div>
      {/* )} */}
    </>
  );
};

export default ArrivingDetails;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #000;
  width: 250px;
  gap: 5px;
  padding: 6px;
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;
  background-color: #fba5a4;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  margin: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #fba5a4;
    color: #fff;
  }
`;
const Button2 = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 250px;
  text-decoration: none;
  gap: 5px;
  padding: 6px;
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;
  background-color: #1e1e1e;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  margin: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #1e1e1e;
    color: #fff;
  }
`;
