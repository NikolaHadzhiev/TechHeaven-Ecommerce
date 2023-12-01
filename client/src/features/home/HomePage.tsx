import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "./HomePage.scss";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img src="/images/hero1.jpg" alt="hero" className="heroImage" />
        </div>
        <div>
          <img src="/images/hero2.jpg" alt="hero" className="heroImage" />
        </div>
        <div>
          <img src="/images/hero3.jpg" alt="hero" className="heroImage" />
        </div>
      </Slider>

      <Box className="centerBox">
        <Typography variant="h4" className="welcomeText">
          Welcome to TechHeaven, where the dream of the tech enthusiast comes true
        </Typography>
      </Box>
    </>
  );
};

export default HomePage;
