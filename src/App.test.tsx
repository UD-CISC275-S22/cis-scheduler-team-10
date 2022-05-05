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
    test("Viewing default plan shows credit limit and filled credits per semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const lims = screen.getAllByTestId("credLim");
        const fills = screen.getAllByTestId("credFill");
        expect(lims.length).toEqual(2);
        expect(fills.length).toEqual(2);
    });
    test("Editing a course's credits changes the number of credits filled", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const editButtons = screen.getAllByTestId("edit-course");
        editButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(3);
        userEvent.type(textboxes[2], "0");
        const save = screen.getByTestId("save-course");
        save.click();
        const fills = screen.getAllByTestId("credFill");
        expect(fills[0]).toHaveTextContent("Credits Filled: 33");
    });
    // test("Adding a course changes the number of credits filled", () => {
    //     const degreePlans = screen.getAllByTestId("planName");
    //     degreePlans[0].click();
    //     const addButtons = screen.getAllByTestId("addCourseButton");
    //     addButtons[0].click();
    //     const creds = screen.getByTestId("addCreds");
    //     userEvent.type(creds, "3");
    //     const save = screen.getByTestId("saveCourse");
    //     save.click();
    //     const fills = screen.getAllByTestId("credFill");
    //     expect(fills[0]).toHaveTextContent("Credits Filled: 18");
    // });
});
