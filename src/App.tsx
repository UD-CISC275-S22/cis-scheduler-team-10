import React, { useState } from "react";
import "./App.css";
import { DegreePlanComponent } from "./DegreePlanComponent";
import { Course } from "./interfaces/course";
//import { Semester } from "./interfaces/semester";
import { Plan } from "./interfaces/plan";
import { Catalog } from "./interfaces/catalog";
import catalog from "./data/catalog.json";
//import courses from "./data/courses.json";
//import semesters from "./data/semesters.json";
import plans from "./data/degreePlans.json";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { DegreePlansListComponent } from "./DegreePlansListComponent";
//const COURSES = courses as Course[];
//const SEMESTERS = semesters as Semester[];
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
const COURSES = content.map(
    (c: Catalog): Course => ({
        courseCode: c.code,
        courseTitle: c.name,
        numCredits: parseInt(c.credits),
        preReqs: /*temporary fix*/ [c.preReq],
        courseDescription: c.descr,
        complete: false,
        required: false,
        requirementType: /*c.breadth*/ "university"
    })
);

// console.log(COURSES);

function App(): JSX.Element {
    const [planView, changePlanView] = useState<Plan | null>(PLANS[0]);
    const [allPlans, changeAllPlans] = useState<Plan[]>(PLANS);
    const [courseSearch, setCourseSearch] = useState<string[]>();

    function chooseCourse(): void {
        setCourseSearch(courseSearch);
    }

    function updatePlanView(newPlan: Plan): void {
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

    return (
        <div className="App">
            <header className="App-header">Scheduler (Team 10)</header>
            <Row
                style={{
                    padding: "10px"
                }}
            >
                <Col>
                    <DegreePlansListComponent
                        degreePlans={allPlans}
                        updatePlanView={updatePlanView}
                        addPlan={addPlan}
                    ></DegreePlansListComponent>
                </Col>
                <Col className="degreePlan">
                    {planView !== null ? (
                        <DegreePlanComponent
                            degreePlan={planView}
                        ></DegreePlanComponent>
                    ) : (
                        <Container
                            style={{
                                border: "1px solid black",
                                padding: "20px"
                            }}
                        >
                            No Degree Plan Selected
                        </Container>
                    )}
                </Col>
                <Col>
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
