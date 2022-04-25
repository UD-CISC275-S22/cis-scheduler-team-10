import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";

export function SemesterComponent({
    semester,
    updateSemesters,
    coursePool,
    updatecoursePool
}: {
    semester: Semester;
    updateSemesters: (newSemester: Semester, oldSemester: Semester) => void;
    coursePool: Course[];
    updatecoursePool: (updated: Course[]) => void;
}): JSX.Element {
    const [currentSem, updateSem] = useState<Semester>(semester);

    function updateCourses(newCourse: Course, oldCourse: Course): void {
        const newCourses = currentSem.coursesTaken.map((course: Course) => {
            if (course === oldCourse) {
                return newCourse;
            } else {
                return course;
            }
        });
        const newSem = { ...currentSem, coursesTaken: newCourses };
        updateSemesters(newSem, currentSem);
        updateSem(newSem);
    }

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
                            <CourseComponent
                                data-testid="course"
                                course={course}
                                updateCourses={updateCourses}
                                coursePool={coursePool}
                                updatecoursePool={updatecoursePool}
                            ></CourseComponent>
                        </div>
                    );
                })}
            </Col>
        </div>
    );
}
