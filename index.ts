import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createMMKVStorage } from "../global";

export const DEFAULT_SUBJECT_COEFFICIENT = 1;

interface SubjectCoefficientsState {
  /** Coefficient choisi par l'utilisateur, par nom de matière. */
  coefficients: Record<string, number>;
  setCoefficient: (subjectName: string, value: number) => void;
  resetCoefficient: (subjectName: string) => void;
  resetAll: () => void;
}

export const useSubjectCoefficientsStore = create<SubjectCoefficientsState>()(
  persist(
    (set) => ({
      coefficients: {},
      setCoefficient: (subjectName, value) =>
        set((state) => ({
          coefficients: { ...state.coefficients, [subjectName]: Math.max(0, value) },
        })),
      resetCoefficient: (subjectName) =>
        set((state) => {
          const { [subjectName]: _removed, ...rest } = state.coefficients;
          return { coefficients: rest };
        }),
      resetAll: () => set({ coefficients: {} }),
    }),
    {
      name: "subject-coefficients-storage",
      storage: createMMKVStorage("subject-coefficients"),
      version: 1,
    }
  )
);
