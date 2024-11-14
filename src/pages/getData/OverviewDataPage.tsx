import React, { useEffect, useState } from "react";
import { Button, Box, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";

interface DataSet {
  openDataSrc: string;
  title: string;
  count: number;
  spots: any[];
}

const OverviewDataPage: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const [dataSets, setDataSets] = useState<DataSet[]>([]);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all-spots`);
      setDataSets(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupDataSetsBySrc = (dataSets: DataSet[]) => {
    return dataSets.reduce((groups: Record<string, DataSet[]>, dataSet) => {
      const { openDataSrc } = dataSet;
      if (!groups[openDataSrc]) {
        groups[openDataSrc] = [];
      }
      groups[openDataSrc].push(dataSet);
      return groups;
    }, {});
  };

  const groupedDataSets = groupDataSetsBySrc(dataSets);

  const handleGroupExpandClick = (groupKey: string) => {
    setExpandedGroup((prevExpanded) =>
      prevExpanded === groupKey ? null : groupKey
    );
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1000, margin: "0 auto" }}>
      <Button variant="contained" color="primary" onClick={handleGetData}>
        Update data sets
      </Button>

      <Box sx={{ mt: 4 }}>
        {Object.entries(groupedDataSets).map(([openDataSrc, group]) => (
          <Box key={openDataSrc} sx={{ mb: 2, p: 2, border: "1px solid #ccc" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
                {openDataSrc} ({group.length} jeux)
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
                {group.map((dataSet, index) => (
                  <Typography key={index}>
                    {dataSet.title} ({dataSet.spots.length} spots)
                  </Typography>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OverviewDataPage;
