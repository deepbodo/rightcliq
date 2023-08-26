import React, { useEffect, useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import UserContext from "./UserContext";
import { creatorDataByQuerryID } from "../../graphql/queries";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userIsCreator, setUserIsCreator] = useState(false);
  const [detail, setDetails] = useState({});
  const [sub, setSub] = useState();
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      if (
        user.signInUserSession.accessToken.payload["cognito:groups"].includes(
          "Creator"
        )
      ) {
        setUserIsCreator(true);
      }
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, userIsCreator, sub }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
