import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useStore } from "../../store/postData/useStore";

const SpotKeysComp: React.FC = () => {
  const {
    spotName,
    setSpotName,
    spotObject,
    setSpotObject,
    pathName,
    setPathName,
    apiUrl,
    setApiUrl,
    lon,
    setLon,
    lat,
    setLat,
  } = useStore();

  return (
    <>
      {/* Nom du modèle mongoose */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>
          Nom du modèle mongoose:
        </Typography>
        <TextField
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          label="Ex: RiverHeritage"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>

      {/* Objet de l'API */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography sx={{ flex: 1, fontWeight: "bold" }}>
            Objet de l'API:
          </Typography>
          <TextField
            value={spotObject}
            onChange={(e) => setSpotObject(e.target.value)}
            label="Le plus précis possible (éviter les valeurs null)"
            variant="outlined"
            multiline
            minRows={4}
            sx={{ flex: 2 }}
          />
        </Box>
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mt: 2 }}>
          Exemple d'objet:
          {"{"}
          "geo_point_2d": {"{"}
          "lon": 2.26887048726, "lat": 48.8391597547
          {"}"}, "geo_shape": {"{"}
          "type": "Feature", "geometry": {"{"}
          "coordinates": [ [ [ 2.267474764894179, 48.8399745660592 ], [
          2.26709805113935, 48.83953904847514 ], [ 2.270266204837458,
          48.838344946743014 ], [ 2.270642935083676, 48.838780453907596 ], [
          2.267474764894179, 48.8399745660592 ] ] ], "type": "Polygon"
          {"}"}, "properties": {"{}"}
          {"}"}, "objectid": "1", "identifian": "75056151", "commune": "Paris",
          "code_carto": "1", "elem_patri": "Pont du Garigliano", "ensem2":
          "Relie les 15ème et 16ème arrondissement, du quartier de Javel au
          quartier d'Auteuil", "elem_princ": "Pont-poutres métalliques, piles en
          béton.", "histo1": "1966", "commentair": "text", "st_areashape":
          "14932.2565686", "st_lengthshape": "647.07831155"
          {"}"}
        </Typography>
      </Box>

      {/* Chemin (path back et front) */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>
          Chemin (path back et front):
        </Typography>
        <TextField
          value={pathName}
          onChange={(e) => setPathName(e.target.value)}
          label="Ex: /river-heritage"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>

      {/* Url de l'API */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ flex: 1, fontWeight: "bold" }}>
          Url de l'API:
        </Typography>
        <TextField
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          label="Ex: https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/.../records"
          variant="outlined"
          sx={{ flex: 2 }}
        />
      </Box>

      {/* Clés nécessaires */}
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>Clés nécessaires:</Typography>
        {/* Longitude */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography sx={{ flex: 1 }}>Longitude:</Typography>
          <TextField
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            label="Ex: geo_point_2d.lon"
            variant="outlined"
            sx={{ flex: 2 }}
          />
        </Box>
        {/* Latitude */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography sx={{ flex: 1 }}>Latitude:</Typography>
          <TextField
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            label="Ex: geo_point_2d.lat"
            variant="outlined"
            sx={{ flex: 2 }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SpotKeysComp;
