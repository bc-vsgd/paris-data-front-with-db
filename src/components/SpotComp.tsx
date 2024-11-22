import React from "react";
import { Circle, Popup, Polygon, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";

interface SpotCompProps {
  componentKeys: {
    featureIsPoint: boolean;
    coords: string;
    spotCoords: string;
    fixedDisplayed: string[];
    img: string[];
    firstDisplayed: string[];
    address: string[];
    notDisplayed: string[];
  };
  spotData: Record<string, any>;
}

const SpotComp: React.FC<SpotCompProps> = ({ componentKeys, spotData }) => {
  console.log("coords: ", componentKeys.coords);
  console.log("spot coords: ", componentKeys.spotCoords);

  const getNestedValue = (obj: Record<string, any>, keys: string[]): any => {
    return keys.reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
  };

  let lat: number | undefined, lon: number | undefined;
  let geometryType: string | undefined, coordinates: any;
  if (componentKeys.featureIsPoint && componentKeys.coords) {
    const coordsKeys = componentKeys.coords.split(".");

    const coordsValue = getNestedValue(spotData, coordsKeys);
    if (coordsValue && typeof coordsValue === "object") {
      const [lonValue, latValue] = Object.values(coordsValue);

      if (typeof lonValue === "number" && typeof latValue === "number") {
        lon = lonValue;
        lat = latValue;
      }
    }
  } else if (!componentKeys.featureIsPoint && componentKeys.coords) {
    const coordsKeys = componentKeys.coords.split(".");
    const coordsValue = getNestedValue(spotData, coordsKeys);
    if (coordsValue && typeof coordsValue === "object") {
      geometryType = coordsValue.type;
      coordinates = coordsValue.coordinates;
    }
  }

  const fixedDisplayedValues = componentKeys.fixedDisplayed
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(spotData, keys);
    })
    .filter((value) => value !== undefined);

  const imgUrls = componentKeys.img
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(spotData, keys);
    })
    .filter((url) => url !== undefined);

  const firstDisplayedValues = componentKeys.firstDisplayed
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return { key: keyPath, value: getNestedValue(spotData, keys) };
    })
    .filter(
      (item) =>
        item.value !== undefined &&
        item.value !== null &&
        (!Array.isArray(item.value) || item.value.length > 0)
    );

  const addressValues = componentKeys.address
    .map((keyPath) => {
      const keys = keyPath.split(".");
      return getNestedValue(spotData, keys);
    })
    .filter((value) => value !== undefined);

  const notDisplayedKeys = new Set([
    componentKeys.coords,
    ...componentKeys.fixedDisplayed,
    ...componentKeys.img,
    ...componentKeys.firstDisplayed,
    ...componentKeys.address,
    ...componentKeys.notDisplayed,
  ]);

  const remainingKeys = Object.keys(spotData)
    .filter((key) => !notDisplayedKeys.has(key))
    .map((key) => ({ key, value: spotData[key] }))
    .filter(
      (item) =>
        item.value !== undefined &&
        item.value !== null &&
        (!Array.isArray(item.value) || item.value.length > 0)
    );

  const renderPopupContent = () => (
    <Popup>
      {fixedDisplayedValues.length > 0 && (
        <div>
          <strong>{fixedDisplayedValues.join(" ")}</strong>
        </div>
      )}
      <Box sx={{ maxHeight: "200px", overflowY: "auto", marginTop: "10px" }}>
        {imgUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`img-${index}`}
            style={{
              height: "100px",
              objectFit: "contain",
              display: "block",
              marginBottom: "10px",
            }}
          />
        ))}
        {addressValues.length > 0 && (
          <div style={{ marginTop: "10px" }}>{addressValues.join(" ")}</div>
        )}
        {firstDisplayedValues.length > 0 &&
          firstDisplayedValues.map((item, index) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <strong>{item.key}:</strong>{" "}
              {Array.isArray(item.value)
                ? item.value.map((val, i) => <div key={i}>{val}</div>)
                : item.value}
            </div>
          ))}
        {remainingKeys.length > 0 &&
          remainingKeys.map((item, index) => (
            <div key={index} style={{ marginTop: "10px" }}>
              <strong>{item.key}:</strong>{" "}
              {Array.isArray(item.value)
                ? item.value.map((val, i) => <div key={i}>{val}</div>)
                : item.value}
            </div>
          ))}
      </Box>
    </Popup>
  );

  const renderGeometry = () => {
    if (geometryType && coordinates) {
      switch (geometryType) {
        case "Polygon":
          return (
            <Polygon
              positions={(coordinates[0][0] as [number, number][]).map(
                (coord) =>
                  Array.isArray(coord) && coord.length === 2
                    ? [coord[1], coord[0]]
                    : [0, 0]
              )}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Polygon>
          );
        case "MultiPolygon":
          return coordinates.map((polygonCoords: any, index: number) => (
            <Polygon
              key={index}
              positions={polygonCoords[0].map((coord: [number, number]) =>
                Array.isArray(coord) && coord.length === 2
                  ? [coord[1], coord[0]]
                  : [0, 0]
              )}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Polygon>
          ));
        case "LineString":
          return (
            <Polyline
              positions={(coordinates as [number, number][]).map((coord) =>
                Array.isArray(coord) && coord.length === 2
                  ? [coord[1], coord[0]]
                  : [0, 0]
              )}
              pathOptions={{ color: "blue" }}
            >
              {renderPopupContent()}
            </Polyline>
          );
        case "MultiLineString":
          return coordinates.map(
            (lineCoords: [number, number][], index: number) => (
              <Polyline
                key={index}
                positions={lineCoords.map((coord) =>
                  Array.isArray(coord) && coord.length === 2
                    ? [coord[1], coord[0]]
                    : [0, 0]
                )}
                pathOptions={{ color: "blue" }}
              >
                {renderPopupContent()}
              </Polyline>
            )
          );
        case "MultiPoint":
          return coordinates.map(
            (pointCoords: [number, number], index: number) => (
              <Circle
                key={index}
                center={
                  Array.isArray(pointCoords) && pointCoords.length === 2
                    ? [pointCoords[1], pointCoords[0]]
                    : [0, 0]
                }
                radius={10}
                pathOptions={{ color: "blue" }}
              >
                {renderPopupContent()}
              </Circle>
            )
          );
        default:
          return null;
      }
    }
    return null;
  };
  console.log(lat);
  console.log(lon);

  return componentKeys.featureIsPoint && lat && lon ? (
    <Circle center={[lat, lon]} radius={10} pathOptions={{ color: "blue" }}>
      {renderPopupContent()}
    </Circle>
  ) : (
    renderGeometry()
  );
};

export default SpotComp;
