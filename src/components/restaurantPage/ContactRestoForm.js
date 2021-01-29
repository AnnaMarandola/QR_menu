import React, { useState } from "react";
import {
  withStyles,
  TextField,
  Button,
  Card,
  Typography,
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { sendRestoMessage } from "../../store/actions/restoMessageActions";
import { toast } from "react-toastify";
// import MAIL from 0.5"../../assets/icons/contactMail.png";
import EmailSharpIcon from '@material-ui/icons/EmailSharp';

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "90%",
    marginLeft: "5%",
    marginTop: "2rem",
    marginBottom: "2rem",
    flexDirection: "column",
    textAlign: "center",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      margin: 0,
      flexDirection: "row",
    },
  },
  textArea: {
    marginTop: "2rem",
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "2rem",
      marginRight: "2.5%",
    },
  },
  contactInputs: {
    width: "80%",
  },
  submitButton: {
    color: "black",
    margin: "2rem",
    paddingRight: "1rem",
    border: "2px solid black",
  },
  mailIcon: {
    margin: "0.5rem",
  },
  mailIntro: {
    fontFamily: "Archivo narrow",
  }
});

const ContactRestoForm = ({ classes, restaurant, sendRestoMessage }) => {
  const [name, setName] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [message, setMessage] = useState("");
  console.log("rrrerestorant", restaurant)
  const recipient = restaurant.email
  console.log("recipient", recipient)

  // const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoader(true);
    setName("");
    setEmailSender("");
    setMessage("");
    console.log("MAIL SENT", name, emailSender, message, recipient);
    sendRestoMessage({
      emailSender: emailSender,
      name: name,
      message: message,
      recipient: recipient,
    });
    toast.success(
      "Votre message a bien été envoyé, nous vous répondrons rapidement.",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };

  return (
    <Card className={classes.root}>
    <Typography className={classes.mailIntro}>Ecrivez-nous pour toutes demandes d'informations, repas de groupe, devis ...</Typography>
      <form onSubmit={handleSubmit}>
        {/* <img src={MAIL} alt="mail icon" className={classes.mailIcon} /> */}

        <div>
          <TextField
            id="name"
            label="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.contactInputs}
            required="required"
            type="text"
          />

          <TextField
            id="emailSender"
            label="email"
            value={emailSender}
            onChange={(e) => setEmailSender(e.target.value)}
            className={classes.contactInputs}
            required="required"
            type="mail"
          />
        </div>

        <TextField
          id="message"
          variant="outlined"
          label="Votre message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={classes.textArea}
          required="required"
        />

        <Button
          type="submit"
          // style={{ background: loader ? "#eeeeee" : "#031627" }}
          className={classes.submitButton}
        >
        <EmailSharpIcon className={classes.mailIcon}/>
          Envoyer
        </Button>
      </form>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendRestoMessage: (message) => dispatch(sendRestoMessage(message)),
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(ContactRestoForm);
