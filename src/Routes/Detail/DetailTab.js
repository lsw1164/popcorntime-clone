import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const VIDEO = "video";
const PRODUCTION = "production";
const SEASON = "season";
const YOUTUBE_BASE = "https://www.youtube.com/embed";

const Container = styled.div`
  margin-top: 50px;
  height: 470px;
  width: 100%;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const TabContainer = styled.ul`
  height: 70px;
  display: flex;
  align-items: center;
`;

const Tab = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 70px;
  opacity: ${(props) => (props.current ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const Content = styled.div`
  height: 400px;
`;

const VideoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
`;

const VideoItem = styled.iframe`
  padding: 20px;
  width: 400px;
  height: 300px;
`;

const ProductionContainer = styled.div``;

const ProductionCompany = styled.div``;

const ProductionCountries = styled.div``;

const SeasonContainer = styled.div``;

const useTab = () => {
  const [tab, setTab] = useState("video");
  return [tab, setTab];
};

function DetailTab({
  result: { videos, production_companies, production_countries, seasons },
}) {
  console.log("production_companies : ", production_companies);
  console.log("production_countries : ", production_countries);
  console.log("seasons : ", seasons);
  const [tab, setTab] = useTab();
  return (
    <Container>
      <TabContainer>
        {videos && (
          <Tab current={tab === VIDEO} onClick={() => setTab(VIDEO)}>
            Video
          </Tab>
        )}
        {(production_companies || production_countries) && (
          <Tab current={tab === PRODUCTION} onClick={() => setTab(PRODUCTION)}>
            Production
          </Tab>
        )}
        {seasons && (
          <Tab current={tab === SEASON} onClick={() => setTab(SEASON)}>
            Season
          </Tab>
        )}
      </TabContainer>
      <Content>
        {tab === VIDEO && Array.isArray(videos.results) && (
          <VideoContainer>
            {videos.results.map((video) => (
              <VideoItem
                key={video.key}
                title={video.name}
                src={`${YOUTUBE_BASE}/${video.key}`}
              ></VideoItem>
            ))}
          </VideoContainer>
        )}
        {tab === PRODUCTION && Array.isArray(production_companies) && (
          <ProductionCompany>ProductionCompany</ProductionCompany>
        )}
        {tab === PRODUCTION && Array.isArray(production_countries) && (
          <ProductionCountries>ProductionCountries</ProductionCountries>
        )}
        {tab === SEASON && Array.isArray(seasons) && (
          <SeasonContainer>SeasonContainer</SeasonContainer>
        )}
      </Content>
    </Container>
  );
}

export default DetailTab;
