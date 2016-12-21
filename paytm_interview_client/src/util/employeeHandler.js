/**
 * Created by Terry on 2016-12-17.
 */
/*
    @params:
    employees is array of employee
    employeee is information object
    type: 'add', 'update', 'delete'
 */
export default function (employees, employee, type) {
    switch (type) {
        case 'add':
            employees.push(employee);
            return employees;
        case 'update':
            for (let i=0; i<employees.length; i++) {
                if(employees[i].id === employee.id) {
                    employees[i] = employee;
                }
            }
            return employees;
        case 'delete':
            for (let i=0; i<employees.length; i++) {
                if(employees[i].id === employee.id) {
                    employees.splice(i, 1);
                }
            }
            return employees;
        default:
            return employees;
    }
};