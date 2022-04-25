import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";
import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

export function DegreePlanComponent({
    degreePlan,
    updatePlans,
    degPlanSems,
    changeDegPlanSems,
    changePlan,
    addSemester,
    removeSemester
}: {
    degreePlan: Plan;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    degPlanSems: Semester[];
    changeDegPlanSems: (sems: Semester[]) => void;
    changePlan: (plan: Plan) => void;
    addSemester: (
        sems: Semester[],
        plan: Plan,
        semName: string,
        semSeason: string
    ) => void;
    removeSemester: (semName: string) => void;
}): JSX.Element {
    const [semSeason, changeSemSeason] = useState<string>("Fall");
    const [semName, changeSemName] = useState<string>("Insert Name Here");
    const [addSem, changeAddSem] = useState<boolean>(false);
    const [semList, changeSemList] = useState<Semester[]>(degPlanSems);
    const [removing, changeRemoving] = useState<boolean>(false);
    //const [plan, updatePlan] = useState<Plan>(degreePlan);

    function updateSemesters(
        newSemester: Semester,
        oldSemester: Semester
    ): void {
        const newSemesters = degreePlan.semesters.map((semester: Semester) => {
            if (semester === oldSemester) {
                return newSemester;
            } else {
                return {
                    ...semester,
                    coursesTaken: [...semester.coursesTaken]
                };
            }
        });
        const newPlan = { ...degreePlan, semesters: newSemesters };
        updatePlans(newPlan, degreePlan);
        changePlan(newPlan);
    }

    function save() {
        changeSemList(degreePlan.semesters);
        changeDegPlanSems(semList);
        addSemester(semList, degreePlan, semName, semSeason);
        changeAddSem(!addSem);
        changeSemName("Insert Name Here");
    }

    function updateSemSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        changeSemSeason(event.target.value);
    }
    function updateSemName(event: React.ChangeEvent<HTMLInputElement>) {
        changeSemName(event.target.value);
    }

    return (
        <div style={{ border: "1px solid black", padding: "20px" }}>
            <Container style={{ border: "1px solid black" }}>
                {degreePlan.name.toUpperCase()} DEGREE PLAN
            </Container>

            <div style={{ padding: "5px" }}>
                <ButtonGroup>
                    <Button onClick={() => changeAddSem(!addSem)}>
                        Create New Semester
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => changeRemoving(!removing)}
                    >
                        Remove Semester
                    </Button>
                </ButtonGroup>
                {addSem ? (
                    <div>
                        <Form.Group controlId="semSeasonsInsert">
                            <Form.Label>Add Semester by Season</Form.Label>
                            <Form.Select
                                value={semSeason}
                                onChange={updateSemSeason}
                            >
                                <option value="fall">Fall</option>
                                <option value="spring">Spring</option>
                                <option value="winter">Winter</option>
                                <option value="summer1">Summer I</option>
                                <option value="summer2">Summer II</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formSemesterName">
                            <Form.Label>New Semester Name:</Form.Label>
                            <Form.Control
                                value={semName}
                                onChange={updateSemName}
                            />
                        </Form.Group>
                        <div style={{ padding: "2px" }}>
                            <Button variant="success" onClick={save}>
                                Save Semester
                            </Button>
                        </div>
                    </div>
                ) : (
                    <span></span>
                )}
            </div>

            <div style={{ padding: "5px" }}>
                <Row>
                    <Col>
                        {degreePlan.semesters.map((sem: Semester) => (
                            <div key={sem.semesterName} data-testid="semester">
                                <SemesterComponent
                                    semester={sem}
                                    updateSemesters={updateSemesters}
                                    removing={removing}
                                    removeSemester={removeSemester}
                                ></SemesterComponent>
                                {/* <Col key={sem.semesterName}>
                                    {removing ? (
                                        <Button
                                            onClick={() =>
                                                removeSemester(sem.semesterName)
                                            }
                                            variant="danger"
                                            className="me-4"
                                        >
                                            Remove Semester
                                        </Button>
                                    ) : (
                                        <span></span>
                                    )}
                                </Col> */}
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    );
}
