import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import axios from "axios";

interface DataSet {
  title: string;
  count: number;
  spots: any[];
}

const OverviewDataPage: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URI;
  const [dataSets, setDataSets] = useState<DataSet[]>([]);

  const handleGetData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all-spots`);
      setDataSets(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" color="primary" onClick={handleGetData}>
        Get Data
      </Button>

      <Box sx={{ mt: 4 }}>
        {dataSets.map((dataSet, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #ccc" }}>
            <Typography variant="h6">Title: {dataSet.title}</Typography>
            <Typography>Count: {dataSet.count}</Typography>
            <Typography>Number of Spots: {dataSet.spots.length}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OverviewDataPage;
