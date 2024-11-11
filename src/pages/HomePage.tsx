import { Box, Link } from "@mui/material";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataSet } from "../types/dataSets/DataSet";

function HomePage({ dataSets }: { dataSets: DataSet[] }) {
  console.log(dataSets.length);

  const groupedDataSets = useMemo(() => {
    const groups: Record<string, string> = {};
    dataSets.forEach((dataSet) => {
      if (!groups[dataSet.openDataPath]) {
        groups[dataSet.openDataPath] = dataSet.openDataSrc;
      }
    });
    return Object.entries(groups);
  }, [dataSets]);
  console.log(groupedDataSets.length);

  return (
    <Box>
      {groupedDataSets.map(([path, src]) => (
        <Link key={path} component={RouterLink} to={path}>
          {src}
        </Link>
      ))}
    </Box>
  );
}

export default HomePage;
