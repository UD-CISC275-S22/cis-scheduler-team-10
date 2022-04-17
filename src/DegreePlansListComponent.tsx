import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
//import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";

function InsertPlan({
    planName,
    setPlanName,
    addPlan,
    editing,
    changeEditing
}: {
    planName: string;
    setPlanName: (name: string) => void;
    addPlan: (newPlanName: string) => void;
    editing: boolean;
    changeEditing: (editing: boolean) => void;
}): JSX.Element {
    function save() {
        addPlan(planName);
        changeEditing(!editing);
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
            <Button onClick={save} variant="success" className="me-4">
                Save
            </Button>
        </Form.Group>
    );
}

export function DegreePlansListComponent({
    degreePlans,
    updatePlanView,
    addPlan
}: {
    degreePlans: Plan[];
    updatePlanView: (plan: Plan) => void;
    addPlan: (newPlanName: string) => void;
}): JSX.Element {
    const [planName, setPlanName] = useState<string>("Insert Name Here");
    const [editing, changeEditing] = useState<boolean>(false);
    return (
        <div
            className="degreePlansList"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            Select a Degree Plan:
            <Button
                onClick={() => changeEditing(!editing)}
                variant="success"
                className="me-4"
            >
                +
            </Button>
            {degreePlans.map((plan: Plan) => {
                return (
                    <div
                        key={plan.name}
                        data-testid="planName"
                        onClick={() => updatePlanView(plan)}
                    >
                        {plan.name}
                    </div>
                );
            })}
            {editing ? (
                <InsertPlan
                    planName={planName}
                    setPlanName={setPlanName}
                    addPlan={addPlan}
                    editing={editing}
                    changeEditing={changeEditing}
                ></InsertPlan>
            ) : (
                <span></span>
            )}
        </div>
    );
}
