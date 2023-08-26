import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import Log from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/usericon.jpg";
import { notificationByQuerryID } from "../../graphql/queries";
import { deleteNotification } from "../../graphql/mutations";
const Container = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  padding: 28px;

  //   background-color: red;
`;

const Section = styled.div`
  background-color: #f1f1f1;
  display: flex;
  margin-top: -80px;
  flex-direction: column;
  padding-left: 80px;
  padding-right: 80px;
`;

const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4.5rem;
  letter-spacing: 2px;
  margin-top: -5px;
  margin-left: 50px;
`;
const Div3 = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  margin-left: 50px;
`;
const Input = styled.input`
  width: 50%;
  padding: 10px;
  height: 35px;
  border: none;
  cursor: pointer;
  border-radius: 10px 0 0 10px;
  border-right: none;
  // box-shadow: 0 0 10px #38b6ff;
  outline: none;
  font-size: 20px;
  background: none;
  @media (max-width: 800px) {
    width: 14rem;
  }
`;

const AdminNotification = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const [ids, setids] = useState([]);
  const [user, updateUser] = useState({});
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    getData();
  }, [data]);
  async function getData() {
    const response = await API.graphql(
      graphqlOperation(notificationByQuerryID, {
        QId: id,
      })
    );

    const items = response?.data?.notificationByQuerryID?.items;
    const newData = items.sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    setData(newData);
  }

  return (
    <>
      {" "}
      <Container>
        <Div>
          <Div3>
            <FaSearch color="#626262" size="15" />
            <Input
              type="text"
              placeholder="Search"
              //   onChange={(e) => setSearch(e.target.value)}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Div3>
          {/* <Button>Mark All As Read</Button> */}
        </Div>
        <H>Notifications</H>
      </Container>
      <Section>
        {data
          .filter((datas) =>
            datas.messagetype.toLowerCase().includes(search.toLowerCase())
          )
          .map((datas) => (
            <Bar>
              {/* <Input2
              type="checkbox"
              onChange={(event) =>
                setids((prev) => ({
                  ...prev,
                  ids: datas.id,
                }))
              }
            /> */}
              <GoPrimitiveDot size={35} color="#89CFC7" />
              <Box>
                <Div4>
                  <Title>{datas.message}</Title>
                  <p>
                    {datas.createdAt.split("T")[0]} at{" "}
                    {datas.createdAt.split("T")[1]}{" "}
                    <Buttons
                      onClick={() => {
                        const todoDetails = {
                          id: `${datas.id}`,
                        };
                        const deleted = API.graphql({
                          query: deleteNotification,
                          variables: { input: todoDetails },
                          authMode: "API_KEY",
                        });
                        console.log(deleted);
                      }}
                    >
                      remove
                    </Buttons>
                  </p>
                </Div4>

                <Img src={Log} />
              </Box>
            </Bar>
          ))}
      </Section>
    </>
  );
};

export default AdminNotification;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
`;
const Button = styled.div`
  border: none;
  background-color: tranparent;
  cursor: pointer;
`;
const Bar = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-bottom: 1px solid #000;
`;
const Title = styled.h3`
  margin-top: -5px;
  margin-bottom: 0px;
  font-weight: 600;
  letter-spacing: 1px;
`;
const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0px;
`;
const Div4 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input2 = styled.input`
  border-radius: 100%;
  margin-top: -50px;
  color: #89cfc7;
  background-color: #89cfc7;
`;
const Buttons = styled.button`
  border-radius: 5px;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
