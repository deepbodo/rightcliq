// import React, { useEffect, useState } from "react";
// import { Auth, Hub } from "aws-amplify";

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [pending, setPending] = useState(true);
//   const [groups, setGroups] = useState();
//   const getGroup = async () => {
//     // const user = await Auth.currentAuthenticatedUser();
//     // const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
//     // console.log(groups);
//     try {
//       const user = await Auth.currentAuthenticatedUser();
//       const items = user?.attributes?.sub;
//       console.log(typeof items);
//       setCurrentUser(...items);

//       // console.log(currentUser);
//     } catch (err) {
//       console.log("checkUser error", err);
//     }
//   };

//   useEffect(() => {
//     getGroup();
//   }, []);

//   return (
//     <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
//   );
// };
