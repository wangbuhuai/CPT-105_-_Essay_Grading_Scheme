// Created by Dayu Wang (dwang@stchas.edu) on 2022-10-08

// Last updated by Dayu Wang (dwang@stchas.edu) on 2023-04-17


const SECTION = "81";
const SEMESTER = "23/SP";
const ASSIGNMENT = "Case-Study Essay 9";
const TOTAL_SCORE = 20;
const AUTOFILL = false;

/** Calculates the total score.
    @returns {number}: calculated total score
*/
totalScore = function() {
    let result = 0;
    let scores = document.getElementsByClassName("score");
    for (let i = 0; i < scores.length; i++) {
        if (scores.item(i).value.trim() !== "") { result += parseFloat(scores.item(i).value); }
    }
    if (result > 20) { return 20; }
    else if (result < 0) { return 0; }
    else { return result; }
};

/** Gets the current time.
    @returns {string}: current time in {mm/dd/yyyy hh:mm AM/PM} format
*/
now = function() {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const date = current.getDate();
    let hour = current.getHours();
    const amPM = hour < 12 ? "AM" : "PM";
    if (hour === 0 || hour === 12) { hour = 12; }
    else { hour %= 12; }
    let minute = current.getMinutes();
    let result = "";
    result += (month < 10 ? '0' + month.toString() : month.toString()) + '/';
    result += (date < 10 ? '0' + date.toString() : date.toString()) + '/';
    result += year.toString() + ' ';
    result += (hour < 10 ? '0' + hour.toString() : hour.toString()) + ':';
    result += (minute < 10 ? '0' + minute.toString() : minute.toString()) + ' ';
    result += amPM;
    return result;
};

window.onload = function() {
    if (AUTOFILL) {
        const ass = document.getElementById("assignment");
        ass.value = ASSIGNMENT;
        ass.tabIndex = -1;
        ass.readOnly = true;
    }

    const totals = document.getElementsByClassName("total");
    for (let i = 0; i < totals.length; i++) { totals.item(i).textContent = TOTAL_SCORE.toString(); }

    const scores = document.querySelectorAll(".score");
    for (let i = 0; i < scores.length; i++) {
        scores.item(i).addEventListener("keydown", (event) => {
            if (event.which === 38 || event.which === 40) { event.preventDefault(); }
        })
        scores.item(i).addEventListener("keyup", (event) => {
            if (event.which === 40) {  // Arrow down
                if (i !== scores.length - 1) { scores.item(i + 1).focus(); }
            } else if (event.which === 38) {  // Arrow up
                if (i !== 0) { scores.item(i - 1).focus(); }
            } else {
                document.getElementById("total-score").textContent = totalScore().toString();
                document.getElementById("date-time").textContent = now();
            }
        });
    }

    document.getElementById("print").addEventListener("click", () => {
        const studentNumber = document.getElementById("number").value.toString().trim();
        const studentName = document.getElementById("student-name").value.trim();
        const assignmentName = document.getElementById("assignment").value.trim();
        if (studentNumber === "") { alert("[Error] Missing student number"); return; }
        if (studentName === "") { alert("[Error] Missing student name"); return; }
        if (assignmentName === "") { alert("[Error] Missing assignment name"); return; }
        let titleName = studentNumber.length === 1 ? '0' : '';
        titleName += studentNumber + " - ";
        titleName += studentName + " - ";
        titleName += assignmentName + " - ";
        titleName += "Grading Scheme - ";
        titleName += "CPT-105-";
        titleName += SECTION;
        titleName += " (" + SEMESTER + ")";
        titleName += " - PDF";

        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(titleName).then();
        }
        document.title = titleName.replaceAll('/', '-').replaceAll(' ', '_');
        window.print();
    });
};