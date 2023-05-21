import { StateCreator } from "zustand";
import IApplicant, { IApplicantDetails } from "../types/IApplicant";

const applicantSlice: StateCreator<IApplicant> = (set, get) => ({
  applicant: null,
  fetchApplicant: async () => {
    const res = await fetch(
      "https://b8aae1b5-7138-47d4-a795-6bf7cdf94b6c.mock.pstmn.io/getUsers"
    );
    set({ applicant: await res.json() });
  },
});

export default applicantSlice;
