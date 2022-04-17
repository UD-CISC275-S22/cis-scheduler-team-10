import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Course } from "./interfaces/course";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function CourseComponent({
    course,
    updateCourses
}: {
    course: Course;
    updateCourses: (newCourse: Course, oldCourse: Course) => void;
}): JSX.Element {
    const [editMode, changeEditMode] = useState<boolean>(false);
    const [courseCode, changeCode] = useState<string>(course.courseCode);
    const [courseTitle, changeTitle] = useState<string>(course.courseTitle);
    const [credits, changeCredits] = useState<number>(course.numCredits);
    const [currentCourse, updateCourse] = useState<Course>(course);

    return (
        <div
            // className="course"
            style={{ border: "1px solid black", padding: "10px" }}
        >
            <FormGroup>
                {!editMode && (
                    <div>
                        <b>{courseCode}</b>
                    </div>
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
                    <div>
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
                        value={credits}
                        onChange={(event: ChangeEvent) =>
                            changeCredits(parseInt(event.target.value))
                        }
                    ></Form.Control>
                )}
                {!editMode && (
                    <Button
                        onClick={() => {
                            changeEditMode(!editMode);
                        }}
                    >
                        Edit
                    </Button>
                )}
                {editMode && (
                    <Button
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
                    >
                        Cancel
                    </Button>
                )}
            </FormGroup>
        </div>
    );
}
