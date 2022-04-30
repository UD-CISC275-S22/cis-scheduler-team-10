import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function CourseComponent({
    course,
    updateCourses,
    coursePool,
    updateCoursePool,
    updatePlans,
    removingCourse,
    removeCourse
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
                {!editMode && !coursePool.includes(currentCourse) && (
                    <Button
                        onClick={() => {
                            updateCoursePool(currentCourse);
                            removeCourse(courseCode);
                        }}
                    >
                        {"→"}
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
