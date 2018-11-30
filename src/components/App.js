import React, { Component } from "react";

import { connect } from "react-redux";

import styled from "styled-components";

const AppDiv = styled.div`
  min-height: calc(100vh - 38px);

  display: flex;
  flex-direction: column;

  color: #ffffff;
`;

const BackgroundWrapper = styled.div`
  position: relative;

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("https://www.keethealth.com/wp-content/uploads/2018/11/Gradient-uai-2064x1593.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;
  background-size: cover;
`;

const Section1 = styled.div`
  font-size: 55px;

  flex: 1;

  font-weight: 700;

  margin-left: 2.75rem;
  margin-right: 2.75rem;
  margin-top: 2.75rem;
  margin-bottom: 2.75rem;

  @media only screen and (max-width: 959px) {
    font-size: 2.25rem;
  }
`;

const Section2 = styled.div`
  flex: 1;

  margin-left: 2.75rem;
  margin-right: 2.75rem;
  margin-top: 2.75rem;
  margin-bottom: 2.75rem;

  display: flex;

  justify-content: center;

  flex-direction: column;
`;

const Pretext = styled.div`
  color: #00babc;

  font-weight: 700;

  font-size: 0.82rem;

  letter-spacing: 0.2em;

  margin-bottom: 2.25rem;

  text-transform: uppercase;
`;

const Text = styled.div`
  margin-bottom: 2.25rem;
`;

const Wrapper = styled.div`
  max-width: 1164px;
  width: 100%;

  flex-direction: row;
  display: flex;

  font-size: 1.8rem;
  font-weight: 500;

  @media only screen and (max-width: 959px) {
    flex-direction: column;
  }
`;

const SearchButton = styled.div`
  background-color: #e95c95;

  border: 1px solid #e95c95;
  border-radius: 10em;

  font-weight: 600;
  font-size: 15px;

  letter-spacing: 0.2em;

  padding-left: 39px;
  padding-right: 39px;
  padding-top: 13px;
  padding-bottom: 13px;

  align-self: flex-start;

  text-transform: uppercase;

  cursor: pointer;

  transition: all 200ms ease-in-out;

  &:hover {
    background-color: inherit;

    color: #e95c95;
  }

  @media only screen and (max-width: 959px) {
    text-align: center;

    font-size: 13px;
  }
`;

const SearchContainer = styled.div`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 100vh;

  background: rgba(20, 22, 24, 0.95);

  display: flex;

  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: 2.3rem;

  padding: 0.8em 3em 0.8em 1.5em;

  background: none;

  outline: none;
  border: 1px solid white;
  border-radius: 2px;

  color: white;

  max-width: 729px;
  width: 100%;

  margin-left: 1rem;
  margin-right: 1rem;

  z-index: 1;

  transition: all 200ms ease-in-out;

  ::placeholder {
    color: white;
  }

  &:focus {
    border: 1px solid #e95c95;
  }

  @media only screen and (max-width: 959px) {
    font-size: 1.5rem;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 30px;

  color: #ffffff;

  font-size: 2rem;

  cursor: pointer;
`;

const SearchIconWrapper = styled.div`
  position: absolute;

  width: 100%;
  max-width: 829px;

  display: flex;
  justify-content: flex-end;
`;

const I = styled.i`
  font-size: 2.3rem;

  z-index: 2;
  position: relative;

  cursor: pointer;

  color: #777777;

  &:before {
    position: relative;
    z-index: 2;

    cursor: pointer;
  }

  &:hover {
    color: #ffffff;

    transition: all 200ms ease-in-out;
  }

  @media only screen and (max-width: 959px) {
    padding-right: 2rem;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchOverlay: false, searchText: "" };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyFunction, false);
  }

  toggleSearchOverlay = () => {
    this.setState({ searchOverlay: !this.state.searchOverlay });
  };

  onChange = e => {
    this.setState({ searchText: e.target.value });
  };

  keyFunction = e => {
    if (e.keyCode === 27 && this.state.searchOverlay) {
      this.toggleSearchOverlay();
    } else if (e.keyCode === 13) {
      this.submit();
    }
  };

  submit = () => {
    if (this.state.searchText !== "") {
      this.props.history.push(`/search/${this.state.searchText}`);
    }
  };

  render() {
    const { searchOverlay, searchText } = this.state;

    return (
      <AppDiv className="App">
        <BackgroundWrapper>
          {searchOverlay && (
            <SearchContainer onKeyDown={this.handleKeyDown}>
              <Close onClick={this.toggleSearchOverlay}>&times;</Close>
              <Input
                autoFocus
                value={searchText}
                placeholder="Search..."
                onChange={this.onChange}
              />
              <SearchIconWrapper>
                <I className="fa fa-search" onClick={this.submit} />
              </SearchIconWrapper>
            </SearchContainer>
          )}
          <Wrapper>
            <Section1>
              One solution for searching github users, and viewing their public
              repositories.
            </Section1>
            <Section2>
              <Pretext>EXTRA, EXTRA, READ ALL ABOUT IT</Pretext>
              <Text>
                Search by clicking the button below, supported by modern
                browsers.
              </Text>
              <SearchButton onClick={this.toggleSearchOverlay}>
                Search for a github user
              </SearchButton>
            </Section2>
          </Wrapper>
        </BackgroundWrapper>
      </AppDiv>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(App);
