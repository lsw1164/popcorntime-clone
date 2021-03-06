import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      this.setState({ nowPlaying, popular, upcoming });
    } catch {
      this.setState({ error: "Can't find movie infomation." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
