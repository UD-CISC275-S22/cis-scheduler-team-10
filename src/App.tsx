import React, { useState } from "react";
import "./App.css";
import { DegreePlanComponent } from "./DegreePlanComponent";
//import { Course } from "./interfaces/course";
//import { Semester } from "./interfaces/semester";
import { Plan } from "./interfaces/plan";
//import courses from "./data/courses.json";
//import semesters from "./data/semesters.json";
import plans from "./data/degreePlans.json";
import { Row, Col, Container, Button } from "react-bootstrap";
import { DegreePlansListComponent } from "./DegreePlansListComponent";
import { Semester } from "./interfaces/semester";
//const COURSES = courses as Course[];
//const SEMESTERS = semesters as Semester[];
const PLANS = plans as Plan[];

function App(): JSX.Element {
    const [planView, changePlanView] = useState<Plan | null>(PLANS[0]);
    const [allPlans, changeAllPlans] = useState<Plan[]>(PLANS);
    const [plan, changePlan] = useState<Plan>(PLANS[0]);
    const [degPlanSems, changeDegPlanSems] = useState<Semester[]>(
        plan.semesters
    );
    function reset(p: Plan): void {
        const newPlans = allPlans.map((plan: Plan) => {
            if (plan === p) {
                return { name: p.name, semesters: [] };
            } else {
                return { ...plan };
            }
        });
        changeAllPlans(newPlans);
        updatePlanView({ name: p.name, semesters: [] });
    }
    function updatePlans(newPlan: Plan, oldPlan: Plan): void {
        changeDegPlanSems(newPlan.semesters);
        const newPlans = allPlans.map((plan: Plan) => {
            if (plan === oldPlan) {
                return { ...newPlan };
            } else {
                return { ...plan };
            }
        });
        changeAllPlans(newPlans);
    }
    function updatePlanView(newPlan: Plan): void {
        changeDegPlanSems(newPlan.semesters);
        changePlan(newPlan);
        changeDegPlanSems(degPlanSems);
        if (newPlan === planView) {
            changePlanView(null);
        } else {
            changePlanView(newPlan);
        }
    }

    function addPlan(newPlanName: string): void {
        const newPlan: Plan = { name: newPlanName, semesters: [] };
        changeAllPlans([...allPlans, newPlan]);
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
                        degreePlans={allPlans}
                        updatePlanView={updatePlanView}
                        addPlan={addPlan}
                        degPlanSems={degPlanSems}
                        changeDegPlanSems={changeDegPlanSems}
                    ></DegreePlansListComponent>
                </Col>
                <Col className="degreePlan">
                    {planView !== null ? (
                        <DegreePlanComponent
                            degreePlan={planView}
                            degPlanSems={degPlanSems}
                            updatePlans={updatePlans}
                            changeDegPlanSems={changeDegPlanSems}
                        ></DegreePlanComponent>
                    ) : (
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
                <Col>
                    {planView === null ? (
                        <span></span>
                    ) : (
                        <Button
                            onClick={() => reset(plan)}
                            variant="danger"
                            className="me-4"
                        >
                            Reset
                        </Button>
                    )}
                </Col>
            </Row>
            <p>Katie Hoyt, Vedant Subramanian, Evelyn Welsh</p>
        </div>
    );
}

export default App;
