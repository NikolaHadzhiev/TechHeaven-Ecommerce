import { Box, Typography } from "@mui/material"
import Slider from "react-slick";

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
                    <img src="/images/hero1.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500 }}/>
                </div>
                <div>
                    <img src="/images/hero2.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500 }}/>
                </div>
                <div>
                    <img src="/images/hero3.jpg" alt="hero" style={{display: 'block', width: '100%', maxHeight: 500 }}/>
                </div>
            </Slider>

            <Box display='flex' justifyContent='center' sx={{p: 4}}>
                <Typography variant="h4" sx={{mt: 4}}>
                    Welcome to TechHeaven, where the dream of the tech enthusiast comes true
                </Typography>
            </Box>
        </>
    )
}

export default HomePage