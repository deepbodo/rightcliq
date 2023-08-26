import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Auth, Hub, graphqlOperation } from "aws-amplify";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Loader from "../Components/Loader";
import Home from "./Home";
import { dataByQuerryID } from "../graphql/queries";
import { IoIosArrowForward } from "react-icons/io";
import { API } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import Log from "../Images/cliq2.png";
import Av from "../Images/download.png";
import { createUserDetail } from "../graphql/mutations";
const Container = styled.div`
  height: 100vh;
  display: flex;
`;

const Left = styled.div`
  width: 80px;

  align-items: center;
  text-align: center;
`;
const Right = styled.div`
  background-color: rgba(227, 237, 242, 255);
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Hr = styled.div`
  background-color: rgba(129, 205, 252, 0.5);
  height: 2px;

  width: 100%;
`;
const Img = styled.img`
  width: 50%;
  margin-top: 8px;
`;
const Div = styled.div`
  display: flex;
  height: 60px;
  flex-direction: row;
  background-color: #fff;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Div3 = styled.div`
  display: flex;
  height: 60px;
  flex-direction: row;
  background-color: #fff;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const P = styled.p`
  font-family: "Montserrat", sans-serif;
  margin-left: 30px;
  z-index: 1;
  justify-content: center;
  align-items: center;
  height: 30px;
  display: flex;
  font-size: 1.2rem;
  text-align: left;
`;
const Conatiner2 = styled.div`
  height: calc(100vh-60px);
  padding: 30px;

  height: 100%;
`;
const Div2 = styled.div`
  background-color: #fff;
  border-radius: 15px;
  height: 100%;

  display: flex;
`;
const Divs = styled.div`
  margin: 10px;
`;
const L = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  justify-content: space-around;
  flex-direction: column;
`;
const R = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 18px;
  padding-bottom: 18px;
  justify-content: space-around;
  flex-direction: column;
`;
const Avatar = styled.img`
  width: 30%;
`;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 200px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #2a2a2a;

  font-size: 1.4rem;
  border: none;
  font-weight: 700;
  border-radius: 25px;
  &:hover {
    background-color: #1700e6;
    color: #fff;
  }
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  border-radius: 10px;
  height: 40px;
  margin: 10px;
  width: 470px;
  border: 0.5px solid;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  background-color: #fff;
`;
const Input2 = styled.input`
  border-radius: 10px;
  height: 40px;
  margin: 10px;
  width: 220px;
  border: 0.5px solid;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  background-color: #fff;
`;
const P2 = styled.p`
  margin-bottom: -20px;
  font-family: "Montserrat", sans-serif;
  background-color: #fff;
  width: 120px;
  margin-left: 35px;
  z-index: 1;
  position: relative;
  text-align: center;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const NewUserForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [user, updateUser] = useState({});
  const [projectId, setProjectId] = useState();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const users = "";
  const checkUser = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      const user = attributes;
      setIsAuthenticated(true);
      console.log("got user", user.sub);
      setProjectId(user.sub);
      updateUser(user.sub);
      // setValue(user.attributes);
    } catch (err) {
      console.log("checkUser error", err);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const [userDetails, setUserDetails] = useState({
    fisrtname: "",
    lastname: "",
    QId: "",
    email: "",
    phone: "",
    employee: "",
    dataconfirm: 1,
    companyname: "",
    state: "",
    address: "",
  });
  async function createUser(event) {
    event.preventDefault();
    const newTodo = await API.graphql(
      graphqlOperation(createUserDetail, { input: userDetails })
    );
    console.log(newTodo);
    event.target.reset();
    window.location.reload();
  }
  useEffect(() => {
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
        <Container>
          <Left>
            <Img src={Log} />
          </Left>
          <Right>
            <Div>
              <P>
                My Profile <IoIosArrowForward size="25" />
                Edit Profile
              </P>
            </Div>
            <Conatiner2>
              <Form onSubmit={createUser}>
                <Div2>
                  <L>
                    <Avatar src={Av} />
                    <Div3>
                      {" "}
                      <Divs>
                        <P2>First Name</P2>
                        <Input2
                          name="firstname"
                          variation="quiet"
                          required
                          onChange={(event) =>
                            setUserDetails((prev) => ({
                              ...prev,
                              fisrtname: event.target.value,
                            }))
                          }
                        />
                      </Divs>{" "}
                      <Divs>
                        <P2>Last Name</P2>
                        <Input2
                          name="lastname"
                          variation="quiet"
                          required
                          onChange={(event) =>
                            setUserDetails((prev) => ({
                              ...prev,
                              lastname: event.target.value,
                            }))
                          }
                        />
                      </Divs>
                    </Div3>
                    <Divs>
                      <P2>Email Id</P2>
                      <Input
                        name="email"
                        variation="quiet"
                        required
                        onChange={(event) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }))
                        }
                      />
                    </Divs>
                    <Divs>
                      <P2>Phone Number</P2>
                      <Input
                        name="phone"
                        type="number"
                        variation="quiet"
                        required
                        onChange={(event) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            phone: event.target.value,
                          }))
                        }
                      />
                    </Divs>
                  </L>
                  <R>
                    <Divs>
                      <Input2
                        type="checkbox"
                        name="QID"
                        variation="quiet"
                        required
                        onChange={(event) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            QId: projectId,
                          }))
                        }
                      />
                    </Divs>{" "}
                    <Divs>
                      <P2>Company Name</P2>
                      <Input
                        name="companyname"
                        variation="quiet"
                        required
                        onChange={(event) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            companyname: event.target.value,
                          }))
                        }
                      />
                    </Divs>{" "}
                    <Divs>
                      <P2>Total Employees</P2>
                      <Input
                        name="employee"
                        variation="quiet"
                        required
                        onChange={(event) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            employee: event.target.value,
                          }))
                        }
                      />
                    </Divs>
                    <Divs>
                      <P2>State</P2>
                      <Input
                        name="state"
                        variation="quiet"
                        required
                        onChange={(event) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            state: event.target.value,
                          }))
                        }
                      />
                    </Divs>
                    <Divs>
                      <P2>Address</P2>
                      <Input
                        name="address"
                        variation="quiet"
                        required
                        onChange={(event) =>
                          setUserDetails((prev) => ({
                            ...prev,
                            address: event.target.value,
                          }))
                        }
                      />
                    </Divs>
                    <Button onClick={createUser()}>Submit</Button>
                  </R>
                </Div2>
              </Form>
            </Conatiner2>
          </Right>
        </Container>
      )}
    </>
  );
};

export default NewUserForm;
