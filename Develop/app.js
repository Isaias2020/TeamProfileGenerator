const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let employeesArr = []

console.log('Please build your team: ')
const startQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'ManagerName',
            message: 'Please enter the Managers name:',
            validate: validateName
        },
        {
            type: 'number',
            name: 'ManagerID',
            message: 'Please enter the Managers id:',
        },
        {
            type: 'input',
            name: 'ManagerEmail',
            message: 'Please enter the Managers email:',
        },
        {
            type: 'number',
            name: 'OfficeNumber',
            message: 'What is the Managers office number?',
        },
        {
            type: 'list',
            name: 'EmployeeType',
            message: 'Which type of team member would you like to add?',
            choices: ['Engineer', 'Intern', 'I do not want to add more team members.']
        },


    ]).then((answers) => {
        const manager = new Manager(answers.ManagerName, answers.ManagerID, answers.ManagerEmail, answers.OfficeNumber)
        employeesArr.push(manager)

        if (answers.EmployeeType === "Engineer") {
            engineerAnswer()
        }
        else if (answers.EmployeeType === "Intern") {
            internAnswer()
        }
        else {
            fs.writeFile("team.html", render(employeesArr), function (err) {
                if (err) throw err
                console.log("Only the Manager is listed.")
            })
        }
    });
};

function resume() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'EmployeeType',
            message: 'Which type of team member would you like to add?',
            choices: ['Engineer', 'Intern', 'I do not want to add more team members.']
        }
    ]).then(answers => {

        if (answers.EmployeeType === "Engineer") {
            engineerAnswer()
        }
        else if (answers.EmployeeType === "Intern") {
            internAnswer()
        }
        else {
            fs.writeFile("team.html", render(employeesArr), function (err) {

                if (err) throw err

                console.log("Your Html has been rendered, please look for the team.html file.");
            })
        }
    })
}

const internAnswer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'internname',
            message: 'What is the Interns name?',
            validate: validateName
        },
        {
            type: 'number',
            name: 'internid',
            message: 'What is the Interns ID number?',
        },
        {
            type: 'input',
            name: 'internemail',
            message: 'What is the Interns email address?',
        },
        {
            type: 'input',
            name: 'internschool',
            message: 'What school is the Intern attending?',
        },
    ]).then((answers) => {

        const intern = new Intern(answers.internname, answers.internid, answers.internemail, answers.internschool)
        employeesArr.push(intern)
        resume()
    });
}

const engineerAnswer = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineername',
            message: 'What is the Engineers name?',
            validate: validateName
        },
        {
            type: 'number',
            name: 'engineerid',
            message: 'What is the Engineers ID number?',
        },
        {
            type: 'input',
            name: 'engineeremail',
            message: 'What is the Engineers email address?',
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'What is the Engineers github username?',
        },
    ]).then((answers) => {

        const engineer = new Engineer(answers.engineername, answers.engineerid, answers.engineeremail, answers.engineerGithub)
        employeesArr.push(engineer)
        resume()
    });
}

// function for Name Validation if user tries to enter a blank name. 

function validateName(name) {
    return name !== '' || "Please enter a name!";
}

startQuestions();
