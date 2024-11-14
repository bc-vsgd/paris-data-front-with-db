import { Box, Link } from "@mui/material";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataSet } from "../types/dataSets/DataSet";

function HomePage({ dataSets }: { dataSets: DataSet[] }) {
  const groupedDataSets = useMemo(() => {
    const groups: Record<string, string> = {};
    dataSets.forEach((dataSet) => {
      if (!groups[dataSet.openDataPath]) {
        groups[dataSet.openDataPath] = dataSet.openDataSrc;
      }
    });
    return Object.entries(groups);
  }, [dataSets]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Link component={RouterLink} to="/overview-data">
        Data: vue d'ensemble
      </Link>
      <Link component={RouterLink} to="/detailed-data">
        Data: détails
      </Link>
      <Link component={RouterLink} to="/update-data">
        Data: mise à jour
      </Link>
      {groupedDataSets.map(([path, src]) => (
        <Link key={path} component={RouterLink} to={path}>
          {src}
        </Link>
      ))}
    </Box>
  );
}

export default HomePage;
