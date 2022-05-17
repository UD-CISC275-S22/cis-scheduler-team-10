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
import { Catalog } from "./interfaces/catalog";
export function DegreePlanComponent({
    degreePlan,
    updatePlans,
    addSemester,
    removeSemester,
    courses,
    content
}: {
    degreePlan: Plan;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    addSemester: (plan: Plan, semName: string, semSeason: string) => void;
    removeSemester: (plan: Plan, semName: string) => void;
    courses: string[];
    content: Catalog[];
}): JSX.Element {
    const [semSeason, changeSemSeason] = useState<string>("Fall");
    const [semYear, changeSemYear] = useState<string>("");
    const [addSem, changeAddSem] = useState<boolean>(false);
    const [invalidYear, updateInvalidYear] = useState<boolean>(false);
    const [removing, changeRemoving] = useState<boolean>(false);
    const [copiedSemester, updateCopiedSemester] = useState<boolean>(false);

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
        const newPlan = {
            ...degreePlan,
            semesters: [...degreePlan.semesters, newSem]
        };
        updatePlans(newPlan, degreePlan);
    }

    function resetSemester(s: Semester): void {
        const newSems = degreePlan.semesters.map((sem: Semester) => {
            if (sem.season + sem.semesterName === s.season + s.semesterName) {
                return { ...sem, coursesTaken: [] };
            } else {
                return { ...sem };
            }
        });
        const newPlan = { ...degreePlan, semesters: newSems };
        updatePlans(newPlan, degreePlan);
    }

    function save() {
        if (
            degreePlan.semesters.find(
                (semester: Semester) =>
                    semSeason + semYear ===
                    semester.season + semester.semesterName
            ) === undefined
        ) {
            updateCopiedSemester(false);
            if (
                semYear.length === 4 &&
                parseInt(semYear) >= 1900 &&
                parseInt(semYear) <= 2100
            ) {
                updateInvalidYear(false);
                updateSemList();
                addSemester(degreePlan, semYear, semSeason);
                changeAddSem(!addSem);
                changeSemYear("");
            } else {
                updateInvalidYear(true);
            }
        } else {
            updateInvalidYear(false);
            updateCopiedSemester(true);
        }
    }

    function updateSemSeason(event: React.ChangeEvent<HTMLSelectElement>) {
        changeSemSeason(event.target.value);
    }

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
                    <Button
                        data-testid="createNewSem"
                        onClick={() => changeAddSem(!addSem)}
                    >
                        Create New Semester
                    </Button>
                    <Button
                        data-testid="removeSemOption"
                        variant="danger"
                        onClick={() => changeRemoving(!removing)}
                    >
                        Remove Semester
                    </Button>
                </ButtonGroup>
                {addSem ? (
                    <div>
                        <Form.Group
                            data-testid="semSeasonInsert"
                            controlId="semSeasonsInsert"
                        >
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
                        <Form.Group
                            data-testid="formSemesterName"
                            controlId="formSemesterName"
                        >
                            <Form.Label>Semester Year:</Form.Label>
                            <Form.Control
                                value={semYear}
                                onChange={updateSemName}
                            />
                        </Form.Group>
                        {invalidYear && (
                            <span style={{ color: "red" }}>
                                Please enter a valid year.
                            </span>
                        )}
                        {copiedSemester && (
                            <span style={{ color: "red" }}>
                                This semester has already been added to the
                                plan.
                            </span>
                        )}
                        <div style={{ padding: "2px" }}>
                            <Button
                                data-testid="saveSemButton"
                                variant="success"
                                onClick={save}
                            >
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
                            <div
                                key={degreePlan + sem.season + sem.semesterName}
                                data-testid="semester"
                            >
                                <SemesterComponent
                                    plan={degreePlan}
                                    semester={sem}
                                    // updateSemesters={updateSemesters}
                                    removing={removing}
                                    removeSemester={removeSemester}
                                    resetSemester={resetSemester}
                                    updatePlans={updatePlans}
                                    courses={courses}
                                    content={content}
                                ></SemesterComponent>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    );
}
