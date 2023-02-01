import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ACTIONS } from "../actions";
import { useGlobalContext } from "../context";
import unavailableImg from "../assets/unavailable-img.png";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import YouTube from "react-youtube";

const SingleData = () => {
  const { id, type } = useParams();
  const { states, dispatch } = useGlobalContext();

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_SINGLEDATA_ID, payload: { value: id } });
    dispatch({ type: ACTIONS.SET_SINGLEDATA_TYPE, payload: { value: type } });
  }, [id, type]); // eslint-disable-line

  return (
    <div
      className="singledata-ct"
      style={{
        backgroundImage: `linear-gradient(
      to right,
      rgba(3, 37, 65, 0.8) 0%,
      rgba(3, 37, 65, 0.6) 100%
    ), url(${
      states.singleData.backdrop_path !== undefined &&
      `https://image.tmdb.org/t/p/original${states.singleData.backdrop_path}`
    })`,
      }}
    >
      {states.isTrailerPlaying ? (
        <>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.SET_IS_TRAILER_PLAYING,
                payload: { value: false },
              })
            }
            style={{
              color: "white",
              fontSize: "40px",
              position: "absolute",
              top: "2.5rem",
              right: "2.5rem",
              fontWeight: "bold",
            }}
          >
            <AiOutlineClose />
          </button>
          <YouTube
            videoId={states.videoData.key}
            opts={{
              playerVars: { autoplay: 1 },
            }}
            style={{ transform: "scale(1.5)" }}
          />
        </>
      ) : (
        <div className="box">
          <div style={{ height: "600px" }}>
            <img
              src={
                states.singleData.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w400/${states.singleData.poster_path}`
                  : unavailableImg
              }
              alt="img"
            />
          </div>
          <div className="details-ct">
            <div>
              <h1>
                {type === "movie"
                  ? states.singleData.title
                  : states.singleData.name}
              </h1>
              <h3>{states.singleData.tagline}</h3>
              <p>
                {states.singleData.overview !== undefined &&
                states.singleData.overview.length > 250
                  ? `${states.singleData.overview.substring(0, 250)} ...`
                  : states.singleData.overview}
              </p>
            </div>
            <div>
              <h3>
                {states.singleData.genres !== undefined &&
                  states.singleData.genres.length !== 0 &&
                  states.singleData.genres
                    .map((genre) => genre.name)
                    .join(", ")}
              </h3>
              <p>
                {states.singleData.production_companies !== undefined &&
                  states.singleData.production_companies.length !== 0 &&
                  states.singleData.production_companies
                    .map((company) => company.name)
                    .join(", ")}
              </p>
            </div>
            <div className="justify-between">
              <div className="d-grid">
                <div>
                  <p>Original Release:</p>
                  <h3>
                    {type === "movie"
                      ? states.singleData.release_date !== ""
                        ? states.singleData.release_date
                        : "-"
                      : states.singleData.first_air_date !== ""
                      ? states.singleData.first_air_date
                      : "-"}
                  </h3>
                </div>
                <div>
                  <p>
                    {type === "movie" ? "Running Time:" : "Number of Seasons:"}
                  </p>
                  <h3>
                    {type === "movie"
                      ? states.singleData.runtime !== 0
                        ? `${states.singleData.runtime} minutes`
                        : "-"
                      : states.singleData.number_of_seasons !== 0
                      ? states.singleData.number_of_seasons
                      : "-"}
                  </h3>
                </div>
                <div>
                  <p>Original Country:</p>
                  <h3>
                    {states.singleData.production_countries !== undefined &&
                    states.singleData.production_countries.length !== 0
                      ? states.singleData.production_countries[0].name
                      : "-"}
                  </h3>
                </div>
                <div>
                  <p>Vote Average:</p>
                  <h3>
                    {states.singleData.vote_count !== 0
                      ? `${states.singleData.vote_average} / 10`
                      : "-"}
                  </h3>
                </div>
              </div>
              <div className="d-flex">
                <div>
                  {states.videoData && (
                    <button
                      className="back-btn play"
                      style={{ marginBottom: "0" }}
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.SET_IS_TRAILER_PLAYING,
                          payload: { value: true },
                        })
                      }
                    >
                      <BsPlayFill /> Play Trailer
                    </button>
                  )}
                </div>
                <div>
                  <Link to="/" className="back-btn">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleData;
