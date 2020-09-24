const connection = require("./connection");


class Queries {
    constructor ( connection ){
        this.connection = connection
    }

    roleAll () {
        return this.connection.query('SELECT * FROM role')
    };

    employeeAll () {
        return this.connection.query('SELECT * FROM employee')
    };

    departmentAll () {
        return this.connection.query('SELECT * FROM department')
    };

    employeeAdd(employee) {
        return  this.connection.query('INSERT INTO employee SET ?', employee)
    };

    managerQuery() {
        return this.connection.query('SELECT * FROM employee')
    };

    employeeDelete (id) {
        return this.connection.query('DELETE FROM employee WHERE id = ?', id)
    }
};
module.exports = new Queries(connection)


