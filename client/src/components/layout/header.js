import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faCogs
} from "@fortawesome/free-solid-svg-icons";
import {
  searchSouncloudTracks,
  searchSoundcloudArtists,
  searchSpotify
} from "../../redux/actions/searchActions";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import SearchBar from "../search-bar";
import styles from "../../styles/header.module.css";

function Header({
  history,
  location,
  libQuery,
  setLibQuery,
  resetQuery,
  fetchQuery,
  searchScTracks,
  searchScArtists,
  dispatchSearchSpotify,
  setSearchQuery
}) {
  const { pathname } = location;
  const baseUrls = ["Library", "Search", "More", ""];

  // Get only last route
  let title = pathname.slice(pathname.lastIndexOf("/") + 1);

  // Make it capitalized
  if (title.length > 0) {
    title = `${title[0].toUpperCase()}${title.slice(1)}`;
  }

  // Previous route within tab
  const prevRoute = pathname.slice(0, pathname.lastIndexOf("/"));

  return (
    <>
      <header className={styles.header}>
        <div className={styles.mobileContainer}>
          <div className={styles.placeholder}>
            {!baseUrls.includes(title) && (
              <NavLink
                style={{ color: "red", marginLeft: "0.3rem" }}
                to={`${prevRoute}`}
              >
                <FontAwesomeIcon icon={faAngleLeft} size="3x" />
              </NavLink>
            )}
          </div>

          <h1>{title}</h1>

          <div className={styles.placeholder} />
        </div>
      </header>

      {/* Desktop Header */}
      <header className={styles.deskHeader}>
        <div className={styles.deskHeaderContainer}>
          <div className={styles.navGroup}>
            <button type="button" onClick={() => history.goBack()}>
              <FontAwesomeIcon size="lg" icon={faAngleLeft} />
            </button>
            <button
              disabed={window.history.next}
              type="button"
              onClick={() => history.goForward()}
            >
              <FontAwesomeIcon size="lg" icon={faAngleRight} />
            </button>
          </div>
          <SearchBar
            placeholder="Search for Music"
            query={libQuery}
            onChange={e => setLibQuery(e.target.value)}
            // onSubmit={handleSubmit}
            onReset={resetQuery}
          />
          <div className={styles.settingIconContainer}>
            <button type="button" onClick={() => history.push("/settings")}>
              <FontAwesomeIcon size="3x" icon={faCogs} />
            </button>
          </div>
        </div>
        <div className={styles.titleHeader}>
          <div>
            <h1>{title}</h1>
            <span>No fluff. Just your music.</span>
          </div>
        </div>
      </header>
    </>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  libQuery: state.music.query,
  fetchQuery: state.search.query
});

const mapDispatchToProps = dispatch => ({
  setLibQuery: query =>
    dispatch({
      type: "SET_LIB_QUERY",
      payload: query
    }),
  resetQuery: () => dispatch({ type: "RESET_LIB_QUERY" }),
  searchScTracks: query => {
    dispatch(searchSouncloudTracks(query));
  },
  searchScArtists: query => {
    dispatch(searchSoundcloudArtists(query));
  },
  dispatchSearchSpotify: (query, scope, token) => {
    dispatch(searchSpotify(query, scope, token));
  },
  setSearchQuery: query =>
    dispatch({
      type: "SET_SEARCH_QUERY",
      query
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);