import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

interface OpenDataKey {
  openDataPath: string;
  openDataSrc: string;
  openDataUrl: string;
}

const PostDataPage: React.FC = () => {
  const location = useLocation();
  const [spotName, setSpotName] = useState("");
  const [spotObject, setSpotObject] = useState("");
  const [pathName, setPathName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");
  const [featureIsPoint, setFeatureIsPoint] = useState("false");
  const [coords, setCoords] = useState("");
  const [fixedDisplayed, setFixedDisplayed] = useState("");
  const [img, setImg] = useState("");
  const [firstDisplayed, setFirstDisplayed] = useState("");
  const [address, setAddress] = useState("");
  const [notDisplayed, setNotDisplayed] = useState("");
  const [openDataKeys, setOpenDataKeys] = useState<OpenDataKey[]>([]);
  const [selectedOpenDataKey, setSelectedOpenDataKey] =
    useState<OpenDataKey | null>(null);
  const [showAddSourceBox, setShowAddSourceBox] = useState(false);
  const [newOpenDataSrc, setNewOpenDataSrc] = useState("");
  const [newOpenDataPath, setNewOpenDataPath] = useState("");
  const [newOpenDataUrl, setNewOpenDataUrl] = useState("");

  useEffect(() => {
    if (location.state && location.state.openDataKeys) {
      setOpenDataKeys(location.state.openDataKeys);
    }
  }, [location.state]);

  const handleAddSource = () => {
    const newSource = {
      openDataSrc: newOpenDataSrc,
      openDataPath: newOpenDataPath,
      openDataUrl: newOpenDataUrl,
    };
    setOpenDataKeys([...openDataKeys, newSource]);
    setShowAddSourceBox(false);
    setNewOpenDataSrc("");
    setNewOpenDataPath("");
    setNewOpenDataUrl("");
  };

  return (
    <Box
      sx={{ p: 2, border: "1px solid #ccc", maxWidth: 1000, margin: "0 auto" }}
    >
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

      {/* Précisions pour l'affichage */}
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
          <Typography sx={{ flex: 1 }}>
            Adresse (plusieurs possibles):
          </Typography>
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

      {/* Open Data: sources */}
      <Box sx={{ p: 2, border: "1px solid #ccc", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Open Data: sources
        </Typography>
        {openDataKeys.length === 0 ? (
          <Button variant="contained" onClick={() => setShowAddSourceBox(true)}>
            Ajouter une source
          </Button>
        ) : (
          <>
            <Select
              value={selectedOpenDataKey?.openDataSrc || ""}
              onChange={(e) => {
                const selectedKey = openDataKeys.find(
                  (key) => key.openDataSrc === e.target.value
                );
                setSelectedOpenDataKey(selectedKey || null);
              }}
              displayEmpty
              sx={{ minWidth: 300, mr: 2 }}
            >
              {openDataKeys.map((key, index) => (
                <MenuItem key={index} value={key.openDataSrc}>
                  {key.openDataSrc}
                </MenuItem>
              ))}
              <MenuItem
                value="add-new"
                onClick={() => setShowAddSourceBox(true)}
              >
                Ajouter une source
              </MenuItem>
            </Select>
            {selectedOpenDataKey && (
              <Box
                sx={{
                  position: "relative",
                  border: "1px solid #ccc",
                  p: 2,
                  mt: 2,
                }}
              >
                <IconButton
                  onClick={() => setSelectedOpenDataKey(null)}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ mb: 1 }}>
                  <strong>Nom:</strong> {selectedOpenDataKey.openDataSrc}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Chemin front:</strong>{" "}
                  {selectedOpenDataKey.openDataPath}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <strong>Url page d'accueil open data:</strong>{" "}
                  {selectedOpenDataKey.openDataUrl}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setSelectedOpenDataKey(null)}
                  sx={{ mt: 2 }}
                >
                  Ok
                </Button>
              </Box>
            )}
          </>
        )}

        {showAddSourceBox && (
          <Box
            sx={{ border: "1px solid #ccc", p: 2, mt: 2, position: "relative" }}
          >
            <IconButton
              onClick={() => setShowAddSourceBox(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Ajouter une source
            </Typography>
            {/* Nom */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ flex: 1 }}>Nom:</Typography>
              <TextField
                value={newOpenDataSrc}
                onChange={(e) => setNewOpenDataSrc(e.target.value)}
                label="Ex: Open data Ville de Paris"
                variant="outlined"
                sx={{ flex: 2 }}
              />
            </Box>
            {/* Chemin dans le front */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ flex: 1 }}>Chemin dans le front:</Typography>
              <TextField
                value={newOpenDataPath}
                onChange={(e) => setNewOpenDataPath(e.target.value)}
                label="Ex: /paris-data"
                variant="outlined"
                sx={{ flex: 2 }}
              />
            </Box>
            {/* Url page d'accueil */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ flex: 1 }}>Url page d'accueil:</Typography>
              <TextField
                value={newOpenDataUrl}
                onChange={(e) => setNewOpenDataUrl(e.target.value)}
                label="Ex: https://opendata.paris.fr/pages/home/"
                variant="outlined"
                sx={{ flex: 2 }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleAddSource}
              sx={{ mt: 2 }}
            >
              Enregistrer
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostDataPage;
