import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import {
  creatorChatsByQuerryID,
  creatorDataByQuerryID,
  listUserDetails,
} from "../../graphql/queries";
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
const CreatorMessaging = () => {
  const { id } = useParams();
  const [userList, setUserList] = useState([]);
  const [dataUser, setData] = useState({});
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function chatusers() {
      API.graphql(
        graphqlOperation(creatorChatsByQuerryID, {
          creatorID: id,
        })
      ).then((response) => {
        const items = response?.data?.creatorChatsByQuerryID?.items;
        console.log(items);
        setUserList(items);
      });
    }
    async function getData() {
      const newtodo = await API.graphql(
        graphqlOperation(creatorDataByQuerryID, {
          QId: id,
        })
      );
      const todo = newtodo?.data?.creatorDataByQuerryID?.items;
      if (todo) {
        todo.map(async (data) => {
          setData(data);
        });
      }
    }
    chatusers();
    getData();
  }, []);
  return (
    <Conatiner>
      <Left>
        <Div3>
          <FaSearch color="#626262" size="20" />
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Div3>
        <H>Inbox</H>
        <NavLink
          to={`/creatoruser/details/${id}/dashboard/343fghzsvxfdmessaging/${id}/${
            dataUser.fisrtname
          }/${"Admin"}/`}
        >
          {" "}
          <Div>
            <Img src={Log} />
            <Right2>
              <H2>Admin</H2>
              <P>{id}</P>
            </Right2>
          </Div>
        </NavLink>
        {userList
          // .filter((datas) =>
          //   datas.displayname.toLowerCase().includes(search.toLowerCase())
          // )
          .map((data, index) => {
            return (
              <NavLink
                to={`/creatoruser/details/${id}/dashboard/343fghzsvxfdmessaging/${data.channelID}/${dataUser.fisrtname}/${data.displayname}/`}
              >
                {" "}
                <Div>
                  <Img src={Log} />
                  <Right2>
                    <H2>{data.userdisplayname}</H2>
                    <P>{data.channelID}</P>
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

export default CreatorMessaging;

// const checkDuplicateQuery = `
//   query ListTodos($email: String!, $phone: String!) {
//     listTodos(filter: { email: { eq: $email }, phone: { eq: $phone } }, sortDirection: ASC, limit: 1) {
//       items {
//         id
//         createdAt
//       }
//     }
//   }
// `;

const Input = styled.input`
  width: 30%;
  padding: 10px;
  height: 35px;
  border: none;
  border-radius: 10px 0 0 10px;
  border-right: none;
  // box-shadow: 0 0 10px #38b6ff;
  outline: none;
  font-size: 25px;
  background: none;
  @media (max-width: 800px) {
    width: 14rem;
  }
`;
const P = styled.p`
  font-size: 15px;
`;
const Button = styled.button`
  text-align: center;
  height: 35px;
  width: 40px;
  outline: none;
  cursor: pointer;
  border: 2px solid #111d5e;
  border-radius: 0 10px 10px 0;
  // box-shadow: 0 0 10px #38b6ff;
  border-left: none;
  background: none;
  font-size: 20px;
  border-left: 4px solid #111d5e;
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

// import { API, graphqlOperation } from 'aws-amplify';

// const createTodoMutation = `
//   mutation CreateTodo($input: CreateTodoInput!) {
//     createTodo(input: $input) {
//       id
//       title
//       description
//       email
//       phone
//     }
//   }
// `;

// const createTodo = async (todo) => {
//   const checkDuplicateQuery = `
//     query ListTodos($email: String!, $phone: String!) {
//       listTodos(filter: { email: { eq: $email }, phone: { eq: $phone } }) {
//         items {
//           id
//         }
//       }
//     }
//   `;

//   const checkDuplicateResult = await API.graphql(graphqlOperation(checkDuplicateQuery, { email: todo.email, phone: todo.phone }));
//   if (checkDuplicateResult.data.listTodos.items.length > 0) {
//     throw new Error('Todo with the same email and phone already exists!');
//   }

//   const createTodoInput = {
//     title: todo.title,
//     description: todo.description,
//     email: todo.email,
//     phone: todo.phone,
//   };

//   const result = await API.graphql(graphqlOperation(createTodoMutation, { input: createTodoInput }));
//   return result.data.createTodo;
// };
