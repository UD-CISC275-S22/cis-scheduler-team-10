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
    moveCourses,
    tempSemester,
    updateTempSemester,
    semesterOptions,
    moveCourse
}: {
    course: Course;
    updateCourses: (newCourse: Course, oldCourse: Course) => void;
    removingCourse: boolean;
    removeCourse: (crsID: string) => void;
    moveCourses: boolean;
    tempSemester: Semester;
    updateTempSemester: (semesterTitle: string) => void;
    semesterOptions: Semester[];
    moveCourse: (movingCourse: Course, newSemester: Semester) => boolean;
}): JSX.Element {
    const [editMode, changeEditMode] = useState<boolean>(false);
    const [courseCode, changeCode] = useState<string>(course.courseCode);
    const [courseTitle, changeTitle] = useState<string>(course.courseTitle);
    const [credits, changeCredits] = useState<number>(course.numCredits);
    const [popUp, showPopUp] = useState<boolean>(false);
    const [moveCourseCopy, updateMoveCourseCopy] = useState<boolean>(false);

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
                <Modal show={popUp} onHide={() => showPopUp(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Move Course to Another Semester
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Move to...</Form.Label>
                            <Form.Select
                                data-testid={"semester-select"}
                                value={
                                    tempSemester.season +
                                    tempSemester.semesterName
                                }
                                onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                    updateTempSemester(
                                        event.target.value.toString()
                                    );
                                }}
                            >
                                {semesterOptions.map((semester: Semester) => (
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
                        {moveCourseCopy && (
                            <span style={{ color: "red" }}>
                                This semester already has this course.
                            </span>
                        )}
                        <Button
                            variant="success"
                            data-testid={"save-move-course"}
                            onClick={() => {
                                const validCourse = moveCourse(
                                    course,
                                    tempSemester
                                );
                                if (validCourse && !moveCourseCopy) {
                                    showPopUp(false);
                                    updateMoveCourseCopy(false);
                                } else {
                                    updateMoveCourseCopy(true);
                                }
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            data-testid={"cancel-move"}
                            variant="warning"
                            onClick={() => {
                                showPopUp(false);
                                updateMoveCourseCopy(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </Modal.Body>
                </Modal>
                {!editMode && moveCourses && (
                    <Button
                        data-testid={"move-course"}
                        onClick={() => {
                            updateTempSemester(
                                semesterOptions[0].season +
                                    semesterOptions[0].semesterName
                            );
                            showPopUp(true);
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
                        data-testid={"cancel-edit-course"}
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
