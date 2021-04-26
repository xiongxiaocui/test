export type Heading = {
  getOptions?: () => string[];
  property: string;
  title: string;
  type?: string;
  width?: number;
  show?: boolean
};

export type ScoutField = {
  scoutName: string;
  growerName: string;
  fieldName: string;
  acres: number;
};
