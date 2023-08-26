import React from "react";
import styled from "styled-components";
import "../Components/Err.css";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  background: #fff;
  font-family: "Arvo", serif;
`;
const Errs = styled.div`
  width: 100%;
`;
const Box = styled.div`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  width: 100%;
  align-items: center;
  text-align: center;
  background-position: center;
`;
const P = styled.h1`
  font-size: 60px;
`;
const H3 = styled.p`
  font-size: 20px;
`;
const Div = styled.div`
  margin-top: -50px;
`;
const A = styled.a`
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
  text-decoration: none;
`;
const Err = () => {
  return (
    <>
      <Container>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <Box>
                  <P class="text-center ">404</P>
                </Box>

                <Div>
                  <H3>the page you are looking for not avaible!</H3>

                  <A href="/home/" class="link_404">
                    Home
                  </A>
                </Div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Err;
