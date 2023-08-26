import React from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import ProgressiveImage from "../Components/ProgressiveImage";
import Load from "../Images/load.webp";
const TemplateCard = ({ posts, loading, data1, data2, data }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const Div = styled.div`
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  `;
  const Card = styled.div`
    width: 240px;
    height: auto;
    margin: auto;
    text-align: center;
  `;
  const Title = styled.p`
    font-family: "Montserrat", sans-serif;
    width: 100%;
    height: 28px;
    align-items: center;
    display: flex;
    font-size: 15px;
    justify-content: center;
    text-align: center;
    margin-top: -6px;
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `;
  const NavLink = styled(Link)`
    text-decoration: none;
    color: #000;
  `;
  const Image = styled.img`
    width: 250px;
    height: 180px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `;

  return (
    <Div>
      {posts.map((post) => (
        <Card key={post.id}>
          <ProgressiveImage
            imgSrc={post.image}
            previewSrc={Load}
            width={240}
            height={260}
          />
          <NavLink
            to={`/business/${data}/${data1}/${data2}/${post.templateId}`}
          >
            <Title>{post.templatename}</Title>
          </NavLink>
        </Card>
      ))}
      {/* <PregressiveImage
        imgSrc={Hero}
        previewSrc={Load}
        width={250}
        height={180}
      /> */}
    </Div>
  );
};

export default TemplateCard;
