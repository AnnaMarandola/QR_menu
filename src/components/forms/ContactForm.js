import React, { useState } from "react";
import {
  withStyles,
  TextField,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { sendMessage } from "../../store/actions/messageActions";
import { toast } from "react-toastify";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#eeeeee",
    flexDirection: "column",
    paddingBottom: "2rem",
    [theme.breakpoints.up("sm")]: {
      margin: 0,
    },
  },
  textArea: {
    margin: "0.5rem",
    marginTop: "2rem",
    minHeight: "7rem",
    [theme.breakpoints.up("sm")]: {
      width: "80%",
      marginLeft: "10%",
      marginBottom: "2rem",
    },
  },
  contactInputs: {
    width: "80%",
  },
  submitButton: {
    width: "35%",
    marginLeft: "32.5%",
    color: "white",
  },
});

const ContactForm = ({ classes, sendMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
    console.log("MAIL SENT", name, email, message);
    sendMessage({
      email: email,
      name: name,
      subject: subject,
      message: message,
    });
    toast.success(
      "Votre message a bien été envoyé, nous vous répondrons rapidement.",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
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
          id="email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.contactInputs}
          required="required"
          type="mail"
        />

        <TextField
          id="subject"
          label="objet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={classes.contactInputs}
        />
      </div>

      <TextareaAutosize
        id="message"
        placeholder="Votre message..."
        variant="filled"
        aria-label="empty textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={classes.textArea}
        required="required"
      />

      <Button
        type="submit"
        style={{ background: loader ? "#eeeeee" : "#031627" }}
        className={classes.submitButton}
      >
        Envoyer
      </Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => dispatch(sendMessage(message)),
  };
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(ContactForm);
