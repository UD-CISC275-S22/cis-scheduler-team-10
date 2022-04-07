import React, { useState } from "react";
import "./App.css";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import { Plan } from "./interfaces/plan";
import courses from "./data/courses.json";
import semesters from "./data/semesters.json";
import plans from "./data/degreePlans.json";
const COURSES = courses as Course[];
const SEMESTERS = semesters as Semester[];
const PLANS = plans as Plan[];
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 Scheduler (Team 10)
            </header>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
            <p>Katie Hoyt</p>
            <p>Vedant Subramanian</p>
            <p>Evelyn Welsh</p>
        </div>
    );
}

export default App;
