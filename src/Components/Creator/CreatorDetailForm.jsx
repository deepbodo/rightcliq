import React, { useContext, useState, useEffect } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import UserContext from "./UserContext";
import { Routes, Route, useNavigate, Link, useParams } from "react-router-dom";
import { creatorDataByQuerryID } from "../../graphql/queries";
import Portofolio from "./Portofolio";
import CreatorPanel from "./CreatorPanel";

const CreatorDetailForm = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userIsCreator, setUserIsCreator] = useState(false);
  const [detail, setDetails] = useState();
  const [qid, setQid] = useState();
  const [resume, setresume] = useState();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const sub = user.attributes.sub;
        setQid(sub);

        if (
          user.signInUserSession.accessToken.payload["cognito:groups"].includes(
            "Creator"
          )
        ) {
          // console.log("User is signed in", user);
          setUserIsCreator(true);
        }
        // const todo = await API.graphql(
        //   graphqlOperation(creatorDataByQuerryID, {
        //     QId: qid,
        //   })
        // );
        // console.log(todo);
      } catch (err) {
        console.log("User is not signed in", err);
      }
    };
    checkUser();
    checkData();
  }, []);
  const checkData = async () => {
    const todo = await API.graphql(
      graphqlOperation(creatorDataByQuerryID, {
        QId: id,
      })
    );
    const newtodo = todo?.data?.creatorDataByQuerryID?.items;
    setDetails(newtodo);
    if (newtodo) {
      newtodo.map((data) => {
        setresume(data.resume);
      });
    }

    console.log(newtodo.resume);
  };
  if (userIsCreator && resume) {
    return nav(`/creatoruser/details/${id}/dashboard/`);
    // return (
    //   // <>
    //   //   <CreatorPanel />
    //   // </>
    // );
    // return nav("/creator/login/");
  } else if (userIsCreator && !resume) {
    return (
      <>
        <Portofolio />
      </>
    );
  } else {
    return nav(`/creator/login/`);
  }
};

export default CreatorDetailForm;
