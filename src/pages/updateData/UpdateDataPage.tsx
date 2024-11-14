import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Collapse, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import { DataSet } from "../../types/dataSets/DataSet";

const UpdateDataPage: React.FC = () => {
  const [dataSets, setDataSets] = useState<DataSet[]>([]);
  console.log(dataSets);

  const [groupedDataSets, setGroupedDataSets] = useState<
    Record<string, DataSet[]>
  >({});
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [updateMessages, setUpdateMessages] = useState<Record<string, string>>(
    {}
  );
  const [updatedAtTimestamps, setUpdatedAtTimestamps] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    handleGetDataSets();
  }, []);

  const handleGetDataSets = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URI;
      const response = await axios.get(`${apiUrl}/all-spots`);
      setDataSets(response.data);
      groupDataSetsBySrc(response.data);
    } catch (error) {
      console.error("Error fetching data sets:", error);
    }
  };

  const groupDataSetsBySrc = (dataSets: DataSet[]) => {
    const groups = dataSets.reduce(
      (acc: Record<string, DataSet[]>, dataSet) => {
        const { openDataSrc } = dataSet;
        if (!acc[openDataSrc]) {
          acc[openDataSrc] = [];
        }
        acc[openDataSrc].push(dataSet);
        return acc;
      },
      {}
    );
    setGroupedDataSets(groups);
  };

  const handleGroupExpandClick = (groupKey: string) => {
    setExpandedGroup((prev) => (prev === groupKey ? null : groupKey));
  };

  const handleUpdateClick = async (dataSet: DataSet) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URI;
      const response = await axios.post(`${apiUrl}${dataSet.path}`);
      setUpdateMessages((prev) => ({
        ...prev,
        [dataSet.path]: response.data.message,
      }));
      setUpdatedAtTimestamps((prev) => ({
        ...prev,
        [dataSet.path]: new Date().toLocaleString(),
      }));
    } catch (error) {
      console.error("Error updating data set:", error);
      setUpdateMessages((prev) => ({
        ...prev,
        [dataSet.path]: "Error updating data set",
      }));
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1000, margin: "0 auto" }}>
      {Object.entries(groupedDataSets).map(([openDataSrc, group]) => (
        <Box key={openDataSrc} sx={{ mb: 4, p: 2, border: "1px solid #ccc" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
              {openDataSrc} ({group.length}{" "}
              {group.length === 1 ? "jeu" : "jeux"})
            </Typography>
            <IconButton onClick={() => handleGroupExpandClick(openDataSrc)}>
              {expandedGroup === openDataSrc ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse
            in={expandedGroup === openDataSrc}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ ml: 4, mt: 1 }}>
              {group.map((dataSet) => (
                <Box
                  key={dataSet.path}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <Typography sx={{ flex: 1 }}>{dataSet.title}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(dataSet)}
                  >
                    Update
                  </Button>
                  <Typography sx={{ ml: 2 }}>
                    {updatedAtTimestamps[dataSet.path] ||
                      dataSet.updatedAt?.toLocaleString()}
                  </Typography>
                  {updateMessages[dataSet.path] && (
                    <Typography sx={{ ml: 2 }}>
                      {updateMessages[dataSet.path]}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default UpdateDataPage;
