import React from "react";
import { useGlobalContext } from "../context";
import SearchArea from "../components/SearchArea";
import Trending from "../components/Trending";
import Upcoming from "../components/Upcoming";
import Popular from "../components/Popular";
import Playing from "../components/Playing";
import SearchResult from "../components/SearchResult";

const Home = () => {
  const { states } = useGlobalContext();

  return (
    <>
      <SearchArea />
      {states.searchQuery === "" ? (
        <>
          <Trending />
          <Upcoming />
          <Popular />
          <Playing />
        </>
      ) : (
        <SearchResult />
      )}
    </>
  );
};

export default Home;
