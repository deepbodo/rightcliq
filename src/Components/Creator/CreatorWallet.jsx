import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createMoneyRequest,
  createNotification,
} from "../../graphql/mutations";
import {
  moneyrequestByUserID,
  transactionByQuerryID,
  walletByUserID,
} from "../../graphql/queries";
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
const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.open ? "block" : "none")};
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  padding: 20px;
  height: 400px;
  margin-top: 160px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  border: 1px solid #888;
  width: 80%;
`;
const CreatorWallet = () => {
  const { id } = useParams();
  const [wallet, setWallet] = useState();
  const [transaction, setTransaction] = useState([]);
  const [request, setRequest] = useState([]);
  const [state, setState] = useState("transaction");
  const [modalstate, setModalState] = useState("new");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState();
  const [upi, setUpi] = useState();
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    setErrorMessage("");
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };
  async function getWallet() {
    const result = await API.graphql(
      graphqlOperation(walletByUserID, {
        userId: id,
      })
    );
    let data = result?.data?.walletByUserID?.items;
    if (data) {
      data.map((item) => {
        setWallet(item.amount);
      });
    }
  }
  useEffect(() => {
    getWallet();
    listTransaction();
    listRequest();
  }, []);
  async function listTransaction() {
    const result = await API.graphql(
      graphqlOperation(transactionByQuerryID, {
        userId: id,
      })
    );
    let data = result?.data?.transactionByQuerryID?.items;
    const newData = data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    setTransaction(newData);
  }
  async function listRequest() {
    const result = await API.graphql(
      graphqlOperation(moneyrequestByUserID, {
        user: id,
      })
    );
    let data = result?.data?.moneyrequestByUserID?.items;
    const newData = data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    setRequest(newData);
  }
  const createRequest = async () => {
    if (parseInt(payment) > parseInt(wallet)) {
      setErrorMessage("Please enter a payment less than balance!");
    } else {
      const details = {
        user: id,
        money: payment,
        upiId: upi,
      };
      const todo = await API.graphql(
        graphqlOperation(createMoneyRequest, {
          input: details,
        })
      );
      console.log("request", todo);
      if (todo) {
        createNotify();
        setModalState("done");
      }
      setErrorMessage("");
    }
  };
  async function createNotify() {
    const data = {
      QId: "a3348f86-320d-4c1b-a7c3-f25b7686fd08",
      messagetype: "money",
      message: "Creator" + `${id}` + " requested money",
      cId: id,
    };
    const todos = await API.graphql(
      graphqlOperation(createNotification, {
        input: data,
      })
    );
    console.log("notify", todos);
  }
  return (
    <>
      <div>
        {" "}
        <Box>
          <H>Wallet</H>
        </Box>
        <Container>
          {" "}
          <Div>
            <Label>
              Wallet Balance: <b>₹{wallet}</b>
            </Label>
            <Button onClick={handleModalOpen}>WITHDRAW</Button>
          </Div>
        </Container>
        <Button2
          onClick={() => {
            setState("transaction");
          }}
        >
          Transaction History
        </Button2>
        <Button2
          onClick={() => {
            setState("request");
          }}
        >
          Request History
        </Button2>
        <Line></Line>
        <Container>
          {/* <Bar>
            <P>Transaction Id</P>
            <P>Amount</P>
            <P>Project Name</P>
            <P>Date</P>
          </Bar> */}
        </Container>
        <Container>
          {" "}
          {state === "transaction" && (
            <>
              <Bar>
                <P>Transaction Id</P>
                <P>Amount</P>
                <P>Project Name</P>
                <P>Date</P>
              </Bar>
              {transaction.map((data) => (
                <Trans>
                  <P>{data.id}</P>
                  <P>{data.amount}</P>
                  <P>{data.projectname}</P>
                  <P>{data.createdAt}</P>
                </Trans>
              ))}
            </>
          )}
        </Container>
        <Container>
          {" "}
          {state === "request" && (
            <>
              <Bar>
                <P>Request Id</P>
                <P>Amount</P>
                <P>UPI ID</P>
                <P>Date</P>
                <P>Status</P>
              </Bar>
              {request.map((data) => (
                <Trans>
                  <P>{data.id}</P>
                  <P>{data.money}</P>
                  <P>{data.upiId}</P>
                  <P>{data.createdAt}</P>
                  {data.status !== "Completed" ? (
                    <P>Pending</P>
                  ) : (
                    <P>{data.status}</P>
                  )}
                  {/* <P></P> */}
                </Trans>
              ))}
            </>
          )}
        </Container>
        <Modal open={isModalOpen}>
          {modalstate === "new" && (
            <ModalContent>
              <h1>Enter Amount You Want To Withdraw</h1>
              <Input2
                type="number"
                placeholder="Amount....."
                onChange={(e) => setPayment(e.target.value)}
              />
              <Input2
                type="number"
                placeholder="UPI ID"
                onChange={(e) => setUpi(e.target.value)}
              />
              <Button onClick={createRequest}>SUBMIT</Button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <Button onClick={handleModalClose}>CLOSE</Button>
            </ModalContent>
          )}
          {modalstate === "done" && (
            <ModalContent>
              <h1>Enter Amount You Want To Withdraw</h1>

              <p>Request Completed</p>
              <Button onClick={handleModalClose}>CLOSE</Button>
            </ModalContent>
          )}
        </Modal>
      </div>
    </>
  );
};

export default CreatorWallet;
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
const Line = styled.div`
  height: 2px;
  background-color: #000;
  width: 100%;
  margin-bottom: 40px;
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

const Button2 = styled.button`
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  font-family: "Ubuntu", sans-serif;
  margin-left: 40px;
  &:hover {
    text-decoration: underline;
    color: green;
  }
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
const Trans = styled.div`
  display: flex;
  border-bottom: 1px solid #000;
  height: 60px;
  width: auto;
  align-items: center;
`;
