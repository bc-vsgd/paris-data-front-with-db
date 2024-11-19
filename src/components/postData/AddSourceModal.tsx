import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface AddSourceModalProps {
  showAddSourceModal: boolean;
  setShowAddSourceModal: (value: boolean) => void;
  newOpenDataSrc: string;
  setNewOpenDataSrc: (value: string) => void;
  newOpenDataPath: string;
  setNewOpenDataPath: (value: string) => void;
  newOpenDataUrl: string;
  setNewOpenDataUrl: (value: string) => void;
  handleAddSource: () => void;
}

const AddSourceModal: React.FC<AddSourceModalProps> = ({
  showAddSourceModal,
  setShowAddSourceModal,
  newOpenDataSrc,
  setNewOpenDataSrc,
  newOpenDataPath,
  setNewOpenDataPath,
  newOpenDataUrl,
  setNewOpenDataUrl,
  handleAddSource,
}) => {
  return (
    <Modal
      open={showAddSourceModal}
      onClose={() => setShowAddSourceModal(false)}
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
        <IconButton
          onClick={() => setShowAddSourceModal(false)}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Ajouter une source
        </Typography>
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
          onClick={() => {
            handleAddSource();
            setShowAddSourceModal(false);
          }}
          sx={{ mt: 2 }}
          disabled={!newOpenDataSrc || !newOpenDataPath || !newOpenDataUrl}
        >
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
};

export default AddSourceModal;
