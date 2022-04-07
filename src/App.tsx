import React, { useState } from "react";
import "./App.css";
import degreePlans from "./data/degreePlans.json";
import { DegreePlanComponent } from "./DegreePlanComponent";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import { Plan } from "./interfaces/plan";
import courses from "./data/courses.json";
import semesters from "./data/semesters.json";
import plans from "./data/degreePlans.json";
const COURSES = courses as Course[];
const SEMESTERS = semesters as Semester[];
const PLANS = plans as Plan[];

// const DEGREEPLANS = degreePlans.map((plan: Plan) => {
//     return {};
// });
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Scheduler (Team 10)</header>
            <DegreePlanComponent
            //degreePlan={degreePlan}}
            ></DegreePlanComponent>
            <p>Katie Hoyt, Vedant Subramanian, Evelyn Welsh</p>
        </div>
    );
}

export default App;
