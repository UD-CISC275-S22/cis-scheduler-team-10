import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
//import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

function InsertPlan({
    planName,
    setPlanName,
    addPlan,
    adding,
    changeAdding
}: {
    planName: string;
    setPlanName: (name: string) => void;
    addPlan: (newPlanName: string) => void;
    adding: boolean;
    changeAdding: (adding: boolean) => void;
}): JSX.Element {
    function save() {
        addPlan(planName);
        changeAdding(!adding);
        setPlanName("Insert Name Here");
    }
    function cancel() {
        changeAdding(!adding);
        setPlanName("Insert Name Here");
    }
    return (
        <Form.Group controlId="formPlanName" as={Row}>
            <Col>
                <Form.Control
                    style={{ justifyContent: "center" }}
                    value={planName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPlanName(event.target.value)
                    }
                />
            </Col>
            <Col>
                <Button onClick={save} variant="success" className="me-4">
                    Save
                </Button>
                <Button onClick={cancel} variant="warning" className="me-4">
                    Cancel
                </Button>
            </Col>
        </Form.Group>
    );
}

export function DegreePlansListComponent({
    degreePlans,
    updatePlanView,
    addPlan,
    removePlan
}: {
    degreePlans: Plan[];
    updatePlanView: (plan: Plan) => void;
    addPlan: (newPlanName: string) => void;
    removePlan: (planName: string) => void;
}): JSX.Element {
    const [planName, setPlanName] = useState<string>("Insert Name Here");
    const [adding, changeAdding] = useState<boolean>(false);
    const [editing, changeEditing] = useState<boolean>(false);
    // const [plan, changePLan] = useState<Plan>(degreePlans[0]);
    return (
        <div
            className="degreePlansList"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            Select a Degree Plan:
            {editing ? (
                <span></span>
            ) : (
                <Button
                    onClick={() => changeAdding(!adding)}
                    variant="success"
                    className="me-4"
                >
                    +
                </Button>
            )}
            {degreePlans.map((plan: Plan) => {
                return (
                    <Row key={plan.name}>
                        <Col
                            // key={plan.name}
                            onClick={() => updatePlanView(plan)}
                        >
                            {plan.name}
                        </Col>
                        <Col>
                            {/* // key={plan.name} */}
                            {editing ? (
                                <Button
                                    onClick={() => removePlan(plan.name)}
                                    variant="danger"
                                    className="me-4"
                                >
                                    -
                                </Button>
                            ) : (
                                <span></span>
                            )}
                        </Col>
                    </Row>
                );
            })}
            {adding ? (
                <InsertPlan
                    planName={planName}
                    setPlanName={setPlanName}
                    addPlan={addPlan}
                    adding={adding}
                    changeAdding={changeAdding}
                ></InsertPlan>
            ) : (
                <Button
                    onClick={() => changeEditing(!editing)}
                    variant="danger"
                    className="me-4"
                >
                    Remove
                </Button>
            )}
        </div>
    );
}
