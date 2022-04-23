import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

export function DegreePlanComponent({
    degreePlan,
    updatePlans,
    degPlanSems,
    changeDegPlanSems,
    changePlan
}: {
    degreePlan: Plan;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    degPlanSems: Semester[];
    changeDegPlanSems: (sems: Semester[]) => void;
    changePlan: (plan: Plan) => void;
}): JSX.Element {
    const [semSeason, changeSemSeason] = useState<string>("Fall");
    const [semYear, changeSemYear] = useState<string>("");
    const [addSem, changeAddSem] = useState<boolean>(false);
    const [semList, changeSemList] = useState<Semester[]>(degPlanSems);
    const [plan, updatePlan] = useState<Plan>(degreePlan);
    const [invalid, updateInvalid] = useState<boolean>(false);

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

    function save() {
        if (semYear.length === 4 && parseInt(semYear) >= 2000) {
            updateInvalid(false);
            updateSemList();
            changeAddSem(!addSem);
            changeSemYear("");
        } else {
            updateInvalid(true);
        }
    }
    // function updateSems(newSem: Semester, oldSem: Semester): void {
    //     //changeDegPlanSems(newPlan.semesters);
    //     const newSems = degPlanSems.map((sem: Semester) => {
    //         if (sem === oldSem) {
    //             return { ...newSem };
    //         } else {
    //             return { ...sem };
    //         }
    //     });
    //     changeDegPlanSems(newSems);
    // }
    function updateSemList() {
        let numCredits = 0;
        if (semSeason === "fall" || semSeason === "spring") {
            numCredits = 18;
        } else {
            numCredits = 7;
        }
        const newSem: Semester = {
            semesterName: semYear,
            active: true,
            creditLimit: numCredits,
            season: semSeason,
            coursesTaken: []
        };
        const newSemList = [...semList, newSem];
        //updateSems(newSem, degPlanSems);
        changeSemList(newSemList);
        changeDegPlanSems(newSemList);
        const newPlan = { ...degreePlan, semesters: newSemList };
        //newPlan.semesters = newSemList;
        updatePlans(newPlan, degreePlan);
        changePlan(newPlan);
    }
    function updateSemSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        changeSemSeason(event.target.value);
    }

    //^(19|20)\d{2}$
    // /^[0-9\b]+$/
    function updateSemName(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            /^[0-9\b]+$/.test(event.target.value) ||
            event.target.value === ""
        ) {
            changeSemYear(event.target.value);
        }
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
                            <Form.Label>Add Semester by Season:</Form.Label>
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
                            <Form.Label>Semester Year:</Form.Label>
                            <Form.Control
                                value={semYear}
                                onChange={updateSemName}
                                // type={"number"}
                            />
                        </Form.Group>
                        {invalid && (
                            <span style={{ color: "red" }}>
                                Please enter a valid year after 2000.
                            </span>
                        )}
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
                        {degreePlan.semesters.map((sem: Semester) => (
                            <div key={sem.semesterName} data-testid="semester">
                                <SemesterComponent
                                    semester={sem}
                                    updateSemesters={updateSemesters}
                                ></SemesterComponent>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    );
}
