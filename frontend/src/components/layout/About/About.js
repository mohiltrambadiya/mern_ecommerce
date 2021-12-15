import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import {LinkedIn} from "@material-ui/icons";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/_mohil_trambadiya_/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dj0dsxfi5/image/upload/v1639455125/IMG_4215_tqtss0.jpg"
              alt="Founder"
            />
            <Typography>Mohil Trambadiya</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @mohil. Only with the
              purpose to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2"></Typography>
            <a
              href="https://www.linkedin.com/in/mohil-trambadiya-494a36148?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BVM%2FqJ1WhQRWjSGhaul8fog%3D%3D"
              target="blank"
            >
              <LinkedIn className="linkdinSvgIcon" />
            </a>

            <a href="https://www.instagram.com/_mohil_trambadiya_/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;