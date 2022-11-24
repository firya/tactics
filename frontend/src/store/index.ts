import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

const defaultGridSize = 8;
const maxHeight = 10;

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

export type RadiusType = 0 | 1 | 2 | 3 | 4;

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
      object:
        Math.random() > 0.8
          ? (objectsArr[
              Math.floor(Math.random() * objectsArr.length)
            ] as Itile["object"])
          : "",
      height: random ? (Math.round(Math.random() * 3) as Itile["height"]) : 0,
    }))
  );
};

const changeTileHeight = (state: State, payload: { change: number }) => {
  if (state.selectedTile) {
    const [x, y] = state.selectedTile;
    if (state.selectedRadius == 0) {
      if (
        state.field[x][y].height + payload.change <= maxHeight &&
        state.field[x][y].height + payload.change >= 0
      ) {
        state.field[x][y].height += payload.change;
      }
    } else {
      for (
        let i = x - state.selectedRadius;
        i <= x + state.selectedRadius;
        i++
      ) {
        for (
          let j = y - state.selectedRadius;
          j <= y + state.selectedRadius;
          j++
        ) {
          if (
            state.field[i] &&
            state.field[i][j] &&
            state.field[i][j].height + payload.change <= maxHeight &&
            state.field[i][j].height + payload.change >= 0
          ) {
            const distance = Math.ceil(
              Math.sqrt(
                Math.pow(i - state.selectedTile[0], 2) +
                  Math.pow(j - state.selectedTile[1], 2)
              )
            );

            if (distance - 1 < state.selectedRadius) {
              state.field[i][j].height += payload.change;
            }
          }
        }
      }
    }
  }
};

const getDefaultField = (): Itile[][] => {
  const storage = localStorage.getItem("field");

  if (storage) {
    return JSON.parse(storage);
  } else {
    return generateTerrain(defaultGridSize);
  }
};

const setDefaultField = (field: Itile[][]): void => {
  localStorage.setItem("field", JSON.stringify(field));
};

const store = createStore<State>({
  state() {
    return {
      gridSize: defaultGridSize,
      showGrid: false,
      selectedTile: null,
      selectedRadius: 0,
      selectedTileElement: null,
      field: getDefaultField(),
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
      changeTileHeight(state, { change: 1 });
      setDefaultField(state.field);
    },
    decreaseTileHeight(state) {
      changeTileHeight(state, { change: -1 });
      setDefaultField(state.field);
    },
    updateTerrain(state) {
      state.field = generateTerrain(state.gridSize, true);
      setDefaultField(state.field);
    },
    setTileObject(
      state,
      payload: { tile: TileType; object: TerrainObjects | "" }
    ) {
      const [x, y] = payload.tile;
      state.field[x][y].object = payload.object;
    },
    increaseRadius(state) {
      state.selectedRadius =
        state.selectedRadius > 3
          ? 4
          : ((state.selectedRadius + 1) as RadiusType);
    },
    decreaseRadius(state) {
      state.selectedRadius =
        state.selectedRadius < 1
          ? 0
          : ((state.selectedRadius - 1) as RadiusType);
    },
  },
});

export default store;

export function useStore() {
  return baseUseStore(key);
}
