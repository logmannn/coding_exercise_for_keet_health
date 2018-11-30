import axios from "axios";
import { GET_CONTACTS, CONTACT_SEARCHING } from "./types";

// Get user data from github
export const getUser = username => dispatch => {
  dispatch(setSearching());
  axios
    .get(`https://api.github.com/users/${username}`)
    .then(res => {
      let allRepos = [];
      let amountofPages = Math.ceil(res.data.public_repos / 100);

      let match = false;
      if (res.data.public_repos === 0) {
        dispatch({
          type: GET_CONTACTS,
          payload: {},
          repos: [],
          match
        });
      }

      for (let i = 1; i < amountofPages + 1; i++) {
        axios
          .get(
            `https://api.github.com/users/${username}/repos?per_page=100&page=${i}`
          )
          .then(reposRes => {
            allRepos.push(...reposRes.data);
            dispatch({
              type: GET_CONTACTS,
              payload: res.data,
              repos: allRepos,
              match: true
            });
          });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_CONTACTS,
        payload: {},
        repos: [],
        match: false
      });
    });
};

// Profile loading
export const setSearching = () => {
  return {
    type: CONTACT_SEARCHING
  };
};
