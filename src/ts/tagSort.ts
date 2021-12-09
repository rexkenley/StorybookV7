import { ITag } from "@fluentui/react/lib/Pickers";

const tagSort = (i1: ITag, i2: ITag): number => {
  if (i1.name > i2.name) return 1;
  if (i1.name < i2.name) return -1;
  return 0;
};

export default tagSort;
