import React from "react";
import styled from "styled-components";

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  img {
    width: 300px;
    height: 200px;
  }
`;

const NoResults = ({ title, text }) => {
  return (
    <Center>
      <h2>{title}</h2>
      <p className="secondary">{text}</p>
    </Center>
  );
};

export default NoResults;
