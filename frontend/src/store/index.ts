import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

const terrainArr = [
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "e10",
  "e11",
  "e12",
  "e13",
  "e14",
  "e15",
  "e16",
  "e17",
  "e18",
  "e19",
] as const;
export type Terrain = typeof terrainArr[number];

export interface Itile {
  terrain: Terrain | "";
  height: 0 | 1 | 2 | 3;
}
export interface State {
  field: Itile[][];
  showGrid: boolean;
  selectedTile: [number, number] | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state() {
    return {
      showGrid: true,
      selectedTile: null,
      field: Array.from({ length: 8 }, (_, i) =>
        Array.from({ length: 8 }, (_, j) => ({
          id: `${i}_${j}`,
          terrain: terrainArr[
            Math.floor(Math.random() * terrainArr.length)
          ] as Itile["terrain"],
          height: 0, //Math.round(Math.random() * 3) as Itile["height"],
        }))
      ),
    };
  },
  mutations: {
    toggleGrid(state) {
      state.showGrid = !state.showGrid;
    },
    selectTile(state, payload: [number, number]) {
      state.selectedTile = payload;
    },
    deselectTile(state) {
      state.selectedTile = null;
    },
    increaseTileHeight(state) {
      if (state.selectedTile) {
        const [x, y] = state.selectedTile;
        state.field[x][y].height++;
      }
    },
    decreaseTileHeight(state) {
      if (state.selectedTile) {
        const [x, y] = state.selectedTile;
        state.field[x][y].height--;
      }
    },
  },
});

export default store;

export function useStore() {
  return baseUseStore(key);
}
