import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

const defaultGridSize = 8;
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

export type SelectedTile = [number, number];

export interface Itile {
  terrain: Terrain | "";
  height: 0 | 1 | 2 | 3;
}
export interface State {
  gridSize: number;
  field: Itile[][];
  showGrid: boolean;
  selectedTile: SelectedTile | null;
  selectedTileElement: HTMLElement | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

const generateTerrain = (size: number): Itile[][] => {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => ({
      id: `${i}_${j}`,
      terrain: terrainArr[
        Math.floor(Math.random() * terrainArr.length)
      ] as Itile["terrain"],
      height: Math.round(Math.random() * 3) as Itile["height"],
    }))
  );
};

const store = createStore<State>({
  state() {
    return {
      gridSize: defaultGridSize,
      showGrid: false,
      selectedTile: null,
      selectedTileElement: null,
      field: generateTerrain(defaultGridSize),
    };
  },
  mutations: {
    toggleGrid(state) {
      state.showGrid = !state.showGrid;
    },
    selectTile(
      state,
      payload: { tile: [number, number]; element: HTMLElement }
    ) {
      state.selectedTile = payload.tile;
      state.selectedTileElement = payload.element;
    },
    deselectTile(state) {
      state.selectedTile = null;
      state.selectedTileElement = null;
    },
    increaseTileHeight(state) {
      if (state.selectedTile) {
        const [x, y] = state.selectedTile;
        if (state.field[x][y].height < 10) {
          state.field[x][y].height++;
        }
      }
    },
    decreaseTileHeight(state) {
      if (state.selectedTile) {
        const [x, y] = state.selectedTile;
        if (state.field[x][y].height > 0) {
          state.field[x][y].height--;
        }
      }
    },
    updateTerrain(state) {
      state.field = generateTerrain(state.gridSize);
    },
  },
});

export default store;

export function useStore() {
  return baseUseStore(key);
}
