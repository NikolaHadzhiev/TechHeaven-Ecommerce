import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFoundError = () => {
    return (
        <Container component={Paper} sx={{height: 400}}>
            <Typography variant="h5" gutterBottom textAlign={'center'}>Oops - we could not find what you are looking for</Typography>
            <Divider />
            <Button fullWidth component={Link} to={'/catalog'}>Go back to shop</Button>
        </Container>
    )
}

export default NotFoundError