// Provides a Framework for a Single Degree Plan

import { Semester } from "./semester";

export interface Plan {
    // Plan Name (string)
    name: string;
    // Array of Semesters in Plan
    semesters: Semester[];
}
