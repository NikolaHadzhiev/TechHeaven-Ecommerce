import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import "./Error.scss";

const ServerError = () => {
    return (
        <Container component={Paper} className="error-container">
            <Typography variant="h5" gutterBottom className="error-text">Internal server error has occured</Typography>
            <Divider />
            <Button fullWidth component={Link} to={'/'}>Go back home</Button>
        </Container>
    )
}

export default ServerError