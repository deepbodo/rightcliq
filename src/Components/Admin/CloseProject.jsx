import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import {
  projectByProjectApprovedID,
  walletByUserID,
} from "../../graphql/queries";
import {
  createNotification,
  createTransaction,
  updateCreatorWallet,
  updateProjectApproved,
} from "../../graphql/mutations";

const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
const CloseProject = () => {
  const nav = useNavigate();
  const { id, pId } = useParams();
  const [show, setshow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({});
  const [wallet, setWallet] = useState();
  const [price, setPrice] = useState();
  const [user, setUser] = useState();
  const [payment, setPayment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [walletId, setWalletId] = useState();
  async function getData() {
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
          setUser(item.creatorId);
          setPrice(item.price);
        });
      }
      getamount(user);
    });
  }
  async function getamount(user) {
    const todo = await API.graphql(
      graphqlOperation(walletByUserID, {
        userId: `${user}`,
      })
    );
    let todos = todo?.data?.walletByUserID?.items;
    if (todos) {
      todos.map((item) => {
        setWallet(item.amount);
        setWalletId(item.id);
      });
    }
  }
  useEffect(() => {
    setShowLoader(true);
    getData();

    setTimeout(() => {
      setShowLoader(false);
    }, 1);
  }, []);
  const handleClick = async () => {
    if (payment === "") {
      setErrorMessage("Please enter a payment amount");
    } else {
      const traninput = {
        userId: user,
        projectId: data.id,
        amount: payment,
        projectname: data.projectname,
      };
      const todo = await API.graphql(
        graphqlOperation(createTransaction, {
          input: traninput,
        })
      );
      const walletinput = {
        id: walletId,
        userId: user,
        amount: parseInt(wallet) + parseInt(payment),
      };
      const datas = await API.graphql(
        graphqlOperation(updateCreatorWallet, {
          input: walletinput,
        })
      );
      alert(`Creator Paid`);
      setProject();
      console.log(`Payment amount: ${payment}`);
      setErrorMessage("");
    }
  };
  async function setProject() {
    const details = {
      id: pId,
      delivered: "Yes",
    };
    const todo = await API.graphql(
      graphqlOperation(updateProjectApproved, {
        input: details,
      })
    );
    if (todo) {
      const note1 = {
        QId: data.creatorId,
        messagetype: "done",
        cId: data.creatorId,
        pId: pId,
        projectname: data.projectname,
        message: `${data.projectname}` + " Has Been Completed, Payment Done!",
      };
      await API.graphql(
        graphqlOperation(createNotification, {
          input: note1,
        })
      );
      const note2 = {
        QId: data.username,
        messagetype: "done",
        cId: data.creatorId,
        pId: pId,
        projectname: data.projectname,
        message: `${data.projectname}` + " Has Been Completed",
      };
      await API.graphql(
        graphqlOperation(createNotification, {
          input: note2,
        })
      );
      nav(`/admin/${id}/panel/343fghzsvxfd ongoings/`);
    }
  }
  return (
    <>
      {showLoader ? (
        <ContainerCenter>
          <GridLoader size={10} color="#00e6e6" />
        </ContainerCenter>
      ) : (
        <ContainerCenter>
          <Box>
            <Label>Close Project And Pay The Creator</Label>
            <P>Project Price is Rs. {price}</P>
            <Input2
              type="text"
              placeholder="Enter Amount To Be Paid"
              onChange={(e) => setPayment(e.target.value)}
            />
            <Button onClick={handleClick}>SUBMIT</Button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </Box>
        </ContainerCenter>
      )}
    </>
  );
};

export default CloseProject;
const Box = styled.div`
  background-color: #fff;
  width: 600px;
  height: 400px;
  align-items: center;
  border-radius: 15px;
  gap: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 1px 2px 9px #a3a3a3;
`;
const Label = styled.label`
  width: 80%;
  text-align: center;
  font-size: 1.4rem;
  color: #676767;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;
const P = styled.label`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: #676767;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;

const Input2 = styled.input`
  border-radius: 10px;
  height: auto;
  margin: 10px;
  width: 400px;
  border: 1px solid;
  padding: 3px;
  padding-left: 10px;
  font-size: 1rem;
  text-align: left;
  outline: none;
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
  font-size: 1.1rem;
  border: none;
  font-weight: 600;
  margin: 10px;
  margin-top: 20px;
  border-radius: 10px;
  &:hover {
    background-color: #fba5a4;
    color: #fff;
  }
`;
