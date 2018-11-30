import UserReducer from "../../src/reducers/UserReducer";

describe("Request Reducer", () => {
  it("has a default state", () => {
    expect(UserReducer(undefined, { type: "unexpected" })).toEqual({
      details: {},
      searching: false,
      repos: {},
      match: false
    });
  });
});
