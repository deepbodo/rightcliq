import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { listCreatorApproveds, listUserDetails } from "../../graphql/queries";
import { FaSearch } from "react-icons/fa";
import Log from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/usericon.jpg";
const Conatiner = styled.div`
  display: flex;
  background-color: #ebebeb;
`;
const Left = styled.div`
  width: 40%;
  padding-top: 30px;
  min-height: 100vh;
  display: flex;

  flex-direction: column;
`;
const Right = styled.div`
  width: 60%;
  background-color: #80c2b9;
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  position: fixed;
  top: 0;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4.8rem;
  letter-spacing: 2px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: -15px;
  margin-left: 50px;
`;
const H2 = styled.p`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2.1px;
  text-align: left;
  margin-bottom: -15px;
`;
const Bar = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  padding: 4px;
  align-items: center;
`;

const AdminMessaging = () => {
  const { id } = useParams();
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    listUsers();
  }, []);
  async function listUsers() {
    API.graphql(graphqlOperation(listUserDetails)).then((response) => {
      const items = response?.data?.listUserDetails?.items;
      console.log(items);
      setUserList(items);
    });
  }
  async function listCreators() {
    API.graphql(graphqlOperation(listCreatorApproveds)).then((response) => {
      const items = response?.data?.listCreatorApproveds?.items;
      setUserList(items);
    });
  }
  return (
    <Conatiner>
      <Left>
        <Div3>
          <FaSearch color="#626262" size="20" />
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Div3>
        <H>Inbox</H>
        <Bar>
          <Button onClick={listCreators}>Creators</Button>
          <Button onClick={listUsers}>Users</Button>
        </Bar>

        {userList
          .filter((datas) =>
            datas.fisrtname.toLowerCase().includes(search.toLowerCase())
          )
          .map((data, index) => {
            return (
              <NavLink
                to={`/admin/${id}/panel/343fghzsvxfdmessaging/${data.QId}/${data.fisrtname}`}
              >
                {" "}
                <Div>
                  <Img src={Log} />
                  <Right2>
                    <H2>{data.fisrtname}</H2>
                    <P>{data.QId}</P>
                  </Right2>
                </Div>
              </NavLink>
            );
          })}
      </Left>
      <Right>
        <Outlet />
      </Right>
    </Conatiner>
  );
};

export default AdminMessaging;

const Input = styled.input`
  width: 30%;
  padding: 10px;
  height: 35px;
  border: none;
  border-radius: 10px 0 0 10px;
  border-right: none;
  // box-shadow: 0 0 10px #38b6ff;
  outline: none;
  font-size: 30px;
  background: none;
  @media (max-width: 800px) {
    width: 14rem;
  }
`;
const P = styled.p`
  font-size: 15px;
`;
const Button = styled.button`
  width: 90px;
  outline: none;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 2px;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  background: none;
  font-size: 20px;
`;
const Div3 = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  margin-left: 50px;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  padding: 50px;
  height: 110px;
  align-items: center;
  text-align: center;
  background-color: transparent;
  border-bottom: 1px solid #000000;
  &:hover {
    background-color: #d9d9d9;
    border-bottom: none;
  }
`;
const Right2 = styled.div`
  display: flex;
  width: 100%;
  margin-left: 30px;
  flex-direction: column;
  align-items: left;
  text-align: left;
`;
const Img = styled.img`
  width: 90px;
  height: 70px;
  border-radius: 50%;
  margin: 0px;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
