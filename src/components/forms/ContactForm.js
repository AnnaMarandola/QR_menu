import React, { useState } from "react";
import {
  withStyles,
  TextField,
  Button,
  TextareaAutosize,
  Select,
  InputLabel,
} from "@material-ui/core";
import { compose } from "redux";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#eeeeee",
    flexDirection: "column",
    margin: "1rem",
    padding: "2rem",
    [theme.breakpoints.up("sm")]: {
    margin: 0,
    },
  },
  textArea: {
    margin: "1rem",
    marginTop: "2rem",
    minHeight: "7rem",
    [theme.breakpoints.up("sm")]: {
        width: "80%",
        marginLeft: "10%",
        marginBottom: "2rem",
      },
  },
  contactInputs: {
      [theme.breakpoints.up("sm")]: {
          width: "80%",
        },
  },
  submitButton: {
    width: "35%",
    marginLeft: "32.5%",
    color: "white",    
  },
});

const ContactForm = ({ classes }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    // db.collection("contacts")
    //   .add({
    //     name: name,
    //     email: email,
    //     message: message,
    //   })
    //   .then(() => {
    //     setLoader(false);
    //     alert("Your message has been submitted👍");
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //     setLoader(false);
    //   });

    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
    console.log("MAIL SUBMITED", name, email, message);
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
        />

        <TextField
          id="email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.contactInputs}
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
      />

      <Button
        type="submit"
        style={{ background: loader ? "yellow" : "#031627" }}
        className={classes.submitButton}
      >
        Envoyer
      </Button>
    </form>
  );
};

export default compose(withStyles(styles))(ContactForm);
