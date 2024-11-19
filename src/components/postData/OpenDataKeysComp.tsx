import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useStore } from "../../store/postData/useStore";
import AddSourceModal from "../../components/postData/AddSourceModal";
import DeleteSourceConfirmationModal from "../../components/postData/DeleteSourceConfirmationModal";

interface OpenDataKey {
  openDataPath: string;
  openDataSrc: string;
  openDataUrl: string;
}

const OpenDataKeysComp: React.FC = () => {
  const { openDataKeys, setOpenDataKeys } = useStore();
  const [selectedOpenDataKey, setSelectedOpenDataKey] =
    useState<OpenDataKey | null>(openDataKeys[0] || null);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [newOpenDataSrc, setNewOpenDataSrc] = useState("");
  const [newOpenDataPath, setNewOpenDataPath] = useState("");
  const [newOpenDataUrl, setNewOpenDataUrl] = useState("");
  const [newOpenDataKey, setNewOpenDataKey] = useState<OpenDataKey | null>(
    null
  );
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const handleAddSource = () => {
    const newSource = {
      openDataSrc: newOpenDataSrc,
      openDataPath: newOpenDataPath,
      openDataUrl: newOpenDataUrl,
    };
    setOpenDataKeys([...openDataKeys, newSource]);
    setSelectedOpenDataKey(newSource);
    setNewOpenDataKey(newSource);
    setShowAddSourceModal(false);
    setNewOpenDataSrc("");
    setNewOpenDataPath("");
    setNewOpenDataUrl("");
  };

  const handleDeleteSource = () => {
    setOpenDataKeys(
      openDataKeys.filter(
        (key) => key.openDataSrc !== newOpenDataKey?.openDataSrc
      )
    );
    setSelectedOpenDataKey(openDataKeys[0] || null);
    setNewOpenDataKey(null);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Open Data: sources
      </Typography>
      {openDataKeys.length === 0 ? (
        <Button variant="contained" onClick={() => setShowAddSourceModal(true)}>
          Ajouter une source
        </Button>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
                  {key.openDataSrc === newOpenDataKey?.openDataSrc && (
                    <IconButton
                      onClick={() => setShowDeleteConfirmationModal(true)}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </MenuItem>
              ))}
            </Select>
            {!newOpenDataKey && (
              <Button
                variant="contained"
                onClick={() => setShowAddSourceModal(true)}
              >
                Ajouter une source
              </Button>
            )}
          </Box>

          {selectedOpenDataKey && (
            <Box
              sx={{
                position: "relative",
                border: "1px solid #ccc",
                p: 2,
                mt: 2,
              }}
            >
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
            </Box>
          )}
        </>
      )}

      <AddSourceModal
        showAddSourceModal={showAddSourceModal}
        setShowAddSourceModal={setShowAddSourceModal}
        newOpenDataSrc={newOpenDataSrc}
        setNewOpenDataSrc={setNewOpenDataSrc}
        newOpenDataPath={newOpenDataPath}
        setNewOpenDataPath={setNewOpenDataPath}
        newOpenDataUrl={newOpenDataUrl}
        setNewOpenDataUrl={setNewOpenDataUrl}
        handleAddSource={handleAddSource}
      />

      <DeleteSourceConfirmationModal
        showDeleteConfirmationModal={showDeleteConfirmationModal}
        setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
        handleDeleteSource={handleDeleteSource}
      />
    </Box>
  );
};

export default OpenDataKeysComp;
