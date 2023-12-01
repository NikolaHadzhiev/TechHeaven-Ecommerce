import { Typography, Button, Paper, TextField, Grid, Box } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./ContactPage.scss";

const center = {
  lat: 42.6977,
  lng: 23.3219,
};

const ContactPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper className="contactPaperStyle">
          <Typography variant="h4" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            You can find us at:
          </Typography>
          <Typography variant="body1" gutterBottom>
            - Central office and TechHeaven Gaming Room Sofia
          </Typography>
          <Typography variant="body1" gutterBottom>
            - support@techheaven.com
          </Typography>
          <Typography variant="body1" gutterBottom>
            - service@techheaven.com
          </Typography>
        </Paper>
        <Paper className="contactPaperStyleMargin">
          <Typography variant="h4" component="h1" gutterBottom>
            Message us
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" className="contactButtonStyle">
            Send
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <LoadScript googleMapsApiKey="AIzaSyCJgDWn3WTrKuh1Wv94X97mC_S525aJ2V0">
          <GoogleMap
            mapContainerClassName="contactContainerStyle"
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
        <Paper className="contactPaperStyleMargin">
          <Box>
            <Typography variant="h4" align="left" mb={3}>
              TechHeaven Gaming Room Sofia
            </Typography>
            <Typography variant="body1" align="left">
              Address: str. "Buzluja" 37, 1000 Sofia
            </Typography>
            <Typography variant="body1" align="left">
              Work time: 09:30 - 18:00 (Monday - Friday)
            </Typography>
            <Typography variant="body1" align="left">
              Phone number: +359 88 123 4567
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ContactPage;
