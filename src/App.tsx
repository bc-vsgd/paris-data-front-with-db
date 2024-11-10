import "./App.css";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useStore } from "./store/useStore";

function App() {
  const apiUrl = import.meta.env.VITE_API_URI;
  const setDataSets = useStore((state) => state.setDataSets);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/all-spots`);
        if (response.ok) {
          const data = await response.json();
          // console.log(data[0].path);
          // console.log(data[1].path);

          setDataSets(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl, setDataSets]);

  return <Box>App</Box>;
}

export default App;
