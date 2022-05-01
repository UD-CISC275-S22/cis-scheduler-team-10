import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { SemesterComponent } from "./SemesterComponent";

export function CoursePoolComponent({
    coursePool,
    updateCoursePool,
    currentPlan,
    changePlan,
    updateSemesters
}: {
    coursePool: Course[];
    updateCoursePool: (updated: Course) => void;
    currentPlan: Plan;
    changePlan: (plan: Plan) => void;
    updateSemesters: (
        newSemester: Semester,
        oldSemester: Semester,
        plan: Plan
    ) => void;
}): JSX.Element {
    const [tempSemester, changeTempSemester] = useState<Semester>(
        currentPlan.semesters[0]
    );

    function updateTempSemester(event: React.ChangeEvent<HTMLSelectElement>) {
        const newSemester = currentPlan.semesters.find(
            (semester: Semester) =>
                semester.season + semester.semesterName === event.target.value
        );
        if (newSemester !== undefined) {
            changeTempSemester(newSemester);
        } else {
            console.log("THERE IS A PROBLEM DID NOT FIND SEMESTER TO ADD BACK");
        }
    }

    function moveCourseToSem(course: Course) {
        // const updatedTempSem = {
        //     ...currentPlan.semesters[0],
        //     coursesTaken: [...currentPlan.semesters[0].coursesTaken]
        // };
        // console.log(updatedTempSem);
        // changeTempSemester(updatedTempSem);
        // console.log(tempSemester);
        if (tempSemester === currentPlan.semesters[0]) {
            console.log("temp = 0 despite courses");
        } else {
            console.log("what we want! temp does not equal sem 0");
        }
        const newCourses = tempSemester.coursesTaken.map(
            (course: Course): Course => {
                return course;
            }
        );
        newCourses.push(course);
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
                    </div>
                );
            })}
            <Form.Group>
                <Form.Label>Move to...</Form.Label>
                <Form.Select
                    value={tempSemester.season + tempSemester.semesterName}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        updateTempSemester(event);
                    }}
                >
                    {currentPlan.semesters.map((semester: Semester) => (
                        <option
                            key={semester.season + semester.semesterName}
                            value={semester.season + semester.semesterName}
                        >
                            {semester.season.toUpperCase() +
                                semester.semesterName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Container>
    );
}
