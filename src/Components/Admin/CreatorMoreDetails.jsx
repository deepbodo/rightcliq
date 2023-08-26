import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Auth, DataStore, Hub, Storage } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import GridLoader from "react-spinners/GridLoader";
import {
  categoryDetailByCategoryID,
  creatorApprovedDataByUserID,
  creatorDataByUserID,
  projectByProjectID,
} from "../../graphql/queries";
import {
  createCreatorApproved,
  createProjectApproved,
  deleteCreatorApproved,
  deleteCreatorDetail,
  deleteNote,
} from "../../graphql/mutations";
import { AiOutlineDownload } from "react-icons/ai";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  background-color: #f1f1f1;
`;
const Left = styled.div`
  width: 70%;
`;
const Right = styled.div`
  width: 30%;
  display: flex;
  height: 300px;
  flex-direction: column;
`;
const Box = styled.div`
  padding: 40px;
  display: flex;
  margin-top: -20px;
  margin-bottom: -80px;
  background-color: #f1f1f1;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4rem;
  letter-spacing: 2px;
  margin-top: 0px;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
`;
const Label = styled.label`
  width: 40%;
  text-align: left;
  font-size: 1.2rem;
  color: #676767;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;
const Input = styled.input.attrs({ type: "checkbox" })`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: red;
  border-color: purple;
  border-radius: 3px;
  transition: all 150ms;
`;
const Input2 = styled.div`
  border-radius: 10px;
  height: 35px;
  margin: 10px;
  width: 400px;
  border: none;
  padding: 3px;
  display: flex;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  align-items: center;
  padding-left: 10px;
  font-size: 1rem;
  text-align: left;
  letter-spacing: 1px;
  background-color: #9b9b9b;
`;
const Input3 = styled.textarea`
  border-radius: 10px;
  height: 200px;
  margin: 10px;
  width: 400px;
  border: none;
  padding-left: 10px;
  display: flex;
  padding: 3px;
  font-size: 1.3rem;
  text-align: left;
  background-color: #9b9b9b;
`;
const Div2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  z-index: 10;
  object-fit: cover;
  border: 1px solid #000;
  margin-right: 100px;
  border-radius: 10px;
`;
const Div3 = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  width: 100%;
  padding: 20px;
`;
const ContainerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
`;
const CreatorMoreDetails = () => {
  const nav = useNavigate();
  const { id, cId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState({});
  const [images, setImages] = useState("");
  const [category, setCategory] = useState();
  const [pdfUrl, setPdfUrl] = useState();
  const [pdfName, setPdfName] = useState();
  const [sampleUrl, setSampleUrl] = useState();
  const [sampleName, setSampleName] = useState();
  useEffect(() => {
    getData();
    console.log(data);
  }, []);
  async function getData() {
    await API.graphql(
      graphqlOperation(creatorApprovedDataByUserID, {
        id: cId,
      })
    ).then((response) => {
      const items = response?.data?.creatorApprovedDataByUserID?.items;
      if (items.length !== 0) {
        items.map(async (item) => {
          const imageKey = await Storage.get(item.image);
          const pdfKey = await Storage.get(item.resume);
          const sampleKey = await Storage.get(item.samples);
          setImages(imageKey);
          setData(item);
          setPdfUrl(pdfKey);
          setPdfName(item.resume);
          setSampleName(item.samples);
          setSampleUrl(sampleKey);
          getCategory(item.function);
        });
      }
    });
  }
  async function getCategory(n) {
    await API.graphql(
      graphqlOperation(categoryDetailByCategoryID, {
        categoryId: n,
      })
    ).then((response) => {
      const items = response?.data?.categoryDetailByCategoryID?.items;
      if (items) {
        items.map((data) => {
          setCategory(data.categoryname);
        });
      }
    });
  }
  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = pdfName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadSample = () => {
    const link = document.createElement("a");
    link.href = sampleUrl;
    link.target = "_blank";
    link.download = sampleName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <Box>
          {" "}
          <H>Creator Details</H>
        </Box>
        <Container>
          <Left>
            <Div>
              <Label>Profile Image</Label>
              <Image src={images} />
            </Div>
            <Div>
              {/* <Input
                type="checkbox"
                name="category"
                variation="quiet"
                required
              /> */}
              <Label>Creator Name</Label>
              <Input2>
                {data.fisrtname} {data.lastname}
              </Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Experience</Label>
              <Input2>{data.experience} years</Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Job Category</Label>
              <Input2>{category}</Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Linkedin/Behance Link</Label>
              <Input2>
                <A
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.linkedin}
                </A>
              </Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Whatsapp Number</Label>
              <Input2>
                <A
                  href={`https://api.whatsapp.com/send?phone=${data.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.whatsapp}
                </A>
              </Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Email</Label>
              <Input2>
                <A
                  href={`mailto:${data.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.email}
                </A>
              </Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Sector</Label>
              <Input2>{data.sector}</Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>How Long</Label>
              <Input2>{data.howLong}</Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Total Professional Experience</Label>
              <Input2>{data.totalprofessional}</Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Demo Question 1</Label>
              <Input2>{data.demo1}</Input2>
            </Div>
            <Div>
              {/* <Input type="checkbox" /> */}
              <Label>Demo Question 1</Label>
              <Input2>{data.demo2}</Input2>
            </Div>
          </Left>
          <Right>
            {" "}
            <Button onClick={downloadPdf}>
              <AiOutlineDownload size="25" />
              Download Resume
            </Button>
            <Button onClick={downloadSample}>
              {" "}
              <AiOutlineDownload size="25" />
              Download Samples
            </Button>
          </Right>
        </Container>
        <Div3></Div3>
      </div>
      {/* )} */}
    </>
  );
};

export default CreatorMoreDetails;
const Button = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #000;
  width: 200px;
  gap: 5px;
  padding: 6px;
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;
  background-color: #fba5a4;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  margin: auto;
  border-radius: 10px;
  &:hover {
    background-color: #fba5a4;
    color: #fff;
  }
`;
const Button2 = styled.button`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: 200px;
  padding: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #292929;
  font-size: 1rem;
  border: none;
  font-weight: 500;
  margin: auto;
  border-radius: 10px;
  &:hover {
    background-color: #292929;
    color: #fff;
  }
`;
const A = styled.a`
  text-decoration: none;
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  width: 380px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
