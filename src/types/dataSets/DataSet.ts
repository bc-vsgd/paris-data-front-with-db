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
  Spots?: Spot[];
  spotType: "RegionalInterestHeritage" | "HouseOfFamous";
  createdAt?: Date;
  updatedAt?: Date;
}
