import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation, Storage } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import {
  getProjectApproved,
  projectByProjectApprovedID,
  projectByProjectID,
} from "../../graphql/queries";
import {
  createProjectApproved,
  deleteNote,
  updateProjectApproved,
} from "../../graphql/mutations";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { VscError } from "react-icons/vsc";
const Container = styled.div`
    padding-top:30px;
    padding-right:60px;
    padding-left:30px;
    display: flex;
    flex-direction: row;
    align-items;center;
    background-color: #f1f1f1;
`;
const Left = styled.div`
  width: 100%;
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
  font-size: 4.5rem;
  letter-spacing: 2px;
  margin-top: 5px;
`;
const Div = styled.div`
  border: 1px solid #000;
  width: 100%;
  margin: 20px;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  width: 100%;
  text-align: left;
  font-size: 1.4rem;
  color: #676767;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;

const NextStepA = () => {
  const nav = useNavigate();
  const { id, pId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({});
  const [demo, setdemoUrl] = useState();
  const [demoName, setdemoName] = useState();
  const [final, setfinalUrl] = useState();
  const [finalName, setfinalName] = useState();

  useEffect(() => {
    API.graphql(
      graphqlOperation(projectByProjectApprovedID, {
        id: pId,
      })
    ).then((response) => {
      const items = response?.data?.projectByProjectApprovedID?.items;
      console.log(items);
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
      }
    });
  }, []);
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);
  async function navigator() {
    nav(`/admin/${id}/panel/${pId}/ongoingdetails/approve/`);
  }
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
  async function acceptDemo() {
    const input = {
      id: pId,
      status: "Submit",
      demoadminstatus: "Yes",
    };
    const todo = await API.graphql({
      query: updateProjectApproved,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let todos = todo?.data?.updateProjectApproved;
    console.log(todos);
    if (todos) {
      alert("Demo Approved");
    }
  }
  async function declineDemo() {
    const input = {
      id: pId,
      demoadminstatus: "No",
    };
    const todo = await API.graphql({
      query: updateProjectApproved,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let todos = todo?.data?.updateProjectApproved;
    console.log(todos);
    if (todos) {
      alert("Demo Declined");
    }
  }
  async function acceptFinal() {
    const input = {
      id: pId,
      finaladminstatus: "Yes",
    };
    const todo = await API.graphql({
      query: updateProjectApproved,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let todos = todo?.data?.updateProjectApproved;
    console.log(todos);
    if (todos) {
      alert("Final Approved");
    }
  }
  async function declineFinal() {
    const input = {
      id: pId,
      finaladminstatus: "No",
    };
    const todo = await API.graphql({
      query: updateProjectApproved,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let todos = todo?.data?.updateProjectApproved;
    console.log(todos);
    if (todos) {
      alert("Final Approved");
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
          <H>Review</H>
        </Box>
        <Container>
          <Left>
            <Div>
              {" "}
              {data.demouserstatus === "Yes" && (
                <Label>Demo Approved By User</Label>
              )}
              {data.demouserstatus === "No" && (
                <Label>Demo Declined By User</Label>
              )}
              <Button onClick={downloadDemo}>
                <MdAssignmentTurnedIn size="20" />
                DOWNLOAD DEMO
              </Button>
              {data.demouserstatus === "Yes" && (
                <Button3 onClick={acceptDemo}>
                  <TiTickOutline size="20" />
                  {data.demoadminstatus === "Yes" ? "APPROVED" : "APPROVE"}
                </Button3>
              )}
              {data.demouserstatus === "No" && (
                <Button4 onClick={declineDemo}>
                  <VscError size="20" />
                  {data.demoadminstatus === "No" ? "DECLINED" : "DECLINE"}
                </Button4>
              )}
            </Div>
            {data.finaluserstatus && (
              <Div>
                {data.finaluserstatus === "Yes" && (
                  <Label>Final Approved By User</Label>
                )}
                {data.finaluserstatus === "No" && (
                  <Label>Final Declined By User</Label>
                )}
                <Button onClick={downloadFinal}>
                  <MdAssignmentTurnedIn size="20" />
                  DOWNLOAD FINAL
                </Button>
                {data.finaluserstatus === "Yes" && (
                  <Button3 onClick={acceptFinal}>
                    <TiTickOutline size="20" />
                    {data.finaladminstatus === "Yes" ? "APPROVED" : "APPROVE"}
                  </Button3>
                )}
                {data.finaluserstatus === "No" && (
                  <Button4 onClick={declineFinal}>
                    <VscError size="20" />
                    {data.demoadminstatus === "No" ? "DECLINED" : "DECLINE"}
                  </Button4>
                )}
              </Div>
            )}
          </Left>
        </Container>
      </div>
    </>
  );
};

export default NextStepA;
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

const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #000;
  width: 220px;
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
  margin-top: 20px;
  border-radius: 10px;
  &:hover {
    background-color: #fba5a4;
    color: #fff;
  }
`;

const Button3 = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 220px;
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
    background-color: #fff;
    color: #000;
  }
`;
const Button6 = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 220px;
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
`;
const Button5 = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #000;
  width: 220px;
  text-decoration: none;
  gap: 5px;
  padding: 6px;
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;
  background-color: #fff;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  margin: 10px;
  border-radius: 10px;
`;
const Button4 = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #000;
  width: 220px;
  text-decoration: none;
  gap: 5px;
  padding: 6px;
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;
  background-color: #fff;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  margin: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
