import React, { useContext, useEffect, useReducer } from "react";
import { ACTIONS } from "./actions";
import reducer from "./reducer";

const GlobalContext = React.createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function AppProvider({ children }) {
  const [states, dispatch] = useReducer(reducer, {
    trendingType: "movie",
    trendingData: [],
    popularType: "movie",
    popularData: [],
    playingType: "movie",
    playingData: [],
    upcomingType: "movie",
    upcomingData: [],
    searchQuery: "",
    searchData: [],
    searchNotFound: false,
    resultIsPerson: false,
    singleData: {},
    singleDataId: "",
    singleDataType: "",
  });

  // get trending data
  useEffect(() => {
    async function getTrending() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/${states.trendingType}/week?api_key=8c70d9d68c54a7072be9893577f091d3`
      );
      const resJSON = await res.json();

      dispatch({
        type: ACTIONS.SET_TRENDING_DATA,
        payload: { value: resJSON.results },
      });
    }

    getTrending();
  }, [states.trendingType]);

  // get popular data
  useEffect(() => {
    async function getPopular() {
      const res = await fetch(
        `https://api.themoviedb.org/3/${states.popularType}/popular?api_key=8c70d9d68c54a7072be9893577f091d3&language=en-US&page=4`
      );
      const resJSON = await res.json();

      dispatch({
        type: ACTIONS.SET_POPULAR_DATA,
        payload: { value: resJSON.results },
      });
    }

    getPopular();
  }, [states.popularType]);

  // get playing data
  useEffect(() => {
    async function getPlaying() {
      const res = await fetch(
        states.playingType === "movie"
          ? "https://api.themoviedb.org/3/movie/now_playing?api_key=8c70d9d68c54a7072be9893577f091d3&language=en-US&with_original_language=en&primary_release_date.gte=2023&page=1"
          : "https://api.themoviedb.org/3/tv/on_the_air?api_key=8c70d9d68c54a7072be9893577f091d3&language=en-US&with_original_language=en&first_air_date.gte=2023&page=1"
      );
      const resJSON = await res.json();

      dispatch({
        type: ACTIONS.SET_PLAYING_DATA,
        payload: { value: resJSON.results },
      });
    }

    getPlaying();
  }, [states.playingType]);

  // get upcoming data
  useEffect(() => {
    async function getUpcoming() {
      const res = await fetch(
        states.upcomingType === "movie"
          ? `https://api.themoviedb.org/3/movie/upcoming?api_key=8c70d9d68c54a7072be9893577f091d3&language=en-US&primary_release_date.gte=2023&page=1`
          : "https://api.themoviedb.org/3/tv/top_rated?api_key=8c70d9d68c54a7072be9893577f091d3&language=en-US&first_air_date.gte=2022&page=1"
      );
      const resJSON = await res.json();

      dispatch({
        type: ACTIONS.SET_UPCOMING_DATA,
        payload: {
          value: resJSON.results,
        },
      });
    }

    getUpcoming();
  }, [states.upcomingType]);

  // handle search
  useEffect(() => {
    async function handleSearch() {
      if (states.searchQuery !== "") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=8c70d9d68c54a7072be9893577f091d3&language=en-US&query=${states.searchQuery}&page=1&include_adult=false`
        );
        const resJSON = await res.json();
        const filteredRes =
          resJSON.results !== undefined &&
          (await resJSON.results.filter((res) => res.media_type !== "person"));

        if (filteredRes.length !== 0) {
          dispatch({
            type: ACTIONS.SET_SEARCH_NOTFOUND,
            payload: { value: false },
          });
          dispatch({
            type: ACTIONS.SET_SEARCH_DATA,
            payload: { value: filteredRes },
          });
        } else {
          dispatch({
            type: ACTIONS.SET_SEARCH_NOTFOUND,
            payload: { value: true },
          });
        }
      }
    }

    handleSearch();
  }, [states.searchQuery]);

  // get single data
  useEffect(() => {
    async function getSingleData() {
      if (states.singleDataId !== "" && states.singleDataType !== "") {
        const res = await fetch(
          `https://api.themoviedb.org/3/${states.singleDataType}/${states.singleDataId}?api_key=8c70d9d68c54a7072be9893577f091d3&language=en-US&append_to_response=videos`
        );
        const resJSON = await res.json();

        dispatch({ type: ACTIONS.SET_SINGLEDATA, payload: { value: resJSON } });
      }
    }

    getSingleData();
  }, [states.singleDataId, states.singleDataType]);

  return (
    <GlobalContext.Provider value={{ states, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
