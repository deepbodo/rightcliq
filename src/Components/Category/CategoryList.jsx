import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const CategoryList = (props) => {
  return (
    <>
      <Container>
        {props.data.map((content) => (
          <div>{content.title.toUpperCase()}</div>
        ))}
      </Container>
    </>
  );
};

export default CategoryList;
