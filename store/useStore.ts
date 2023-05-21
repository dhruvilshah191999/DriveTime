import { create } from "zustand";
import IApplicant from "./types/IApplicant";
import applicantSlice from "./applicants/applicants";

const useStore = create<IApplicant>()((...a) => ({
  ...applicantSlice(...a),
}));

export default useStore;
