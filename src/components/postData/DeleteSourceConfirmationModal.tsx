import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

interface DeleteSourceConfirmationModalProps {
  showDeleteConfirmationModal: boolean;
  setShowDeleteConfirmationModal: (value: boolean) => void;
  handleDeleteSource: () => void;
}

const DeleteSourceConfirmationModal: React.FC<
  DeleteSourceConfirmationModalProps
> = ({
  showDeleteConfirmationModal,
  setShowDeleteConfirmationModal,
  handleDeleteSource,
}) => {
  return (
    <Modal
      open={showDeleteConfirmationModal}
      onClose={() => setShowDeleteConfirmationModal(false)}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Confirmer la suppression
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Êtes-vous sûr de vouloir supprimer cette source ?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => setShowDeleteConfirmationModal(false)}
            sx={{ mr: 2 }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteSource();
              setShowDeleteConfirmationModal(false);
            }}
          >
            Supprimer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteSourceConfirmationModal;
