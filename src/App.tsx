import React, { useState } from "react";
import "./App.css";
import { DegreePlanComponent } from "./DegreePlanComponent";
import { Plan } from "./interfaces/plan";
import plans from "./data/degreePlans.json";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Catalog } from "./interfaces/catalog";
import catalog from "./data/catalog.json";
import { DegreePlansListComponent } from "./DegreePlansListComponent";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
const PLANS = plans as Plan[];

declare global {
    interface Navigator {
        msSaveBlob?: (blob: Blob, defaultName?: string) => boolean;
    }
}

let loadedData = PLANS;
const saveDataKey = "My-Plan-Data";
const previousData = localStorage.getItem(saveDataKey);
if (previousData !== null) {
    loadedData = JSON.parse(previousData);
}

const filler = Object.values(catalog);
let courses: string[] = [];
for (let i = 0; i < filler.length; i++) {
    courses = [...courses, ...Object.keys(filler[i])];
}

let content: Catalog[] = [];
for (let i = 0; i < filler.length; i++) {
    content = [...content, ...Object.values(filler[i])];
}

export function App(): JSX.Element {
    const [planView, changePlanView] = useState<Plan | null>(null);
    const [allPlans, changeAllPlans] = useState<Plan[]>(loadedData);

    function saveData() {
        localStorage.setItem(saveDataKey, JSON.stringify(allPlans));
    }

    function exportToCSV(fileName: string, mimeType: string) {
        let csvContentHeader = "Semester;";
        let csvContentBody = "";
        let longestCoursesLength =
            planView?.semesters[0].coursesTaken.length ?? 0;
        planView?.semesters.forEach(
            (semester: Semester, semesterIndex: number) => {
                let coursesData =
                    semester.season.toUpperCase() + semester.semesterName + ";";

                semester.coursesTaken.forEach(
                    (course: Course, courseIndex: number) => {
                        coursesData += course.courseCode + ";";
                        if (semesterIndex === 0) {
                            csvContentHeader +=
                                "Course " + (courseIndex + 1) + ";";
                        } else if (courseIndex >= longestCoursesLength) {
                            longestCoursesLength = courseIndex + 1;
                            csvContentHeader +=
                                "Course " + (courseIndex + 1) + ";";
                        }
                    }
                );
                csvContentBody +=
                    semesterIndex < planView.semesters.length
                        ? coursesData + "\n"
                        : coursesData;
            }
        );
        const csvContent = csvContentHeader + "\n" + csvContentBody;

        const a = document.createElement("a");
        mimeType = mimeType || "application/octet-stream";

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(
                new Blob([csvContent], {
                    type: mimeType
                }),
                fileName
            );
        } else if (URL && "download" in a) {
            a.href = URL.createObjectURL(
                new Blob([csvContent], {
                    type: mimeType
                })
            );
            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href =
                "data:application/octet-stream," +
                encodeURIComponent(csvContent); // only this mime type is supported
        }
    }
    function reset(p: Plan): void {
        const newPlans = allPlans.map((plan: Plan) => {
            if (plan.name === p.name) {
                return { name: p.name, semesters: [] };
            } else {
                return { ...plan };
            }
        });
        changeAllPlans(newPlans);
        updatePlanView({ name: p.name, semesters: [] });
    }
    function updatePlans(newPlan: Plan, oldPlan: Plan): void {
        const newPlans = allPlans.map((plan: Plan) => {
            if (plan.name === oldPlan.name) {
                return { ...newPlan };
            } else {
                return { ...plan };
            }
        });
        changeAllPlans(newPlans);
        updatePlanView(newPlan);
    }
    function updatePlanView(newPlan: Plan): void {
        if (newPlan === planView) {
            changePlanView(null);
        } else {
            changePlanView(newPlan);
        }
    }

    function addPlan(newPlanName: string): void {
        const index = allPlans.findIndex(
            (p: Plan): boolean => p.name === newPlanName
        );
        if (index === -1) {
            const newPlan: Plan = { name: newPlanName, semesters: [] };
            changeAllPlans([...allPlans, newPlan]);
        }
    }

    function removePlan(planName: string): void {
        changeAllPlans(
            allPlans.filter((p: Plan): boolean => p.name !== planName)
        );
        if (planView !== null && planName === planView.name) {
            changePlanView(null);
        }
    }
    function removeSemester(plan: Plan, semName: string): void {
        const index = allPlans.findIndex(
            (p: Plan): boolean => p.name === plan.name
        );
        const newSems = allPlans[index].semesters.filter(
            (s: Semester): boolean => s.semesterName !== semName
        );
        const newPlan = { ...plan, semesters: newSems };
        updatePlans(newPlan, plan);
        updatePlanView(newPlan);
    }
    function addSemester(plan: Plan, semName: string, semSeason: string): void {
        let numCredits = 0;
        if (semSeason === "fall" || semSeason === "spring") {
            numCredits = 18;
        } else {
            numCredits = 7;
        }
        const newSem: Semester = {
            semesterName: semName,
            active: true,
            creditLimit: numCredits,
            season: semSeason,
            coursesTaken: []
        };
        const newSems = [...plan.semesters, newSem];
        const newPlan = { ...plan, semesters: newSems };
        updatePlans(newPlan, plan);
        updatePlanView(newPlan);
    }

    return (
        <div className="App">
            <header className="App-header">
                Scheduler (Team 10)
                <Button onClick={saveData}>Save Data</Button>
            </header>
            <Row
                style={{
                    padding: "10px"
                }}
            >
                <Col data-testid="degreePlansList">
                    <DegreePlansListComponent
                        degreePlans={allPlans}
                        updatePlanView={updatePlanView}
                        addPlan={addPlan}
                        removePlan={removePlan}
                    ></DegreePlansListComponent>
                </Col>
                <Col className="degreePlan" data-testid="degreePlan">
                    {planView !== null ? (
                        <DegreePlanComponent
                            data-testid="degreePlan"
                            degreePlan={planView}
                            updatePlans={updatePlans}
                            addSemester={addSemester}
                            removeSemester={removeSemester}
                            courses={courses}
                        ></DegreePlanComponent>
                    ) : (
                        <Container
                            style={{
                                border: "1px solid black",
                                padding: "20px"
                            }}
                        >
                            <div className="intro-header">
                                Welcome to Scheduler!
                            </div>
                            <Container
                                data-testid="welcome"
                                style={{
                                    padding: "20px"
                                }}
                            >
                                This program is intended to help you visualize a
                                path to graduation. To begin, select the title
                                of a previously-made degree plan from the list
                                on the left of your screen, or create a new plan
                                by clicking the + and selecting a name. Add your
                                desired courses into the semesters you plan to
                                take them, keeping your degree requirements in
                                mind. You can edit each semester until you are
                                satisfied with its contents. You can also make
                                multiple degree plans to explore other
                                combinations of classes to fulfill all of your
                                requirements. Click the name of the desired plan
                                to navigate between your degree plans.
                            </Container>
                        </Container>
                    )}
                </Col>
                <Col>
                    {planView === null ? (
                        <span></span>
                    ) : (
                        <Button
                            data-testid="resetSem"
                            onClick={() => reset(planView)}
                            variant="danger"
                            className="me-4"
                        >
                            Reset
                        </Button>
                    )}
                    {planView !== null && (
                        <Button
                            data-testid={"export-plan"}
                            onClick={() => {
                                exportToCSV(
                                    planView.name.replace(/\s/g, "") + ".csv",
                                    "text/csv;encoding:utf-8"
                                );
                            }}
                        >
                            Download Plan
                        </Button>
                    )}
                </Col>
            </Row>
            <p>Katie Hoyt, Vedant Subramanian, Evelyn Welsh</p>
        </div>
    );
}

export default App;
