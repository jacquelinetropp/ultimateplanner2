import React, { Fragment } from "react";
import styled from "styled-components";
import Navbar from "../components/Navigation/Navbar/Navbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: -10;
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0.6;
`;

const Home = ({loggedIn}) => {
  return (
    <Fragment>
      <Navbar loggedIn transparent />
      <SideDrawer loggedIn={loggedIn} transparent/> 
      <HomeWrapper>
        <VideoContainer>
          <video autoPlay loop muted>
            <source src="/images/video.mp4" type="video/mp4" />
          </video>
        </VideoContainer>
      </HomeWrapper>
    </Fragment>
  );
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Home);
