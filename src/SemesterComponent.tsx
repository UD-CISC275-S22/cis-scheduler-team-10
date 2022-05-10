import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

export function SemesterComponent({
    plan,
    semester,
    updateSemesters,
    removing,
    removeSemester,
    reset
}: {
    plan: Plan;
    semester: Semester;
    updateSemesters: (newSemester: Semester, oldSemester: Semester) => void;
    removing: boolean;
    removeSemester: (plan: Plan, semName: string) => void;
    reset: (s: Semester) => void;
}): JSX.Element {
    const [currentSem, updateSem] = useState<Semester>(semester);
    const [addingCourse, changeAddingCourse] = useState<boolean>(false);
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

    function save() {
        // changeCrsList(semester.coursesTaken);
        // changeCourses(crsList);
        // addCourse(crsID, semester, plan);
        // changeAddingCourse(!addingCourse);
        // changeCrsID("Insert Course ID");
    }

    return (
        <div
            className="semester"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            <Col>
                {semester.season.toUpperCase() +
                    " " +
                    semester.semesterName.toUpperCase()}
                <Button
                    onClick={() => reset(currentSem)}
                    variant="danger"
                    className="me-4"
                >
                    Reset
                </Button>
            </Col>
            <Col
                style={{
                    border: "1px solid black"
                }}
            >
                {removing ? (
                    <Button
                        onClick={() =>
                            removeSemester(plan, semester.semesterName)
                        }
                        variant="danger"
                        className="me-4"
                    >
                        Remove Semester
                    </Button>
                ) : (
                    <span></span>
                )}

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
                            ></CourseComponent>
                        </div>
                    );
                })}
                <div style={{ padding: "2px" }}>
                    <Button onClick={() => changeAddingCourse(!addingCourse)}>
                        Add Course
                    </Button>
                </div>
                <div>
                    {addingCourse ? (
                        <div>
                            <Form.Group controlId="formCourseID">
                                <Form.Label>Course ID:</Form.Label>
                                <Form.Control value={""} />
                            </Form.Group>
                            <Button variant="success" onClick={save}>
                                Save Course
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Col>
        </div>
    );
}
