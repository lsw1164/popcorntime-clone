import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const VIDEO = "video";
const PRODUCTION = "production";
const SEASON = "season";
const YOUTUBE_BASE = "https://www.youtube.com/embed";

const Container = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-top: 50px;
  height: 470px;
  width: 100%;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.7);
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

const Title = styled.h2`
  font-size: 30px;
  margin: 20px;
`;

const ProductionContainer = styled.div`
  display: flex;
  overflow: auto;
`;

const ProductionCompany = styled.div`
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-color: rgba(200, 200, 200, 0.5);
  border: 10px solid rgba(200, 200, 200, 0.7);
  border-radius: 5px;
  background-size: contain;
  background-repeat: no-repeat;
  width: 300px;
  height: 150px;
  padding: 10px;
  margin: 10px;
`;

const ProductionCountries = styled.div`
  margin: 10px;
`;

const SeasonContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
`;

const Season = styled.div`
  background-image: url(${(props) => props.bgImg});
  background-size: contain;
  background-position: center center;
  border-radius: 5px;
  background-repeat: no-repeat;
  width: 200px;
  height: 300px;
  margin: 20px;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  font-size: 20px;
  font-weight: 900;
  font-family: sans;
  color: black;
`;

const useTab = () => {
  const [tab, setTab] = useState("video");
  return [tab, setTab];
};

function DetailTab({
  result: { videos, production_companies, production_countries, seasons },
}) {
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
          <>
            <Title>Companies</Title>
            <ProductionContainer>
              {production_companies.map((company) => (
                <ProductionCompany
                  key={company.id}
                  bgImg={
                    company.logo_path
                      ? `https://image.tmdb.org/t/p/w200/${company.logo_path}`
                      : require("../../assets/noPosterSmall.png")
                  }
                >
                  {company.name}
                </ProductionCompany>
              ))}
            </ProductionContainer>
          </>
        )}
        {tab === PRODUCTION && Array.isArray(production_countries) && (
          <>
            <Title>Countries</Title>
            <ProductionContainer>
              {production_countries.map((country) => (
                <ProductionCountries key={country.name}>
                  {country.name}
                </ProductionCountries>
              ))}
            </ProductionContainer>
          </>
        )}
        {tab === SEASON && Array.isArray(seasons) && (
          <>
            <Title>Seasons</Title>
            <SeasonContainer>
              {seasons.map((season) => (
                <div>
                  <Season
                    key={season.id}
                    bgImg={
                      season.poster_path
                        ? `https://image.tmdb.org/t/p/w200/${season.poster_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                  >
                    {season.name}
                  </Season>
                </div>
              ))}
            </SeasonContainer>
          </>
        )}
      </Content>
    </Container>
  );
}

export default DetailTab;
