import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  background: #375784;

  color: #ffffff;

  width: 100%;

  text-align: center;

  z-index: 200000;

  position: relative;

  display: block;

  font-size: 1rem;
  font-weight: bold;

  padding-top: 10px;
  padding-bottom: 10px;
`;

const Link = styled.a`
  color: #e9519c;

  text-decoration: none;
`;

const simpleBanner = () => (
  <Banner>
    Coding challenge for keet health by{" "}
    <Link href="https://www.logantanous.com/">Logan Tanous.</Link>
  </Banner>
);

export default simpleBanner;
