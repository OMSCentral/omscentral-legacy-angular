export interface GradeValues {
  a: number;
  b: number;
  c: number;
  d: number;
  f: number;
  w: number;
  ab: number;
  cdf: number;
  total: number;
  semester?: string;
}

export interface Grades {
  totals: GradeValues;
  semesterGrades: GradeValues[];
  semesterPercents: GradeValues[];
  percents: GradeValues;
}
