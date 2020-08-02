import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const SPAN = styled.span`
  color: ${(props) => props.color};
`;

const Message = ({ text, color }) => (
  <Container>
    <SPAN color={color}>{text}</SPAN>
  </Container>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Message;
