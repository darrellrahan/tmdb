import { ACTIONS } from "./actions";

export default function reducer(state, action) {
  if (action.type === ACTIONS.SET_TRENDING_DATA) {
    return { ...state, trendingData: action.payload.value };
  }
  if (action.type === ACTIONS.SET_TRENDING_TYPE) {
    return { ...state, trendingType: action.payload.value };
  }
  if (action.type === ACTIONS.SET_POPULAR_DATA) {
    return { ...state, popularData: action.payload.value };
  }
  if (action.type === ACTIONS.SET_POPULAR_TYPE) {
    return { ...state, popularType: action.payload.value };
  }
  if (action.type === ACTIONS.SET_PLAYING_DATA) {
    return { ...state, playingData: action.payload.value };
  }
  if (action.type === ACTIONS.SET_PLAYING_TYPE) {
    return { ...state, playingType: action.payload.value };
  }
  if (action.type === ACTIONS.SET_UPCOMING_DATA) {
    return { ...state, upcomingData: action.payload.value };
  }
  if (action.type === ACTIONS.SET_UPCOMING_TYPE) {
    return { ...state, upcomingType: action.payload.value };
  }
  if (action.type === ACTIONS.SET_SEARCH_QUERY) {
    return { ...state, searchQuery: action.payload.value };
  }
  if (action.type === ACTIONS.SET_SEARCH_DATA) {
    return { ...state, searchData: action.payload.value };
  }
  if (action.type === ACTIONS.SET_SEARCH_NOTFOUND) {
    return { ...state, searchNotFound: action.payload.value };
  }
  if (action.type === ACTIONS.SET_RESULTISPERSON) {
    return { ...state, resultIsPerson: action.payload.value };
  }
}
