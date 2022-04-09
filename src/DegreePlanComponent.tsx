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
            <Container style={{ border: "1px solid black" }}>
                {degreePlan.name.toUpperCase()} DEGREE PLAN
            </Container>

            <div style={{ padding: "5px" }}>
                <Row>
                    <Col>
                        {degreePlan.semesters.map((sem: Semester) => (
                            <div key={sem.semesterName}>
                                {" "}
                                <SemesterComponent
                                    semester={sem}
                                ></SemesterComponent>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    );
}
