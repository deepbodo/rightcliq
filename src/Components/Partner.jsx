import React from "react";
import styled from "styled-components";
import Google from "../Images/google.png";
import Adobe from "../Images/adobe.png";
import Canva from "../Images/Canva.png";
import Wordpres from "../Images/Wordpres.png";
const Container = styled.div`
  height: 100vh;
  padding: 190px;
  padding-left: 120px;
  padding-right: 120px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #f1f1f1;
  justify-content: center;
`;
const P = styled.p`
  font-family: "Ubuntu", sans-serif;
  font-size: 1.3rem;
  text-align: center;
  color: #464d53;
  margin-top: 30px;
  padding-bottom: -2px;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  width: fit-content;
`;
const Div = styled.div`
  background-color: #fec09d;
  height: 500px;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  justify-content: space-around;
`;
const Logo = styled.img`
  width: 20%;
  margin: 8px;
`;
const Partner = () => {
  return (
    <Container>
      <Div>
        <P>BUSNIESS PARTNERS / USERS</P>
        <Wrapper>
          <Logo src={Google} />
          <Logo src={Adobe} />
          <Logo src={Canva} />
          <Logo src={Wordpres} />
          <Logo src={Google} />
          <Logo src={Adobe} />
          <Logo src={Canva} />
          <Logo src={Wordpres} />
        </Wrapper>
      </Div>
    </Container>
  );
};

export default Partner;
