import { Backdrop, Box, CircularProgress, Typography } from "@mui/material"

interface Props {
    message?: string;
}

 const LoadingComponent = ({message = 'Loading...'}: Props) => {
    return (
        <Backdrop invisible={true} open={true}>
            <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                 <CircularProgress size={100} />
                 <Typography variant='h4' sx={{justifyContent: 'center', position: 'fixed', top: '60%'}}>{message}</Typography>
            </Box>
        </Backdrop>
    )
 }

 export default LoadingComponent