import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Auth, Hub } from "aws-amplify";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import LogoImage from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/right-cliq-textual.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../Home";
const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Left = styled.div`
  width: 60%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Left2 = styled.div`
  width: 60%;
  padding: 2rem;
  text-align: center;
  align-items: center;
  display: flex;
  background-color: #fff;
  justify-content: center;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin-top: -10px;
  align-items: center;
  text-align: center;
`;
const Logo = styled.img`
  width: 20%;
  margin-top: -4px;
  margin-bottom: 8px;
  margin-right: 4px;
`;
const Right = styled.div`
  width: 40%;
  background-color: #8cdacd;
  // background-image: linear-gradient(
  //   180deg,
  //   hsl(240deg 100% 20%) 72%,
  //   hsl(250deg 82% 23%) 86%,
  //   hsl(253deg 67% 27%) 92%,
  //   hsl(255deg 57% 31%) 95%,
  //   hsl(257deg 49% 34%) 98%,
  //   hsl(258deg 42% 38%) 99%,
  //   hsl(259deg 37% 42%) 100%,
  //   hsl(260deg 32% 45%) 101%,
  //   hsl(261deg 28% 49%) 101%,
  //   hsl(261deg 27% 53%) 101%,
  //   hsl(262deg 27% 56%) 102%,
  //   hsl(262deg 27% 60%) 102%,
  //   hsl(263deg 27% 64%) 102%,
  //   hsl(263deg 28% 68%) 102%,
  //   hsl(264deg 28% 72%) 101%,
  //   hsl(264deg 28% 76%) 101%,
  //   hsl(264deg 28% 80%) 101%,
  //   hsl(264deg 28% 84%) 101%,
  //   hsl(265deg 29% 88%) 101%,
  //   hsl(265deg 29% 92%) 100%,
  //   hsl(265deg 29% 96%) 100%,
  //   hsl(0deg 0% 100%) 100%
  // );
`;
const P = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  margin-left: 8px;
  font-family: sans-serif;
  letter-spacing: 1.4px;
`;
const Title = styled.h1`
  margin: -4px;
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: 1px;
`;
const Div = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Input = styled.input`
  border-top-left-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 280px;
  padding: 1rem;
  text-align: left;
  border-bottom-left-radius: 10px;
  font-size: 1.3rem;
`;
const Input2 = styled.input`
  border-top-right-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 280px;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  border-bottom-right-radius: 10px;
`;
const Input3 = styled.input`
  border-radius: 10px;
  height: 40px;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 500px;
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  background-color: #e8e8e8;
  border: none;
  outline: none;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  color: #fff;
  width: 500px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 8px;
  background-color: #2a2a2a;
  padding-left: 8px;
  font-size: 1.1rem;
  margin: 20px;
  border: none;
  font-weight: 500;
  margin-bottom: 10px;
  border-radius: 20px;
  &:hover {
    background-color: #2a2a2a;
    color: #fff;
  }
`;
const Log = styled.p`
  margin: -5px;
  font-weight: bold;
  color: #090167;
`;
const Button2 = styled.button`
  background-color: #fff;
  border: none;
  margin: -15px;
  color: #090167;
  font-weight: bold;
  pointer: cursor;
`;

const AdminLog = () => {
  const navigate = useNavigate();
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    authCode: "",
    formType: "signIn",
  };
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  const [tennant, setTenant] = useState(false);
  // async function fetchTenant() {
  //   // get the access token of the signed in user
  //   const { accessToken } = await Auth.currentSession();
  //   // get the tenant from the top of the cognito groups list
  //   const cognitogroups = accessToken.payload["cognito:groups"];
  //   const tenant = cognitogroups[0];
  //   setTenant(tenant);
  //   console.log(tenant);
  // }
  function signOut() {
    Auth.signOut();
    console.log("signout");
  }
  const fetchTenant = async () => {
    try {
      const { accessToken } = await Auth.currentSession();
      // get the tenant from the top of the cognito groups list
      const cognitogroups = accessToken.payload["cognito:groups"];
      const tenant = cognitogroups[0];
      console.log(tenant);
      if (tenant == "Admin") {
        navigate("/admin/t1789010-73bsxssnauy87 hoysghb/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      fetchTenant();
    } catch (err) {
      console.log(err);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    }
  };
  const setAuthListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          console.log(data);

          updateFormState(() => ({
            ...formState,
            formType: "signIn",
          }));

          break;
        case "signIn":
          console.log(data);

          break;
      }
    });
  };
  useEffect(() => {
    // checkUser();
    signOut();
    // setAuthListener();
  }, []);
  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }
  const { formType } = formState;
  async function signIn() {
    const { username, password } = formState;
    await Auth.signIn(username, password);
    // updateFormState(() => ({ ...formState, formType: "confirmedUser" }));
    checkUser();
  }
  return (
    <>
      {formType === "signIn" && (
        <Container>
          <Left2>
            {" "}
            <Header>
              <P> Login to your account</P>
              <Logo src={LogoImage} />
            </Header>
            {/* <Title>Get Started</Title> */}
            <Input3
              type="text"
              name="username"
              onChange={onChange}
              placeholder="Email"
              autoComplete="off"
            />
            <Input3
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
              autoComplete="off"
            />
            <Button onClick={signIn}>LOG IN</Button>
            <Bar>
              <NavLink3 to="/f g t p as s word/">Forgot Password</NavLink3>
            </Bar>
          </Left2>
          <Right></Right>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Container>
      )}

      {/* {formType === "confirmedUser" && <Home />} */}
    </>
  );
};

export default AdminLog;
const NavLink3 = styled(Link)`
  text-decoration: none;
  color: #0028dd;
  pointer: cursor;
`;
const NavLink4 = styled.button`
  text-decoration: none;
  border: none;
  pointer: cursor;
  background-color: transparent;
`;
const Bar = styled.div`
  width: 594px;
  padding: 0px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
