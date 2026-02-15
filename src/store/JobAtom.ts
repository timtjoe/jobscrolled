// store/jobAtom.ts
import { atom } from 'jotai';

// We store the ID of the selected job. null means nothing is selected.
export const selectedJobIdAtom = atom<string | null>(null);