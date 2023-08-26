import React, {
  Component,
  useEffect,
  useState,
  CSSProperties,
  onChange,
} from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { API, Auth, DataStore, graphqlOperation, Hub } from "aws-amplify";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgTemplate } from "react-icons/cg";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import Log from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/rightcli2logo.png";
import { GoMail } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { CiTrophy, CiLogout } from "react-icons/ci";
import { BiMessageAltDots } from "react-icons/bi";
import {
  listProjectApproveds,
  notificationByQuerryID,
} from "../../graphql/queries";
import {
  onCreateProjectApproved,
  onDeleteProjectApproved,
  onUpdateProjectApproved,
} from "../../graphql/subscriptions";
const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Left = styled.div`
  width: 20%;
  padding-top: 20px;
  align-items: center;
  position: fixed;
  top: 0;
  height: 100vh;
  text-align: center;
  background-color: #fff; ;
`;
const Right = styled.div`
  width: 80%;
  margin-left: 20%;
  background-color: #f1f1f1;
`;
const Logo = styled.img`
  width: 70%;
  margin-bottom: 10px;
`;
const Hr = styled.hr`
  width: 100%;
  margin-top: -10px;
`;
const Div = styled.div`
  margin: 5px;
  margin-top: -15px;
  text-align: left;
  display: inline-flex;
  padding-left: 0px;
  flex-direction: column;
`;
const NavLink = styled(Link)`
  // font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  width: 250px;
  border-radius: 10px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
  letter-spacing: 1.5px;
  padding-left: 50px;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 10px;
  margin-bottom: 2px;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const NavLinks = styled.div`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  font-size: 1rem;
  display: flex;
  font-weight: 200;
  flex-direction: column;
  text-align: left;
  cursor: pointer;
  width: 100%;
  margin-right: 0px;
  margin-top: 1px;
  margin-bottom: 1px;
`;
const InnerLink = styled(Link)`
  text-decoration: none;
  color: #000;
  width: 250px;
  border-radius: 10px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding-top: 8px;
  padding-bottom: 8px;
  letter-spacing: 1.5px;
  padding-left: 50px;
  cursor: pointer;
  margin-left: 25px;
  margin-right: 0px;
  &:hover {
    color: #b5b5b5;
  }
`;
const Div2 = styled.div`
  display: flex;
  width: 5.2rem;
  justify-content: space-between;
`;
const Button = styled.button`
  text-decoration: none;
  background-color: transparent;
  color: #000;
  width: 250px;
  border: none;
  border-radius: 10px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
  letter-spacing: 1.5px;
  padding-left: 50px;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
