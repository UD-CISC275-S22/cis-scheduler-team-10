import React, { useState } from "react";
import { Button, ButtonGroup, Col, Form } from "react-bootstrap";
import { CourseComponent } from "./CourseComponent";
import { Course } from "./interfaces/course";
import { Plan } from "./interfaces/plan";
import { Semester } from "./interfaces/semester";
import { Typeahead } from "react-bootstrap-typeahead";

export function SemesterComponent({
    semester,
    // updateSemesters,
    removing,
    removeSemester,
    //reset,
    plan,
    changePlan,
    updatePlans,
    changeSemList,
    courses
}: // courses,
// changeCourses,
// addCourse
{
    semester: Semester;
    // updateSemesters: (newSemester: Semester, oldSemester: Semester) => void;
    removing: boolean;
    removeSemester: (semName: string) => void;
    //reset: (s: Semester) => void;
    plan: Plan;
    changePlan: (plan: Plan) => void;
    updatePlans: (newPlan: Plan, oldPlan: Plan) => void;
    changeSemList: (sems: Semester[]) => void;
    courses: string[];
    // courses: Course[];
    // changeCourses: (crses: Course[]) => void;
    // addCourse: (crsID: string, semester: Semester) => void;
}): JSX.Element {
    const [currentSem, updateSem] = useState<Semester>(semester);
    const [addingCourse, changeAddingCourse] = useState<boolean>(false);
    const [crsID, changeCrsID] = useState<string>("Insert Course ID");
    const [crsList, changeCrsList] = useState<Course[]>(semester.coursesTaken);
    // const [courseSearch, setCourseSearch] = useState<string[]>();
    const [removingCourse, changeRemovingCourse] = useState<boolean>(false);
    // function chooseCourse(event: React.ChangeEvent<HTMLInputElement>): void {
    //     setCourseSearch(courseSearch);
    //     changeCrsID(event.target.value);
    // }
    function updateCourses(newCourse: Course, oldCourse: Course): void {
        const newCourses = currentSem.coursesTaken.map((course: Course) => {
            if (course === oldCourse) {
                return newCourse;
            } else {
                return course;
            }
        });
        changeCrsList(newCourses);
        const newSem = { ...semester, coursesTaken: newCourses };
        const newSems = plan.semesters.map((sem: Semester) => {
            if (sem === semester) {
                return { ...newSem };
            } else {
                return { ...sem };
            }
        });
        changeSemList(newSems);
        changePlan({ ...plan, semesters: newSems });
        const newPlan = { ...plan, semesters: newSems };
        updatePlans(newPlan, plan);
    }

    function reset(s: Semester): void {
        const newSem = { ...s, coursesTaken: [] };
        const newSems = plan.semesters.map((sem: Semester) => {
            if (sem.season + sem.semesterName === s.season + s.semesterName) {
                return newSem;
            } else {
                return { ...sem };
            }
        });
        changeCrsList([]);
        changeSemList(newSems);
        changePlan({ ...plan, semesters: newSems });
        const newPlan = { ...plan, semesters: newSems };

        //changeDegPlanSems(newSems);
        updatePlans(newPlan, plan);
    }
    function removeCourse(crsID: string): void {
        const newCourses = crsList.filter(
            (c: Course): boolean => c.courseCode !== crsID
        );
        changeCrsList(newCourses);
        const newSem = { ...semester, coursesTaken: newCourses };
        //const newSems = [...degPlanSems, newSem];
        const newSems = plan.semesters.map((sem: Semester) => {
            if (sem === semester) {
                return { ...newSem };
            } else {
                return { ...sem };
            }
        });
        changePlan({ ...plan, semesters: newSems });
        const newPlan = { ...plan, semesters: newSems };

        //changeDegPlanSems(newSems);
        updatePlans(newPlan, plan);
        //updatePlanView(newPlan);
    }
    function addCourse(crsID: string, semester: Semester, plan: Plan) {
        const newCourse: Course = {
            courseCode: crsID,
            courseTitle: "",
            numCredits: 0,
            preReqs: [],
            courseDescription: "",
            complete: true,
            required: true,
            requirementType: "university"
        };
        const newCourses = [...crsList, newCourse];
        changeCrsList(newCourses);
        const newSem = { ...semester, coursesTaken: newCourses };
        //const newSems = [...degPlanSems, newSem];
        const newSems = plan.semesters.map((sem: Semester) => {
            if (sem === semester) {
                return { ...newSem };
            } else {
                return { ...sem };
            }
        });
        updateSem(newSem);
        changePlan({ ...plan, semesters: newSems });
        const newPlan = { ...plan, semesters: newSems };

        //changeDegPlanSems(newSems);
        updatePlans(newPlan, plan);
        //updatePlanView(newPlan);
    }
    function save() {
        //changeCrsList(semester.coursesTaken);
        // changeCourses(crsList);
        addCourse(crsID, semester, plan);
        changeAddingCourse(!addingCourse);
        changeCrsID("Insert Course ID");
    }

    return (
        <div
            data-testid="sem"
            className="semester"
            style={{ border: "1px solid black", padding: "20px" }}
        >
            <Col>
                {semester.season.toUpperCase() +
                    " " +
                    semester.semesterName.toUpperCase()}
                <Button
                    data-testid="reset"
                    onClick={() => reset(currentSem)}
                    variant="danger"
                    className="me-4"
                >
                    Reset
                </Button>
            </Col>
            <Col
                style={{
                    border: "1px solid black"
                }}
            >
                {removing ? (
                    <Button
                        data-testid="removeSem"
                        onClick={() => removeSemester(semester.semesterName)}
                        variant="danger"
                        className="me-4"
                    >
                        Remove Semester
                    </Button>
                ) : (
                    <span></span>
                )}

                {semester.coursesTaken.map((course: Course) => {
                    return (
                        <div
                            key={course.courseCode}
                            style={{
                                padding: "5px"
                            }}
                        >
                            <CourseComponent
                                data-testid="course"
                                course={course}
                                updateCourses={updateCourses}
                                // plan={plan}
                                // changePlan={changePlan}
                                // updatePlans={updatePlans}
                                removingCourse={removingCourse}
                                removeCourse={removeCourse}
                            ></CourseComponent>
                        </div>
                    );
                })}
                <div style={{ padding: "2px" }}>
                    <ButtonGroup>
                        <Button
                            data-testid="addCourseButton"
                            onClick={() => changeAddingCourse(!addingCourse)}
                        >
                            Add Course
                        </Button>
                        <Button
                            data-testid="removeCourseOpt"
                            variant="danger"
                            onClick={() =>
                                changeRemovingCourse(!removingCourse)
                            }
                        >
                            Remove Course
                        </Button>
                    </ButtonGroup>
                </div>
                {/* <div>{removingCourse ? <div>hi</div> : <span></span>}</div> */}
                <div>
                    {addingCourse ? (
                        <div>
                            <Form.Group data-testid="course-search">
                                <Form.Label>Select Course</Form.Label>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="course-name"
                                    onChange={(selected) => {
                                        if (selected.length === 1) {
                                            changeCrsID(selected[0].toString());
                                        }
                                    }}
                                    options={courses}
                                    placeholder="Course Search..."
                                ></Typeahead>
                            </Form.Group>
                            <Button
                                data-testid="saveCourse"
                                variant="success"
                                onClick={save}
                            >
                                Save Course
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </Col>
        </div>
    );
}
