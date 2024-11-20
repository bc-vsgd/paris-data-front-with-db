import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/postData/useStore";

import SpotKeysComp from "../../components/postData/SpotKeysComp";
import DisplayKeysComp from "../../components/postData/DisplayKeysComp";
import OpenDataKeysComp from "../../components/postData/OpenDataKeysComp";

const PostDataPage: React.FC = () => {
  const location = useLocation();
  const {
    spotName,
    spotObject,
    pathName,
    apiUrl,
    lon,
    lat,
    title,
    comment,
    url,
    featureIsPoint,
    coords,
    fixedDisplayed,
    img,
    firstDisplayed,
    address,
    notDisplayed,
    setOpenDataKeys,
    conditionalKeys,
    setSpotKeysValidationError,
    setDisplayKeysValidationError,
    displayKeys,
    setDisplayKeys,
  } = useStore();

  useEffect(() => {
    if (location.state && location.state.openDataKeys) {
      setOpenDataKeys(location.state.openDataKeys);
    }
  }, [location.state]);

  const handleCreateData = () => {
    // Clear previous validation errors
    setSpotKeysValidationError("");
    setDisplayKeysValidationError("");

    // Validation logic for SpotKeysComp
    if (!spotName || !spotObject || !pathName || !apiUrl || !lon || !lat) {
      setSpotKeysValidationError("Tous les champs doivent être remplis.");
      return;
    }

    // Convert spotObject from string to actual object
    let parsedSpotObject;
    try {
      parsedSpotObject = Function(`"use strict";return (${spotObject})`)();
    } catch (error) {
      setSpotKeysValidationError("L'objet de l'API n'est pas valide.");
      return;
    }

    // Validation logic for DisplayKeysComp
    if (!title || !url || !coords) {
      setDisplayKeysValidationError("Remplir les champs obligatoires.");
      return;
    }

    // Transform img into an array
    const imgArray = img ? [img] : [""];

    // Split strings by spaces and/or commas for fixedDisplayed, firstDisplayed, address, notDisplayed
    const fixedDisplayedArray = fixedDisplayed
      ? fixedDisplayed.split(/[ ,]+/)
      : [""];
    const firstDisplayedArray = firstDisplayed
      ? firstDisplayed.split(/[ ,]+/)
      : [""];
    const addressArray = address ? address.split(/[ ,]+/) : [""];
    const notDisplayedArray = notDisplayed ? notDisplayed.split(/[ ,]+/) : [""];

    // Set displayKeys with transformed values
    setDisplayKeys({
      title,
      comment,
      url,
      featureIsPoint,
      coords,
      fixedDisplayed: fixedDisplayedArray,
      img: imgArray,
      firstDisplayed: firstDisplayedArray,
      address: addressArray,
      notDisplayed: notDisplayedArray,
      path: pathName,
    });

    // Add lon and lat to conditionalKeys
    conditionalKeys.push(lon, lat);

    // Log values to console
    console.log("spotName:", spotName);
    console.log("spotObject:", parsedSpotObject);
    console.log("pathName:", pathName);
    console.log("apiUrl:", apiUrl);
    console.log("conditionalKeys:", conditionalKeys);
    console.log("displayKeys:", displayKeys);
  };

  return (
    <Box
      sx={{ p: 2, border: "1px solid #ccc", maxWidth: 1000, margin: "0 auto" }}
    >
      <SpotKeysComp />
      <DisplayKeysComp />
      <OpenDataKeysComp />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateData}
        sx={{ mt: 4 }}
      >
        Créer le jeu, les spots et les routes du back
      </Button>
    </Box>
  );
};

export default PostDataPage;
