import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/postData/useStore";

import SpotKeysComp from "../../components/postData/SpotKeysComp";
import DisplayKeysComp from "../../components/postData/DisplayKeysComp";
import OpenDataKeysComp from "../../components/postData/OpenDataKeysComp";

const PostDataPage: React.FC = () => {
  const location = useLocation();
  const { setOpenDataKeys } = useStore();

  useEffect(() => {
    if (location.state && location.state.openDataKeys) {
      setOpenDataKeys(location.state.openDataKeys);
    }
  }, [location.state]);

  return (
    <Box
      sx={{ p: 2, border: "1px solid #ccc", maxWidth: 1000, margin: "0 auto" }}
    >
      <SpotKeysComp />
      <DisplayKeysComp />
      <OpenDataKeysComp />
    </Box>
  );
};

export default PostDataPage;
