import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";

interface DataSet {
  openDataSrc: string;
  title: string;
  count: number;
  spots: Record<string, any>[];
  address?: string[];
  coords?: string;
  img?: string[];
  notDisplayed?: string[];
}

const DetailedDataPage: React.FC = () => {
  const [dataSets, setDataSets] = useState<DataSet[]>([]);
  console.log(dataSets);

  const [groupedData, setGroupedData] = useState<Record<string, DataSet[]>>({});
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [expandedSpotKey, setExpandedSpotKey] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URI;
        const response = await axios.get(`${apiUrl}/all-spots`);
        const data: DataSet[] = response.data;
        setDataSets(data);
        groupDataBySrc(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const groupDataBySrc = (data: DataSet[]) => {
    const groups: Record<string, DataSet[]> = {};
    data.forEach((dataSet) => {
      if (!groups[dataSet.openDataSrc]) {
        groups[dataSet.openDataSrc] = [];
      }
      groups[dataSet.openDataSrc].push(dataSet);
    });
    setGroupedData(groups);
  };

  const handleGroupExpandClick = (groupIndex: number) => {
    setExpandedGroup((prevExpanded) =>
      prevExpanded === groupIndex ? null : groupIndex
    );
  };

  const handleSpotKeyExpandClick = (key: string) => {
    setExpandedSpotKey((prevExpanded) => ({
      ...prevExpanded,
      [key]: !prevExpanded[key],
    }));
  };

  const getUniqueSpotKeys = (dataSet: DataSet) => {
    const allKeys = new Set<string>();
    dataSet.spots.forEach((spot) => {
      Object.keys(spot).forEach((key) => {
        const value = spot[key];
        if (
          value !== undefined &&
          value !== null &&
          value !== "[]" &&
          value !== "" &&
          !(Array.isArray(value) && value.length === 0) &&
          !(
            typeof value === "object" &&
            value !== null &&
            Object.values(value).every((v) => v === undefined || v === "")
          ) &&
          ![
            ...(dataSet.address || []),
            dataSet.coords,
            ...(dataSet.img || []),
            ...(dataSet.notDisplayed || []),
          ].includes(key)
        ) {
          allKeys.add(key);
        }
      });
    });
    return Array.from(allKeys);
  };

  const getSpotKeyValues = (dataSet: DataSet, key: string) => {
    const valueCounts: Record<string, number> = {};
    dataSet.spots.forEach((spot) => {
      const value = spot[key];
      if (
        value !== undefined &&
        value !== null &&
        value !== "[]" &&
        value !== "" &&
        (typeof value !== "object" || Object.keys(value).length > 0)
      ) {
        const stringValue = String(value);
        valueCounts[stringValue] = (valueCounts[stringValue] || 0) + 1;
      }
    });
    return Object.entries(valueCounts).sort((a, b) => b[1] - a[1]);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1000, margin: "0 auto" }}>
      {Object.entries(groupedData).map(([openDataSrc, group], groupIndex) => (
        <Box key={openDataSrc} sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" align="center">
            {openDataSrc}
          </Typography>
          {group.map((dataSet, index) => (
            <Box key={index}>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography sx={{ flex: 1 }} fontWeight="bold">
                  {dataSet.title} ({dataSet.count})
                </Typography>
                <IconButton
                  onClick={() =>
                    handleGroupExpandClick(groupIndex * 100 + index)
                  }
                >
                  {expandedGroup === groupIndex * 100 + index ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </Box>
              <Collapse
                in={expandedGroup === groupIndex * 100 + index}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ ml: 4, mt: 1 }}>
                  <List>
                    {getUniqueSpotKeys(dataSet).map((spotKey) => (
                      <ListItem
                        key={spotKey}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography sx={{ flex: 1 }} fontWeight="bold">
                            {spotKey}
                          </Typography>
                          <IconButton
                            onClick={() => handleSpotKeyExpandClick(spotKey)}
                          >
                            {expandedSpotKey[spotKey] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Box>
                        <Collapse
                          in={expandedSpotKey[spotKey]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ ml: 4, mt: 1 }}>
                            <List>
                              {getSpotKeyValues(dataSet, spotKey).map(
                                ([value, count]) => (
                                  <ListItem
                                    key={value}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <Typography>{value} </Typography>
                                    <Typography fontWeight="bold">
                                      {count}
                                    </Typography>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Box>
                        </Collapse>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default DetailedDataPage;
