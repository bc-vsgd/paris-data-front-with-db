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
  featureIsPoint: boolean;
  setFeatureIsPoint: (feature: boolean) => void;
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
  conditionalKeys: string[];
  setConditionalKeys: (keys: string[]) => void;
  spotKeysValidationError: string;
  setSpotKeysValidationError: (error: string) => void;
  displayKeysValidationError: string;
  setDisplayKeysValidationError: (error: string) => void;
  openDataKeysValidationError: string;
  setOpenDataKeysValidationError: (error: string) => void;
  displayKeys: DisplayKeys;
  setDisplayKeys: (keys: DisplayKeys) => void;
  selectedOpenDataKeys: OpenDataKey | null;
  setSelectedOpenDataKeys: (key: OpenDataKey | null) => void;
}

interface OpenDataKey {
  openDataPath: string;
  openDataSrc: string;
  openDataUrl: string;
}

interface DisplayKeys {
  title: string;
  comment: string;
  url: string;
  featureIsPoint: boolean;
  coords: string;
  fixedDisplayed: string[];
  img: string[];
  firstDisplayed: string[];
  address: string[];
  notDisplayed: string[];
  path: string;
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
  featureIsPoint: true,
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
  conditionalKeys: [],
  setConditionalKeys: (keys) => set({ conditionalKeys: keys }),
  spotKeysValidationError: "",
  setSpotKeysValidationError: (error) =>
    set({ spotKeysValidationError: error }),
  displayKeysValidationError: "",
  setDisplayKeysValidationError: (error) =>
    set({ displayKeysValidationError: error }),
  openDataKeysValidationError: "",
  setOpenDataKeysValidationError: (error) =>
    set({ openDataKeysValidationError: error }),
  displayKeys: {
    title: "",
    comment: "",
    url: "",
    featureIsPoint: true,
    coords: "",
    fixedDisplayed: [""],
    img: [""],
    firstDisplayed: [""],
    address: [""],
    notDisplayed: [""],
    path: "",
  },
  setDisplayKeys: (keys) => set({ displayKeys: keys }),
  selectedOpenDataKeys: null,
  setSelectedOpenDataKeys: (key) => set({ selectedOpenDataKeys: key }),
}));
