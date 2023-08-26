import React, { useEffect, useState } from "react";
import { Auth, Hub, API, graphqlOperation } from "aws-amplify";
import { listMessages, messagesByChannelID } from "../graphql/queries";
import styled from "styled-components";
import { createMessage } from "../graphql/mutations";
import "@aws-amplify/pubsub";
import "../Components/chat.css";
import { onCreateMessage } from "../graphql/subscriptions";
import { useNavigate, Link, Outlet } from "react-router-dom";

import { BiCollapse } from "react-icons/bi";
import { render } from "react-dom";
import { FaUserTie } from "react-icons/fa";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  height: 100vh;
  flex-direction: column;
`;
const P = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 40px;
  z-index: 1;
  height: 30px;
  font-size: 1.4rem;
  text-align: left;
`;
const Hr = styled.div`
  background-color: rgba(129, 205, 252, 0.5);
  height: 2px;
  margin-top: -12px;
  width: 100%;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
`;
const Left = styled.div`
  width: 25%;

  background-color: rgba(129, 205, 252, 0.5);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding-top: 0px;
  border: 2px solid;
  border-color: #bcbcbc;
  height: calc(100vh-30px);
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
`;
const Header = styled.div`
  height: 40px;
  width: 90%;
  margin-top: -120px;
  border-radius: 15px;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #0180ff;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 15px;
  z-index: 1;
  width: 100px;
  color: #000;
  font-weight: 700;
  align-items: center;
  display: flex;
  justify-content: space-around;
  font-size: 1.1rem;
  text-align: left;
`;
const Right = styled.div`
  width: 60%;
  height: calc(100vh-30px);
`;
const MessageUser = styled.div`
  align-self: flex-end;
  align-items: right;
  text-align: right;
  // background-color: #f19e38;
  margin-top: 4px;
  padding: 8px 12px;
  max-width: 240px;
  border-radius: 16px;
  font-size: 14px;
`;
const MessageUser2 = styled.div`
  display: flex;
  align-self: flex-start;
  margin-top: 4px;
  padding: 8px 12px;
  max-width: 240px;
  background: #f1f0f0;
  border-radius: 16px;
  font-size: 14px;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};
const Wrapper = styled.div`
  height: 65vh;
`;
const Admin = () => {
  const [messages, setMessages] = useState([]);
  const nav = useNavigate();
  const [user, updateUser] = useState({});
  const [projectId, setProjectId] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      setProjectId(user.username);
      setIsAuthenticated(true);
      console.log("got user", user);
    } catch (err) {
      console.log("checkUser error", err);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    API.graphql(
      graphqlOperation(messagesByChannelID, {
        channelID: "1",
        sortDirection: "ASC"
      })
    ).then(response => {
      const items = response?.data?.messagesByChannelID?.items;

      if (items) {
        setMessages(items);
      }
    });
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: event => {
        setMessages([...messages, event.value.data.onCreateMessage]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);

  const handleChange = event => {
    setMessageBody(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    const input = {
      channelID: "1",
      author: "Monica",
      displayname: "fuyfyu",
      body: messageBody.trim()
    };

    try {
      setMessageBody("");
      await API.graphql(graphqlOperation(createMessage, { input }));
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Container>
      <P>Inbox</P>
      <Hr />
      <Div>
        {/* <Left> */}
        <Header>
          {" "}
          <Title>
            <FaUserTie size="25" />
            Admin
          </Title>
          <NavLink to="/business/inbox/">
            <BiCollapse size="25" />
          </NavLink>
        </Header>
        {/* </Left> */}
        {/* <Right> */}
        <Wrapper>
          {" "}
          <div className="container">
            <div className="messages">
              <div className="messages-scroller">
                {messages.map(message => {
                  if (message.author === "Monica") {
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
          </div>
        </Wrapper>

        {/* </Right> */}
      </Div>
    </Container>
  );
};

export default Admin;
