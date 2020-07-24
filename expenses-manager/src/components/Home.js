import React, { useEffect } from "react";
import { connect } from "react-redux";
import create from "../assests/create.png";
import login from "../assests/login.png";
import browseKickstarters from "../assests/browseKickstarters.png";
import search from "../assests/search.png";
import manage from "../assests/manage.png";
import fund from "../assests/fund.png";
import balance from "../assests/balance.png";
import invite from "../assests/invite.png";
import invite2 from "../assests/invite2.png";
import groups from "../assests/groups.png";
import notification from "../assests/notification.png";
import users from "../assests/users.png";

export const Home = () => {
  useEffect(() => {
    console.log("Component Home did mount...");
    const elems = document.querySelectorAll(".carousel");
    window.M.Carousel.init(elems, {
      fullWidth: true,
      indicators: true,
    });
  }, []);
  return (
    <center>
      <div style={{ minHeight: "800px" }}>
        <h1 className="cyan-text">
          Keep track of everything you spend and earn.
        </h1>

        <div
          style={{ height: "1000px" }}
          className="carousel carousel-slider center"
        >
          <div className="carousel-fixed-item center"></div>{" "}
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Browse Kickstarters</h2>
            <img src={browseKickstarters} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Search for your favourite artist.</h2>
            <img src={search} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Create your account</h2>
            <img src={create} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Login</h2>
            <img src={login} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Manage your account</h2>
            <img src={manage} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Fund projects</h2>
            <img src={fund} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Get a look at your balance</h2>
            <img src={balance} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Participate in groups</h2>
            <img src={groups} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Invite other users to your groups</h2>
            <img src={invite2} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Get them notified</h2>
            <img src={invite} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>Get notifications, accept invites</h2>
            <img src={notification} />
          </div>
          <div className="carousel-item orange white-text" href="#one!">
            <h2>If you are admin, you can even manage users</h2>
            <img src={users} />
          </div>
        </div>
      </div>
    </center>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
