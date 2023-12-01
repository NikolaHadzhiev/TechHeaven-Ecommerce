import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Error.scss";

const NotFoundError = () => {
  return (
    <Container component={Paper} className="error-container">
        <Typography variant="h5" gutterBottom className="error-text">
          Oops - we could not find what you are looking for
        </Typography>
        <Divider />
        <Button fullWidth component={Link} to={"/catalog"}>
          Go back to shop
        </Button>
    </Container>
  );
};

export default NotFoundError;
