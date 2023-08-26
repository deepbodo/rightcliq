import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GrNext, GrPrevious } from "react-icons/gr";
const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  z-index: 1000;
`;
const Button = styled.button`
  border: none;
  background: #fff;
  display: flex;
  padding: 5px;
  align-items: center;
  border-radius: 50%;
  margin-bootom: 35px;
`;
const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <Div>
      <Button onClick={() => onButtonClick("prev")}>
        <GrPrevious size="28" />
      </Button>
      <Button onClick={() => onButtonClick("next")}>
        {" "}
        <GrNext size="28" />
      </Button>
    </Div>
  );
};

export default Pagination;
