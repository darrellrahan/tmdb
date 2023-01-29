import React from "react";
import { useGlobalContext } from "../context";
import { ACTIONS } from "../actions";
import unavailableImg from "../assets/unavailable-img.png";
import { Link } from "react-router-dom";

const Popular = () => {
  const { states, dispatch } = useGlobalContext();

  return (
    <div className="topic-area">
      <div className="top">
        <h3>What's Popular</h3>
        <div className="buttons">
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_POPULAR_TYPE,
                payload: { value: "movie" },
              })
            }
            className={states.popularType === "movie" ? "active" : ""}
          >
            Movies
          </button>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_POPULAR_TYPE,
                payload: { value: "tv" },
              })
            }
            className={states.popularType === "tv" ? "active" : ""}
          >
            TV Shows
          </button>
        </div>
      </div>
      <div className="horizontal-scroll">
        {states.popularData.map((current) => {
          const { id, poster_path, title, name, release_date, first_air_date } =
            current;

          return (
            <Link to={`${states.popularType}/${id}`} key={id}>
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
                  <h4 className="title">
                    {states.popularType === "movie"
                      ? title !== undefined && title.substring(0, 30)
                      : name !== undefined && name.substring(0, 30)}
                  </h4>
                  <p className="date">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(
                      new Date(
                        states.popularType === "movie"
                          ? release_date !== undefined && release_date
                          : first_air_date !== undefined && first_air_date
                      )
                    )}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
