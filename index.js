const inquirer = require('inquirer');
const query = require('./queries');


const startInquire = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Employee', 'View Employee', 'Update Employee', 'Delete Employee', 
        'Add Department', 'View Department', 'Update Department', 'Add Role', 'View Role', 'Update Role']
    }
];

const add_Employee = [
    {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?'
    },{
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?'
    }
    //{
    //     type: 'input',
    //     name: 'title',
    //     message: 'What is the employees title?'
    // },{
    //     type: 'input',
    //     name: 'salary',
    //     message: 'What is the employees salary?'
    // },
    //{
    //     type: 'input',
    //     name: 'manager_id',
    //     message: 'What is the ID of the manager this employee reports to?'
    // }
];

const add_department = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you would like to add?'
    }
]

const add_role = [
    {
        type:'input',
        name: 'title',
        message: "What is the title of this role?"
    }, {
        type: 'input',
        name: 'salary',
        message : 'What is the annual salary for this role?'
    }
]



function followUp (answers) {
    switch(answers.action) {
        case "Add Employee": 
            addEmployee();
            break;
        case "View Employee":
            viewEmployee();
            break;
        case "Delete Employee":
            deleteEmployee();
            break;
        


    }
}



function promtInquirer () {
inquirer.prompt(startInquire).then((startAnswers)=> {
    console.log(startAnswers)
    followUp(startAnswers)
})
};

function addEmployee () {
    
    inquirer.prompt(add_Employee).then((answers)=> {
        console.log(answers)
        query.employeeAdd(answers)
    })
    
};

async function deleteEmployee () {
    const employeeArray= await query.employeeAll()
    const employeeTable = employeeArray.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        number: id
    }));
    console.table(employeeTable)


    const response = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: "Who is the employee you would like to delete?",
        choices: employeeTable
    }]);

    const { number } = employeeTable.find(e => e.name === response.id);
    await query.employeeDelete(number)
    };




promtInquirer()