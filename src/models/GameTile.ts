export enum Option {
  NonSelected,
  Cross,
  Circle,
}

export interface GameTile {
  position: number;
  option: Option;
}
