import React, { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import styled from "styled-components";
import { Auth, Hub, graphqlOperation } from "aws-amplify";
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Timer = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [users, updateUser] = useState();
  const checkUser = async () => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        navigate(`/admin/${user.attributes.sub}/panel/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    checkUser();
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 5000);
  }, []);
  return (
    <>
      {showLoader ? (
        <ContainerCenter>
          <GridLoader size={15} color="#00e6e6" />
        </ContainerCenter>
      ) : (
        <div>Timer</div>
      )}
    </>
  );
};

export default Timer;
