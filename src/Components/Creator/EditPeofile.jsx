import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { Auth, DataStore, Hub, Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import { IoIosArrowForward } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCreatorDetail } from "../../graphql/mutations";
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
  flex-direction: column;
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
  height: auto;
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
  display: flex;
  height: 100px;
  align-items: center;
`;

const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const EditPeofile = () => {
  const { id, uid } = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Upload the file to the CategoryImage folder in S3 using the Amplify Storage module

    const result = await Storage.put(`ProfileCreatorImage/${file.name}`, file, {
      contentType: file.type,
    });
    // console.log(result);
    setImage(result.key);
    setLoading(false);
  };
  async function updateUserDetails() {
    const details = {
      id: uid,
      image: image,
    };
    console.log(details);
    const newTodo = await API.graphql({
      query: updateCreatorDetail,
      variables: { input: details },
    });
    if (newTodo) {
      alert("Creator Updated!");
    }
  }
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
            <Div3>
              {" "}
              <Label>Upload Your Profile Image</Label>
              <Div2>
                <Form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleFileChange} />
                  <Button3 variant="primary" type="submit">
                    {loading ? "Uploading..." : "Upload"}
                  </Button3>
                  {image ? <p>Uploaded</p> : <p></p>}
                </Form>
              </Div2>
            </Div3>
            <Button onClick={updateUserDetails}>SUBMIT</Button>
          </Conatiner2>
        </Right>
      </Container>
    </>
  );
};

export default EditPeofile;
const Div2 = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
  display: flex;
  width: 500px;
  background-color: #8cdacd;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  text-align: center;
`;
const Bar = styled.div`
  width: 500px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const Button3 = styled.button`
  border-radius: 6px;
  width: 100px;
  font-size: 1rem;
  border: none;
  background-color: #292929;
  padding: 2px;
  color: #ffff;
`;
const Label = styled.div`
  width: 500px;
  font-size: 1.3rem;
  text-align: left;
  margin-top: 100px;
  margin-bottom: 0px;
  margin-left: 30px;
`;
