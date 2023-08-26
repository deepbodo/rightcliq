import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import ProgressiveImage from "../ProgressiveImage";
import { APIClass, Auth, DataStore, Hub, Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { listCreatorApproveds, listUserDetails } from "../../graphql/queries";
import { FaSearch } from "react-icons/fa";
import AssignApprove from "./AssignApprove";
import { BsInfoCircle } from "react-icons/bs";
const Conatiner = styled.div`
  display: flex;
  height: auto;
  padding-top: 20px;
  background-color: #e9e9e9;
  flex-direction: column;
`;
const Div3 = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  margin-left: 50px;
`;
const Input = styled.input`
  width: 30%;
  padding: 10px;
  height: 35px;
  border: none;
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
const Navlink = styled(Link)`
  text-decoration: none;
  pointer: cursor;
  color: #fff;
`;
const CreatorList = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [datas, setData] = useState([]);
  useEffect(() => {
    async function getCreators() {
      const newtodo = await API.graphql(graphqlOperation(listCreatorApproveds));
      let todos = newtodo.data.listCreatorApproveds.items;
      // for all todos get the pre-signURL and store in images field
      todos = await Promise.all(
        todos.map(async (todo) => {
          const imageKey = await Storage.get(todo.image);
          console.log(imageKey);
          todo.image = imageKey;
          return todo;
        })
      );
      setData(todos);
    }
    getCreators();
  }, []);
  return (
    <>
      <Conatiner>
        <Div3>
          <FaSearch color="#626262" size={20} />
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Div3>
        <Container>
          <H>Available Creators</H>
          <Div>
            {datas
              .filter((data) =>
                data.fisrtname.toLowerCase().includes(search.toLowerCase())
              )
              .map((data, index) => {
                return (
                  <Card>
                    <Image src={data.image} />
                    <Title>
                      <Navlink
                        to={`/admin/${id}/panel/343fghzsvxfd/creator/${data.id}/details/`}
                      >
                        {" "}
                        <BsInfoCircle size="18" />
                      </Navlink>

                      <Div2>{data.fisrtname}</Div2>
                    </Title>
                  </Card>
                );
              })}
          </Div>
        </Container>
      </Conatiner>
    </>
  );
};

export default CreatorList;

const Div2 = styled.h2`
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  letter-spacing: 1px;
  margin: 0px;
  z-index: 10;
  align-items: center;
  justify-content: center;
`;
const Input2 = styled.input`
  height: 30px;
  width: 20px;
`;
const Image = styled.img`
  width: 200px;
  height: 198px;
  object-fit: cover;
`;
const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9e9e9;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4rem;
  letter-spacing: 2px;
  margin-top: -20px;
`;
const options = [
  {
    label: "Creator 1",
    creatorId: "1",
  },
  {
    label: "Creator 2",
    creatorId: "2",
  },
  {
    label: "Creator 3",
    creatorId: "3",
  },
  {
    label: "Creator 4",
    creatorId: "4",
  },
  {
    label: "Creator 5",
    creatorId: "5",
  },
  {
    label: "Creator 6",
    creatorId: "6",
  },
  // {
  //   label: "Creator 7",
  //   creatorId: "7",
  // },
  // {
  //   label: "Creator 8",
  //   creatorId: "8",
  // },
];
const Card = styled.div`
  width: 250px;
  height: 200px;
  margin: auto;
  margin-bottom: 60px;
  background-color: #fff;
  align-items: center;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -40px;
  height: auto;
  width: 80%;
`;
const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 40px;
  align-items: center;
  z-index: 10;
  display: flex;
  padding: 10px;
  justify-content: center;
  text-align: center;
  margin-top: -6px;
  color: #fff;
  text-transform: uppercase;
  background-color: #292929;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Button = styled.button`
  color: #fff;
  width: 100px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 8px;
  background-color: #434242;
  padding-left: 8px;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  border-radius: 10px;
  &:hover {
    background-color: #ffff;
    color: #000;
  }
`;
