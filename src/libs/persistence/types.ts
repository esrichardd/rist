import { WhereFilterOp } from "firebase/firestore";

export type FilterDocument = {
  field: string;
  operator: WhereFilterOp;
  value: string;
};
