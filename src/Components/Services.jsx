import React from "react";
import styled from "styled-components";
import Human from "../Images/human.png";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
const Conatainer = styled.div`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;
const Title = styled.h2`
  font-family: "Ubuntu", sans-serif;
  font-size: 5rem;
  text-align: left;
  margin-bottom: -12px;
`;
const Div = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  margin: 80px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Left = styled.div`
  width: 60%;
  height: 300px;
  border-radius: 20px;
  background-color: #fba5a4;
`;
const Right = styled.div`
  width: 28%;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const Left2 = styled.div`
  width: 28%;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const Right2 = styled.div`
  width: 60%;
  height: 300px;
  border-radius: 20px;
  background-color: #fec09d;
`;
const H = styled.h2`
  font-size: 2.6rem;
  text-align: left;
  margin-top: -5px;
  margin-bottom: 1px;
`;
const P = styled.p`
  text-align: left;
  width: 80%;
  font-size: 1.3rem;
`;
const P2 = styled.p`
  text-align: center;
  width: 80%;
  font-size: 1.6rem;
`;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 200px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #292929;

  font-size: 1.3rem;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
const Services = (props) => {
  const user = props.users;
  return (
    <>
      <Conatainer>
        <Title>SERVICES OFFERED</Title>
        <Div>
          <Left></Left>
          <Right>
            <H>Lorem Ipsum</H>
            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla
            </P>
          </Right>
        </Div>
        <Div>
          <Left2>
            <H>Lorem Ipsum</H>
            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla
            </P>
          </Left2>
          <Right2></Right2>
        </Div>
        <Div>
          <Left></Left>
          <Right>
            <H>Lorem Ipsum</H>
            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla
            </P>
          </Right>
        </Div>
      </Conatainer>
      <Conatainer>
        <Title>SERVICES OFFERED</Title>
        <Div>
          <P2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu. Curabitur pellentesque
            nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
            lacus at sodales sodales. Quisque sagittis orci ut diam condimentum,
            vel euismod erat placerat. In iaculis arcu eros, eget tempus orci
            facilisis id.
          </P2>
        </Div>
        <NavLink to={`/business/${user}`}>GET STARTED</NavLink>
      </Conatainer>
      <Conatainer>
        <Title>TESTIMONIALS</Title>
        <Div2>
          <Card>
            <Logo src={Human} />
            <H1>Lorem Ipsum</H1>
            <P3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla
            </P3>
            <NavLink to={`/business/${user}`}>GET STARTED</NavLink>
          </Card>
          <Card>
            {" "}
            <Logo src={Human} />
            <H1>Lorem Ipsum</H1>
            <P3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla
            </P3>
            <NavLink to={`/business/${user}`}>GET STARTED</NavLink>
          </Card>
          <Card>
            {" "}
            <Logo src={Human} />
            <H1>Lorem Ipsum</H1>
            <P3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla
            </P3>
            <NavLink to={`/business/${user}`}>GET STARTED</NavLink>
          </Card>
        </Div2>
      </Conatainer>
      <Container>
        <Box>
          <H1>Lorem Ipsum</H1>
          <P4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu.
          </P4>
          <Div3>
            <NavLink to={`/business/${user}`}>GET STARTED</NavLink>
          </Div3>
        </Box>
      </Container>
    </>
  );
};

export default Services;

const Div2 = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  margin: 60px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Card = styled.div`
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const Logo = styled.img`
  width: 80%;
  border-radius: 50%;
`;
const H1 = styled.h2`
  font-size: 2.2rem;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 1px;
`;

const P3 = styled.p`
  text-align: center;
  width: 80%;
  font-size: 1.3rem;
`;
const P4 = styled.p`
  text-align: left;
  width: 90%;
  font-size: 1.6rem;
`;
const Container = styled.div`
  background-color: #f1f1f1;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px;
`;
const Box = styled.div`
  width: 70%;
  height: 600px;
  border-radius: 20px;
  padding: 50px;
  background-color: #8cdacd;
`;
const Div3 = styled.div`
  align-items: right;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const NavLink = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 200px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #292929;
  text-decoration: none;
  font-size: 1.3rem;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
