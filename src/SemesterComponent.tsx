import React from "react";
import { Row, Col } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";

export function SemesterComponent(): JSX.Element {
    // {
    // semester
    // }: {
    // semester: Semester;
    // }
    return (
        <div
            className="semester"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            This is a semester.
            {/* <Row
                style={{
                    border: "1px solid black",
                    padding: "20px"
                }}
            > */}
            <Col
                style={{
                    border: "1px solid red",
                    padding: "20px"
                }}
            >
                <CourseComponent></CourseComponent>
                {/* </Col>
                <Col> */}
                <CourseComponent></CourseComponent>
            </Col>
            {/* </Row> */}
        </div>
    );
}
