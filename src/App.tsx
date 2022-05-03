import React, { useState } from "react";
import "./App.css";
import { DegreePlanComponent } from "./DegreePlanComponent";
import { Plan } from "./interfaces/plan";
import plans from "./data/degreePlans.json";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
// import { Course } from "./interfaces/course";
import { Catalog } from "./interfaces/catalog";
import catalog from "./data/catalog.json";
import { Typeahead } from "react-bootstrap-typeahead";
import { DegreePlansListComponent } from "./DegreePlansListComponent";
import { Semester } from "./interfaces/semester";
const PLANS = plans as Plan[];

const filler = Object.values(catalog);
let courses: string[] = [];
for (let i = 0; i < filler.length; i++) {
    courses = [...courses, ...Object.keys(filler[i])];
}

let content: Catalog[] = [];
for (let i = 0; i < filler.length; i++) {
    content = [...content, ...Object.values(filler[i])];
}
// const COURSES = content.map(
//     (c: Catalog): Course => ({
//         courseCode: c.code,
//         courseTitle: c.name,
//         numCredits: parseInt(c.credits),
//         preReqs: /*temporary fix*/ [c.preReq],
//         courseDescription: c.descr,
//         complete: false,
//         required: false,
//         requirementType: /*c.breadth*/ "university"
//     })
// );

export function App(): JSX.Element {
    const [planView, changePlanView] = useState<Plan | null>(null);
    const [allPlans, changeAllPlans] = useState<Plan[]>(PLANS);
    const [plan, changePlan] = useState<Plan>(PLANS[0]);
    const [degPlanSems, changeDegPlanSems] = useState<Semester[]>(
        plan.semesters
    );
    const [courseSearch, setCourseSearch] = useState<string[]>();

    function chooseCourse(): void {
        setCourseSearch(courseSearch);
    }

    function updatePlan(plan: Plan) {
        changePlan(plan);
        changePlanView(plan);
    }
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
        const newPlans = allPlans.map((plan: Plan) => {
            if (plan.name === oldPlan.name) {
                return { ...newPlan };
            } else {
                return { ...plan };
            }
        });
        changeAllPlans(newPlans);
        //changePlan(newPlan);
        updatePlanView(newPlan);
    }
    function updatePlanView(newPlan: Plan): void {
        changeDegPlanSems(newPlan.semesters);

        changePlan(newPlan);
        //updatePlans(newPlan, plan);
        //

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

    function removePlan(planName: string): void {
        changeAllPlans(
            allPlans.filter((p: Plan): boolean => p.name !== planName)
        );
        if (planView !== null && planName === planView.name) {
            changePlanView(null);
        }
    }
    function removeSemester(semName: string): void {
        const newSems = degPlanSems.filter(
            (s: Semester): boolean => s.semesterName !== semName
        );
        //changeDegPlanSems(newSems);
        const newPlan = { ...plan, semesters: newSems };
        changePlan(newPlan);
        updatePlans(newPlan, plan);
        updatePlanView(newPlan);
    }
    function addSemester(
        sems: Semester[],
        plan: Plan,
        semName: string,
        semSeason: string
    ): void {
        changePlan(plan);
        //changeDegPlanSems(sems);
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
        const newSems = [...degPlanSems, newSem];
        const newPlan = { ...plan, semesters: newSems };
        updatePlans(newPlan, plan);
        // changeDegPlanSems(newSems);

        //
        updatePlanView(newPlan);
    }
    // function addCourse(crsID: string, semester: Semester, plan: Plan) {
    //     //changeSem(semester);

    //     changePlan(plan);
    //     const newCourse: Course = {
    //         courseCode: crsID,
    //         courseTitle: "",
    //         numCredits: 0,
    //         preReqs: [],
    //         courseDescription: "",
    //         complete: true,
    //         required: true,
    //         requirementType: "university"
    //     };
    //     const newCourses = [...courses, newCourse];
    //     changeCourses(newCourses);
    //     const newSem = { ...semester, coursesTaken: newCourses };
    //     //const newSems = [...degPlanSems, newSem];
    //     const newSems = degPlanSems.map((sem: Semester) => {
    //         if (sem === semester) {
    //             return { ...newSem };
    //         } else {
    //             return { ...sem };
    //         }
    //     });
    //     changeDegPlanSems(newSems);
    //     const newPlan = { ...plan, semesters: newSems };

    //     //changeDegPlanSems(newSems);
    //     updatePlans(newPlan, plan);
    //     updatePlanView(newPlan);
    // }
    return (
        <div className="App">
            <header className="App-header">Scheduler (Team 10)</header>
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
                        degPlanSems={degPlanSems}
                        changeDegPlanSems={changeDegPlanSems}
                        removePlan={removePlan}
                    ></DegreePlansListComponent>
                </Col>
                <Col className="degreePlan" data-testid="degreePlan">
                    {planView !== null ? (
                        <DegreePlanComponent
                            data-testid="degreePlan"
                            degreePlan={planView}
                            degPlanSems={degPlanSems}
                            updatePlans={updatePlans}
                            changeDegPlanSems={changeDegPlanSems}
                            changePlan={updatePlan}
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
                                path to graduation. To begin, select a
                                previously-made degree plan, or create a new
                                plan. Add your desired courses into the
                                semesters you plan to take them, keeping your
                                degree requirements in mind. You can edit each
                                semester until you are satisfied with its
                                contents. You can also make multiple degree
                                plans to explore other combinations of classes
                                to fulfill all of your requirements.
                            </Container>
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
                    <Form.Group>
                        <Form.Label>Select Course</Form.Label>
                        <Typeahead
                            id="basic-typeahead-single"
                            labelKey="course-name"
                            onChange={chooseCourse}
                            options={courses}
                            placeholder="Course Search..."
                            selected={courseSearch}
                        ></Typeahead>
                    </Form.Group>
                </Col>
            </Row>
            <p>Katie Hoyt, Vedant Subramanian, Evelyn Welsh</p>
        </div>
    );
}

export default App;
