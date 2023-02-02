import React from "react";
import { ACTIONS } from "../actions";
import { useGlobalContext } from "../context";

const SearchArea = () => {
  const { states, dispatch } = useGlobalContext();

  return (
    <div className="search-area">
      <h1>Welcome.</h1>
      <h3>Millions of movies and TV shows to discover. Explore now.</h3>
      <input
        type="text"
        placeholder={
          states.dimensions.width <= 1000
            ? "Search..."
            : "Search for a movie and tv show..."
        }
        autoComplete="off"
        onChange={(e) =>
          dispatch({
            type: ACTIONS.SET_SEARCH_QUERY,
            payload: { value: e.target.value },
          })
        }
        value={states.searchQuery}
      />
    </div>
  );
};

export default SearchArea;
