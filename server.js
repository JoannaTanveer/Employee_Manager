const mysql = require('mysql');

const db = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ash4Cynth!4',
    database: 'staffDB'
});

db.connect((err) => {
    if (err) {throw err;
}
console.log(`connected as :${db.threadId}`);
})

db.query(
    'INSERT INTO department SET ?',
    [{
        name:'name'
    }],

    (err,res) => {console.log(res)}

);

db.query(
    'INSERT INTO role SET ?',
    [{
        title: 'title',
        salary: 'salary',
        department_id: 'department_id'
    }]
);

db.query(
    'INSERT INTO employee SET ?',
    [{
        first_name:'first_name',
        last_name: 'last_name',
        role_id: 'role_id',
        manager_id: 'manager_id'
    }]
);

//JOINS//

//self-join- employee as direct report//

db.query(`SELECT 
    IFNULL(CONCAT(m.last_name, ', ', m.first_name),'Top Manager') AS 'Manager',
    CONCAT(e.last_name, ', ', e.first_name) AS 'Direct report'
FROM
    employees e
LEFT JOIN employees m ON 
    m.id = e.id
ORDER BY 
    manager_id DESC`);


//left join  departments and roles //
db.query(`SELECT 
    name,
    title,
    salary,
    status
FROM
    role
LEFT JOIN department ON 
    role.department_id = departmend.id`);

// inner join employee and role//
db.query(`SELECT
    first_name,
    last_name,
    title,
    salary
FROM
    employee
INNER JOIN role ON
    employee.id = role.id`);

    
    