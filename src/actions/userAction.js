import axios from "axios";
import { GET_CONTACTS, CONTACT_SEARCHING } from "./types";

// Get user data from github
export const getUser = username => dispatch => {
  dispatch(setSearching());
  axios
    .all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`)
    ])
    .then(
      axios.spread(function(res, repos) {
        dispatch({
          type: GET_CONTACTS,
          payload: res.data,
          repos: repos.data
        });
      })
    )
    .catch(err => {
      dispatch({
        type: GET_CONTACTS,
        payload: {}
      });
    });
};

// Profile loading
export const setSearching = () => {
  return {
    type: CONTACT_SEARCHING
  };
};
