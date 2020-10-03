import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TemplateCarousel from "./TemplateCarroussel";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";


function TemplatePage() {
    const [handleOpen, setHandleOpen] = useState({ open: false })
    const handleClick = () => {
        setHandleOpen({ open: true })
    }
  const matches = useMediaQuery("(max-width: 600px)");
  return (
    <div>
    <Typography variant="h1">Créez votre carte en ligne en quelques clics ! </Typography>
    <Typography variant="body1">Choisissez le style qui correspond le plus aux besoins de votre carte.</Typography>
    <Typography variant="body1">Votre carte sera personnalisée avec votre logo, le nom de votre établissement et ses coordonnées.</Typography>
    <Typography variant="body1">Elle sera hebergée sur une page dédiée et vous pourrez la modifier à tout moment</Typography>
    <Button onClick={handleClick}>Choississez le style de votre carte</Button>
      <TemplateCarousel 
        isMobile={matches}
        handleOpen={handleOpen}
        setHandleOpen={setHandleOpen}
      />
    </div>
  );
}

export default TemplatePage;
