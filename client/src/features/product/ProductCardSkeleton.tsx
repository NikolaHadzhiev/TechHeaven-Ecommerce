import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Skeleton
} from "@mui/material";
import "./ProductCardSkeleton.scss"

export default function ProductCardSkeleton() {
    return (
        <Grid item xs component={Card}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                    />
                }
            />
            <Skeleton className="skeleton" animation="wave" variant="rectangular" />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={10} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </>
            </CardContent>
            <CardActions>
                <>
                    <Skeleton animation="wave" height={10} width='40%' />
                    <Skeleton animation="wave" height={10} width="20%" />
                </>
            </CardActions>
        </Grid>
    )
}