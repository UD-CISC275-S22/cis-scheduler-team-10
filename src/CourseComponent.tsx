import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Catalog } from "./interfaces/catalog";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function CourseComponent({
    course,
    updateCourses,
    removingCourse,
    removeCourse,
    sem,
    courses,
    content
}: {
    course: Course;
    updateCourses: (newCourse: Course, oldCourse: Course) => void;
    removingCourse: boolean;
    removeCourse: (crsID: string) => void;
    sem: Semester;
    courses: string[];
    content: Catalog[];
}): JSX.Element {
    const [editMode, changeEditMode] = useState<boolean>(false);
    const [courseCode, changeCode] = useState<string>(course.courseCode);
    const [courseTitle, changeTitle] = useState<string>(course.courseTitle);
    const [courseCredits, changeCredits] = useState<number>(course.numCredits);
    const [courseDescription, changeDescription] = useState<string>(
        course.courseDescription
    );
    const [metPreReq, changeMetPreReq] = useState<boolean>(false);
    const [canAdd, changeCanAdd] = useState<boolean>(true);
    function resetCourse(c: Course) {
        const location = courses.findIndex(
            (crs: string) => crs === c.courseCode
        );
        const newCourse: Course = {
            courseCode: content[location].code,
            courseTitle: content[location].name,
            numCredits: parseInt(content[location].credits),
            preReqs: content[location].preReq,
            courseDescription: content[location].descr,
            complete: true,
            required: true,
            requirementType: content[location].typ
        };

        changeCode(newCourse.courseCode);
        changeTitle(newCourse.courseTitle);
        changeDescription(newCourse.courseDescription);
        updateCourses(newCourse, c);
        changeEditMode(!editMode);
    }

    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            <FormGroup>
                {!editMode && (
                    <div data-testid="course-code">
                        <b>
                            {course.courseCode}: {course.numCredits} Credits
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
                        onChange={(event: ChangeEvent) => {
                            changeCode(event.target.value);
                        }}
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
                {editMode && (
                    <Form.Control
                        type="textbox"
                        data-testid="changeDescription"
                        value={courseDescription}
                        onChange={(event: ChangeEvent) =>
                            changeDescription(event.target.value)
                        }
                    ></Form.Control>
                )}

                {!editMode && <p> {course.courseDescription}</p>}
                {editMode && (
                    <Form.Control
                        type="textbox"
                        value={
                            !isNaN(courseCredits)
                                ? courseCredits.toString()
                                : ""
                        }
                        onChange={(event: ChangeEvent) =>
                            changeCredits(parseInt(event.target.value))
                        }
                    ></Form.Control>
                )}
                {!editMode && (
                    <div>
                        <p data-testid="preReqs">
                            {" "}
                            <b>Prerequisites: </b>
                            {course.preReqs === ""
                                ? "None"
                                : course.preReqs}{" "}
                            {course.preReqs !== ""
                                ? metPreReq
                                    ? "✔️"
                                    : "❌"
                                : ""}
                        </p>
                    </div>
                )}
                {editMode && (
                    <Form.Check
                        type="checkbox"
                        id="is-preReqMet-check"
                        label="Satisfied all prerequisites"
                        checked={metPreReq}
                        onChange={() => changeMetPreReq(!metPreReq)}
                    />
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
                <div style={{ padding: "5px" }}>
                    {editMode && (
                        <Button
                            data-testid="restoreCourseInfo"
                            onClick={() => resetCourse(course)}
                        >
                            Reset Course to Default Info
                        </Button>
                    )}
                </div>
                {editMode && (
                    <Button
                        data-testid="save-course"
                        onClick={() => {
                            if (
                                sem.coursesTaken.find(
                                    (course: Course) =>
                                        course.courseCode === courseCode
                                ) === undefined
                            ) {
                                const newCourse = {
                                    ...course,
                                    courseCode: courseCode,
                                    courseTitle: courseTitle,
                                    courseDescription: courseDescription,
                                    numCredits: courseCredits
                                };
                                updateCourses(newCourse, course);

                                changeEditMode(!editMode);
                            } else {
                                changeCanAdd(!canAdd);
                            }
                        }}
                        variant="success"
                        className="me-4"
                    >
                        Save
                    </Button>
                )}
                {!canAdd && editMode && (
                    <div style={{ color: "red" }}>
                        You cannot have two courses with the same code in one
                        semester.
                    </div>
                )}
                {editMode && (
                    <Button
                        onClick={() => {
                            changeCode(course.courseCode);
                            changeTitle(course.courseTitle);
                            changeDescription(course.courseDescription);
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
