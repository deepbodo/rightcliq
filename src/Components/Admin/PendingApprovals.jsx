import React from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
const Container = styled.div`
  display: flex;
  padding: 18px;
  width: 100%;
`;
const Hr = styled.hr`
  width: 100%;
  margin-top: -2px;
`;
const Div = styled.div`
  display: flex;
  width: 100%;
  padding-left: 60px;
  padding-right: 60px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: -20px;
`;
const NavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  width: 100%;
  align-items: center;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #8ed7ce;
    color: #000;
  }
`;
const Div2 = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;
const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 4.5rem;
  letter-spacing: 2px;
  margin-left: 15px;
`;
const PendingApprovals = () => {
  const { id } = useParams();
  return (
    <>
      <Div>
        <H>Pending Approvals</H>
        <Container2>
          <NavLink to={`/admin/${id}/panel/343fghzsvxfd p e n d  i ngs/`}>
            CLIENT
          </NavLink>
          <NavLink
            to={`/admin/${id}/panel/343fghzsvxfd p e n d  i ngs/c34 r ea t or/`}
          >
            CREATOR
          </NavLink>
        </Container2>
      </Div>
      <Container3>
        <Outlet />
      </Container3>
    </>
  );
};

export default PendingApprovals;

const Container2 = styled.div`
  width: 230px;
  display: flex;
  justify-content: space-evenly;
  height: 40px;
  align-items: center;
  border-radius: 10px;
  background-color: #292929;
`;
const Container3 = styled.div`
  display: flex;
  width: auto;
  overflow-x: hidden;
  background-color: #f1f1f1;
`;
{
  /* <Navlink20 to={`/admin/${id}/panel/343fghzsvxfd p e n d  i ngs/`}>
            Client
          </Navlink20>
          <Navlink21
            to={`/admin/${id}/panel/343fghzsvxfd p e n d  i ngs/c34 r ea t or/`}
          >
            Creator
          </Navlink21> */
}
