import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SemesterComponent } from "./SemesterComponent";

export function DegreePlanComponent(): JSX.Element {
    // {
    // degreePlan
    // }: {
    // degreePlan: DegreePlan;
    // }
    return (
        <div
            // className="degreePlan"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            <Container style={{ border: "1px solid black" }}>
                THIS IS A DEGREE PLAN HEADER
            </Container>

            <div style={{ padding: "8px" }}>
                This is the actual degree plan, consisting of semesters.
                <Row
                // style={{
                //     border: "1px solid blue"
                //     // padding: "20px"
                // }}
                >
                    <Col>
                        <SemesterComponent></SemesterComponent>
                    </Col>
                    <Col>
                        <SemesterComponent></SemesterComponent>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
