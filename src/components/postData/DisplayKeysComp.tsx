import React from "react";
import { Box, TextField, Typography, Select, MenuItem } from "@mui/material";
import { useStore } from "../../store/postData/useStore";

const DisplayKeysComp: React.FC = () => {
  const {
    title,
    setTitle,
    comment,
    setComment,
    url,
    setUrl,
    featureIsPoint,
    setFeatureIsPoint,
    coords,
    setCoords,
    fixedDisplayed,
    setFixedDisplayed,
    img,
    setImg,
    firstDisplayed,
    setFirstDisplayed,
    address,
    setAddress,
    notDisplayed,
    setNotDisplayed,
  } = useStore();

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Précisions pour l'affichage
      </Typography>
      {/* Titre */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>Titre:</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Ex: Patrimoine fluvial remarquable des bords de seine et de Marne"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Commentaires */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>
          Commentaires (non requis):
        </Typography>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Ex: Origine: Ministère de la Culture"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Url de base */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>
          Url de base:
        </Typography>
        <TextField
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          label="Ex: https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/...bords-de-seine-et-de-marne"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Le spot est un point */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>
          Le spot est un point:
        </Typography>
        <Select
          value={featureIsPoint}
          onChange={(e) => setFeatureIsPoint(e.target.value)}
          variant="outlined"
          sx={{ flex: 2 }}
        >
          <MenuItem value="true">true</MenuItem>
          <MenuItem value="false">false</MenuItem>
        </Select>
      </Box>
      {/* Objet contenant les coordonnées */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>
          Objet contenant les coordonnées:
        </Typography>
        <TextField
          value={coords}
          onChange={(e) => setCoords(e.target.value)}
          label="Ex: geo_shape.geometry"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Affichage de la Popup */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
        Affichage de la Popup (aucun élément requis)
      </Typography>
      {/* Élément(s) fixe(s) non scrollable(s) */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1 }}>
          Élément(s) fixe(s) non scrollable(s):
        </Typography>
        <TextField
          value={fixedDisplayed}
          onChange={(e) => setFixedDisplayed(e.target.value)}
          label="Ex: elem_patri, nom_du_site"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Url de l'image */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1 }}>Url de l'image:</Typography>
        <TextField
          value={img}
          onChange={(e) => setImg(e.target.value)}
          label="Ex: photo.url"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Afficher en premier */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1 }}>
          Afficher en premier (plusieurs possibles):
        </Typography>
        <TextField
          value={firstDisplayed}
          onChange={(e) => setFirstDisplayed(e.target.value)}
          label="Ex: historique, description"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Adresse */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1 }}>Adresse (plusieurs possibles):</Typography>
        <TextField
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          label="Ex: adresse_com, commune"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* Clés à ne pas afficher */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1 }}>Clés à ne pas afficher:</Typography>
        <TextField
          value={notDisplayed}
          onChange={(e) => setNotDisplayed(e.target.value)}
          label="Mettre objet des coordonnées si c'est un objet composé. Ex: geo_point_2d, geo_shape, objectid, identifian, code_carto"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>
    </Box>
  );
};

export default DisplayKeysComp;
