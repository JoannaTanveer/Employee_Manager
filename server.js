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
console.log(`connected as :${dr.threadId}`);
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

