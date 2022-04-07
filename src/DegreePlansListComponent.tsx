import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SemesterComponent } from "./SemesterComponent";
import { Plan } from "./interfaces/plan";

export function DegreePlansListComponent({
    degreePlans,
    updatePlanView
}: {
    degreePlans: Plan[];
    updatePlanView: (plan: Plan) => void;
}): JSX.Element {
    return (
        <div
            className="degreePlansList"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            Select a Degree Plan:
            {degreePlans.map((plan: Plan) => {
                return (
                    <div key={plan.name} onClick={() => updatePlanView(plan)}>
                        {plan.name}
                    </div>
                );
            })}
        </div>
    );
}