const NavLink2 = styled(Link)``;
const AdminPanel = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [tennant, setTenant] = useState(false);
  const [todos, setTodos] = useState([]);
  const [dot, setDot] = useState(false);
  const [notification, setNotification] = useState(false);
  async function fetchTenant() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { accessToken } = await Auth.currentSession();
      const cognitogroups = accessToken.payload["cognito:groups"];
      const tenant = cognitogroups[0];
      console.log(user);
      if (tenant == "Admin") {
        setTenant(true);
      }
    } catch (err) {
      console.log(err);
      nav("/admin/login/");
    }
  }
  function navigation() {
    nav("/admin/login/");
  }

  useEffect(() => {
    fetchTenant();
    getData();
  }, []);
  async function signOut() {
    try {
      await Auth.signOut();
      nav("/admin/login/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  async function getData() {
    const response = await API.graphql(
      graphqlOperation(notificationByQuerryID, {
        QId: id,
      })
    );
    const items = response?.data?.notificationByQuerryID?.items;
    console.log(items.length);
    if (items.length > 0) {
      setNotification(true);
    }
  }

  useEffect(() => {
    fetchTodos();
    subscribeToChanges();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(
        graphqlOperation(listProjectApproveds)
      );
      const todos = todoData.data.listProjectApproveds.items;
      setTodos(todos);
      updateDot(todos);
    } catch (error) {
      console.log("error fetching todos", error);
    }
  }

  function subscribeToChanges() {
    const createTodoListener = API.graphql(
      graphqlOperation(onCreateProjectApproved)
    ).subscribe({
      next: (todoData) => {
        const newTodo = todoData.value.data.onCreateProjectApproved;
        setTodos((todos) => [...todos, newTodo]);
        updateDot([...todos, newTodo]);
      },
    });

    const updateTodoListener = API.graphql(
      graphqlOperation(onUpdateProjectApproved)
    ).subscribe({
      next: (todoData) => {
        const updatedTodo = todoData.value.data.onUpdateProjectApproved;
        setTodos((todos) =>
          todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
        updateDot(
          todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
      },
    });

    const deleteTodoListener = API.graphql(
      graphqlOperation(onDeleteProjectApproved)
    ).subscribe({
      next: (todoData) => {
        const deletedTodo = todoData.value.data.onDeleteProjectApproved;
        setTodos((todos) => todos.filter((todo) => todo.id !== deletedTodo.id));
        updateDot(todos.filter((todo) => todo.id !== deletedTodo.id));
      },
    });

    return () => {
      createTodoListener.unsubscribe();
      updateTodoListener.unsubscribe();
      deleteTodoListener.unsubscribe();
    };
  }

  function updateDot(updatedTodos) {
    const hasEmptyName = updatedTodos.some((todo) => !todo.creatorName);
    setDot(hasEmptyName);
  }

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  // async function fetchTodos() {
  //   try {
  //     const todoData = await API.graphql(
  //       graphqlOperation(listProjectApproveds)
  //     );
  //     const todos = todoData.data.listProjectApproveds.items;

  //     // Check if any todo has an empty name field
  //     const hasEmptyName = todos.some((todo) => !todo.creatorName);
  //     if (hasEmptyName) {
  //       setDot(true);
  //     }
  //   } catch (error) {
  //     console.log("error fetching todos", error);
  //   }
  // }

  return (
    <>
      {tennant ? (
        <Container>
          <Left>
            <NavLink2>
              <Logo src={Log} />
            </NavLink2>
            <Div>
              <NavLink to={`/admin/${id}/panel/`}>
                <MdDashboard size="26" />
                Dashboard
              </NavLink>
              <NavLinks>
                <InnerLink to={`/admin/${id}/panel/343fghzsvxfd ongoings/`}>
                  Ongoing Projects
                  <span>{dot ? <Numb></Numb> : <div></div>}</span>
                </InnerLink>
                <InnerLink to={`/admin/${id}/panel/343fghzsvxfd complted/`}>
                  Completed Projects
                </InnerLink>
                <InnerLink
                  to={`/admin/${id}/panel/343fghzsvxfd p e n d  i ngs/`}
                >
                  Pending Approvals
                </InnerLink>
              </NavLinks>
              <NavLink to={`/admin/${id}/panel/343fghzsvxfd/creator/`}>
                <AiOutlineStar size="26" />
                Creators
              </NavLink>
              <NavLinks>
                <InnerLink
                  to={`/admin/${id}/panel/343fghzsvxfd/creatorassign/`}
                >
                  Assign Creator
                </InnerLink>
                <InnerLink
                  to={`/admin/${id}/panel/343fghzsvxfd p e n d  i ngs/c34 r ea t or/`}
                >
                  Pending Approvals
                </InnerLink>
              </NavLinks>
              <NavLink to={`/admin/${id}/panel/343fghzsvxfdmessaging/`}>
                <BiMessageAltDots size="26" />
                Messaging
              </NavLink>
              <NavLink to={`/admin/${id}/panel/343fghzsvxfdwallet/`}>
                <IoNotificationsOutline size="26" />
                Wallet
              </NavLink>
              <NavLink to={`/admin/${id}/panel/343fghzsvxfnotifications/`}>
                <IoNotificationsOutline size="26" />
                Notifications
                <span>{notification ? <Numb></Numb> : <div></div>}</span>
              </NavLink>
              <Button onClick={signOut}>
                <CiLogout size="26" />
                Log Out
              </Button>
            </Div>
          </Left>
          <Right>
            <Outlet />
          </Right>
        </Container>
      ) : (
        <div>not admin</div>
      )}{" "}
    </>
  );
};

export default AdminPanel;
const Numb = styled.div`
  background-color: red;
  width: 8px;
  height: 8px;
  align-items: center;
  text-align: center;
  display: flex;
  margin-top: -5px;
  border-radius: 100%;
`;
