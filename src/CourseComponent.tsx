import React, { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function CourseComponent({
    course,
    updateCourses,
    coursePool,
    updateCoursePool,
    updatePlans,
    removingCourse,
    removeCourse,
    addCourse,
    moveCourse,
    plan,
    currentSemester
}: {
    course: Course;
    updateCourses: (newCourse: Course, oldCourse: Course) => void;
    coursePool: Course[];
    updateCoursePool: (updated: Course) => void;
    changePlan: (plan: Plan) => void;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    plan: Plan;
    removingCourse: boolean;
    removeCourse: (crsID: string) => void;
    addCourse: (crsID: string, semester: Semester, plan: Plan) => void;
    moveCourse: (
        movingCourse: Course,
        previousSemester: Semester,
        newSemester: Semester
    ) => void;
    currentSemester: Semester;
}): JSX.Element {
    const [editMode, changeEditMode] = useState<boolean>(false);
    const [courseCode, changeCode] = useState<string>(course.courseCode);
    const [courseTitle, changeTitle] = useState<string>(course.courseTitle);
    const [credits, changeCredits] = useState<number>(course.numCredits);
    const [currentCourse, updateCourse] = useState<Course>(course);
    const [popUp, changePopUp] = useState<boolean>(false);
    const [tempSemester, changeTempSemester] = useState<Semester>(
        currentSemester !== plan.semesters[0]
            ? plan.semesters[0]
            : plan.semesters[1]
    );

    function updateTempSemester(event: React.ChangeEvent<HTMLSelectElement>) {
        const newSemester = plan.semesters.find(
            (semester: Semester) =>
                semester.season + semester.semesterName === event.target.value
        );
        if (newSemester !== undefined) {
            changeTempSemester(newSemester);
        } else {
            console.log("ERROR: DID NOT FIND SEMESTER TO ADD BACK");
        }
    }

    return (
        <div
            // className="course"
            style={{ border: "1px solid black", padding: "10px" }}
        >
            <FormGroup>
                {!editMode && (
                    <div data-testid="course-code">
                        <b>{courseCode}</b>
                    </div>
                )}
                {removingCourse ? (
                    <Button
                        variant="danger"
                        className="me-4"
                        onClick={() => removeCourse(courseCode)}
                    >
                        Remove Course
                    </Button>
                ) : (
                    <span></span>
                )}
                {editMode && (
                    <Form.Control
                        type="textbox"
                        value={courseCode}
                        onChange={(event: ChangeEvent) =>
                            changeCode(event.target.value)
                        }
                    ></Form.Control>
                )}
                {!editMode && (
                    <div data-testid="course-title">
                        <i>{courseTitle}</i>
                    </div>
                )}
                {editMode && (
                    <Form.Control
                        type="textbox"
                        value={courseTitle}
                        onChange={(event: ChangeEvent) =>
                            changeTitle(event.target.value)
                        }
                    ></Form.Control>
                )}
                {!editMode && <p> {course.courseDescription}</p>}
                {editMode && (
                    <Form.Control
                        type="textbox"
                        value={!isNaN(credits) ? credits.toString() : ""}
                        onChange={(event: ChangeEvent) =>
                            changeCredits(parseInt(event.target.value))
                        }
                    ></Form.Control>
                )}
                {!editMode && (
                    <Button
                        data-testid="edit-course"
                        onClick={() => {
                            changeEditMode(!editMode);
                        }}
                        variant="success"
                        className="me-4"
                    >
                        Edit
                    </Button>
                )}
                <Modal show={popUp} onHide={() => changePopUp(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Move Course to Another Semester
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Move to...</Form.Label>
                            <Form.Select
                                value={
                                    tempSemester.season +
                                    tempSemester.semesterName
                                }
                                onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                    updateTempSemester(event);
                                }}
                            >
                                {plan.semesters
                                    .filter(
                                        (semester: Semester): boolean =>
                                            semester !== currentSemester
                                    )
                                    .map((semester: Semester) => (
                                        <option
                                            key={
                                                "option" +
                                                semester.season +
                                                semester.semesterName
                                            }
                                            value={
                                                semester.season +
                                                semester.semesterName
                                            }
                                        >
                                            {semester.season.toUpperCase() +
                                                semester.semesterName}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Button
                            onClick={() => {
                                // removeCourse(courseCode);
                                moveCourse(
                                    course,
                                    currentSemester,
                                    tempSemester
                                );
                                // addCourse(courseCode, tempSemester, plan);
                                changePopUp(false);
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Body>
                </Modal>
                {!editMode && !coursePool.includes(currentCourse) && (
                    <Button
                        onClick={() => {
                            changePopUp(true);
                        }}
                    >
                        {"Move Course"}
                    </Button>
                )}
                {editMode && (
                    <Button
                        data-testid="save-course"
                        onClick={() => {
                            const newCourse = {
                                ...currentCourse,
                                courseCode: courseCode,
                                courseTitle: courseTitle,
                                numCredits: credits
                            };
                            updateCourse(newCourse);
                            updateCourses(newCourse, currentCourse);
                            changeEditMode(!editMode);
                        }}
                        variant="success"
                        className="me-4"
                    >
                        Save
                    </Button>
                )}
                {editMode && (
                    <Button
                        onClick={() => {
                            changeCode(currentCourse.courseCode);
                            changeTitle(currentCourse.courseTitle);
                            changeCredits(currentCourse.numCredits);
                            changeEditMode(!editMode);
                        }}
                        variant="warning"
                        className="me-4"
                    >
                        Cancel
                    </Button>
                )}
            </FormGroup>
        </div>
    );
}
