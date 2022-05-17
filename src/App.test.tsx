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
    test("Can toggle between view of degreen plan and welcome message", () => {
        let welcome = screen.getByTestId("welcome");
        expect(welcome).toBeInTheDocument();
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const planView = screen.getByTestId("degreePlan");
        expect(planView).toBeInTheDocument();
        degreePlans[0].click();
        welcome = screen.getByTestId("welcome");
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
        userEvent.clear(newPlanName);
        userEvent.type(newPlanName, "Plan 2");
        screen.getByTestId("save-plan").click();
        degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans).toHaveLength(2);
    });
    test("Can cancel a new plan", () => {
        const degreesList = screen.getByTestId("degreePlansList");
        expect(degreesList).toBeInTheDocument();
        let degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        const insert = screen.getByTestId("add-plan");
        insert.click();
        const newPlanName = screen.getByRole("textbox");
        userEvent.clear(newPlanName);
        userEvent.type(newPlanName, "Plan 2");
        screen.getByTestId("cancel-new-plan").click();
        degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans).toHaveLength(1);
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
        const code1 = screen.getByText("EGG101: 2 Credits");
        expect(code1).toBeInTheDocument();
        const editCourseButtons = screen.getAllByTestId("edit-course");
        editCourseButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(4);
        userEvent.type(textboxes[0], "123");
        userEvent.clear(textboxes[3]);
        userEvent.type(textboxes[3], "3");
        const save = screen.getByTestId("save-course");
        expect(save).toBeInTheDocument();
        save.click();
        const code2 = screen.getByText("EGG101123: 3 Credits");
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
        userEvent.selectOptions(season[0], "summer1");
        const year = screen.getAllByRole("textbox");
        expect(year).toHaveLength(1);
        userEvent.type(year[0], "8");
        screen.getByTestId("saveSemButton").click();
        expect(
            screen.getByText("Please enter a valid year.")
        ).toBeInTheDocument();
        userEvent.clear(year[0]);
        userEvent.type(year[0], "2022");
        screen.getByTestId("saveSemButton").click();
        semesters = screen.getAllByTestId("semester");
        expect(semesters).toHaveLength(3);
    });
    test("Can't add a previously existing semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const addSemButton = screen.getByTestId("createNewSem");
        let semesters = screen.getAllByTestId("semester");
        expect(semesters).toHaveLength(2);
        addSemButton.click();
        const season = screen.getAllByRole("combobox");
        // exists already in sample data
        userEvent.selectOptions(season[0], "spring");
        const year = screen.getAllByRole("textbox");
        userEvent.type(year[0], "2022");
        screen.getByTestId("saveSemButton").click();
        semesters = screen.getAllByTestId("semester");
        expect(semesters).toHaveLength(2);
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
        const creditAmount = screen.getByTestId("addCreds");
        userEvent.type(creditAmount, "3");
        screen.getByTestId("saveCourse").click();
        courses = screen.getAllByTestId("course-code");
        expect(courses).toHaveLength(11);
    });
    test("Can edit courses", () => {
        const degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        degreePlans[0].click();
        const code1 = screen.getByText("EGGG 101: 2 Credits");
        expect(code1).toBeInTheDocument();
        const editCourseButtons = screen.getAllByTestId("edit-course");
        editCourseButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(4);
        userEvent.clear(textboxes[0]);
        userEvent.type(textboxes[0], "MATH 549");
        userEvent.clear(textboxes[2]);
        userEvent.type(textboxes[2], "edited course title");
        userEvent.clear(textboxes[3]);
        userEvent.type(textboxes[3], "3");
        const save = screen.getByTestId("save-course");
        expect(save).toBeInTheDocument();
        save.click();
        const code2 = screen.getByText("MATH 549: 3 Credits");
        expect(code2).toBeInTheDocument();
        expect(screen.getByText("edited course title")).toBeInTheDocument();
    });
    test("Cancelling editing courses returns original course data", () => {
        const degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans.length).toEqual(1);
        degreePlans[0].click();
        let oldCode = screen.getByText("EGGG 101: 2 Credits");
        expect(oldCode).toBeInTheDocument();
        const editCourseButtons = screen.getAllByTestId("edit-course");
        editCourseButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(4);
        userEvent.clear(textboxes[0]);
        userEvent.type(textboxes[0], "EGGG 101");
        userEvent.clear(textboxes[2]);
        userEvent.type(textboxes[2], "3");
        const cancel = screen.getByTestId("cancel-edit-course");
        expect(cancel).toBeInTheDocument();
        cancel.click();
        oldCode = screen.getByText("EGGG 101: 2 Credits");
        expect(oldCode).toBeInTheDocument();
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
        expect(textboxes.length).toEqual(4);
        userEvent.type(textboxes[2], "0");
        const save = screen.getByTestId("save-course");
        save.click();
        const fills = screen.getAllByTestId("credFill");
        expect(fills[0]).toHaveTextContent("Credits Filled: 33");
    });
    test("Adding a course changes the number of credits filled", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const addButtons = screen.getAllByTestId("addCourseButton");
        addButtons[0].click();
        const crs = screen.getByTestId("course-search");
        userEvent.type(crs, "CISC 275");
        const save = screen.getByTestId("saveCourse");
        save.click();
        const fills = screen.getAllByTestId("credFill");
        expect(fills[0]).toHaveTextContent("Credits Filled: 18");
    });
    test("Can move courses between semesters", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        let moveButtons = screen.getAllByTestId("move-courses");
        moveButtons[0].click();
        let moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(5);

        moveCourseButtons[0].click();
        let semesterSelect = screen.getByTestId("semester-select");
        userEvent.selectOptions(semesterSelect, "spring2022");
        let save = screen.getByTestId("save-move-course");
        save.click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(4);
        moveButtons[0].click();
        moveButtons[1].click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(6);

        moveCourseButtons[2].click();
        semesterSelect = screen.getByTestId("semester-select");
        userEvent.selectOptions(semesterSelect, "fall2021");
        save = screen.getByTestId("save-move-course");
        save.click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(5);
        moveButtons[1].click();
        moveButtons[0].click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(5);

        moveButtons[1].click();
        moveButtons[0].click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        moveCourseButtons[1].click();
        semesterSelect = screen.getByTestId("semester-select");
        userEvent.selectOptions(semesterSelect, "fall2021");
        save = screen.getByTestId("save-move-course");
        save.click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(4);
        moveButtons[0].click();
        moveButtons[1].click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(6);

        screen.getByTestId("createNewSem").click();
        const season = screen.getAllByRole("combobox");
        userEvent.selectOptions(season[0], "winter");
        const year = screen.getAllByRole("textbox");
        userEvent.type(year[0], "2022");
        screen.getByTestId("saveSemButton").click();
        moveCourseButtons[3].click();
        semesterSelect = screen.getByTestId("semester-select");
        userEvent.selectOptions(semesterSelect, "winter2022");
        save = screen.getByTestId("save-move-course");
        save.click();
        moveButtons = screen.getAllByTestId("move-courses");
        expect(moveButtons).toHaveLength(3);
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(5);
        moveButtons[0].click();
        moveButtons[2].click();
        moveCourseButtons = screen.getAllByTestId("move-course");
        expect(moveCourseButtons).toHaveLength(1);
    });
    test("Can't move a course to a semester that has the course already", () => {
        const addPlan = screen.getByTestId("add-plan");
        addPlan.click();
        const newPlanName = screen.getByRole("textbox");
        userEvent.clear(newPlanName);
        userEvent.type(newPlanName, "Sample Plan");
        screen.getByTestId("save-plan").click();
        expect(screen.getByText("Sample Plan")).toBeInTheDocument();
        const degreePlans = screen.getAllByTestId("planName");
        expect(degreePlans).toHaveLength(2);
        degreePlans[1].click();
        const addSemButton = screen.getByTestId("createNewSem");
        addSemButton.click();
        let season = screen.getAllByRole("combobox");
        userEvent.selectOptions(season[0], "fall");
        let year = screen.getAllByRole("textbox");
        userEvent.type(year[0], "2023");
        screen.getByTestId("saveSemButton").click();
        addSemButton.click();
        season = screen.getAllByRole("combobox");
        userEvent.selectOptions(season[0], "spring");
        year = screen.getAllByRole("textbox");
        userEvent.type(year[0], "2024");
        screen.getByTestId("saveSemButton").click();
        const semesters = screen.getAllByTestId("semester");
        expect(semesters).toHaveLength(2);

        expect(screen.queryByTestId("move-courses")).not.toBeInTheDocument();
        const addCourseButton = screen.getAllByTestId("addCourseButton");
        expect(addCourseButton).toHaveLength(2);
        addCourseButton[0].click();
        screen.getByTestId("saveCourse").click();
        addCourseButton[1].click();
        screen.getByTestId("saveCourse").click();

        const moveButtons = screen.getAllByTestId("move-courses");
        moveButtons[0].click();
        const moveCourseButton = screen.getByTestId("move-course");
        moveCourseButton.click();

        const semesterSelect = screen.getByTestId("semester-select");
        userEvent.selectOptions(semesterSelect, "spring2024");
        const save = screen.getByTestId("save-move-course");
        save.click();
        expect(
            screen.getByText("This semester already has this course.")
        ).toBeInTheDocument();
        screen.getByTestId("cancel-move").click();
    });
    test("Resetting a plan removes all the semesters from a plan", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const semesters = screen.getAllByTestId("semester");
        expect(semesters.length).toEqual(2);
        screen.getByTestId("resetSem").click();
        expect(screen.queryAllByTestId("semester")).not.toBeInTheDocument;
    });
    test("Resetting a plan does not remove other plan's semesters", () => {
        const insert = screen.getByTestId("add-plan");
        insert.click();
        screen.getByTestId("save-plan").click();
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[1].click();
        const addSemButton = screen.getByTestId("createNewSem");
        addSemButton.click();
        const season = screen.getAllByRole("combobox");
        userEvent.selectOptions(season[0], "winter");
        const year = screen.getAllByRole("textbox");
        userEvent.type(year[0], "2022");
        screen.getByTestId("saveSemButton").click();
        let plan2Semesters = screen.getAllByTestId("semester");
        expect(plan2Semesters).toHaveLength(1);
        degreePlans[0].click();
        const semesters = screen.getAllByTestId("semester");
        expect(semesters.length).toEqual(2);
        screen.getByTestId("resetSem").click();
        expect(screen.queryAllByTestId("semester")).not.toBeInTheDocument;
        degreePlans[1].click();
        plan2Semesters = screen.getAllByTestId("semester");
        expect(plan2Semesters).toHaveLength(1);
    });
    test("Resetting a semester removes all courses from the semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const resets = screen.getAllByTestId("reset");
        resets[0].click();
        resets[1].click();
        expect(screen.queryAllByTestId("course")).not.toBeInTheDocument;
    });
    test("Course prerequisites render (unmet prerequisites show up with a red x, you can check a box in the edit screen to get a green check stating you met prereqs, and courses with no prereqs have None listed ", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const preReqs = screen.getAllByTestId("preReqs");
        expect(preReqs.length).toEqual(10);
        const noPreReqs = screen.getAllByText("None");
        expect(noPreReqs.length).toEqual(5);
        const unmetPreReqs = screen.getAllByText(/❌/i);
        expect(unmetPreReqs.length).toEqual(5);
        const editButtons = screen.getAllByTestId("edit-course");
        editButtons[5].click();
        const preReqBoxOne = screen.getByTestId("preReq-checkBox");
        preReqBoxOne.click();
        const saveButtonOne = screen.getByTestId("save-course");
        saveButtonOne.click();
        editButtons[6].click();
        const preReqBoxTwo = screen.getByTestId("preReq-checkBox");
        preReqBoxTwo.click();
        const saveButtonTwo = screen.getByTestId("save-course");
        saveButtonTwo.click();
        const metPreReqs = screen.getAllByText(/✔️/i);
        expect(metPreReqs.length).toEqual(2);
    });
    test("You can change a course's information, save it, and then reset the info back to the course's default values as without changing the course code", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const editButtons = screen.getAllByTestId("edit-course");
        editButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(4);
        userEvent.clear(textboxes[1]);
        userEvent.type(textboxes[1], "engineering class");
        userEvent.clear(textboxes[2]);
        userEvent.type(textboxes[2], "learning how to be an engineer");
        userEvent.clear(textboxes[3]);
        userEvent.type(textboxes[3], "3");
        const saveButtonOne = screen.getByTestId("save-course");
        saveButtonOne.click();
        const newEditButtons = screen.getAllByTestId("edit-course");
        newEditButtons[0].click();
        const defaultButton = screen.getByTestId("restoreCourseInfo");
        defaultButton.click();
        expect(screen.getByText(/Introduction to Engineering/i))
            .toBeInTheDocument;
        expect(
            screen.getByText(
                "Introduction to profession, including disciplines of chemical, civil, computer, electrical, environmental, and mechanical engineering. Prepares students for success through integration of: technical problem solving and engineering design, ethical decision-making, teamwork, and communicating to diverse audiences."
            )
        ).toBeInTheDocument;
        expect(screen.getByText("EGGG 101: 2 Credits")).toBeInTheDocument;
    });
    test("Editing a course's code, saving it, then resetting the information to default will swap the info to that of the new course", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const editButtons = screen.getAllByTestId("edit-course");
        editButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(4);
        userEvent.clear(textboxes[0]);
        userEvent.type(textboxes[0], "CISC 275");
        const saveButtonOne = screen.getByTestId("save-course");
        saveButtonOne.click();
        const newEditButtons = screen.getAllByTestId("edit-course");
        newEditButtons[0].click();
        const defaultButton = screen.getByTestId("restoreCourseInfo");
        defaultButton.click();
        expect(screen.queryByText(/Introduction to Engineering/i)).not
            .toBeInTheDocument;
        expect(
            screen.queryByText(
                "Introduction to profession, including disciplines of chemical, civil, computer, electrical, environmental, and mechanical engineering. Prepares students for success through integration of: technical problem solving and engineering design, ethical decision-making, teamwork, and communicating to diverse audiences."
            )
        ).not.toBeInTheDocument;
        expect(screen.queryByText("EGGG 101: 2 Credits")).not.toBeInTheDocument;
        expect(screen.getByText(/Introduction to Software Engineering/i))
            .toBeInTheDocument;
        expect(
            screen.getByText(
                "Object oriented software design and development through use of an object oriented programming language. Topics include team programming, design patterns, graphical user interfaces, software engineering tools (e.g., integrated development environments, version control, build management, bug tracking, automated testing)."
            )
        ).toBeInTheDocument;
        expect(screen.getByText("CISC 275: 3 Credits")).toBeInTheDocument;
    });
    test("The user will be blocked and given a warning message when they attempt to edit a course code to a course that already exists within the semester", () => {
        const degreePlans = screen.getAllByTestId("planName");
        degreePlans[0].click();
        const editButtons = screen.getAllByTestId("edit-course");
        editButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toEqual(4);
        userEvent.clear(textboxes[0]);
        userEvent.type(textboxes[0], "MATH 241");
        const saveButtonOne = screen.getByTestId("save-course");
        saveButtonOne.click();
        expect(
            screen.queryByText(
                "You cannot have two courses with the same code in one semester."
            )
        ).toBeInTheDocument;
    });
});
