import { create } from "zustand";

interface StoreState {
  spotName: string;
  setSpotName: (name: string) => void;
  spotObject: string;
  setSpotObject: (object: string) => void;
  pathName: string;
  setPathName: (path: string) => void;
  apiUrl: string;
  setApiUrl: (url: string) => void;
  lon: string;
  setLon: (longitude: string) => void;
  lat: string;
  setLat: (latitude: string) => void;
  title: string;
  setTitle: (title: string) => void;
  comment: string;
  setComment: (comment: string) => void;
  url: string;
  setUrl: (url: string) => void;
  featureIsPoint: string;
  setFeatureIsPoint: (feature: string) => void;
  coords: string;
  setCoords: (coords: string) => void;
  fixedDisplayed: string;
  setFixedDisplayed: (fixed: string) => void;
  img: string;
  setImg: (img: string) => void;
  firstDisplayed: string;
  setFirstDisplayed: (first: string) => void;
  address: string;
  setAddress: (address: string) => void;
  notDisplayed: string;
  setNotDisplayed: (notDisplayed: string) => void;
  openDataKeys: OpenDataKey[];
  setOpenDataKeys: (keys: OpenDataKey[]) => void;
}

interface OpenDataKey {
  openDataPath: string;
  openDataSrc: string;
  openDataUrl: string;
}

export const useStore = create<StoreState>((set) => ({
  spotName: "",
  setSpotName: (name) => set({ spotName: name }),
  spotObject: "",
  setSpotObject: (object) => set({ spotObject: object }),
  pathName: "",
  setPathName: (path) => set({ pathName: path }),
  apiUrl: "",
  setApiUrl: (url) => set({ apiUrl: url }),
  lon: "",
  setLon: (longitude) => set({ lon: longitude }),
  lat: "",
  setLat: (latitude) => set({ lat: latitude }),
  title: "",
  setTitle: (title) => set({ title }),
  comment: "",
  setComment: (comment) => set({ comment }),
  url: "",
  setUrl: (url) => set({ url }),
  featureIsPoint: "false",
  setFeatureIsPoint: (feature) => set({ featureIsPoint: feature }),
  coords: "",
  setCoords: (coords) => set({ coords }),
  fixedDisplayed: "",
  setFixedDisplayed: (fixed) => set({ fixedDisplayed: fixed }),
  img: "",
  setImg: (img) => set({ img }),
  firstDisplayed: "",
  setFirstDisplayed: (first) => set({ firstDisplayed: first }),
  address: "",
  setAddress: (address) => set({ address }),
  notDisplayed: "",
  setNotDisplayed: (notDisplayed) => set({ notDisplayed }),
  openDataKeys: [],
  setOpenDataKeys: (keys) => set({ openDataKeys: keys }),
}));
