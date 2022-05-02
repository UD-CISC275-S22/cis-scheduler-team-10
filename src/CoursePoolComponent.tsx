import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

export function CoursePoolComponent({
    coursePool,
    updateCoursePool,
    currentPlan,
    updateSemesters
}: {
    coursePool: Course[];
    updateCoursePool: (updated: Course) => void;
    currentPlan: Plan;
    updateSemesters: (
        newSemester: Semester,
        oldSemester: Semester,
        plan: Plan
    ) => void;
}): JSX.Element {
    const [tempSemester, changeTempSemester] = useState<Semester>(
        currentPlan.semesters[0]
    );
    // const [invalidLocation, updateInvalidity] = useState<boolean>(false);

    function updateTempSemester(event: React.ChangeEvent<HTMLSelectElement>) {
        const newSemester = currentPlan.semesters.find(
            (semester: Semester) =>
                semester.season + semester.semesterName === event.target.value
        );
        if (newSemester !== undefined) {
            changeTempSemester(newSemester);
        } else {
            console.log("ERROR: DID NOT FIND SEMESTER TO ADD BACK");
        }
    }

    function moveCourseToSem(course: Course) {
        // if (tempSemester === currentPlan.semesters[0]) {
        //     console.log("temp = 0 despite courses");
        // } else {
        //     console.log("what we want! temp does not equal sem 0");
        // }
        const newCourses = tempSemester.coursesTaken.map(
            (course: Course): Course => {
                return course;
            }
        );
        newCourses.push(course);
        console.log("Courses after adding");
        console.log(newCourses);
        const newSem: Semester = {
            ...tempSemester,
            coursesTaken: [...newCourses]
        };
        updateSemesters(newSem, tempSemester, currentPlan);
    }

    return (
        <Container>
            {coursePool.map((course: Course) => {
                return (
                    <div key={course.courseCode}>
                        <Button
                            onClick={() => {
                                moveCourseToSem(course);
                                updateCoursePool(course);
                            }}
                        >
                            {"←"}
                        </Button>
                        {course.courseCode}
                        {
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
                                    {currentPlan.semesters.map(
                                        (semester: Semester) => (
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
                                        )
                                    )}
                                </Form.Select>
                            </Form.Group>
                        }
                    </div>
                );
            })}
        </Container>
    );
}
