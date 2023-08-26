import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createMoneyRequest,
  createNotification,
} from "../../graphql/mutations";
import {
  listMoneyRequests,
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
const AdminWallet = () => {
  const { id } = useParams();
  const [wallet, setWallet] = useState();
  const [transaction, setTransaction] = useState([]);
  const [request, setRequest] = useState([]);
  const [state, setState] = useState("request");
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
  async function listRequest() {
    const result = await API.graphql(graphqlOperation(listMoneyRequests));
    let data = result?.data?.listMoneyRequests?.items;
    const newData = data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    setTransaction(newData);
  }
  useEffect(() => {
    listRequest();
  }, []);

  return (
    <>
      <div>
        {" "}
        <Box>
          <H>Wallet</H>
        </Box>
        {/* <Container>
          {" "}
          <Div>
            <Label>
              Wallet Balance: <b>₹{wallet}</b>
            </Label>
            <Button onClick={handleModalOpen}>WITHDRAW</Button>
          </Div>
        </Container> */}
        <Button2
          onClick={() => {
            setState("request");
          }}
        >
          Request History
        </Button2>
        <Line></Line>
        <Container>
          {" "}
          {state === "request" && (
            <>
              <Bar>
                <P>UserId</P>
                <P>Request Id</P>
                <P>Amount</P>
                <P>UPI ID</P>
                <P>Date</P>
                <P>Action</P>
              </Bar>
              {transaction.map((data) => (
                <Trans>
                  <P2>{data.user}</P2>
                  <P2>{data.id}</P2>
                  <P2>{data.money}</P2>
                  <P2>{data.upiId}</P2>
                  <P2>{data.createdAt}</P2>
                  <Plink
                    to={`/admin/${id}/panel/343fghzsvxfdwallet/${data.user}/`}
                  >
                    Review
                  </Plink>
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
              <Button>SUBMIT</Button>
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

export default AdminWallet;
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
  font-size: 1.2rem;
  font-weight: 600;
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
  width: 300px;
  font-family: "Ubuntu", sans-serif;
  font-size: 1rem;
  font-weight: 600;
`;
const Plink = styled(Link)`
  width: 300px;
  font-family: "Ubuntu", sans-serif;
  font-size: 0.8rem;
  color: red;
  font-weight: 600;
  text-decoration: none;
`;
const P2 = styled.p`
  width: 300px;
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
