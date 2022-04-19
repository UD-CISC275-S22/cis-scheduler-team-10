import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";

export function SemesterComponent({
    semester,
    changeSemCourses,
    updateSems,
    changeSem
}: {
    semester: Semester;
    changeSemCourses: (courses: Course[]) => void;
    updateSems: (newSem: Semester, oldSem: Semester) => void;
    changeSem: (sem: Semester) => void;
}): JSX.Element {
    const [addingCourse, changeAddingCourse] = useState<boolean>(false);
    const [crsID, changeCrsID] = useState<string>("Insert Course ID");
    const [courseList, changeCourseList] = useState<Course[]>(
        semester.coursesTaken
    );
    function updateCrsID(event: React.ChangeEvent<HTMLInputElement>) {
        changeCrsID(event.target.value);
    }
    function save() {
        updateCourseList();
        changeAddingCourse(!addingCourse);
        changeCrsID("Insert Course ID");
    }
    function updateCourseList() {
        //let numCredits = 0;
        const newCourse: Course = {
            courseCode: crsID,
            courseTitle: "",
            numCredits: 0,
            preReqs: [],
            courseDescription: "",
            complete: true,
            required: true,
            requirementType: "university"
        };
        const newCourseList = [...courseList, newCourse];
        //updateSems(newSem, degPlanSems);
        changeCourseList(newCourseList);
        changeSemCourses(newCourseList);
        const newSem = { ...semester, coursesTaken: newCourseList };
        //newPlan.semesters = newSemList;
        updateSems(newSem, semester);
        changeSem(newSem);
    }
    return (
        <div
            className="semester"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            {semester.semesterName.toUpperCase()}
            <Col
                style={{
                    border: "1px solid black"
                }}
            >
                {semester.coursesTaken.map((course: Course) => {
                    return (
                        <div
                            key={course.courseCode}
                            style={{
                                padding: "5px"
                            }}
                        >
                            <CourseComponent course={course}></CourseComponent>
                        </div>
                    );
                })}
                <div style={{ padding: "2px" }}>
                    {" "}
                    <Button onClick={() => changeAddingCourse(!addingCourse)}>
                        Add Course
                    </Button>
                </div>
                <div>
                    {addingCourse ? (
                        <div>
                            <Form.Group controlId="formCourseID">
                                <Form.Label>Course ID:</Form.Label>
                                <Form.Control
                                    value={crsID}
                                    onChange={updateCrsID}
                                />
                            </Form.Group>
                            <Button onClick={save}>Save Course</Button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </Col>
        </div>
    );
}
