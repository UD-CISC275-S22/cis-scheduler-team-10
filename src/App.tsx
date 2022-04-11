import React, { useState } from "react";
import "./App.css";
import degreePlans from "./data/degreePlans.json";
import { DegreePlanComponent } from "./DegreePlanComponent";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import { Plan } from "./interfaces/plan";
import courses from "./data/courses.json";
import semesters from "./data/semesters.json";
import plans from "./data/degreePlans.json";
import { Row, Col, Container } from "react-bootstrap";
import { DegreePlansListComponent } from "./DegreePlansListComponent";
const COURSES = courses as Course[];
const SEMESTERS = semesters as Semester[];
const PLANS = plans as Plan[];

function App(): JSX.Element {
    const [planView, changePlanView] = useState<Plan | null>(PLANS[0]);

    function updatePlanView(newPlan: Plan): void {
        if (newPlan === planView) {
            changePlanView(null);
        } else {
            changePlanView(newPlan);
        }
    }

    return (
        <div className="App">
            <header className="App-header">Scheduler (Team 10)</header>
            <Row
                style={{
                    padding: "10px"
                }}
            >
                <Col>
                    <DegreePlansListComponent
                        degreePlans={PLANS}
                        updatePlanView={updatePlanView}
                    ></DegreePlansListComponent>
                </Col>
                <Col className="degreePlan">
                    {planView !== null ? (
                        // <Row>
                        <DegreePlanComponent
                            degreePlan={planView}
                        ></DegreePlanComponent>
                    ) : (
                        // </Row>
                        <Container
                            style={{
                                border: "1px solid black",
                                padding: "20px"
                            }}
                        >
                            No Degree Plan Selected
                        </Container>
                    )}
                </Col>
                <Col></Col>
            </Row>
            <p>Katie Hoyt, Vedant Subramanian, Evelyn Welsh</p>
        </div>
    );
}

export default App;
