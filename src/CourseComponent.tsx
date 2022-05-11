import React, { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { Catalog } from "./interfaces/catalog";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
// import { Plan } from "./interfaces/plan";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export function CourseComponent({
    course,
    updateCourses,
    plan,
    // changePlan,
    // updatePlans,
    removingCourse,
    removeCourse,
    sem,
    changePlan,
    updatePlans,
    changeSemList,
    courses,
    content,
    changeCrsList
}: {
    course: Course;
    updateCourses: (newCourse: Course, oldCourse: Course) => void;
    // changePlan: (plan: Plan) => void;
    // updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    plan: Plan;
    removingCourse: boolean;
    removeCourse: (crsID: string) => void;
    sem: Semester;
    changePlan: (plan: Plan) => void;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    changeSemList: (sems: Semester[]) => void;
    courses: string[];
    content: Catalog[];
    changeCrsList: (crses: Course[]) => void;
}): JSX.Element {
    const [editMode, changeEditMode] = useState<boolean>(false);
    const [courseCode, changeCode] = useState<string>(course.courseCode);
    const [courseTitle, changeTitle] = useState<string>(course.courseTitle);
    const [credits, changeCredits] = useState<number>(course.numCredits);
    const [currentCourse, updateCourse] = useState<Course>(course);
    const [courseDescription, changeDescription] = useState<string>(
        course.courseDescription
    );
    function resetCourse(c: Course) {
        const location = courses.findIndex(
            (crs: string) => crs === c.courseCode
        );
        const newCourse: Course = {
            courseCode: content[location].code,
            courseTitle: content[location].name,
            numCredits: +content[location].credits,
            preReqs: [content[location].preReq],
            courseDescription: content[location].descr,
            complete: true,
            required: true,
            requirementType: content[location].typ
        };
        // const newCourses = sem.coursesTaken.map((crs: Course) => {
        //     if (crs.courseCode === c.courseCode) {
        //         return newCourse;
        //     } else {
        //         return { ...crs };
        //     }
        // });
        // const newSem = { ...sem, coursesTaken: newCourses };
        // const newSems = plan.semesters.map((sm: Semester) => {
        //     if (sem === sm) {
        //         return { ...newSem };
        //     } else {
        //         return { ...sm };
        //     }
        // });
        updateCourses(newCourse, c);
        // changeSemList(newSems);
        // changePlan({ ...plan, semesters: newSems });
        // const newPlan = { ...plan, semesters: newSems };
        // updatePlans(newPlan, plan);
        changeEditMode(!editMode);
    }
    return (
        <div
            // className="course"
            style={{ border: "1px solid black", padding: "10px" }}
        >
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
                {/* {!editMode && !coursePool.includes(currentCourse) && (
                    <Button
                        onClick={() => {
                            updateCoursePool(currentCourse);
                            removeCourse(courseCode);
                        }}
                    >
                        {"→"}
                    </Button>
                )} */}
                <div style={{ padding: "5px" }}>
                    {editMode && (
                        <Button
                            data-testid="restoreCourseInfo"
                            onClick={() => resetCourse(currentCourse)}
                        >
                            Reset Course to Default Info
                        </Button>
                    )}
                </div>
                {editMode && (
                    <Button
                        data-testid="save-course"
                        onClick={() => {
                            // console.log
                            const newCourse = {
                                ...currentCourse,
                                courseCode: courseCode,
                                courseTitle: courseTitle,
                                courseDescription: courseDescription,
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
                            changeDescription(currentCourse.courseDescription);
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
