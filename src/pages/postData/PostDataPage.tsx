import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../store/postData/useStore";
import axios from "axios";

import SpotKeysComp from "../../components/postData/SpotKeysComp";
import DisplayKeysComp from "../../components/postData/DisplayKeysComp";
import OpenDataKeysComp from "../../components/postData/OpenDataKeysComp";

const PostDataPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    spotCoords,
    // openDataKeys,
    setOpenDataKeys,
    conditionalKeys,
    setSpotKeysValidationError,
    setDisplayKeysValidationError,
    displayKeys,
    setDisplayKeys,
    selectedOpenDataKeys,
    setOpenDataKeysValidationError,
  } = useStore();

  const [firstModalOpen, setFirstModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isFirstRequestSuccessful, setIsFirstRequestSuccessful] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.openDataKeys) {
      setOpenDataKeys(location.state.openDataKeys);
    }
  }, [location.state]);

  // const handleCreateData = async () => {
  //   // Clear previous validation errors
  //   setSpotKeysValidationError("");
  //   setDisplayKeysValidationError("");
  //   setOpenDataKeysValidationError("");

  //   // Validation logic for SpotKeysComp
  //   if (!spotName || !spotObject || !pathName || !apiUrl || !lon || !lat) {
  //     setSpotKeysValidationError("Tous les champs doivent être remplis.");
  //     return;
  //   }

  //   // Convert spotObject from string to actual object
  //   let parsedSpotObject;

  //   try {
  //     parsedSpotObject = Function(`"use strict";return (${spotObject})`)();
  //   } catch (error) {
  //     setSpotKeysValidationError("L'objet de l'API n'est pas valide.");
  //     return;
  //   }

  //   // Validation logic for DisplayKeysComp
  //   if (!title || !url || !coords) {
  //     setDisplayKeysValidationError("Remplir les champs obligatoires.");
  //     return;
  //   }

  //   // Validation logic for OpenDataKeysComp
  //   if (
  //     !selectedOpenDataKeys ||
  //     !selectedOpenDataKeys.openDataPath ||
  //     !selectedOpenDataKeys.openDataSrc ||
  //     !selectedOpenDataKeys.openDataUrl
  //   ) {
  //     setOpenDataKeysValidationError(
  //       "Tous les champs de la source Open Data doivent être remplis."
  //     );
  //     return;
  //   }

  //   // Transform img into an array
  //   const imgArray = img ? [img] : [""];

  //   // Split strings by spaces and/or commas for fixedDisplayed, firstDisplayed, address, notDisplayed
  //   const fixedDisplayedArray = fixedDisplayed
  //     ? fixedDisplayed.split(/[ ,]+/)
  //     : [""];
  //   const firstDisplayedArray = firstDisplayed
  //     ? firstDisplayed.split(/[ ,]+/)
  //     : [""];
  //   const addressArray = address ? address.split(/[ ,]+/) : [""];
  //   const notDisplayedArray = notDisplayed ? notDisplayed.split(/[ ,]+/) : [""];

  //   // Set spotCoords to coords if spotCoords is empty
  //   const finalSpotCoords = spotCoords || coords;
  //   console.log("finalSpotCoords: ", finalSpotCoords);

  //   // Set displayKeys with transformed values
  //   setDisplayKeys({
  //     title,
  //     comment,
  //     url,
  //     featureIsPoint,
  //     coords,
  //     spotCoords: finalSpotCoords,
  //     fixedDisplayed: fixedDisplayedArray,
  //     img: imgArray,
  //     firstDisplayed: firstDisplayedArray,
  //     address: addressArray,
  //     notDisplayed: notDisplayedArray,
  //     path: pathName,
  //   });

  //   // Add lon and lat to conditionalKeys, limit to 2 elements
  //   conditionalKeys.push(lon, lat);
  //   if (conditionalKeys.length > 2) {
  //     conditionalKeys.splice(0, conditionalKeys.length - 2);
  //   }

  //   // API request to backend
  //   const backendApiUrl = import.meta.env.VITE_API_URI;

  //   try {
  //     await axios.post(`${backendApiUrl}/add-data-set`, {
  //       spotName,
  //       spotObject: parsedSpotObject,
  //       pathName,
  //       apiUrl,
  //       conditionalKeys,
  //       displayKeys: {
  //         title,
  //         comment,
  //         url,
  //         featureIsPoint,
  //         coords,
  //         spotCoords: finalSpotCoords,
  //         fixedDisplayed: fixedDisplayedArray,
  //         img: imgArray,
  //         firstDisplayed: firstDisplayedArray,
  //         address: addressArray,
  //         notDisplayed: notDisplayedArray,
  //         path: pathName,
  //       },
  //       openDataKeys: selectedOpenDataKeys,
  //     });
  //     setIsFirstRequestSuccessful(true);
  //     setModalMessage("Requête réussie");
  //   } catch (error: any) {
  //     setIsFirstRequestSuccessful(false);
  //     setModalMessage(
  //       `Erreur: ${error?.message || "Une erreur inconnue est survenue"}`
  //     );
  //   } finally {
  //     setFirstModalOpen(true);
  //   }
  // };

  // Get form values
  // Create a new spot Model in backend: in models/spots
  const handleCreateModel = async () => {
    // Clear previous validation errors
    setSpotKeysValidationError("");
    setDisplayKeysValidationError("");
    setOpenDataKeysValidationError("");

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

    // Validation logic for OpenDataKeysComp
    if (
      !selectedOpenDataKeys ||
      !selectedOpenDataKeys.openDataPath ||
      !selectedOpenDataKeys.openDataSrc ||
      !selectedOpenDataKeys.openDataUrl
    ) {
      setOpenDataKeysValidationError(
        "Tous les champs de la source Open Data doivent être remplis."
      );
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

    // Set spotCoords to coords if spotCoords is empty
    const finalSpotCoords = spotCoords || coords;
    console.log("finalSpotCoords: ", finalSpotCoords);

    // const displayKeys = ${JSON.stringify(
    //   {
    //     ...displayKeys,
    //     notDisplayed: [
    //       ...(displayKeys.notDisplayed || []),
    //       "_id",
    //       "__v",
    //       "createdAt",
    //       "updatedAt",
    //     ],
    //   },
    //   null,
    //   2
    // )};
    // Set displayKeys with transformed values
    setDisplayKeys({
      title,
      comment,
      url,
      featureIsPoint,
      coords,
      spotCoords: finalSpotCoords,
      fixedDisplayed: fixedDisplayedArray,
      img: imgArray,
      firstDisplayed: firstDisplayedArray,
      address: addressArray,
      // notDisplayed: notDisplayedArray,
      notDisplayed: [
        ...(notDisplayedArray || []),
        "_id",
        "__v",
        "createdAt",
        "updatedAt",
      ],
      path: pathName,
    });

    // Add lon and lat to conditionalKeys, limit to 2 elements
    conditionalKeys.push(lon, lat);
    if (conditionalKeys.length > 2) {
      conditionalKeys.splice(0, conditionalKeys.length - 2);
    }

    // API request to backend
    const backendApiUrl = import.meta.env.VITE_API_URI;

    try {
      // await axios.post(`${backendApiUrl}/add-data-set`, {
      //   spotName,
      //   spotObject: parsedSpotObject,
      //   pathName,
      //   apiUrl,
      //   conditionalKeys,
      //   displayKeys: {
      //     title,
      //     comment,
      //     url,
      //     featureIsPoint,
      //     coords,
      //     spotCoords: finalSpotCoords,
      //     fixedDisplayed: fixedDisplayedArray,
      //     img: imgArray,
      //     firstDisplayed: firstDisplayedArray,
      //     address: addressArray,
      //     notDisplayed: notDisplayedArray,
      //     path: pathName,
      //   },
      //   openDataKeys: selectedOpenDataKeys,
      // });
      //
      //
      //
      await axios.post(`${backendApiUrl}/add-model`, {
        spotName,
        spotObject: parsedSpotObject,
      });
      //
      //
      //
      setIsFirstRequestSuccessful(true);
      setModalMessage("Requête réussie");
    } catch (error: any) {
      setIsFirstRequestSuccessful(false);
      setModalMessage(
        `Erreur: ${error?.message || "Une erreur inconnue est survenue"}`
      );
    } finally {
      setFirstModalOpen(true);
    }
  };

  // const displayKeys = ${JSON.stringify(
  //   {
  //     ...displayKeys,
  //     notDisplayed: [
  //       ...(displayKeys.notDisplayed || []),
  //       "_id",
  //       "__v",
  //       "createdAt",
  //       "updatedAt",
  //     ],
  //   },
  //   null,
  //   2
  // )};

  // Create DataSet + Spots in DB
  const handleSaveToDatabase = async () => {
    setFirstModalOpen(false);
    setIsLoading(true);
    const backendApiUrl = import.meta.env.VITE_API_URI;
    try {
      // await axios.post(`${backendApiUrl}${pathName}`);
      await axios.post(`${backendApiUrl}/data-set`, {
        pathName,
        apiUrl,
        spotName,
        displayKeys,
        conditionalKeys,
        openDataKeys: selectedOpenDataKeys,
      });
      setModalMessage("Enregistrement réussi");
    } catch (error: any) {
      setModalMessage(
        `Erreur: ${error?.message || "Une erreur inconnue est survenue"}`
      );
    } finally {
      setIsLoading(false);
      setSecondModalOpen(true);
    }
  };

  const handleCloseFirstModal = () => {
    setFirstModalOpen(false);
  };

  const handleCloseSecondModal = () => {
    setSecondModalOpen(false);
    if (modalMessage === "Enregistrement réussi") {
      navigate("/");
    }
  };
  isLoading && console.log("Loading");

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
        // onClick={handleCreateData}
        onClick={handleCreateModel}
        sx={{ mt: 4 }}
      >
        Créer le jeu, les spots et les routes du back
      </Button>
      <Modal
        open={firstModalOpen}
        onClose={handleCloseFirstModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Résultat de la requête
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          {!isFirstRequestSuccessful && (
            <IconButton
              onClick={handleCloseFirstModal}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
          )}
          {isFirstRequestSuccessful && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveToDatabase}
              sx={{ mt: 2 }}
            >
              Enregistrer dans la base de données
            </Button>
          )}
        </Box>
      </Modal>
      <Modal
        open={secondModalOpen}
        onClose={handleCloseSecondModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Veuillez patienter...</Typography>
            </Box>
          ) : (
            <>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                {modalMessage}
              </Typography>
              {modalMessage.startsWith("Erreur") && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveToDatabase}
                  sx={{ mt: 2 }}
                >
                  Enregistrer dans la base de données
                </Button>
              )}
              {modalMessage === "Enregistrement réussi" && (
                <IconButton
                  onClick={handleCloseSecondModal}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PostDataPage;
