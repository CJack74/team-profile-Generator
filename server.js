//External Packages
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Internal Modules
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Arrays for new 
const teamMembers = [];
const idArray = [];

function mainMenu() {
    // Write code to use inquirer to gather information about the development team members,
    // and to create objects for each team member (using the correct classes as blueprints!)
    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Manager's name?",
            },
            {
                type: "input",
                name: "managerId",
                message: "Manager's id?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Manager's email?",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Manager's office number?",
            }
        ]).then(answers => {
            // Pushes new manager into team array
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }

    function createTeam() {
        //Propmts user to select members to add to team
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Select team member or select I'm Finished?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I'm Finished"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                case "Intern":
                    addIntern();
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        //Inquirer Prompt to add Engineer
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Engineer's name?",
            },
            {
                type: "input",
                name: "engineerId",
                message: "Engineer Id?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Engineer Email?",
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Engineer's GitHub username?",
            }
        ]).then(answers => {
            // Pushes new engineer into team array
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }

    function addIntern() {
        //Inquirer prompt to add intern
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Intern's name?",
            },
            {
                type: "input",
                name: "internId",
                message: "Intern's id?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "Intern's email?",
            },
            {
                type: "input",
                name: "internSchool",
                message: "Intern's school?",
            }
        ]).then(answers => {
            //Pushes intern into team array
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }
    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.
    // With help from https://www.geeksforgeeks.org/node-js-fs-existssync-method/
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    addManager();
}
mainMenu();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// render(output of inqueirer )

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
