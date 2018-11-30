import React from "react";
import styled from "styled-components";
import moment from "moment";

const RepoDiv = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.div`
  margin-bottom: 1rem;
`;

const TitleLink = styled.a`
  font-size: 1.5rem;
  font-weight: bold;

  color: #3e505a;

  text-decoration: none;

  transition: all 200ms ease-in-out;

  &:hover {
    color: #e95c95;
  }

  @media only screen and (max-width: 959px) {
    font-size: 1.25rem;
  }
`;

const Description = styled.div`
  font-size: 1rem;

  color: #777777;

  margin-bottom: 1rem;
`;

const OtherInfo = styled.div`
  font-size: 1rem;

  color: #777777;
`;

const Repo = repo => (
  <RepoDiv>
    <Title>
      {" "}
      <TitleLink href={repo.url}>{repo.title}</TitleLink>
    </Title>
    <Description>{repo.description}</Description>
    <OtherInfo>
      Created: {moment.utc(repo.created_at).format("MM/DD/YYYY")} | Updated:{" "}
      {moment.utc(repo.updated_at).format("MM/DD/YYYY")}
      {repo.fork && " | Forked"}
    </OtherInfo>
  </RepoDiv>
);

export default Repo;
