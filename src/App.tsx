import React from "react";
import "./App.css";
import semesters from "./data/semesters.json";
import degreePlans from "./data/degreePlans.json";
import { DegreePlanComponent } from "./DegreePlanComponent";
import { Plan } from "./interfaces/plan";

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
