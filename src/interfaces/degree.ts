// import { Course } from "./course";

export interface Degree {
    // degree name
    name: string;
    // credits required
    minCredits: number;
    // courses required
    requiredCourses: string[];
    // collegeReqs: Course[];
    // universityReqs: Course[];
    // majorReqs: Course[];
    // optional courses
    // coursesOptional: Course[];
}

// if course name is in requiredcourses, set required = true
