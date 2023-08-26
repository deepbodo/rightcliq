import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { IoIosArrowForward } from "react-icons/io";
import Log from "../Images/cliq2.png";
import Av from "../Images/download.png";
import { getUserDetail } from "../graphql/queries";
import { ToastContainer, toast } from "react-toastify";
import { updateUserDetail } from "../graphql/mutations";

import "react-toastify/dist/ReactToastify.css";
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
  background-color: #eaeaea;
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
  height: 100px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Div3 = styled.div`
  display: flex;
  height: 60px;
  flex-direction: row;
  background-color: #eaeaea;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const P = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 3.5rem;
  letter-spacing: 2px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: -15px;
  margin-left: 50px;
`;
const Conatiner2 = styled.div`
  height: calc(100vh-60px);
  padding: 30px;
  background-color: #eaeaea;
  height: 100%;
`;
const Div2 = styled.div`
  background-color: #eaeaea;
  border-radius: 15px;
  height: 100%;

  display: flex;
`;
const Divs = styled.div`
  margin: 10px;
  background-color: #eaeaea;
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
  border-radius: 50%;
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
    background-color: #2a2a2a;
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
  background-color: #e5e5e5;
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
  background-color: #eaeaea;
`;
const P2 = styled.p`
  margin-bottom: -20px;
  font-family: "Montserrat", sans-serif;
  background-color: #eaeaea;
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
const EditProfile = () => {
  const { id, uId } = useParams();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [companyname, setCompany] = useState();
  const [phone, setPhone] = useState();
  const [state, setState] = useState();
  const [employee, setEmployee] = useState();
  const [address, setAddress] = useState();
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState({
    id: uId,
    fisrtname: firstname,
    lastname: lastname,
    phone: phone,
    employee: employee,
    dataconfirm: 1,
    companyname: companyname,
    state: state,
    address: address,
  });
  useEffect(() => {
    API.graphql(
      graphqlOperation(getUserDetail, {
        id: uId,
      })
    ).then((response) => {
      const items = response?.data?.getUserDetail;
      console.log(items);
      //   if (items.length !== 0) {
      //     items.map((item) => {
      setFirstname(items.fisrtname);
      setLastname(items.lastname);
      setAddress(items.address);
      setCompany(items.companyname);
      setPhone(items.phone);
      setState(items.state);
      setEmployee(items.employee);
      setData(items);
      //     });
      //   }
    });
  }, []);
  async function updateUser(event) {
    event.preventDefault();
    const newTodo = await API.graphql(
      graphqlOperation(updateUserDetail, { input: userDetails })
    );
    console.log(newTodo);
    notify();
    // alert("Profile Updated!");
  }
  //   const notify = () =>
  //     toast("Profile Updated", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  const notify = () => {
    toast.success("Profile Updated", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <>
      <Container>
        <Right>
          <Div>
            <P>
              {/* My Profile <IoIosArrowForward size="25" /> */}
              Edit Profile
            </P>
          </Div>
          <Conatiner2>
            <Form onSubmit={updateUser}>
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
                        defaultValue={data.fisrtname}
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
                        defaultValue={data.lastname}
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
                    <P2>Company Name</P2>
                    <Input
                      name="companyname"
                      variation="quiet"
                      required
                      defaultValue={data.companyname}
                      onChange={(event) =>
                        setUserDetails((prev) => ({
                          ...prev,
                          companyname: event.target.value,
                        }))
                      }
                    />
                  </Divs>{" "}
                  <Divs>
                    <P2>Email Id</P2>
                    <Input
                      name="email"
                      variation="quiet"
                      required
                      defaultValue={data.email}
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
                      defaultValue={data.phone}
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
                  {/* <Divs>
                    <Input2
                      type="checkbox"
                      name="QID"
                      variation="quiet"
                      required
                    />
                  </Divs>{" "} */}

                  <Divs>
                    <P2>Total Employees</P2>
                    <Input
                      type="number"
                      name="employee"
                      variation="quiet"
                      required
                      defaultValue={data.employee}
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
                      defaultValue={data.state}
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
                      defaultValue={data.address}
                      onChange={(event) =>
                        setUserDetails((prev) => ({
                          ...prev,
                          address: event.target.value,
                        }))
                      }
                    />
                  </Divs>
                  <Button onClick={updateUser}>Submit</Button>
                </R>
              </Div2>
            </Form>
          </Conatiner2>
        </Right>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default EditProfile;
