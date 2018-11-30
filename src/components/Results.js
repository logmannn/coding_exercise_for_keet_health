import React, { Component } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { getUser } from "../actions/userAction";

import AnchorLink from "react-anchor-link-smooth-scroll";

import Repo from "./Repo";

const ResultsFor = styled.div`
  background-image: url("https://www.keethealth.com/wp-content/uploads/2018/02/uncode-default-back-uai-2064x1147.jpeg");
  background-position: center center;
  background-size: cover;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 495px;

  font-size: 35px;
  font-weight: bold;

  color: #3e505a;

  position: relative;

  @media only screen and (max-width: 959px) {
    height: 175px;
  }
`;

const ResultsForText = styled.div`
  text-align: center;
  text-transform: capitalize;

  margin-bottom: 1rem;
`;

const Down = styled(AnchorLink)`
  position: absolute;
  bottom: 0;

  padding-bottom: 10px;

  font-size: 1.6rem;

  transition: all 200ms ease-in-out;

  cursor: pointer;

  &:hover {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const Top = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2.25rem;
  padding-right: 1rem;

  display: flex;
  align-items: center;

  @media only screen and (max-width: 959px) {
    padding-left: 1rem;
  }
`;

const Back = styled.img`
  height: 60px;
  width: auto;

  cursor: pointer;

  position: relative;
  z-index: 2;

  padding-right: 1rem;
`;

const SearchContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  width: 100%;
  left: 0;

  @media only screen and (max-width: 959px) {
    position: relative;

    justify-content: flex-start;
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid white;
  border-radius: 2px;
  background-color: rgba(26, 27, 28, 0.5);

  font-size: 1rem;

  transition: all 200ms ease-in-out;

  flex: 1;

  padding: 10px;

  max-width: 150px;
  width: 100%;

  color: white;

  ::placeholder {
    color: white;
  }

  &:focus {
    border: 1px solid #e95c95;
  }
`;

const ProfilePicture = styled.img`
  max-width: 100px;
  height: auto;

  border-radius: 50%;
  border: 2px solid #e95c95;
`;

const RepoContainer = styled.div`
  display: flex;

  justify-content: center;

  margin-left: 5.6rem;
  margin-right: 5.6rem;

  overflow: hidden;

  @media only screen and (max-width: 959px) {
    margin-top: 1rem;
    margin-bottom: 1rem;

    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const RepoDiv = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;

  max-width: 1200px;
  width: 100%;

  @media only screen and (max-width: 959px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const Sortables = styled.div`
  margin-bottom: 2rem;

  font-size: 1rem;

  color: #777777;
`;

const Sort = styled.span`
  transition: all 200ms ease-in-out;

  cursor: pointer;

  &:hover {
    color: #e95c95;
  }
`;

const Nothing = styled.div`
  color: #3e505a;

  font-size: 35px;
  font-weight: bold;
`;

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "", sorting: "" };
  }

  getUserInfo = search => {
    this.props.getUser(search);
  };

  componentDidMount() {
    this.getUserInfo(this.props.match.params.search);
  }

  onChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter" && this.state.searchText !== "") {
      this.getUserInfo(this.state.searchText);
      this.props.history.push(`/search/${this.state.searchText}`);
    }
  };

  render() {
    console.log(this.props);
    const { searching, details, match } = this.props.user;
    const { searchText, sorting } = this.state;

    let currentRepos = this.props.user.repos;

    if (sorting === "created") {
      currentRepos = [].slice
        .call(this.state.repos)
        .sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        })
        .reverse();
    }

    if (sorting === "updated") {
      currentRepos = [].slice
        .call(this.state.repos)
        .sort((a, b) => {
          return (
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
          );
        })
        .reverse();
    }

    return (
      <>
        <Top>
          <Back
            src="https://www.keethealth.com/wp-content/uploads/2018/02/Keet-Logo.png"
            alt="logo"
            width="200"
            height="200"
            onClick={() => this.props.history.push("/")}
          />
          <SearchContainer>
            <Input
              value={searchText}
              placeholder="Search..."
              onChange={this.onChange}
              onKeyPress={this.handleKeyPress}
            />
          </SearchContainer>
        </Top>
        <ResultsFor>
          <ResultsForText>
            {searching
              ? "Searching"
              : `Result for: ${this.props.match.params.search}`}
          </ResultsForText>
          {!searching && match && (
            <a href={details.html_url}>
              <ProfilePicture src={details.avatar_url} alt="profile" />
            </a>
          )}
          <Down href="#results">
            <i className="fa fa-angle-down" />
          </Down>
        </ResultsFor>
        <RepoContainer id="results">
          <RepoDiv>
            {!searching && match && (
              <Sortables>
                Sort by:{" "}
                <Sort
                  onClick={() =>
                    this.setState({
                      sorting: "created",
                      repos: this.props.user.repos
                    })
                  }
                >
                  Recently Created
                </Sort>{" "}
                |{" "}
                <Sort
                  onClick={() =>
                    this.setState({
                      sorting: "updated",
                      repos: this.props.user.repos
                    })
                  }
                >
                  Recently Modified
                </Sort>
              </Sortables>
            )}
            {Array.from(currentRepos).map((repo, i) => (
              <Repo
                key={i}
                title={repo.name}
                description={repo.description}
                url={repo.url}
                fork={repo.fork}
                created_at={repo.created_at}
                updated_at={repo.updated_at}
              />
            ))}
            {!match && <Nothing>Nothing Found</Nothing>}
          </RepoDiv>
        </RepoContainer>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(Results);
