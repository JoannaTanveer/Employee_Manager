const inquirer = require('inquirer');
const { employeeView } = require('./queries');
const query = require('./queries');


const startInquire = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ["View all Employees",'Add Employee', 'Update Employee', 'Delete Employee', 
        'Add Department', 'View Departments', 'Add Role', 'View Role', 'View Employees by Manager']
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
        name: 'role_id',
        message: 'What is the role_id for this employee?'
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'What is the ID of the manager this employee reports to?'
    }
];


const add_role = [
    // {
    //     type:'input',
    //     name: 'title',
    //     message: "What is the title of this role?"
    // }, 
    {
        type: 'input',
        name: 'salary',
        message : 'What is the annual salary for this role?'
    }, {
        type: 'input',
        name: 'department_id',
        message: 'What department does this role fall under?'
    }
]

const add_dept = [{
    type: 'input',
    name: "name",
    message: "What is the name of the new Department?"
}];

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
        
        case "View all Employees":
            employeeAll();
            break;
        case "View Role":
            roleAll();
            break;
        case "Add Role":
            addRole();
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
    const roleArray= await query.roleAll()
    console.table(roleArray)
    const managerArray = await query.managerQuery()
    console.table(managerArray)
    await inquirer.prompt(add_Employee).then((answers)=> {
        console.log(answers)
        query.employeeAdd(answers)
    })
        
    
    const employeeArray = await query.employeeAll()
    console.table(employeeArray)
    promtInquirer()
    
};

async function addDepartment () {
    
    await inquirer.prompt(add_dept).then((answers)=> {
        console.log(answers)
        query.departmentAdd(answers)
    })
        
    
    const departmentArray= await query.departmentAll()
    console.table(departmentArray)
    promtInquirer()
    
};

async function addRole () {
    
    const departmentArray= await query.departmentAll()
    console.table(departmentArray)
    await inquirer.prompt(add_role).then((answers)=> {
        console.log(answers)
        query.roleAdd(answers)
    })
        
    
    const roleArray= await query.roleAll()
    console.table(roleArray)
    
    promtInquirer()
    
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
    promtInquirer()
};

async function viewDepartments () {
    const departmentArray= await query.departmentAll()
   
    console.table(departmentArray)
    promtInquirer()

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
    console.log(number, "number")
    await query.employeeDelete(number)
    promtInquirer()
};


async function updateEmployee () {
    const employeeArray= await query.employeeAll()
    const employeeTable = employeeArray.map(({id, first_name, last_name, title}) => ({
        name: `${first_name} ${last_name}`,
        title: `${ title }`,
        employeeID: id
    }));
    console.table(employeeTable)
    console.table(employeeArray)

    const employeeUpdate = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: "Who is the employee you would like to update?",
        choices: employeeTable
    }]);


    console.log(employeeTable)
    const { employeeID } = employeeTable.find(e => e.name == employeeUpdate.id);
    console.log(employeeID)

    const updatedRole = await inquirer.prompt([{
        name: 'role_id',
        message: "What is the new role?"
    }])
    
    await query.employeeUpdate(updatedRole, employeeID )
    
    
    await employeeAll()
    
};
    


async function employeeAll() {
    console.log('init')
    const employeeArray = await query.employeeAll()
    console.table(employeeArray)
    promtInquirer()

}

async function roleAll() {
    const roleArray = await query.roleAll()
    console.table(roleArray)
    promtInquirer()

}


promtInquirer()