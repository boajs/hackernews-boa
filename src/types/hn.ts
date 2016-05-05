// https://github.com/HackerNews/API/tree/831ca52

export type ItemId = number;

export type UnixTime = number;

export type HTML = string;

export type URL = string;

export interface Item {
  id: ItemId;
  deleted?: boolean;
  type?: string;
  by?: string;
  time?: UnixTime;
  text?: HTML;
  dead?: boolean;
  parent: ItemId;
  kids?: ItemId[];
  url?: URL;
  score?: number;
  title?: string;
  parts?: ItemId[];
  descendants?: number;
}

export type UserId = string;

export type User = {
  id: UserId;
  created: UnixTime;
  karma: number;
  about?: HTML;
  submitted?: ItemId[];
};
