import React from "react";
import styled from "styled-components";
const Box = styled.div`
  height: 200px;
  background-color: #292929;
  display: flex;
  align-items: center;
`;
const Right2 = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  margin-left: 30px;
  flex-direction: row;
  align-items: left;
  text-align: left;
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 30px;
`;
const H2 = styled.p`
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2.1px;
  text-align: left;
  margin-bottom: -15px;
`;
const StartChat = () => {
  return (
    <div>
      <Wrapper></Wrapper>
    </div>
  );
};

export default StartChat;
const Wrapper = styled.div`
  width: 100%;
  background-color: #81c2ba;
  display: flex;
  flex-direction: column;
  // height: calc(100vh - 180px);
  height: 100vh;
  justify-content: center;
`;
