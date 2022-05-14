import React, { useState } from "react";
import { Button, ButtonGroup, Col, Form } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { Typeahead } from "react-bootstrap-typeahead";
export function SemesterComponent({
    plan,
    semester,
    removing,
    removeSemester,
    resetSemester,
    updatePlans,
    courses
}: {
    plan: Plan;
    semester: Semester;
    removing: boolean;
    removeSemester: (plan: Plan, semName: string) => void;
    resetSemester: (s: Semester) => void;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    courses: string[];
}): JSX.Element {
    const [addingCourse, changeAddingCourse] = useState<boolean>(false);
    const [removingCourse, changeRemovingCourse] = useState<boolean>(false);
    const [courseID, changeCourseID] = useState<string>("Insert Course ID");
    const [credits, changeCredits] = useState<string>("0");
    const [invalidCourse, changeInvalidity] = useState<boolean>(false);
    // temporary to move course to:
    const [tempSemester, changeTempSemester] = useState<Semester>(
        semester.season + semester.semesterName ===
            plan.semesters[0].season + plan.semesters[0].semesterName
            ? plan.semesters.length !== 1
                ? plan.semesters[1]
                : plan.semesters[0]
            : plan.semesters[0]
    );
    const [moveCourses, changeMoveCourses] = useState<boolean>(false);

    const movingIsValid =
        plan.semesters.length !== 1 && semester.coursesTaken.length !== 0;

    function updateTempSemester(semesterTitle: string) {
        const newSemester = plan.semesters.find(
            (planSemester: Semester) =>
                planSemester.season + planSemester.semesterName ===
                semesterTitle
        );
        if (newSemester !== undefined) {
            changeTempSemester(newSemester);
        }
    }

    function moveCourse(movingCourse: Course, newSemester: Semester): boolean {
        if (
            newSemester.coursesTaken.find(
                (course: Course) =>
                    course.courseCode === movingCourse.courseCode
            ) !== undefined
        ) {
            return false;
        }
        const withoutMovingCourse = semester.coursesTaken.filter(
            (course: Course): boolean =>
                course.courseCode !== movingCourse.courseCode
        );
        const updatedPreviousSemester = {
            ...semester,
            coursesTaken: withoutMovingCourse
        };

        const addedMovingCourse = [...newSemester.coursesTaken, movingCourse];
        const updatedNewSemester = {
            ...newSemester,
            coursesTaken: addedMovingCourse
        };

        const newSemesters = plan.semesters.map((planSemester: Semester) => {
            if (
                planSemester.season + planSemester.semesterName ===
                newSemester.season + newSemester.semesterName
            ) {
                return { ...updatedNewSemester };
            } else if (
                planSemester.season + planSemester.semesterName ===
                semester.season + semester.semesterName
            ) {
                return { ...updatedPreviousSemester };
            } else {
                return { ...planSemester };
            }
        });

        const newPlan = { ...plan, semesters: newSemesters };
        changeTempSemester(updatedNewSemester);
        updatePlans(newPlan, plan);
        return true;
    }

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

    function updateCredits(event: React.ChangeEvent<HTMLInputElement>) {
        changeCredits(event.target.value);
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

    function addCourse(
        courseID: string,
        credits: number,
        semester: Semester,
        plan: Plan
    ) {
        const newCourse: Course = {
            courseCode: courseID,
            courseTitle: "",
            numCredits: credits,
            preReqs: [],
            courseDescription: "",
            complete: true,
            required: true,
            requirementType: "university"
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
            addCourse(courseID, +credits, semester, plan);
            changeAddingCourse(!addingCourse);
            changeCourseID("Insert Course ID");
            changeInvalidity(false);
        } else {
            changeInvalidity(true);
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
                {/* <div data-testid="credLim">
                    Credit Limit: {currentSem.creditLimit}
                </div> */}
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
                {movingIsValid && (
                    <Button
                        data-testid={"move-courses"}
                        onClick={() => {
                            changeMoveCourses(!moveCourses);
                        }}
                    >
                        Move Courses
                    </Button>
                )}
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
                                moveCourses={moveCourses}
                                tempSemester={tempSemester}
                                updateTempSemester={updateTempSemester}
                                semesterOptions={plan.semesters.filter(
                                    (planSemester: Semester): boolean =>
                                        planSemester.season +
                                            planSemester.semesterName !==
                                        semester.season + semester.semesterName
                                )}
                                moveCourse={moveCourse}
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
                                <Form.Group
                                    data-testid="addCreds"
                                    controlId="formCredits"
                                >
                                    <Form.Label>Number of Credits:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={credits}
                                        onChange={updateCredits}
                                    />
                                </Form.Group>
                                <Button
                                    data-testid="saveCourse"
                                    variant="success"
                                    onClick={save}
                                >
                                    Save Course
                                </Button>
                            </div>
                            {invalidCourse && (
                                <span style={{ color: "red" }}>
                                    You cannot add the same course twice.
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
