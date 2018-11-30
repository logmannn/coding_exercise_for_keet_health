import React, { Component } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { getUser } from "../actions/userAction";

import AnchorLink from "react-anchor-link-smooth-scroll";

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

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "" };
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.search);
  }

  onChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter" && this.state.searchText !== "") {
      this.props.getUser(this.state.searchText);
    }
  };

  render() {
    const { searching, details } = this.props.user;
    const { searchText } = this.state;

    if (!searching) {
      console.log(this.props.user.details.avatar_url);
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
            {searching ? "Searching" : `Result for: ${details.login}`}
          </ResultsForText>
          <a href={details.html_url}>
            <ProfilePicture src={details.avatar_url} alt="profile" />
          </a>
          <Down href="#results">
            <i className="fa fa-angle-down" />
          </Down>
        </ResultsFor>
        <div id="results">test</div>
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
