/** Shared trust microcopy for the Aptellum microsite. */

export const TRUST_LINES = {
  inspiredBrief: 'Inspired brief. Not an official company assignment.',
  preparationSignal: 'Preparation signal, not a hiring verdict.',
  studentOwnership: 'AI can support the process. The student owns the work.',
} as const;

export const TRUST_LINES_LIST = Object.values(TRUST_LINES);
