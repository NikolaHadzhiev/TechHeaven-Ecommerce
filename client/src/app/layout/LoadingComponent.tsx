import { Backdrop, Box, CircularProgress, Typography } from "@mui/material"
import "./LoadingComponent.scss"
interface Props {
    message?: string;
}

 const LoadingComponent = ({message = 'Loading...'}: Props) => {
    return (
        <Backdrop invisible={true} open={true}>
            <Box className="loading-container">
                 <CircularProgress size={100} />
                 <Typography variant='h4' className="loading-message">{message}</Typography>
            </Box>
        </Backdrop>
    )
 }

 export default LoadingComponent