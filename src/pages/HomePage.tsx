import { Box, Link } from "@mui/material";
import { useMemo } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DataSet } from "../types/dataSets/DataSet";

function HomePage({ dataSets }: { dataSets: DataSet[] }) {
  const navigate = useNavigate();

  const groupedDataSets = useMemo(() => {
    const groups: Record<
      string,
      { openDataPath: string; openDataSrc: string; openDataUrl: string }
    > = {};
    dataSets.forEach((dataSet) => {
      if (!groups[dataSet.openDataPath]) {
        groups[dataSet.openDataPath] = {
          openDataPath: dataSet.openDataPath,
          openDataSrc: dataSet.openDataSrc,
          openDataUrl: dataSet.openDataUrl,
        };
      }
    });
    return Object.values(groups);
  }, [dataSets]);

  const handlePostDataClick = () => {
    navigate("/post-data", { state: { openDataKeys: groupedDataSets } });
  };

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
      <Link onClick={handlePostDataClick} sx={{ cursor: "pointer" }}>
        Data: enregistrer un nouveau jeu
      </Link>
      {groupedDataSets.map(({ openDataPath, openDataSrc }) => (
        <Link key={openDataPath} component={RouterLink} to={openDataPath}>
          {openDataSrc}
        </Link>
      ))}
    </Box>
  );
}

export default HomePage;
