import React from "react";
import { Typography } from "@material-ui/core";
import TemplateForm from "../forms/TemplateForm";

function TemplatePage() {
  return (
    <div>
      <Typography variant="h1">
        Créez votre carte en ligne en quelques clics !{" "}
      </Typography>
      <Typography variant="body1">
        Choisissez le style qui correspond le plus aux besoins de votre carte.
      </Typography>
      <Typography variant="body1">
        Votre carte sera personnalisée avec votre logo, le nom de votre
        établissement et ses coordonnées.
      </Typography>
      <Typography variant="body1">
        Elle sera hebergée sur une page dédiée et vous pourrez la modifier à
        tout moment
      </Typography>
      <TemplateForm />
    </div>
  );
}

export default TemplatePage;
