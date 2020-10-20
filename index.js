const inquirer = require('inquirer');
const { employeeView } = require('./queries');
const query = require('./queries');


const startInquire = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ["View all Employees",'Add Employee', 'Update Employee', 'Delete Employee', 
        'Add Department', 'View Departments', 'Update Department', 'Add Role', 'View Role', 'Update Role', 'View Employees by Manager']
    }];

const add_Employee = [
    {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?'
    },{
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the employees title?'
    },{
        type: 'input',
        name: 'salary',
        message: 'What is the employees salary?'
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'What is the ID of the manager this employee reports to?'
    }
];


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
        
        case "Delete Employee":
            deleteEmployee();
            break;
        case "Update Employee":
            updateEmployee();
            break;
        
        case "Add Department":
            addDepartment();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "View Employees by Manager":
            viewByManager();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "View all Employees":
            employeeAll();
            break;
        case "View Role":
            roleAll();
            break;
        
            




    }
   
}



function promtInquirer () {
    inquirer.prompt(startInquire).then((startAnswers)=> {
        console.log(startAnswers)
        followUp(startAnswers)
    })
};

async function addEmployee () {
    
    await inquirer.prompt(add_Employee).then((answers)=> {
        console.log(answers)
        query.employeeAdd(answers)
    })
        
    
    const employeeArray = await query.employeeAll()
    console.table(employeeArray)

    
};

function addDepartment () {


    
    inquirer.prompt(
        [{
            type: 'input',
            name: "addDept",
            message: "What is the name of the new Department?"
        }]
    ).then((answers)=> {
        console.log(answers, "addDept")
        query.departmentAdd(answers)
    })
    
};

async function viewByManager() {
    const managerArray = await query.managerQuery()
    console.table(managerArray)
    const managerTable = managerArray.map(manager=>`${manager.first_name} ${manager.last_name}`)
    const response = await inquirer.prompt([{
            type: 'list',
            name: 'id',
            message: "Who is the manager you would like to view?",
            choices: managerTable
            }]).then( (answer) => {
                
                for (let i=0; i<managerTable.length; i++) {
                    
                    if(managerTable[i]=== answer.id) {
                        
                        return query.byManager(managerArray[i].id)
                    }
                }
            }).then(response => 
    console.table(response))
};

async function viewDepartments () {
    const departmentArray= await query.departmentAll()
   
    console.table(departmentArray)
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


async function updateEmployee () {
    const employeeArray= await query.employeeAll()
    const employeeTable = employeeArray.map(({id, first_name, last_name, role_id}) => ({
        name: `${first_name} ${last_name}`,
        role: `${ role_id }`,
        employeeID: id
    }));
    console.table(employeeTable)


    const response = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: "Who is the employee you would like to update?",
        choices: employeeTable
    }]);

    const { employeeID } = employeeTable.find(e => e.name === response.id);
    console.log(employeeID)
    await inquirer.prompt(
        [{
        
        name: 'roleChange',
        message: "What is the new role?"
    }])
    .then((answer) => {
        console.log(answer)
        query.employeeUpdate(answer, employeeID )


    });
    var value = employeeArray
    await console.table(employeeArray)
};

async function employeeAll() {
    console.log('init')
    const employeeArray = await query.employeeAll()
    console.table(employeeArray)
    

}

async function roleAll() {
    const employeeArray = await query.employeeAll()
    console.table(employeeArray)
    

}


promtInquirer()