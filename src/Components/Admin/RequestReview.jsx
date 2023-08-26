import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createTransaction,
  updateCreatorWallet,
  updateMoneyRequest,
} from "../../graphql/mutations";
import { moneyrequestByUserID, walletByUserID } from "../../graphql/queries";
const Container = styled.div`
    padding-top:00px;
    padding-right:60px;
    padding-left:30px;
    display: flex;
    margin-top:-20px;
    flex-direction: column;
    align-items;center;
    background-color: #f1f1f1;
    margin-bottom:40px;
`;
const Box = styled.div`
  padding: 40px;
  display: flex;
  margin-top: -10px;
  margin-bottom: -80px;
  background-color: #f1f1f1;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4.5rem;
  letter-spacing: 2px;
  margin-top: 0px;
`;
const H2 = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  letter-spacing: 2px;
  margin: 20px;
`;
const RequestReview = () => {
  const nav = useNavigate();
  const { id, rId } = useParams();
  const [Tid, setTid] = useState();
  const [user, setUser] = useState();
  const [amount, setAmount] = useState();
  const [wallet, setWallet] = useState();
  const [walletId, setWalletId] = useState();
  const [details, setDetails] = useState({});
  useEffect(() => {
    getData();
    getWallet();
  }, []);
  async function getWallet() {
    const result = await API.graphql(
      graphqlOperation(walletByUserID, {
        userId: rId,
      })
    );
    let data = result?.data?.walletByUserID?.items;
    if (data) {
      data.map((item) => {
        setWallet(item.amount);
        setWalletId(item.id);
      });
    }
  }
  async function getData() {
    const todo = await API.graphql(
      graphqlOperation(moneyrequestByUserID, {
        user: rId,
      })
    );
    let todos = todo?.data?.moneyrequestByUserID?.items;
    if (todos) {
      todos.map((data) => {
        setDetails(data);
        setAmount(data.money);
        setUser(data.user);
      });
    }
  }
  const submit = async () => {
    const data = {
      id: Tid,
      userId: user,
      amount: amount,
    };
    const todo = await API.graphql(
      graphqlOperation(createTransaction, {
        input: data,
      })
    );
    if (todo) {
      const request = {
        id: details.id,
        status: "Completed",
      };
      console.log(request);
      const todos = await API.graphql(
        graphqlOperation(updateMoneyRequest, {
          input: request,
        })
      );
      if (todos) {
        reduceAmount();
        nav(`/admin/${id}/panel/343fghzsvxfdwallet/`);
      }
    }
  };
  async function reduceAmount() {
    const wallets = {
      id: walletId,
      amount: parseInt(wallet) - parseInt(amount),
    };
    await API.graphql(
      graphqlOperation(updateCreatorWallet, {
        input: wallets,
      })
    );
  }
  return (
    <>
      {" "}
      <Box>
        <H>Request Details</H>
      </Box>
      <Container>
        <Bar>
          <P>UserId</P>
          <P>Request Id</P>
          <P>Amount</P>
          <P>UPI ID</P>
          <P>Date</P>
          <P>Status</P>
        </Bar>
        <Trans>
          <P2>{details.user}</P2>
          <P2>{details.id}</P2>
          <P2>{details.money}</P2>
          <P2>{details.upiId}</P2>
          <P2>{details.createdAt}</P2>
          {details.status !== "Completed" ? (
            <P2>Pending</P2>
          ) : (
            <P2>Completed</P2>
          )}
        </Trans>
        {details.status !== "Completed" ? (
          <Div>
            <H2>Enter Transaction Details</H2>
            {/* <Trans2> */}
            <Input
              type="text"
              placeholder="Enter Transaction Id"
              onChange={(e) => setTid(e.target.value)}
            />
            <Input type="text" placeholder="" value={details.money} />
            <Input type="text" placeholder="User Id" value={details.user} />
            <Button onClick={submit}>SUBMIT</Button>
            {/* </Trans2> */}
          </Div>
        ) : (
          <Div>
            <H>Completed</H>
          </Div>
        )}
      </Container>
    </>
  );
};

export default RequestReview;

const Div = styled.div`
  height: 400px;
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
`;
const Input = styled.input`
  width: 400px;
  border: none;
  margin: 20px;
  border-radius: 10px;
  font-size: 18px;
  background-color: #a0a0a0;
  padding: 6px;
  outline: none;
`;
const Trans2 = styled.div`
  display: flex;
  width: auto;
  padding: 10px;
  gap: 20px;
  align-items: center;
`;
const Bar = styled.div`
  height: 50px;
  display: flex;
  width: auto;
  flex-direction: row;
  border-bottom: 1px solid #000;
`;
const P = styled.p`
  width: 400px;
  font-family: "Ubuntu", sans-serif;
  font-size: 1rem;
  font-weight: 600;
`;
const P2 = styled.p`
  width: 450px;
  color: red;
  font-family: "Ubuntu", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
`;
const Trans = styled.div`
  display: flex;
  border-bottom: 1px solid #000;
  height: 60px;
  width: auto;
  align-items: center;
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
  font-weight: 600;
  margin: 10px;
  margin-top: 20px;
  border-radius: 10px;
  &:hover {
    background-color: #fba5a4;
    color: #fff;
  }
`;
