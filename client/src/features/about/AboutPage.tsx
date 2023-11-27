import { Typography, Paper, List, ListItem } from "@mui/material";

const AboutPage = () => {
  return (
    <Paper sx={{ my: 4, p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About TechHeaven
      </Typography>
      <Typography variant="body1" gutterBottom mt={3}>
        TechHeaven is more than just a website for gaming peripherals,
        merchandise, and hardware. t's a platform that ensures a positive
        experience and exceptional service. Since the inception of TechHeaven,
        we've been tirelessly dedicated to assisting gamers in discovering the
        perfect product for their needs.
      </Typography>
      <Typography variant="body1" gutterBottom mt={3}>
        We are a self-reliant division of one of Bulgaria's leading computer
        distribution companies, providing free delivery for orders exceeding
        50.00$ across the country for our entire range of products. Our team at
        TechHeaven is composed of professionals who stay updated with the latest
        trends and share them with you through our daily videos. TechHeaven is an
        authorized sales representative and service partner for all the brands
        we offer on our site, ensuring top-notch after-sales service.
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom sx={{mt: 4}}>
        Why should you choose our services?
      </Typography>
      <List>
        <ListItem>- Personalized approach to each client</ListItem>
        <ListItem>- Familiarity with our team</ListItem>
        <ListItem>- Competitive prices and shopping conditions</ListItem>
        <ListItem>- Appealing promotions and offers</ListItem>
        <ListItem>- Wide range of products</ListItem>
        <ListItem>
          - Detailed and accurate information on each product at www.gplay.bg
        </ListItem>
        <ListItem>
          - Free delivery for orders over 50.00$, irrespective of the
          location in Bulgaria
        </ListItem>
        <ListItem>
          - Assistance in case of complaints or issues with the official
          warranty services
        </ListItem>
      </List>
    </Paper>
  );
};

export default AboutPage;
