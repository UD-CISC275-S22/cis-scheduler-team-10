import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";

function IsFulfilled({
    degreePlan,
    code
}: {
    degreePlan: Plan | null;
    code: string;
}): JSX.Element {
    const first = degreePlan?.semesters.map(
        (s: Semester): Course[] => s.coursesTaken
    );
    const courses = first?.flat();
    const courseCodes = courses?.map((c: Course): string => c.courseCode);
    const index = courseCodes?.findIndex(
        (courseCode: string) => courseCode === code
    );
    if (index === -1) {
        return <Col>{code} ❌</Col>;
    } else {
        return <Col>{code} ✔️</Col>;
    }
}
function ComputerScienceBA({
    degreePlan
}: {
    degreePlan: Plan | null;
}): JSX.Element {
    if (degreePlan === null) {
        return <div></div>;
    } else {
        const semesters = degreePlan.semesters.map(
            (s: Semester): Course[] => s.coursesTaken
        );
        const courses = semesters.flat();
        const totalCredits = courses.reduce(
            (total, { numCredits }): number => total + numCredits,
            0
        );
        const breadthCourses = courses.filter(
            (c: Course) => c.courseCode.substring(0, 4) !== "CISC"
        );
        const breadthCredits = breadthCourses.reduce(
            (total, { numCredits }): number => total + numCredits,
            0
        );
        return (
            <Row>
                <div>
                    Bachelor of Arts [CS] -{">"} {totalCredits}/124 Credits
                </div>
                <div>University Requirements</div>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"ENGL 110"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"EGGG 101"}
                ></IsFulfilled>
                <div>
                    College (Breadth) Requirements -{">"} {breadthCredits}/25
                    Credits
                </div>
                <span>Foreign Language</span>
                <span>Second Writing</span>
                <div>Major Requirements</div>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 108"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 181"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 210"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 220"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 260"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 275"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"MATH 210"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"MATH 241"}
                ></IsFulfilled>
            </Row>
        );
    }
}

function ComputerScienceBS({
    degreePlan
}: {
    degreePlan: Plan | null;
}): JSX.Element {
    if (degreePlan === null) {
        return <div></div>;
    } else {
        const semesters = degreePlan.semesters.map(
            (s: Semester): Course[] => s.coursesTaken
        );
        const courses = semesters.flat();
        const totalCredits = courses.reduce(
            (total, { numCredits }): number => total + numCredits,
            0
        );
        const breadthCourses = courses.filter(
            (c: Course) => c.courseCode.substring(0, 4) !== "CISC"
        );
        const breadthCredits = breadthCourses.reduce(
            (total, { numCredits }): number => total + numCredits,
            0
        );
        return (
            <Row>
                <div>
                    Bachelor of Science [CS] -{">"} {totalCredits}/124 Credits
                </div>
                <div>University Requirements</div>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"ENGL 110"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"EGGG 101"}
                ></IsFulfilled>
                <div>
                    College (Breadth) Requirements -{">"} {breadthCredits}/9
                    Credits
                </div>
                <div>Major Requirements</div>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 108"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 181"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 210"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 220"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 260"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 275"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 303"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 320"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 361"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 372"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"CISC 355"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"MATH 210"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"MATH 241"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"MATH 242"}
                ></IsFulfilled>
                <IsFulfilled
                    degreePlan={degreePlan}
                    code={"MATH 350"}
                ></IsFulfilled>
            </Row>
        );
    }
}

export function DegreePlanVizualizer({
    degreePlan
}: {
    degreePlan: Plan | null;
}): JSX.Element {
    const [isBA, setIsBA] = useState<boolean>(false);
    function swapType(): void {
        setIsBA(!isBA);
    }
    return (
        <div>
            {degreePlan !== null && <Button onClick={swapType}>Switch</Button>}
            {isBA ? (
                <ComputerScienceBA degreePlan={degreePlan}></ComputerScienceBA>
            ) : (
                <ComputerScienceBS degreePlan={degreePlan}></ComputerScienceBS>
            )}
        </div>
    );
}
