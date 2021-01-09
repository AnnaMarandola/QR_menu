import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BackToTopButton from "../UI kit/BackToTopButton";

const styles = (theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  root: {
    backgroundColor: "#c7def5",
  },
  container: {
    marginBottom: "6rem",
  },
  titleContent: {
    padding: theme.spacing(8, 0, 6),
    textAlign: "center",
    marginBottom: "2rem",
  },
  priceTitle: {
    marginBottom: "4rem",
    fontFamily: "Archivo narrow",
    fontSize: "2rem",
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      fontSize: "4rem",
    },
  },
  priceTitleSpan: {
    color: "#ee1c80",
  },
  cardHeader: {
    textAlign: "center",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  line: {
    textAlign: "center",
  },
});

const tiers = [
  {
    title: "Starter",
    price: "9.90",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Premium",
    subheader: "Le plus populaire",
    price: "19.90",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Pro",
    price: "29.90",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

const Pricing = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Container
          maxWidth="sm"
          component="main"
          className={classes.titleContent}
        >
          <Typography className={classes.priceTitle}>
            <span className={classes.priceTitleSpan}>A</span>bonnements
          </Typography>
          <Typography className={classes.titleText}>
            Paiement sécurisé
          </Typography>
          <Typography className={classes.titleText}>
            Abonnements sans engagements{" "}
          </Typography>
          <Typography className={classes.titleText}>
            Profitez de l'essai gratuit de 14 jours !
          </Typography>
        </Container>

        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    action={tier.title === "Premium" ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography variant="h3">{tier.price}€</Typography>
                      <Typography variant="h6">/mois</Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography className={classes.line} key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default compose(withStyles(styles))(Pricing);
