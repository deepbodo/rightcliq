import React from "react";
import styled from "styled-components";
import "../Components/Pagination.css";
const Pagination2 = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </Div>
  );
};

export default Pagination2;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px;
  border: none;
  background-color: transparent;
`;
