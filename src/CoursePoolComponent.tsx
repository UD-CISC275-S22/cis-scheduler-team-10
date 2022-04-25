import React from "react";
import { Button, Container } from "react-bootstrap";
import { Course } from "./interfaces/course";
// import { Button, Col, Form, Row } from "react-bootstrap";
// import { Plan } from "./interfaces/plan";
// import { Semester } from "./interfaces/semester";

export function CoursePoolComponent({
    coursePool,
    updateCoursePool
}: {
    coursePool: Course[];
    updateCoursePool: (updated: Course) => void;
}): JSX.Element {
    return (
        <Container>
            {coursePool.map((course: Course) => {
                return (
                    <div key={course.courseCode}>
                        <Button
                            onClick={() => {
                                updateCoursePool(course);
                            }}
                        >
                            {"←"}
                        </Button>
                        {course.courseCode}
                    </div>
                );
            })}
        </Container>
    );
}
