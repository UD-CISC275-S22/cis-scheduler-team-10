import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Plan } from "./interfaces/plan";

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
    const [editing, changeEditing] = useState<boolean>(false);
    const [addPlanPopUp, showAddPlanPopUp] = useState<boolean>(false);

    function save() {
        addPlan(planName);
        showAddPlanPopUp(false);
        setPlanName("Insert Name Here");
    }
    function cancel() {
        showAddPlanPopUp(false);
        setPlanName("Insert Name Here");
    }

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
                    data-testid={"add-plan"}
                    onClick={() => showAddPlanPopUp(true)}
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
                            data-testid="planName"
                            onClick={() => updatePlanView(plan)}
                        >
                            {plan.name}
                        </Col>
                        <Col>
                            {editing ? (
                                <Button
                                    onClick={() => removePlan(plan.name)}
                                    data-testid={"remove-plan"}
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
            <Modal show={addPlanPopUp} onHide={() => showAddPlanPopUp(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Add A New Degree Plan
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formPlanName" as={Row}>
                        <Col>
                            <Form.Control
                                style={{ justifyContent: "center" }}
                                value={planName}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setPlanName(event.target.value)}
                            />
                        </Col>
                        <Col>
                            <Button
                                data-testid={"save-plan"}
                                onClick={save}
                                variant="success"
                                className="me-4"
                            >
                                Save
                            </Button>
                            <Button
                                data-testid={"cancel-new-plan"}
                                onClick={cancel}
                                variant="warning"
                                className="me-4"
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Form.Group>
                </Modal.Body>
            </Modal>
            <Button
                onClick={() => changeEditing(!editing)}
                data-testid={"remove-plan-bool"}
                variant="danger"
                className="me-4"
            >
                Remove
            </Button>
        </div>
    );
}
