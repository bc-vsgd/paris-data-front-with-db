import { create } from "zustand";
import { DataSet } from "../types/dataSets/DataSet";

interface StoreState {
  dataSets: DataSet[];
  setDataSets: (data: DataSet[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  dataSets: [],
  setDataSets: (data) => set({ dataSets: data }),
}));

export const dataSets = (data: DataSet[]) => {
  const store = useStore.getState();
  store.setDataSets(data);
};
