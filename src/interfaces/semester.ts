// Provides a Framework for a Single Semester

import { Course } from "./course";

//export type Season = "fall" | "winter" | "spring" | "summer I" | "summer II";

export interface Semester {
    // Name (string)
    semesterName: string;
    // Active [not skipped] (bool)
    active: boolean;
    // Credit Limit (number)
    creditLimit: number;
    // Which Semester (Season)
    season: string;
    // Array of Courses [Taking Courses] (Course[])
    coursesTaken: Course[];
}
