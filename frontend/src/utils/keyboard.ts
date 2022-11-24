type OffsetType = -1 | 0 | 1;

type HotKeyType = {
  keyCode: string;
  symbol: string;
  help: string;
};

type MoveHotKeyType = HotKeyType & {
  offset: [OffsetType, OffsetType];
};
type ActionHotKeyType = HotKeyType & {
  action: string;
};

type HotKeysType = {
  move: MoveHotKeyType[];
  actions: ActionHotKeyType[];
};

const hotkeys: HotKeysType = {
  move: [
    {
      keyCode: "ArrowUp",
      offset: [-1, 0],
      symbol: "↑",
      help: "move selection up",
    },
    {
      keyCode: "ArrowDown",
      offset: [1, 0],
      symbol: "↓",
      help: "move selection down",
    },
    {
      keyCode: "ArrowLeft",
      offset: [0, 1],
      symbol: "←",
      help: "move selection left",
    },
    {
      keyCode: "ArrowRight",
      offset: [0, -1],
      symbol: "→",
      help: "move selection right",
    },
  ],
  actions: [
    {
      keyCode: "KeyZ",
      action: "decreaseTileHeight",
      symbol: "Z",
      help: "increase tile height",
    },
    {
      keyCode: "KeyX",
      action: "increaseTileHeight",
      symbol: "X",
      help: "decrease tile height",
    },
    {
      keyCode: "BracketRight",
      action: "increaseRadius",
      symbol: "[",
      help: "increase selection radius",
    },
    {
      keyCode: "BracketLeft",
      action: "decreaseRadius",
      symbol: "]",
      help: "decrease selection radius",
    },
    {
      keyCode: "Escape",
      action: "deselectTile",
      symbol: "Esc",
      help: "deselect tiles",
    },
  ],
};
export default hotkeys;
