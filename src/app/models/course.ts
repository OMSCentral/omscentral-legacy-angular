import { Average } from './average';
import { Grades} from './grades';
export interface Course {
    id: string;
    name: string;
    department: string;
    foundational: boolean;
    number: string;
    combined: string;
    enrolled: number;
    reviews: object;
    work: number;
    difficulty: number;
    rating: number;
    ab: number;
    cdf: number;
    withdrew: number;
    cs: boolean;
    ml: boolean;
    cpr: boolean;
    ii: boolean;
    average: Average;
    numReviews: number;
    grades: Grades;
  }