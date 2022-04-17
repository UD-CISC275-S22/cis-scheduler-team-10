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
        //app renders
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
});
