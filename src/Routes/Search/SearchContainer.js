import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResult: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null,
  };
  render() {
    const { movieResult, tvResults, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResult={movieResult}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
      />
    );
  }
}
