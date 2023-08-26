import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import LogoImage from "../Images/rightcli2logo.png";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { createUserDetail } from "../graphql/mutations";
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
`;
const Left = styled.div`
  width: 65%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Left2 = styled.div`
  width: 65%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  text-align: center;
`;
const Logo = styled.img`
  width: 15%;
  margin-right: 4px;
`;
const Right = styled.div`
  width: 35%;
  height: 100%;
  background-color: #8cdacd;
`;
const P = styled.h1`
  font-weight: 50;
  font-size: 2rem;
  font-weight: 400;
  margin-left: 8px;
  letter-spacing: 1px;
`;
const Title = styled.h1`
  margin: -4px;
  margin-top: -5px;
  margin-bottom: -10px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 2.2rem;
  letter-spacing: 3.5px;
`;
const Div = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Input = styled.input`
  border-top-left-radius: 10px;
  height: 40px;
  margin: 12px;
  width: 245px;
  margin-right: 8px;
  padding: 1rem;
  text-align: left;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #e8e8e8;
  border: none;
  outline: none;
`;
const Input2 = styled.input`
  border-top-right-radius: 10px;
  height: 40px;
  margin-left: 5px;
  width: 245px;
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  border-radius: 10px;
  background-color: #e8e8e8;
  border: none;
  outline: none;
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
  color: #000;
  font-weight: bold;
  pointer: cursor;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const initialFormState = {
    username: "",
    email: "",
    fisrtname: "",
    lastname: "",
    employee: "",
    phone: "",
    password: "",
    companyname: "",
    authCode: "",
    formType: "signUp",
  };
  const [Id, setId] = useState(null);
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      setId(user.attributes.sub);
      console.log(user);
      updateFormState(() => ({ ...formState, formType: "confirmedUser" }));
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
    checkUser();
    setAuthListener();
  }, []);
  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }
  const navigateToContacts = () => {
    navigate("/");
  };
  const { formType } = formState;
  async function signUp() {
    const { email, password } = formState;
    const user = await Auth.signUp({
      username: formState.email,
      email: formState.email,
      password: formState.password,
      attributes: {
        email: formState.email,
      },
    });
    await createUser(user);
    // await Auth.signUp({ username, email, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  }
  async function createUser(data) {
    const input = {
      email: formState.email,
      QId: data.userSub,
      phone: formState.phone,
      fisrtname: formState.fisrtname,
      lastname: formState.lastname,
      employee: formState.employee,
      companyname: formState.companyname,
      dataconfirm: 1,
    };
    const result = await API.graphql(
      graphqlOperation(createUserDetail, { input })
    );
    console.log("createUser result", result);
  }
  async function confirmSignUp() {
    const { username, authCode } = formState;

    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  }
  async function signIn() {
    const { username, password } = formState;
    await Auth.signIn(username, password);
    const user = await Auth.currentAuthenticatedUser();
    setId(user.attributes.sub);
    updateFormState(() => ({ ...formState, formType: "confirmedUser" }));
  }
  return (
    <>
      {formType === "signUp" && (
        <Container>
          <Left>
            {" "}
            <Title>Get Started</Title>
            <Header>
              <Logo src={LogoImage} />
            </Header>
            <Div>
              {" "}
              <Input
                type="text"
                name="fisrtname"
                onChange={onChange}
                placeholder="First Name"
              />
              <Input2
                type="text"
                name="lastname"
                onChange={onChange}
                placeholder="Last Name"
              />
            </Div>
            <Input3
              type="text"
              name="companyname"
              onChange={onChange}
              placeholder="Company Name"
            />
            <Input3
              type="number"
              name="phone"
              onChange={onChange}
              placeholder="Phone Number"
            />
            <Input3
              type="number"
              name="employee"
              onChange={onChange}
              placeholder="Number Of Employee"
            />
            <Input3
              type="email"
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
            <Input3
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            <Input3
              type="confirmpassword"
              name="confirmpassword"
              onChange={onChange}
              placeholder="Confirm Password"
            />
            <Button onClick={signUp}>SignUP</Button>
            <p>Already have an account?</p>
            <Button2
              // to="/signin"
              onClick={() =>
                updateFormState(() => ({ ...formState, formType: "signIn" }))
              }
            >
              LOG IN
            </Button2>
          </Left>
          <Right></Right>
        </Container>
      )}
      {formType === "signIn" && (
        <Container>
          <Left2>
            {" "}
            <Title>Log Into Your Account</Title>
            <Header>
              <Logo src={LogoImage} />
            </Header>
            <Input3
              type="text"
              name="username"
              onChange={onChange}
              placeholder="Email"
            />
            <Input3
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            <Button onClick={signIn}>LOG IN</Button>
            <Bar>
              <NavLink4
                // to="/sign"
                onClick={() =>
                  updateFormState(() => ({ ...formState, formType: "signUp" }))
                }
              >
                Don't have an account?
              </NavLink4>
              <NavLink3 to="/f g t p as s word/">Forgot Password</NavLink3>
            </Bar>
          </Left2>

          <Right></Right>
        </Container>
      )}
      {formType === "confirmSignUp" && (
        <Container>
          <Left2>
            <P>Check email for confirmation code!</P>
            <Input3
              name="authCode"
              onChange={onChange}
              placeholder="Confirmation Code"
            />
            <Button onClick={confirmSignUp}>Confirm</Button>
          </Left2>
          <Right></Right>
        </Container>
      )}
      {formType === "confirmedUser" && navigate(`/business/${Id}/`)}
    </>
  );
};

export default SignUp;

const NavLink3 = styled(Link)`
  text-decoration: none;
  color: #2a2a2a;
  cursor: pointer;
  color: #0028dd;
  font-size: 13px;
  &:hover {
    color: #0028dd;
  }
`;
const NavLink4 = styled.button`
  text-decoration: none;
  border: none;
  font-size: 13px;
  color: #0028dd;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    color: #0028dd;
  }
`;
const Bar = styled.div`
  width: 510px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;
