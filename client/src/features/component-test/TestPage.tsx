import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material"
import apiRequests from "../../app/api/requests";
import { useState } from "react";
import "./TestPage.scss"

const TestPage = () => {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    
    return (
        <Container>
            <Typography gutterBottom variant={'h2'} className="test-error">Errors for testing purposes</Typography>
            <ButtonGroup variant="text" disableRipple color='error' className="test-buttons">
                <Button onClick={() => apiRequests.TestErrors.get400Error().catch(error => console.log(error))} variant={'contained'}>Test 400 error</Button>
                <Button onClick={() => apiRequests.TestErrors.get401Error().catch(error => console.log(error))} variant={'contained'}>Test 401 error</Button>
                <Button onClick={() => apiRequests.TestErrors.get404Error().catch(error => console.log(error))} variant={'contained'}>Test 404 error</Button>
                <Button onClick={() => apiRequests.TestErrors.get500Error().catch(error => console.log(error))} variant={'contained'}>Test 500 error</Button>
                <Button onClick={() => apiRequests.TestErrors.getValidationError().then(() => console.log('Should not see this!')).catch(error => error.length > 0 ? setValidationErrors(error) : setValidationErrors(["Validation test"]))} variant={'contained'}>Test validation error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error" className="test-alert">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>}
        </Container>
    )
}

export default TestPage