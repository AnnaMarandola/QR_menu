import React from "react";
import { connect } from "react-redux";
import Pdf from "react-to-pdf";
import { compose } from "redux";
import QrCode from "./QrCode";
import { firestoreConnect } from "react-redux-firebase";
import { Typography } from "@material-ui/core";



const ref = React.createRef();

const QrCodePdf = ({match, restaurant}) => {
    console.log("params", match.params)
    const resto = {...restaurant}
    const restoId = match.params.resto;
    const menuId = match.params.menu;

    return (
    <>
    <div ref={ref}>
        <Typography variant="h1">{resto.name}</Typography>
        <img src={resto.logo} width="50%" alt="logo resto" />
        <h1>La carte</h1>
        <QrCode restoId={restoId} menuId={menuId} />
    </div>
    <Pdf targetRef={ref} filename="qrmenu.pdf">
    {({ toPdf }) => (<button onClick={toPdf} >Télécharger le PDF</button>)}
    </Pdf>
    </>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      restaurant:
        state.firestore.ordered.restaurants &&
        state.firestore.ordered.restaurants[0],
    };
  };

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {
          collection: "restaurants",
          doc: props.match.params.resto,
        },
    ])
)(QrCodePdf);