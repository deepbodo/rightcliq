import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import LogoImage from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/rightcli2logo.png";
import { createCreatorDetail } from "../../graphql/mutations";
import uuid from "react-uuid";
import CreatorDetailForm from "./CreatorDetailForm";
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
  align-items: center;
  text-align: center;
  margin-bottom: -20px;
`;
const Logo2 = styled.img`
  width: 15%;
  margin-right: 4px;
  margin: 15px;
  margin-bottom: 30px;
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
const Title = styled.h2`
  margin: -4px;
  margin-top: -5px;
  margin-bottom: -10px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 2.2rem;
  letter-spacing: 3.5px;
`;
const Title2 = styled.h2`
  margin: -4px;
  margin-top: -5px;
  margin-bottom: -10px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
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
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 8px;
  background-color: #2a2a2a;
  padding-left: 8px;
  font-size: 1.2rem;
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
const H2 = styled.p`
  color: #000;
  font-weight: 590;
  margin-left: 10px;
  font-size: 20px;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
`;
const H3 = styled.p`
  color: #000;
  font-weight: 590;
  margin-left: 0px;
  margin-bottom: 30px;
  font-size: 20px;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
`;
const CreatorLogin = () => {
  const navigate = useNavigate();
  const [formState, updateFormState] = useState("signUp");
  const [userIsCreator, setUserIsCreator] = useState(false);
  // const [user, updateUser] = useState(null);
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      if (
        user.signInUserSession.accessToken.payload["cognito:groups"].includes(
          "Creator"
        )
      ) {
        // console.log("User is signed in", user);
        setUserIsCreator(true);
      }
    } catch (err) {
      console.log("User is not signed in", err);
    }
  };
  const setAuthListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          console.log(data);

          updateFormState("signIn");

          break;
        case "signIn":
          console.log(data);

          break;
      }
    });
  };
  useEffect(() => {
    signOut();
    // setAuthListener();
  }, []);
  function signOut() {
    Auth.signOut();
    console.log("signout");
  }
  let formInputState = {
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    confirmpassword: "",
    verificationCode: "",
  };

  /* onChange handler for form inputs */
  function onChange(e) {
    formInputState = { ...formInputState, [e.target.name]: e.target.value };
  }
  async function createUser(data) {
    const input = {
      email: formInputState.email,
      QId: data.userSub,
      phone: formInputState.phone,
      fisrtname: formInputState.firstname,
      lastname: formInputState.lastname,
      experience: formInputState.experience,
    };
    const result = await API.graphql(
      graphqlOperation(createCreatorDetail, { input })
    );
    console.log("createUser result", result);
  }
  /* Sign up function */
  async function signUp() {
    try {
      console.log(formInputState);
      const user = await Auth.signUp({
        username: formInputState.email,
        email: formInputState.email,
        password: formInputState.password,
        attributes: {
          email: formInputState.email,
        },
      });
      console.log(user);
      await createUser(user);
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
      // console.log(user);
      updateFormState("confirmSignUp");
    } catch (err) {
      console.log({ err });
    }
  }
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(
        formInputState.username,
        formInputState.verificationCode
      );
      /* Once the user successfully confirms their account, update form state to show the sign in form*/
      updateFormState("signIn");
    } catch (err) {
      console.log({ err });
    }
  }
  async function signIn() {
    try {
      const user = await Auth.signIn(
        formInputState.username,
        formInputState.password
      );
      /* Once the user successfully signs in, update the form state to show the signed in state */
      console.log(user.attributes.sub);
      if (user) {
        navigate(`/creatoruser/details/${user.attributes.sub}/`);
      }

      // } else {
      //   alert("You are not a creator");
      // }
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <>
      {formState === "signUp" && (
        <Container>
          <Left>
            {" "}
            <Title>Get Started</Title>
            <Header>
              <Logo src={LogoImage} />
              <H2>for Creator</H2>
            </Header>
            <Div>
              {" "}
              <Input
                type="text"
                name="firstname"
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
              name="industry"
              onChange={onChange}
              placeholder="Industry"
            />
            <Input3
              type="number"
              name="experience"
              onChange={onChange}
              placeholder="Experience(in years)"
            />
            <Input3
              type="text"
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
            <Input3
              type="number"
              name="phone"
              onChange={onChange}
              placeholder="Phone"
            />
            <Input3
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            <Button onClick={signUp}>SIGN UP</Button>
            <p onClick={() => updateFormState("signIn")}>
              Already have an account?
            </p>
            {/* <Button2
              to="/signin"
              onClick={() =>
                updateFormState(() => ({ ...formState, formType: "signIn" }))
              }
            >
              LOG IN
            </Button2> */}
          </Left>
          <Right></Right>
        </Container>
      )}
      {formState === "confirmSignUp" && (
        <Container>
          <Left2>
            <P>Check email for confirmation code!</P>
            <Input3
              name="verificationCode"
              onChange={onChange}
              placeholder="Confirmation Code"
            />
            <Button onClick={confirmSignUp}>Confirm</Button>
          </Left2>
          <Right></Right>
        </Container>
      )}
      {formState === "signIn" && (
        <Container>
          <Left>
            {" "}
            <Title2>Log Into Your Account</Title2>
            <Header>
              <Logo2 src={LogoImage} />
              <H3>for Creator</H3>
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
              <NavLink4 onClick={() => updateFormState("signUp")}>
                Don't have an account?
              </NavLink4>
              <NavLink3 to="/f g t p as s word/">Forgot Password</NavLink3>
            </Bar>
          </Left>
          <Right></Right>
        </Container>
      )}
    </>
  );
};

export default CreatorLogin;

const NavLink3 = styled(Link)`
  text-decoration: none;
  color: #2a2a2a;
  pointer: cursor;
`;
const NavLink4 = styled.button`
  text-decoration: none;
  border: none;
  pointer: cursor;
  background-color: transparent;
`;
const Bar = styled.div`
  width: 500px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
