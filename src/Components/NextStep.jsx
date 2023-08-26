import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { MdAssignmentTurnedIn, MdSubdirectoryArrowRight } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { VscError } from "react-icons/vsc";
import GridLoader from "react-spinners/GridLoader";
import {
  projectApprovedByUserID,
  projectByProjectApprovedID,
} from "../graphql/queries";
import { updateProjectApproved } from "../graphql/mutations";

const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: row;
  align-items;center;
  background-color: #f1f1f1;
`;
const Left = styled.div`
  width: 100%;
`;
const Right = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Box = styled.div`
  padding: 20px;
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
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

const Label = styled.label`
  width: 25%;
  text-align: left;
  font-size: 1.8rem;
  color: #676767;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;

const NextStep = () => {
  const nav = useNavigate();
  const { id, pId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({});
  const [demo, setdemoUrl] = useState();
  const [demoName, setdemoName] = useState();
  const [final, setfinalUrl] = useState();
  const [finalName, setfinalName] = useState();
  const [demoapprovestatus, setdemoapprovestatus] = useState(false);

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
  async function acceptDemo() {
    const input = {
      id: pId,
      demouserstatus: "Yes",
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
      nav(`/business/${id}/projectarrivingdetails/${pId}/arrivingdetails/`);
    }
  }
  async function declineDemo() {
    const input = {
      id: pId,
      demouserstatus: "No",
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
      nav(`/business/${id}/projectarrivingdetails/${pId}/arrivingdetails/`);
    }
  }
  async function acceptFinal() {
    const input = {
      id: pId,
      finaluserstatus: "Yes",
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
      nav(`/business/${id}/projectarrivingdetails/${pId}/arrivingdetails/`);
    }
  }
  async function declineFinal() {
    const input = {
      id: pId,
      finaluserstatus: "No",
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
      nav(`/business/${id}/projectarrivingdetails/${pId}/arrivingdetails/`);
    }
  }
  return (
    <>
      <div>
        <Box>
          {" "}
          <H>Review Work</H>
        </Box>
        <Container>
          <Left>
            {data.demo && (
              <Div>
                <Label>Demo</Label>
                <Button onClick={downloadDemo}>
                  <MdAssignmentTurnedIn size="20" />
                  DOWNLOAD DEMO
                </Button>
                {data.demouserstatus === "Yes" ? (
                  <Button6>
                    <TiTickOutline size="20" />
                    APPROVED
                  </Button6>
                ) : (
                  <Button3 onClick={acceptDemo}>
                    <TiTickOutline size="20" />
                    APPROVE
                  </Button3>
                )}
                {data.demouserstatus === "No" ? (
                  <Button5>
                    <VscError size="20" />
                    DECLINED
                  </Button5>
                ) : (
                  <Button4 onClick={declineDemo}>
                    <VscError size="20" />
                    DECLINE
                  </Button4>
                )}
              </Div>
            )}
            {data.final && (
              <Div>
                <Label>Final</Label>
                <Button onClick={downloadFinal}>
                  <MdAssignmentTurnedIn size="20" />
                  DOWNLOAD FINAL
                </Button>
                {data.finaluserstatus === "Yes" ? (
                  <Button6>
                    <TiTickOutline size="20" />
                    APPROVED
                  </Button6>
                ) : (
                  <Button3 onClick={acceptFinal}>
                    <TiTickOutline size="20" />
                    APPROVE
                  </Button3>
                )}
                {data.finaluserstatus === "No" ? (
                  <Button5>
                    <VscError size="20" />
                    DECLINED
                  </Button5>
                ) : (
                  <Button4 onClick={declineFinal}>
                    <VscError size="20" />
                    DECLINE
                  </Button4>
                )}
              </Div>
            )}
          </Left>
          {/* <Right> */}

          {/* </Right> */}
        </Container>
      </div>
      {/* )} */}
    </>
  );
};

export default NextStep;
const Div = styled.div`
  align-items: center;
  border: 1px solid #000;
  width: 100%;
  margin: 20px;
  padding: 50px;
  display: flex;
`;
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
