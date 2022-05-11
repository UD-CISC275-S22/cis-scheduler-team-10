import React, { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function CourseComponent({
    course,
    updateCourses,
    removingCourse,
    removeCourse,
    tempSemester,
    updateTempSemester,
    otherSemesters
}: {
    course: Course;
    updateCourses: (newCourse: Course, oldCourse: Course) => void;
    removingCourse: boolean;
    removeCourse: (crsID: string) => void;
    tempSemester: Semester;
    updateTempSemester: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    otherSemesters: Semester[];
}): JSX.Element {
    const [editMode, changeEditMode] = useState<boolean>(false);
    const [courseCode, changeCode] = useState<string>(course.courseCode);
    const [courseTitle, changeTitle] = useState<string>(course.courseTitle);
    const [credits, changeCredits] = useState<number>(course.numCredits);
    const [popUp, changePopUp] = useState<boolean>(false);

    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            <FormGroup>
                {!editMode && (
                    <div data-testid="course-code">
                        <b>
                            {courseCode}: {credits} Credits
                        </b>
                    </div>
                )}
                {removingCourse ? (
                    <Button
                        data-testid="removeCourse"
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
                        data-testid="changeCodeBox"
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
                                {/* {plan.semesters
                                    .filter(
                                        (semester: Semester): boolean =>
                                            semester.season +
                                                semester.semesterName !==
                                            currentSemester.season +
                                                currentSemester.semesterName
                                    ) */}
                                {otherSemesters.map((semester: Semester) => (
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
                                // moveCourse(
                                //     course,
                                //     currentSemester,
                                //     tempSemester
                                // );
                                changePopUp(false);
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Body>
                </Modal>
                {!editMode && (
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
                                ...course,
                                courseCode: courseCode,
                                courseTitle: courseTitle,
                                numCredits: credits
                            };
                            updateCourses(newCourse, course);

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
                            changeCode(course.courseCode);
                            changeTitle(course.courseTitle);
                            changeCredits(course.numCredits);
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
