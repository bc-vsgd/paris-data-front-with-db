import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DataSet } from "../types/dataSets/DataSet";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SpotComp from "../components/SpotComp";

interface MapPageProps {
  dataSet: DataSet;
}

function MapPage({ dataSet }: MapPageProps) {
  console.log(dataSet.coords);

  const componentKeys = {
    featureIsPoint: dataSet.featureIsPoint,
    coords: dataSet.coords,
    fixedDisplayed: dataSet.fixedDisplayed,
    img: dataSet.img,
    firstDisplayed: dataSet.firstDisplayed || [],
    address: dataSet.address,
    notDisplayed: dataSet.notDisplayed,
  };

  return (
    <Box>
      <Link component={RouterLink} to={dataSet.openDataPath}>
        {dataSet.openDataSrc}
      </Link>
      <Typography variant="h3">{dataSet.title}</Typography>
      {dataSet.comment && (
        <Typography>
          {dataSet.comment.charAt(0).toUpperCase() + dataSet.comment.slice(1)}
        </Typography>
      )}
      <Link href={dataSet.url} target="_blank" rel="noopener noreferrer">
        Lien vers le jeu de données
      </Link>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={12}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {dataSet.spots &&
          dataSet.spots.map((spot, index) => (
            <SpotComp
              key={index}
              componentKeys={componentKeys}
              spotData={spot}
            />
          ))}
      </MapContainer>
    </Box>
  );
}

export default MapPage;
