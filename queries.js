const connection = require("./connection");


class Queries {
    constructor ( connection ){
        this.connection = connection
    }

    roleAll () {
        return this.connection.query('SELECT * FROM role')
    };

    employeeAll () {
       return this.connection.query(
           ['SELECT e.first_name, e.last_name, e.manager_id, title, salary, name',
            'FROM employee as e',
                'LEFT JOIN role on e.role_id = role.id',
                'LEFT JOIN department on department.id = department_id'].join(" "));
                //CONCAT(m.first_name, " ", m.last_name)
    };

    departmentAll () {
        return this.connection.query('SELECT * FROM department')
    };

    employeeAdd(employee) {
        return  this.connection.query('INSERT INTO employee SET ?', employee)
    };

    managerQuery() {
        return this.connection.query
        (`SELECT DISTINCT m.id, m.first_name, m.last_name, m.role_id, m.manager_id FROM staffdb.employee as e
            left join staffdb.employee as m on e.manager_id = m.id
            WHERE m.id IS NOT NULL`)
    };

    managerOf(id) {
        return this.connection.query('SELECT * FROM employee WHERE id =?', id)

    };

    byManager(id) {
        return this.connection.query('SELECT * FROM employee WHERE manager_id =?', id)
    };

    employeeDelete (id) {
        return this.connection.query('DELETE FROM employee WHERE id = ?', id)
    };
    
    employeeView (id) {
        return this.connection.query('SELECT * FROM employee WHERE id =?', id)
    };

    departmentAdd (dept) {
        return this.connection.query("INSERT INTO department SET ?", dept)
    }

    employeeUpdate (answer, id) {
        console.log ('answer', answer, 'id', id)
        return this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [ answer.roleChange, id] )}
    
};
module.exports = new Queries(connection)


