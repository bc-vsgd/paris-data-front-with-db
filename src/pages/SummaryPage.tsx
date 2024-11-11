import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DataSet } from "../types/dataSets/DataSet";

function SummaryPage({ dataSets }: { dataSets: DataSet[] }) {
  return (
    <Box display="flex" flexDirection="column">
      {dataSets.map((dataSet) => (
        <Link
          key={`${dataSet.path}-${Math.random()}`}
          component={RouterLink}
          to={dataSet.path}
        >
          {dataSet.title}
        </Link>
      ))}
    </Box>
  );
}

export default SummaryPage;
