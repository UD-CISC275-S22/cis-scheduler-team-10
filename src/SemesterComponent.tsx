import React from "react";
import { Col } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";

export function SemesterComponent({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    return (
        <div
            className="semester"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            {semester.semesterName.toUpperCase()}
            <Col
                style={{
                    border: "1px solid black"
                }}
            >
                {semester.coursesTaken.map((course: Course) => {
                    return (
                        <div
                            key={course.courseCode}
                            style={{
                                padding: "5px"
                            }}
                        >
                            <CourseComponent course={course}></CourseComponent>
                        </div>
                    );
                })}
            </Col>
        </div>
    );
}
