import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Auth, Hub } from "aws-amplify";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import LogoImage from "../Images/rightcli2logo.png";
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
  justify-content: center;
  flex-direction: column;
`;
const Right = styled.div`
  width: 40%;
  background-color: #8cdacd;
`;
const P = styled.h1`
  font-weight: 50;
  font-size: 2rem;
  font-weight: 400;
  margin-left: 8px;
  letter-spacing: 1px;
`;
const Input3 = styled.input`
  border-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 594px;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  background-color: #e8e8e8;
  border: none;
`;
const Button = styled.button`
  color: #fff;
  width: 594px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 8px;
  background-color: #2a2a2a;
  padding-left: 8px;
  font-size: 1.4rem;
  margin: 20px;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #2a2a2a;
    color: #fff;
  }
`;
const ForgotPassWord = () => {
  const navigate = useNavigate();
  //   const [formType, setFormType] = useState("enteremail");

  const initialFormState = {
    username: "",
    formType: "enteremail",
    newPass: "",
    code: "",
  };

  const [formState, updateFormState] = useState(initialFormState);
  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }
  const { formType } = formState;
  async function sendCode() {
    const { username } = formState;
    await Auth.forgotPassword(username);
    console.log("Password reset request sent successfully");
    // await Auth.signUp({ username, email, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "enterCode" }));
  }
  async function changePassword() {
    const { username, code, newPass } = formState;
    await Auth.forgotPasswordSubmit(username, code, newPass);
    console.log("Password changed successfully");
    navigate("/");
  }
  return (
    <>
      {formType === "enteremail" && (
        <Container>
          <Left>
            {" "}
            <P>Enter Email Address</P>
            <Input3
              name="username"
              onChange={onChange}
              placeholder="xyz@gmail.com"
            />
            <Button onClick={sendCode}>Confirm</Button>
          </Left>
          <Right></Right>
        </Container>
      )}
      {formType === "enterCode" && (
        <Container>
          {" "}
          <Left>
            {" "}
            <P>Check Email For Reset Code</P>
            <Input3
              name="username"
              onChange={onChange}
              placeholder="xyz@gmail.com"
            />
            <Input3 name="code" onChange={onChange} placeholder="Enter Code" />
            <Input3
              name="newPass"
              onChange={onChange}
              placeholder="New Password"
            />
            <Button onClick={changePassword}>Confirm</Button>
          </Left>
          <Right></Right>
        </Container>
      )}
    </>
  );
};

export default ForgotPassWord;
