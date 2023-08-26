import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { MdOutlineCloseFullscreen } from "react-icons/md";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #1700e6;
`;
const Div = styled.div`
  background-color: rgba(227, 237, 242, 255);
  position: fixed;
  top: 50%;
  left: 50%;
  height: 700px;
  padding: 15px;
  border-radius: 18px;
  width: 800px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 50px;
`;
const Hr = styled.div`
  background-color: rgba(129, 205, 252, 0.5);
  height: 3px;
  margin-top: -12px;
  width: 100%;
`;
const Message = styled.div`
  border: 3px solid #000;
  height: 650px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const P = styled.p`
  font-family: "Ubuntu", sans-serif;
  font-size: 1.2rem;
  text-align: left;
  color: #464d53;
`;
const P2 = styled.p`
  font-family: "Ubuntu", sans-serif;
  font-size: 1.2rem;
  text-align: justify;
  line-height: 3rem;
  color: #464d53;
`;
export default function Modal({ open, children, onClose, props, User }) {
  if (!open) return null;
  console.log(props.message);
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <Div>
        <Wrapper>
          <Button onClick={onClose}>
            <MdOutlineCloseFullscreen size="30" color="#1700e6" />
          </Button>
        </Wrapper>
        <Hr />
        <Message>
          <P>
            {props.message}
            <br />
            <i>{User}</i>
          </P>
          <P2>
            {props.message2},
            <br />
            <br />
            {props.detail}
          </P2>
        </Message>
      </Div>
    </>,
    document.getElementById("portal")
  );
}
