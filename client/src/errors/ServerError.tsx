import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const ServerError = () => {
    return (
        <Container component={Paper} sx={{height: 400}}>
            <Typography variant="h5" gutterBottom textAlign={'center'}>Internal server error has occured</Typography>
            <Divider />
            <Button fullWidth component={Link} to={'/'}>Go back home</Button>
        </Container>
    )
}

export default ServerError