import React from "react";
import { useGlobalContext } from "../context";
import { ACTIONS } from "../actions";
import unavailableImg from "../assets/unavailable-img.png";
import { Link } from "react-router-dom";

const Playing = () => {
  const { states, dispatch } = useGlobalContext();

  return (
    <div className="topic-area" style={{ paddingTop: "0" }}>
      <div className="top">
        <h3>Now Playing</h3>
        <div className="buttons">
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_PLAYING_TYPE,
                payload: { value: "movie" },
              })
            }
            className={states.playingType === "movie" ? "active" : ""}
          >
            Movies
          </button>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_PLAYING_TYPE,
                payload: { value: "tv" },
              })
            }
            className={states.playingType === "tv" ? "active" : ""}
          >
            TV Shows
          </button>
        </div>
      </div>
      <div className="horizontal-scroll">
        {states.playingData.map((current) => {
          const { id, poster_path, title, name, release_date, first_air_date } =
            current;

          return (
            <Link to={`${states.playingType}/${id}`} key={id}>
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
                    {states.playingType === "movie"
                      ? title !== undefined &&
                        title.substring(
                          0,
                          states.dimensions.width <= 1000 ? 13 : 30
                        )
                      : name !== undefined &&
                        name.substring(
                          0,
                          states.dimensions.width <= 1000 ? 13 : 30
                        )}
                  </h4>
                  <p className="date">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(
                      new Date(
                        states.playingType === "movie"
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

export default Playing;
