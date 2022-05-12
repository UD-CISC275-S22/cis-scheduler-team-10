// Provides a Framework for a Single Course

//export type RequirementType = "university" | "college" | "major";

export interface Course {
    // Code (string)
    courseCode: string;
    // Title (string)
    courseTitle: string;
    // Credits (number)
    numCredits: number;
    // Pre-Req (Course[])
    preReqs: string;
    // Desc (string)
    courseDescription: string;
    // Taken/Complete (bool)
    complete: boolean;
    // Required (bool)
    required: boolean;
    // RequirementType (string)
    requirementType: string;
}
