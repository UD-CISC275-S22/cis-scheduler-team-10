import React, { useState } from "react";
import { Button, ButtonGroup, Col, Form } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { Typeahead } from "react-bootstrap-typeahead";
import { Catalog } from "./interfaces/catalog";
export function SemesterComponent({
    plan,
    semester,
    removing,
    removeSemester,
    resetSemester,
    updatePlans,
    courses,
    content
}: {
    plan: Plan;
    semester: Semester;
    removing: boolean;
    removeSemester: (plan: Plan, semName: string) => void;
    resetSemester: (s: Semester) => void;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    courses: string[];
    content: Catalog[];
}): JSX.Element {
    const [addingCourse, changeAddingCourse] = useState<boolean>(false);
    const [removingCourse, changeRemovingCourse] = useState<boolean>(false);
    const [courseID, changeCourseID] = useState<string>("Insert Course ID");
    const [courseCopy, changeCopyStatus] = useState<boolean>(false);
    const [invalidCourse, changeInvalidCourseStatus] = useState<boolean>(false);
    function updateCourses(newCourse: Course, oldCourse: Course): void {
        const newCourses = semester.coursesTaken.map((course: Course) => {
            if (course === oldCourse) {
                return newCourse;
            } else {
                return course;
            }
        });
        const newSem = { ...semester, coursesTaken: newCourses };
        const newSems = plan.semesters.map((sem: Semester) => {
            if (sem === semester) {
                return { ...newSem };
            } else {
                return { ...sem };
            }
        });
        const newPlan = { ...plan, semesters: newSems };
        updatePlans(newPlan, plan);
    }

    function removeCourse(crsID: string): void {
        const newCourses = semester.coursesTaken.filter(
            (c: Course): boolean => c.courseCode !== crsID
        );
        const newSemester = { ...semester, coursesTaken: newCourses };
        const newSemesters = plan.semesters.map((sem: Semester) => {
            if (sem === semester) {
                return { ...newSemester };
            } else {
                return { ...sem };
            }
        });
        const newPlan = { ...plan, semesters: newSemesters };
        updatePlans(newPlan, plan);
    }

    function addCourse(courseID: string, semester: Semester, plan: Plan) {
        const location = courses.findIndex((crs: string) => crs === courseID);
        const newCourse: Course = {
            courseCode: courseID,
            courseTitle: content[location].name,
            numCredits: parseInt(content[location].credits),
            preReqs: content[location].preReq,
            courseDescription: content[location].descr,
            complete: true,
            required: true,
            requirementType: content[location].typ
        };
        const newCourses = [...semester.coursesTaken, newCourse];
        const newSemester = { ...semester, coursesTaken: newCourses };
        const newSemesters = plan.semesters.map((sem: Semester) => {
            if (sem === semester) {
                return { ...newSemester };
            } else {
                return { ...sem };
            }
        });
        const newPlan = { ...plan, semesters: newSemesters };
        updatePlans(newPlan, plan);
    }

    function save() {
        if (
            semester.coursesTaken.find(
                (course: Course) => course.courseCode === courseID
            ) === undefined
        ) {
            addCourse(courseID, semester, plan);
            changeAddingCourse(!addingCourse);
            changeCourseID("Insert Course ID");
            changeCopyStatus(false);
        } else {
            changeCopyStatus(true);
        }
    }

    return (
        <div
            data-testid="sem"
            className="semester"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            <Col>
                {semester.season.toUpperCase() +
                    " " +
                    semester.semesterName.toUpperCase()}
                <div data-testid="credLim">
                    Credit Limit: {semester.creditLimit}
                </div>
                <div data-testid="credFill">
                    Credits Filled:{" "}
                    {semester.coursesTaken.reduce(
                        (credTot, { numCredits }) => credTot + numCredits,
                        0
                    )}
                </div>
                <Button
                    data-testid="reset"
                    onClick={() => resetSemester(semester)}
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
                        data-testid="removeSem"
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
                                removingCourse={removingCourse}
                                removeCourse={removeCourse}
                                sem={semester}
                                courses={courses}
                                content={content}
                            ></CourseComponent>
                        </div>
                    );
                })}
                <div style={{ padding: "2px" }}>
                    <ButtonGroup>
                        <Button
                            data-testid="addCourseButton"
                            onClick={() => changeAddingCourse(!addingCourse)}
                        >
                            Add Course
                        </Button>
                        <Button
                            data-testid="removeCourseOpt"
                            variant="danger"
                            onClick={() =>
                                changeRemovingCourse(!removingCourse)
                            }
                        >
                            Remove Course
                        </Button>
                    </ButtonGroup>
                </div>
                <div>
                    {addingCourse ? (
                        <div>
                            <div>
                                <Form.Group data-testid="course-search">
                                    <Form.Label>Select Course</Form.Label>
                                    <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey="course-name"
                                        onChange={(selected) => {
                                            if (selected.length === 1) {
                                                changeCourseID(
                                                    selected[0].toString()
                                                );
                                            }
                                        }}
                                        options={courses}
                                        placeholder="Course Search..."
                                    ></Typeahead>
                                </Form.Group>
                                <Button
                                    data-testid="saveCourse"
                                    variant="success"
                                    onClick={() => {
                                        if (courseID === "Insert Course ID") {
                                            changeInvalidCourseStatus(true);
                                        } else {
                                            save();
                                            changeInvalidCourseStatus(false);
                                        }
                                    }}
                                >
                                    Save Course
                                </Button>
                            </div>
                            {courseCopy && (
                                <span style={{ color: "red" }}>
                                    You cannot add the same course twice.
                                </span>
                            )}
                            {invalidCourse && (
                                <span style={{ color: "red" }}>
                                    Please add a course from the course catalog.
                                </span>
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Col>
        </div>
    );
}
