export const initialState = {
  user: null,
  playlist: [],
  playing: false,
  item: null,
  
  // token:
  // "BQCw0mBDzMphQ7zyQJ-Rvpqi1Yb8x7KYJLouUg_ibsdrKK_wsOki-KThBlRMyOzvW2RA7i5eqhkX3EqnD4yzKj39r1lTplGrjRl_WRrqwPq3nW2pDw7VHpCjLkWaTEhDcqTe-cdHJC8bJmEq_Ofa9lsvvFpPg9J8NZFnQBaBQyemjAlm",
};

// STATE = current state , action performs = SETTING USER, PLAYING and ALL
const reducer = (state, action) => {
  //Listening values from dispatch
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly, 
      };
    default:
      return state;
  }
};
export default reducer;
