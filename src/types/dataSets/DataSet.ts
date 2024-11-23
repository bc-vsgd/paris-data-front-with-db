import { Spot } from "../spots/Spot";

export interface DataSet {
  title: string;
  comment?: string;
  path: string;
  url: string;
  featureIsPoint: boolean;
  coords: string;
  fixedDisplayed: string[];
  img: string[];
  firstDisplayed?: string[];
  address: string[];
  notDisplayed: string[];
  count: number;
  spots?: Spot[];
  spotType: "RegionalInterestHeritage" | "HouseOfFamous" | "Poi121314";
  openDataSrc: string;
  openDataPath: string;
  openDataUrl: string;
  spotCoords: string;
  createdAt?: Date;
  updatedAt?: Date;
}
