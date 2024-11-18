import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import MapPage from "./pages/MapPage";
import OverviewDataPage from "./pages/getData/OverviewDataPage";
import DetailedDataPage from "./pages/getData/DetailedDataPage";
import Header from "./components/Header";
import PostDataPage from "./pages/postData/PostDataPage";
import UpdateDataPage from "./pages/updateData/UpdateDataPage";
import { DataSet } from "./types/dataSets/DataSet";

function App() {
  const apiUrl = import.meta.env.VITE_API_URI;
  const [dataSets, setDataSets] = useState<DataSet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/all-spots`);
        if (response.ok) {
          const data = await response.json();
          setDataSets(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const groupedDataSets = useMemo(() => {
    const groups: Record<string, DataSet[]> = {};
    dataSets.forEach((dataSet) => {
      if (!groups[dataSet.openDataPath]) {
        groups[dataSet.openDataPath] = [];
      }
      groups[dataSet.openDataPath].push(dataSet);
    });
    return Object.entries(groups);
  }, [dataSets]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage dataSets={dataSets} />} />
        <Route path="/overview-data" element={<OverviewDataPage />} />
        <Route path="/detailed-data" element={<DetailedDataPage />} />
        <Route path="/update-data" element={<UpdateDataPage />} />
        <Route path="/post-data" element={<PostDataPage />} />
        {groupedDataSets.map(([path, groupDataSets]) => (
          <Route
            key={path}
            path={path}
            element={<SummaryPage dataSets={groupDataSets} />}
          />
        ))}
        {dataSets.map((dataSet) => (
          <Route
            key={dataSet.path}
            path={dataSet.path}
            element={<MapPage dataSet={dataSet} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
