import React, { useState } from "react";
import {
  withStyles,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { sendRestoMessage } from "../../store/actions/restoMessageActions";
import { toast } from "react-toastify";
import EmailSharpIcon from '@material-ui/icons/EmailSharp';

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "90%",
    marginLeft: "5%",
    marginTop: "6rem",
    marginBottom: "3rem",
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
    height: "2.5rem",
  },
  mailIcon: {
    margin: "0.5rem",
  },
  mailIntro: {
    fontFamily: "Archivo narrow",
    margin: "1rem",
    fontSize: "1rem",
    fontWeight: 600,
  },

});

const ContactRestoForm = ({ classes, restaurant, sendRestoMessage }) => {
  const [name, setName] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [message, setMessage] = useState("");
  const recipient = restaurant.email


  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setEmailSender("");
    setMessage("");
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
    <div className={classes.root}>
    <Typography className={classes.mailIntro}>Ecrivez-nous pour toutes demandes d'informations, repas de groupe, devis ...</Typography>
      <form onSubmit={handleSubmit}>

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
          className={classes.submitButton}
        >
        <EmailSharpIcon className={classes.mailIcon}/>
          Envoyer
        </Button>
      </form>
    </div>
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
