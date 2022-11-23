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

export const objectsArr = [
  "r1",
  "r2",
  "r3",
  "r4",
  "r5",
  "r6",
  "r7",
  "r8",
  "w1",
  "w2",
  "w3",
  "w4",
  "w5",
  "w6",
  "w7",
  "w8",
  "w9",
  "w10",
  "w11",
  "w12",
  "w13",
  "w14",
  "w15",
  "w16",
  "w17",
  "w18",
  "w19",
  "w20",
  "w21",
  "w22",
  "w23",
  "g1",
  "g2",
  "g3",
  "g4",
  "g5",
  "g6",
  "g7",
  "g8",
  "g9",
  "o1",
  "o2",
  "o3",
  "o4",
  "o5",
  "o6",
  "o7",
  "o8",
  "o9",
] as const;

export type TerrainObjects = typeof objectsArr[number];

export type TileType = [number, number];

export type RadiusType = 1 | 2 | 3 | 4;

export interface Itile {
  terrain: Terrain | "";
  height: 0 | 1 | 2 | 3;
  object: TerrainObjects | "";
}
export interface State {
  gridSize: number;
  field: Itile[][];
  showGrid: boolean;
  selectedTile: TileType | null;
  selectedRadius: RadiusType;
  selectedTileElement: HTMLElement | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

const generateTerrain = (size: number, random: boolean = false): Itile[][] => {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => ({
      id: `${i}_${j}`,
      terrain: terrainArr[
        Math.floor(Math.random() * terrainArr.length)
      ] as Itile["terrain"],
      object: "", //objectsArr[Math.floor(Math.random() * objectsArr.length)] as Itile["object"],
      height: random ? (Math.round(Math.random() * 3) as Itile["height"]) : 0,
    }))
  );
};

const store = createStore<State>({
  state() {
    return {
      gridSize: defaultGridSize,
      showGrid: false,
      selectedTile: null,
      selectedRadius: 1,
      selectedTileElement: null,
      field: generateTerrain(defaultGridSize),
    };
  },
  mutations: {
    toggleGrid(state) {
      state.showGrid = !state.showGrid;
    },
    selectTile(state, payload: { tile: TileType; element: HTMLElement }) {
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
      state.field = generateTerrain(state.gridSize, true);
    },
    setTileObject(
      state,
      payload: { tile: TileType; object: TerrainObjects | "" }
    ) {
      const [x, y] = payload.tile;
      state.field[x][y].object = payload.object;
    },
    changeRadius(state, payload: RadiusType) {
      state.selectedRadius = payload;
    },
  },
});

export default store;

export function useStore() {
  return baseUseStore(key);
}
