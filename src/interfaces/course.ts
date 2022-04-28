// Provides a Framework for a Single Course

export type RequirementType =
    | "University: "
    | "A&S: "
    | "University: Social and Behavioral Sciences"
    | "University: Social and Behavioral Sciences (SOC &amp; BESC)"
    | "University: Mathematics, Natural Sciences and Technology"
    | "University: Mathematics, Natural Sciences, and Technology (MTH NS &amp; T)"
    | "University: Creative Arts and Humanities"
    | "University: Creative Arts and Humanities (ART &amp; HUM)"
    | "University: History and Cultural Change"
    | "University: History and Cultural Change (HIST &amp; CLT)"
    | "A&S: GROUP A: A&S Creative Arts & Humanities"
    | "A&S: GROUP B: A&S History & Cultural Change"
    | "A&S: GROUP C: A&S Social & Behavioral Sci"
    | "A&S: GROUP D: A&S Math, Nat Sci & Technology";
// split

export interface Course {
    // Code (string)
    courseCode: string;
    // Title (string)
    courseTitle: string;
    // Credits (number)
    numCredits: number;
    // Pre-Req (Course[])
    preReqs: string[];
    // Desc (string)
    courseDescription: string;
    // Taken/Complete (bool)
    complete: boolean;
    // Required (bool)
    required: boolean;
    // RequirementType (string)
    requirementType: RequirementType;
}
