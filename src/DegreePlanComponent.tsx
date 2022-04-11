import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

export function DegreePlanComponent({
    degreePlan
}: {
    degreePlan: Plan;
}): JSX.Element {
    return (
        <div
            // className="degreePlan"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            <Container style={{ textDecorationThickness: "3px" }}>
                <b>{degreePlan.name.toUpperCase()} DEGREE PLAN</b>
            </Container>

            <div style={{ padding: "5px" }}>
                <Row>
                    {degreePlan.semesters.map((sem: Semester) => (
                        <Col key={sem.semesterName}>
                            <SemesterComponent
                                semester={sem}
                            ></SemesterComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
