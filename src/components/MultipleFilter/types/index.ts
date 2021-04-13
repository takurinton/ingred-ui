export type FilterPackType = {
  categoryName: string;
  filters: FilterType[];
};

export type Types = "text" | "select" | "boolean";

export type FilterType = {
  filterName: string;
  control: ControlType<Types>;
};

export type ControlType<T extends Types> = {
  type: T;
  options?: T extends "text"
    ? string
    : T extends "select"
    ? string[]
    : T extends "boolean"
    ? boolean
    : any;
};

export type ReferedFilterType = {
  categoryName: string;
  filterName: string;
  filterType: Types;
  filterCondtion: ControlType<Types>["options"];
};
