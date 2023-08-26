import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import "@aws-amplify/pubsub";
import "/Users/Deepjyoti Bodo/rightcliqfinal/src/Components/chat.css";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Log from "/Users/Deepjyoti Bodo/rightcliqfinal/src/Images/usericon.jpg";
import { messagesByChannelID } from "../../graphql/queries";
import { onCreateMessage } from "../../graphql/subscriptions";
import { createMessage } from "../../graphql/mutations";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { RiSendPlane2Fill } from "react-icons/ri";
const Box = styled.div`
  height: 180px;
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
const ChatBox = () => {
  const { QId, name } = useParams();
  const [messages, setMessages] = useState([]);
  const nav = useNavigate();
  const [user, updateUser] = useState({});
  const [projectId, setProjectId] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  //   useEffect(() => {
  //     setShowLoader(true);
  //     setTimeout(() => {
  //       setShowLoader(false);
  //     }, 4000);
  //   }, []);
  const location = useLocation();
  const messageRef = useRef(null);
  useEffect(() => {
    API.graphql(
      graphqlOperation(messagesByChannelID, {
        channelID: QId,
        sortDirection: "ASC",
      })
    ).then((response) => {
      const items = response?.data?.messagesByChannelID?.items;
      if (items) {
        setMessages(items);
      }
    });
    console.log(messages);
  }, [location.pathname]);
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (event) => {
        setMessages([...messages, event.value.data.onCreateMessage]);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages]);
  const handleChange = (event) => {
    setMessageBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const input = {
      channelID: QId,
      author: "Admin",
      displayname: "Admin",
      body: messageBody.trim(),
    };

    try {
      setMessageBody("");
      await API.graphql(graphqlOperation(createMessage, { input }));
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      {/* {showLoader ? (
        <div>
          <GridLoader size={10} color="#7AB8B1" />
        </div>
      ) : ( */}
      <div>
        <Box>
          <Right2>
            <Img src={Log} />
            <H2>{name}</H2>
          </Right2>
        </Box>

        <Wrapper>
          {" "}
          <DivScroller>
            {/* huhjlkhjlhjhjl
            <p>
              • P. R. Rothe and R. V. Kshirsagar introduced a” Cotton Leaf
              Disease Identification using Pattern Recognition Techniques” which
              Uses snake segmentation, here Hu’s moments are used as distinctive
              attribute. Active contour model used to limit the vitality inside
              the infection spot, BPNN classifier tackles the numerous class
              problems. The average classification is found to be 85.52%. •
              Aakanksha Rastogi, Ritika Arora and Shanu Sharma,” Leaf Disease
              Detection and Grading using Computer Vision Technology &Fuzzy
              Logic”. K-means clustering used to segment the defected area; GLCM
              is used for the extraction of texture features, Fuzzy logic is
              used for disease grading. They used artificial neural network
              (ANN) as a classifier which mainly helps to check the severity of
              the diseased leaf. • Godliver Owomugisha, John A. Quinn, Ernest
              Mwebaze and James Lwasa, proposed Automated Vision-Based Diagnosis
              of Banana Bacterial Wilt Disease and Black Sigatoka Disease. Color
              histograms are extracted and transformed from RGB to HSV, RGB to
              L*a*b. Peak components are used to create max tree, five shape
              attributes are used and area under the curve analysis is used for
              classification. They used nearest neighbors,{" "}
            </p>
            <p>
              • P. R. Rothe and R. V. Kshirsagar introduced a” Cotton Leaf
              Disease Identification using Pattern Recognition Techniques” which
              Uses snake segmentation, here Hu’s moments are used as distinctive
              attribute. Active contour model used to limit the vitality inside
              the infection spot, BPNN classifier tackles the numerous class
              problems. The average classification is found to be 85.52%. •
              Aakanksha Rastogi, Ritika Arora and Shanu Sharma,” Leaf Disease
              Detection and Grading using Computer Vision Technology &Fuzzy
              Logic”. K-means clustering used to segment the defected area; GLCM
              is used for the extraction of texture features, Fuzzy logic is
              used for disease grading. They used artificial neural network
              (ANN) as a classifier which mainly helps to check the severity of
              the diseased leaf. • Godliver Owomugisha, John A. Quinn, Ernest
              Mwebaze and James Lwasa, proposed Automated Vision-Based Diagnosis
              of Banana Bacterial Wilt Disease and Black Sigatoka Disease. Color
              histograms are extracted and transformed from RGB to HSV, RGB to
              L*a*b. Peak components are used to create max tree, five shape
              attributes are used and area under the curve analysis is used for
              classification. They used nearest neighbors,{" "}
            </p> */}
            {messages.map((message) => {
              if (message.author === "Admin") {
                return (
                  <FlexRight>
                    <MessageUser key={message.id}>{message.body}</MessageUser>
                  </FlexRight>
                );
              }
              return (
                <FlexLeft>
                  <MessageUser2 key={message.id}>{message.body}</MessageUser2>
                </FlexLeft>
              );
            })}
            <div ref={messageRef} className="hello" />
          </DivScroller>
          <Sender>
            <Input>
              {" "}
              <form onSubmit={handleSubmit}>
                {" "}
                <Input2
                  type="text"
                  placeholder="Enter Message..."
                  name="message"
                  onChange={handleChange}
                  value={messageBody}
                />
              </form>
              <RiSendPlane2Fill size="20" />
            </Input>
          </Sender>
          {/* <div className="container">
          <div className="messages">
            <div className="messages-scroller">
              {messages.map((message) => {
                if (message.author === "Admin") {
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
        </div> */}
        </Wrapper>
      </div>
      {/* )} */}
    </>
  );
};

export default ChatBox;

const MessageUser = styled.textarea`
  align-self: flex-start;
  align-items: left;
  text-align: left;
  margin-top: 4px;
  padding: 8px 12px;
  background-color: #fff;
  width: 220px;
  font-weight: 600;
  border-radius: 10px;
  font-size: 14px;
  resize: none;
  border: none;
`;
const MessageUser2 = styled.textarea`
  display: flex;
  resize: none;
  align-self: flex-start;
  margin-top: 4px;
  text-align: left;
  padding: 8px 12px;
  border: none;
  background-color: #fff;
  font-weight: 600;
  width: 220px;
  border-radius: 10px;
  font-size: 14px;
`;
const Wrapper = styled.div`
  width: 100%;
  background-color: #81c2ba;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  justify-content: center;
`;
const DivScroller = styled.div`
  overflow-y: scroll;
  width: 85%;
  height: 87%;
  padding-top: 0px;
  padding: 20px;
`;
const Sender = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: center;
`;
const Input = styled.div`
  width: 500px;
  margin-right: 100px;
  border: none;
  padding: 15px;
  margin-bottom: 10px;
  margin-top: -5px;
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
`;
const Input2 = styled.input`
  border: none;
  width: 300px;
  outline: none;
  overflow-y: scroll;
  overflow-wrap: break-word;
  &:hover {
    border: none;
  }
`;
const FlexLeft = styled.div`
  display: flex;
  width: 100%;
  padding-left: 40px;
  justify-content: left;
`;
const FlexRight = styled.div`
  display: flex;
  width: 100%;
  padding-right: 40px;
  justify-content: right;
`;
