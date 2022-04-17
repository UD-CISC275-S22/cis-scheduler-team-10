import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

export function DegreePlanComponent({
    degreePlan,
    degPlanSems,
    updatePlans,
    changeDegPlanSems
}: {
    degreePlan: Plan;
    degPlanSems: Semester[];
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    changeDegPlanSems: (sems: Semester[]) => void;
}): JSX.Element {
    const [semSeason, changeSemSeason] = useState<string>("Fall");
    const [semName, changeSemName] = useState<string>("Insert Name Here");
    const [addSem, changeAddSem] = useState<boolean>(false);
    const [semList, changeSemList] = useState<Semester[]>(degPlanSems);
    const [plan, updatePlan] = useState<Plan>(degreePlan);
    // const [semView, changeSemView] = useState<Semester | null>(
    //     degreePlan.semesters[0]
    // );
    function save() {
        updateSemList();
        changeAddSem(!addSem);
        changeSemName("Insert Name Here");

        //updatePlanView(degreePlan);
    }
    // function updateSemView(newSem: Semester): void {
    //     if (newSem === semView) {
    //         changeSemView(null);
    //     } else {
    //         changeSemView(newSem);
    //     }
    // }
    function updateSemesters(
        newSemester: Semester,
        oldSemester: Semester
    ): void {
        const newSemesters = plan.semesters.map((semester: Semester) => {
            if (semester === oldSemester) {
                return newSemester;
            } else {
                return {
                    ...semester,
                    coursesTaken: [...semester.coursesTaken]
                };
            }
        });
        const newPlan = { ...plan, semesters: newSemesters };
        updatePlans(newPlan, plan);
        updatePlan(newPlan);
    }
    function updateSemList() {
        let numCredits = 0;
        semSeason === "fall" || semSeason === "spring"
            ? (numCredits = 18)
            : (numCredits = 7);
        const newSem: Semester = {
            semesterName: semName,
            active: true,
            creditLimit: numCredits,
            season: semSeason,
            coursesTaken: []
        };
        const newSemList = [...semList, newSem];
        changeSemList(newSemList);
        changeDegPlanSems(newSemList);
        const newPlan = { ...plan, semesters: semList };
        newPlan.semesters = newSemList;
        updatePlans(newPlan, plan);
        updatePlan(newPlan);
    }
    function updateSemSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        changeSemSeason(event.target.value);
    }
    function updateSemName(event: React.ChangeEvent<HTMLInputElement>) {
        changeSemName(event.target.value);
    }
    return (
        <div
            // className="degreePlan"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            <Container style={{ border: "1px solid black" }}>
                {degreePlan.name.toUpperCase()} DEGREE PLAN
            </Container>

            <div style={{ padding: "5px" }}>
                <Button onClick={() => changeAddSem(!addSem)}>
                    Create New Semester
                </Button>
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
                            <Button onClick={save}>Save Semester</Button>
                        </div>
                    </div>
                ) : (
                    <span></span>
                )}
            </div>
            <div style={{ padding: "5px" }}>
                <Row>
                    <Col>
                        {degPlanSems.map((sem: Semester) => (
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
