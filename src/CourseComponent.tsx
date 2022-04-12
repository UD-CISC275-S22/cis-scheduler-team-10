import React from "react";
import { Course } from "./interfaces/course";

export function CourseComponent({ course }: { course: Course }): JSX.Element {
    return (
        <div
            // className="course"
            style={{ border: "1px solid black", padding: "10px" }}
        >
            <div>
                <b>{course.courseCode}</b>
            </div>
            <div>
                <i>{course.courseTitle}</i>
            </div>
            <p> {course.courseDescription}</p>
        </div>
    );
}
