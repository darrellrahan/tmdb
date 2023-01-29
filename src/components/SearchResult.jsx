import React from "react";
import { useGlobalContext } from "../context";
import unavailableImg from "../assets/unavailable-img.png";
import { ACTIONS } from "../actions";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const { states, dispatch } = useGlobalContext();

  if (states.searchNotFound)
    return (
      <div className="notfound">
        <h1>Movies or Tv Shows not found.</h1>
        <button
          className="back-btn"
          onClick={() =>
            dispatch({
              type: ACTIONS.SET_SEARCH_QUERY,
              payload: { value: "" },
            })
          }
        >
          Back to Home
        </button>
      </div>
    );

  return (
    <div className="search-result">
      <button
        className="back-btn"
        onClick={() =>
          dispatch({
            type: ACTIONS.SET_SEARCH_QUERY,
            payload: { value: "" },
          })
        }
      >
        Back to Home
      </button>
      {states.searchData.map((current) => {
        const {
          id,
          poster_path,
          title,
          name,
          release_date,
          first_air_date,
          overview,
          media_type,
        } = current;

        return (
          <Link to={`${media_type}/${id}`} key={id}>
            <div className="single-item">
              <img
                src={
                  poster_path !== null
                    ? `https://image.tmdb.org/t/p/w200/${poster_path}`
                    : unavailableImg
                }
                alt="img"
              />
              <div className="text">
                <div>
                  <h4 className="title">
                    {media_type === "movie"
                      ? title !== undefined && title
                      : name !== undefined && name}
                  </h4>
                  <p className="date">
                    {release_date === "" || first_air_date === ""
                      ? "No date available : ("
                      : new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(
                          new Date(
                            media_type === "movie"
                              ? release_date !== undefined && release_date
                              : first_air_date !== undefined && first_air_date
                          )
                        )}
                  </p>
                </div>
                <div>
                  <p className="overview">
                    {overview === ""
                      ? "No overview available :("
                      : overview.length > 280
                      ? `${overview.substring(0, 280)} ...`
                      : overview}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResult;
