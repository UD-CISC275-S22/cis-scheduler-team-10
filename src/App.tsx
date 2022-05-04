import React, { useState } from "react";
import "./App.css";
import { DegreePlanComponent } from "./DegreePlanComponent";
import { Plan } from "./interfaces/plan";
import plans from "./data/degreePlans.json";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Catalog } from "./interfaces/catalog";
import catalog from "./data/catalog.json";
import { Typeahead } from "react-bootstrap-typeahead";
import { DegreePlansListComponent } from "./DegreePlansListComponent";
import { Semester } from "./interfaces/semester";
import { CoursePoolComponent } from "./CoursePoolComponent";
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
    const [coursePool, changeCoursePool] = useState<Course[]>([]);

    function updateCoursePool(newCourse: Course): void {
        let newPool = [...coursePool];
        if (coursePool.includes(newCourse)) {
            newPool = newPool.filter(
                (course: Course): boolean => course !== newCourse
            );
        } else {
            newPool = [...newPool, newCourse];
        }
        changeCoursePool(newPool);
    }

    function updateSemesters(
        newSemester: Semester,
        oldSemester: Semester,
        currentPlan: Plan
    ): void {
        console.log("in update semesters");
        // console.log(newSemester);
        // console.log(oldSemester);
        const newSemesters = currentPlan.semesters.map((semester: Semester) => {
            if (
                semester.season + semester.semesterName ===
                oldSemester.season + oldSemester.semesterName
            ) {
                console.log("newsem found");
                return newSemester;
            } else {
                return {
                    ...semester,
                    coursesTaken: [...semester.coursesTaken]
                };
            }
        });
        console.log(newSemesters);

        //from addcourse
        // updateSem(newSemester);
        changePlan({ ...plan, semesters: newSemesters });
        const newPlan = { ...plan, semesters: newSemesters };
        updatePlans(newPlan, plan);

        // not from addcourse
        // console.log("NEW SEMESTERS AFTER ADDING");
        // console.log(newSemesters);
        // const newPlan = { ...currentPlan, semesters: newSemesters };
        // console.log("now new plan should include course");
        // console.log(newPlan);
        // updatePlan(newPlan);
        // changeDegPlanSems(newSemesters);
        // updatePlans(newPlan, plan); //currentPlan
        // updatePlanView(newPlan);

        console.log("back in updateSems");
        console.log(plan);
        console.log(allPlans);

        // console.log(allPlans);
    }

    function chooseCourse(): void {
        setCourseSearch(courseSearch);
    }

    function updatePlan(newPlan: Plan) {
        const planSems = newPlan.semesters.map((sem: Semester): Semester => {
            return { ...sem, coursesTaken: [...sem.coursesTaken] };
        });
        console.log("does this include the courses? planSems");
        console.log(planSems);
        const planToChange = { ...newPlan, semesters: planSems };
        // console.log("plan to change");
        // console.log(planToChange);
        // changePlan(planToChange);
        changePlanView(planToChange);

        //  changeDegPlanSems(newPlan.semesters);
        //  changePlan(newPlan);

        console.log("the plan state should also include the course");
        console.log(plan);
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
        if (newPlan === planView) {
            changePlanView(null);
        } else {
            changePlanView(newPlan);
            console.log("planview");
            console.log(planView);
            console.log(plan);
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
                            coursePool={coursePool}
                            updateCoursePool={updateCoursePool}
                            changePlan={updatePlan}
                            addSemester={addSemester}
                            removeSemester={removeSemester}
                            updateSemesters={updateSemesters}
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
                    <CoursePoolComponent
                        coursePool={coursePool}
                        updateCoursePool={updateCoursePool}
                        currentPlan={plan}
                        updateSemesters={updateSemesters}
                    ></CoursePoolComponent>
                </Col>
            </Row>
            <p>Katie Hoyt, Vedant Subramanian, Evelyn Welsh</p>
        </div>
    );
}

export default App;
