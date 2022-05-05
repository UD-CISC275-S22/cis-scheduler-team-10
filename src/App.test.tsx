import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Scheduler Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("The App renders", () => {
        //app renders
    });
    test("List of plans and welcome message visible", () => {
        const degreesList = screen.getByTestId("degreePlansList");
        expect(degreesList).toBeInTheDocument();
        const degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        const welcome = screen.getByTestId("welcome");
        expect(welcome).toBeInTheDocument();
    });
    test("Can add a new plan", () => {
        const degreesList = screen.getByTestId("degreePlansList");
        expect(degreesList).toBeInTheDocument();
        let degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        const insert = screen.getByTestId("add-plan");
        expect(insert).toBeInTheDocument();
        insert.click();
        const newPlanName = screen.getByRole("textbox");
        userEvent.type(newPlanName, "2");
        screen.getByTestId("save-plan").click();
        degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans).toHaveLength(2);
    });
    test("Can remove a plan", () => {
        const degreesList = screen.getByTestId("degreePlansList");
        expect(degreesList).toBeInTheDocument();
        const degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        const remove = screen.getByTestId("remove-plan-bool");
        expect(remove).toBeInTheDocument();
        remove.click();
        const removePlan = screen.getAllByTestId("remove-plan");
        expect(removePlan).toHaveLength(1);
        removePlan[0].click();
        expect(screen.queryByTestId("planName")).not.toBeInTheDocument();
    });
    test("Can view semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        degreePlans[0].click();
        const planView = screen.getByTestId("degreePlan");
        expect(planView).toBeInTheDocument();
        const semesters = screen.getAllByTestId("semester");
        expect(semesters.length).toEqual(2);
    });
    test("Can edit courses", () => {
        const degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        degreePlans[0].click();
        const code1 = screen.getByText("EGG101");
        expect(code1).toBeInTheDocument();
        const editCourseButtons = screen.getAllByTestId("edit-course");
        editCourseButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(3);
        userEvent.type(textboxes[0], "123");
        const save = screen.getByTestId("save-course");
        expect(save).toBeInTheDocument();
        save.click();
        const code2 = screen.getByText("EGG101123");
        expect(code2).toBeInTheDocument();
    });
    test("Buttons to add and remove semesters visible when inside of a plan", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        expect(screen.getByTestId("createNewSem")).toBeInTheDocument();
        expect(screen.getByTestId("removeSemOption")).toBeInTheDocument();
    });
    test("Pressing remove semester button creates new buttons to remove each semester in plan", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        screen.getByTestId("removeSemOption").click();
        const remButtons = screen.getAllByTestId("removeSem");
        expect(remButtons.length).toEqual(2);
    });
    test("Pressing remove semester button removes semester from plan", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        screen.getByTestId("removeSemOption").click();
        const remButtons = screen.getAllByTestId("removeSem");
        const origSems = screen.getAllByTestId("sem");
        expect(origSems.length).toEqual(2);
        remButtons[0].click();
        const sems = screen.getAllByTestId("sem");
        expect(sems.length).toEqual(1);
    });
    test("A removed semester stays removed when you exit the plan and return to it", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        screen.getByTestId("removeSemOption").click();
        const remButtons = screen.getAllByTestId("removeSem");
        const origSems = screen.getAllByTestId("sem");
        expect(origSems.length).toEqual(2);
        remButtons[0].click();
        degreePlans[0].click();
        degreePlans[0].click();
        degreePlans[0].click(); //trying to figure out why we have to double click
        const sems = screen.getAllByTestId("sem");
        expect(sems.length).toEqual(1);
    });
    test("Can add a new semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const addSemButton = screen.getByTestId("createNewSem");
        expect(addSemButton).toBeInTheDocument();
        let semesters = screen.getAllByTestId("semester");
        expect(semesters).toHaveLength(2);
        addSemButton.click();
        const season = screen.getAllByRole("combobox");
        expect(season).toHaveLength(1);
        userEvent.selectOptions(season[0], "spring");
        const year = screen.getAllByRole("textbox");
        expect(year).toHaveLength(1);
        userEvent.type(year[0], "2022");
        screen.getByTestId("saveSemButton").click();
        semesters = screen.getAllByTestId("semester");
        expect(semesters).toHaveLength(3);
    });
    test("Can add a new course to a semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        expect(addCourseButton).toHaveLength(2);
        let courses = screen.getAllByTestId("course-code");
        expect(courses).toHaveLength(10);
        addCourseButton[0].click();
        const courseSearch = screen.getAllByTestId("course-search");
        expect(courseSearch).toHaveLength(1);
        screen.getByTestId("saveCourse").click();
        courses = screen.getAllByTestId("course-code");
        expect(courses).toHaveLength(11);
    });
    test("Pressing remove course button removes course from semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const removeBoolean = screen.getAllByTestId("removeCourseOpt");
        removeBoolean[0].click();
        const removeButtons = screen.getAllByTestId("removeCourse");
        const origCourses = screen.getAllByTestId("course-code");
        expect(origCourses.length).toEqual(10);
        removeButtons[0].click();
        const newCourses = screen.getAllByTestId("course-code");
        expect(newCourses.length).toEqual(9);
    });
});
