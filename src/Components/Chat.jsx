// import React, { useEffect, useState } from "react";
// import { Auth, Hub, API, graphqlOperation } from "aws-amplify";
// import { listMessages, messagesByChannelID } from "../graphql/queries";
// import styled from "styled-components";
// import { createMessage } from "../graphql/mutations";
// import "@aws-amplify/pubsub";
// import { onCreateMessage } from "../graphql/subscriptions";
// import { useNavigate, Link, Outlet } from "react-router-dom";
// import { FixedSizeList as List } from "react-window";
// import { BiCollapse } from "react-icons/bi";
// import { render } from "react-dom";
// import { Comment } from "react-loader-spinner";
// import InfiniteScroll from "react-infinite-scroll-component";
// const Conatainer = styled.div`
//   background-color: rgba(129, 205, 252, 0.5);
//   padding: 1rem;
//   border-radius: 15px;
//   border: 1px solid;
//   border-color: #bcbcbc;
//   height: 100%;
//   border-bottom-left-radius: 0px;
//   border-top-left-radius: 0px;
// `;
// const Chat = () => {
//   const [dataSource, setDataSource] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [messages, setMessages] = useState([]);
//   useEffect(() => {
//     API.graphql(
//       graphqlOperation(messagesByChannelID, {
//         channelID: `1`,
//         sortDirection: "ASC",
//       })
//     ).then((response) => {
//       const items = response?.data?.messagesByChannelID?.items;

//       if (items) {
//         setMessages(items);
//         setDataSource([messages]);
//       }
//     });
//   }, []);

//   return (
//     <div>
//       {messages.map((message) => {
//         return <div>{message.body}</div>;
//       })}
//     </div>
//   );
// };

// export default Chat;
{
  /* <div className="container">
<div className="messages">
  <div className="messages-scroller">
    {messages.map((message) => {
      if (message.author === "Dave") {
        return (
          <MessageUser key={message.id}>{message.body}</MessageUser>
        );
      }
      return (
        <MessageUser2 key={message.id}>{message.body}</MessageUser2>
      );
    })}
  </div>
</div>
<div className="chat-bar">
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="message"
      placeholder="Type your message here..."
      onChange={handleChange}
      value={messageBody}
    />
  </form>
</div>
</div> */
}
// const [hasMore, setHasMore] = useState(true);
// const [messages, setMessages] = useState([]);
// const nav = useNavigate();
// const [user, updateUser] = useState({});
// const [projectId, setProjectId] = useState();
// const [isAuthenticated, setIsAuthenticated] = useState(false);
// const [messageBody, setMessageBody] = useState("");
// useEffect(() => {
//   API.graphql(
//     graphqlOperation(messagesByChannelID, {
//       channelID: "1 ",
//     })
//   ).then((response) => {
//     const items = response?.data?.messagesByChannelID?.items;

//     if (items) {
//       setMessages(items);
//     }
//   });
// }, []);

// useEffect(() => {
//   const subscription = API.graphql(
//     graphqlOperation(onCreateMessage)
//   ).subscribe({
//     next: (event) => {
//       setMessages([...messages, event.value.data.onCreateMessage]);
//     },
//   });

//   return () => {
//     subscription.unsubscribe();
//   };
// }, [messages]);
// const checkUser = async () => {
//   try {
//     const user = await Auth.currentAuthenticatedUser();
//     updateUser(user);
//     setProjectId(user.username);
//     setIsAuthenticated(true);
//     console.log("got user", user);
//   } catch (err) {
//     console.log("checkUser error", err);
//   }
// };
// const handleLogout = async () => {
//   try {
//     await Auth.signOut({ global: true });
//     nav("/");
//   } catch (error) {
//     console.log("error signing out: ", error);
//   }
// };
// useEffect(() => {
//   checkUser();
// }, []);

// const handleChange = (event) => {
//   setMessageBody(event.target.value);
// };

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   event.stopPropagation();

//   const input = {
//     channelID: "1",
//     displayname: "deep",
//     author: "Dave",
//     body: messageBody.trim(),
//   };

//   try {
//     setMessageBody("");
//     await API.graphql(graphqlOperation(createMessage, { input }));
//   } catch (error) {
//     console.warn(error);
//   }
// };
