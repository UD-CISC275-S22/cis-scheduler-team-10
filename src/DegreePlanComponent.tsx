import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";
import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
// import { Course } from "./interfaces/course";

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
    const [semYear, changeSemYear] = useState<string>("");
    const [addSem, changeAddSem] = useState<boolean>(false);
    const [semList, changeSemList] = useState<Semester[]>(degPlanSems);
    const [plan, updatePlan] = useState<Plan>(degreePlan);
    const [invalid, updateInvalid] = useState<boolean>(false);
    const [removing, changeRemoving] = useState<boolean>(false);

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
        const newPlan = { ...plan, semesters: newSemesters };
        updatePlans(newPlan, plan);
        updatePlan(newPlan);
    }

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
        const newPlan = { ...degreePlan, semesters: [...newSemList] };
        updatePlans(newPlan, degreePlan);
        changePlan(newPlan);
    }

    function reset(s: Semester): void {
        const newSems = degPlanSems.map((sem: Semester) => {
            if (sem.semesterName === s.semesterName) {
                return { ...sem, coursesTaken: [] };
            } else {
                return { ...sem };
            }
        });
        changeDegPlanSems(newSems);
    }

    function save() {
        if (semYear.length === 4 && parseInt(semYear) >= 2000) {
            updateInvalid(false);
            updateSemList();
            changeSemList(degreePlan.semesters);
            changeDegPlanSems(semList);
            addSemester(semList, degreePlan, semYear, semSeason);
            changeAddSem(!addSem);
            changeSemYear("");
        } else {
            updateInvalid(true);
        }
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
                        {/* {degreePlan.semesters.map((sem: Semester) => ( */}
                        {degPlanSems.map((sem: Semester) => (
                            <div
                                key={degreePlan + sem.season + sem.semesterName}
                                data-testid="semester"
                            >
                                <SemesterComponent
                                    semester={sem}
                                    updateSemesters={updateSemesters}
                                    removing={removing}
                                    removeSemester={removeSemester}
                                    reset={reset}
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
