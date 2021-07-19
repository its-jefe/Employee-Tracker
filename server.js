const inquirer = require('inquirer');
const mysql = require('mysql2');

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: `12345678`,
  database: 'employee_tracker'
});

console.clear()

// condesnsed into one line 
// console.log(`╔════════════════════════════════════════════════════════════════════════════════════════╗\n║   ╔══════╗  ╔═════════╗  ╔══════╗  ╔═╗       ╔══════╗  ╔═╗   ╔═╗  ╔══════╗  ╔══════╗   ║\n║   ║ ╔════╝  ║ ╔═╗ ╔═╗ ║  ║ ╔══╗ ║  ║ ║       ║ ╔══╗ ║  ║ ║   ║ ║  ║ ╔════╝  ║ ╔════╝   ║\n║   ║ ╚═══╗   ║ ║ ║ ║ ║ ║  ║ ╚══╝ ║  ║ ║       ║ ║  ║ ║  ╚╗╚═══╝╔╝  ║ ╚═══╗   ║ ╚═══╗    ║\n║   ║ ╔═══╝   ║ ║ ╚═╝ ║ ║  ║ ╔════╝  ║ ║       ║ ║  ║ ║   ╚═╗ ╔═╝   ║ ╔═══╝   ║ ╔═══╝    ║\n║   ║ ╚════╗  ║ ║     ║ ║  ║ ║       ║ ╚════╗  ║ ╚══╝ ║     ║ ║     ║ ╚════╗  ║ ╚════╗   ║\n║   ╚══════╝  ╚═╝     ╚═╝  ╚═╝       ╚══════╝  ╚══════╝     ╚═╝     ╚══════╝  ╚══════╝   ║\n║                                                                                        ║\n║      ╔═══════╗  ╔══════╗  ╔══════╗  ╔══════╗  ╔═╗  ╔═╗   ╔══════╗  ╔══════╗   ╔═╗      ║\n║      ╚══╗ ╔══╝  ║ ╔══╗ ║  ║ ╔══╗ ║  ║ ╔════╝  ║ ║ ╔╝╔╝   ║ ╔════╝  ║ ╔══╗ ║   ║ ║      ║   \n║         ║ ║     ║ ╚══╝ ║  ║ ╚══╝ ║  ║ ║       ║ ╚═╝╔╝    ║ ╚══╗    ║ ╚══╝ ║   ║ ║      ║   \n║         ║ ║     ║ ╔═╗ ╔╝  ║ ╔══╗ ║  ║ ║       ║ ╔═╗╚╗    ║ ╔══╝    ║ ╔═╗ ╔╝   ╚═╝      ║   \n║         ║ ║     ║ ║ ╚╗╚╗  ║ ║  ║ ║  ║ ╚════╗  ║ ║ ╚╗╚╗   ║ ╚════╗  ║ ║ ╚╗╚╗   ╔═╗      ║\n║         ╚═╝     ╚═╝  ╚═╝  ╚═╝  ╚═╝  ╚══════╝  ╚═╝  ╚═╝   ╚══════╝  ╚═╝  ╚═╝   ╚═╝      ║\n╚════════════════════════════════════════════════════════════════════════════════════════╝        
// `
// )

function menu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        pageSize: 8,
        message: `
╭────────────────────────────╮
│ WHAT WOULD YOU LIKE TO DO? │ 
╰────────────────────────────╯
`,
        choices: [
          `1. View all departments`,
          `2. View all roles`,
          `3. View all employees`,
          `4. Add a department`,
          `5. Add a role`,
          `6. Add an employee`,
          `7. Update an employee role`,
          `8. Exit (but end node on your own)`
          // can i end node for them?
        ]
      }
    ]).then((passedObject) => { // pass number to switch
      switchFunction(passedObject.choice.charAt(0))
    });
}

async function switchFunction(choice) {
  switch (choice) {
    case '1':
      viewDepartments();
      break;
    case '2':
      viewRoles();
      break;
    case '3':
      viewEmployees();
      break;
    case '4':
      addDepartment();
      break;
    case '5':
      addRole();
      break;
    case '6':
      addEmployee();
      break;
    case '7':
      updateEmployeeRole();
      break; //unnecessary but i like it
    default:
      console.log(` GoodBye!`)
      return
  }
}

// 1
function viewDepartments() {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err, results) => {
    // create a string for each row.. make super ballin
    // get all object keys .. find the largest value + 2 for side spacing
    // add them all together .. add dividers etc

    console.log('╔════╦═══════════════════════╗')
    console.log(`| id | name                  |`)
    console.log(`╠════╬═══════════════════════╣`)
    for (const element of results) {
      console.log(`║ ${element.id}  ║ ${element.name} ║`)
    }
    console.log(`╚════╩═══════════════════════╝`)

    menu();
  });
}

// 2
function viewRoles() {
  const sql = 'SELECT * FROM role';
  db.query(sql, (err, results) => {
    console.log('')
    console.log(`| id | title    | salary | department_id |`)
    console.log(`-- ----- ------ -------------`)
    for (const element of results) {
      console.log(`${element.id}  ${element.title}  ${element.salary}  ${element.department_id}`)
    }
    console.log('')
    menu();
  });
}

// 3
function viewEmployees() {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, results) => {
    console.log('')
    console.log(`| id | first_name | last_name | role_id | manager_id |`)
    console.log(`╠════╬═══════════╬═══════════╬═════════╬════════════╣`)
    for (const element of results) {
      console.log(`${element.id}  ${element.first_name}  ${element.last_name}  ${element.role_id}  ${element.manager_id}`)
    }
    console.log('')
    menu();
  });
}

// 4
async function addDepartment() {
  const sql = `INSERT INTO department 
              (name) 
              VALUES 
              (?)`;

  let params;

  // uppercase first letter after spaces 
  // split . touppercase index[0] . join

  // build department object 
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: `Enter the department name: `,
      }
    ]).then((passedObject) => { // pull name
      console.log(passedObject)
      params = passedObject.name
    });
    db.query(sql, params, (err, results) => {
      console.log(results)
      menu();
    })
}

async function addRole() {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

  let params;

  // build role object 
  // title, salary, department_id
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: `Enter the title of the role: `,
      },
      {
        type: 'number',
        name: 'salary',
        message: `Enter the salary: `,
      },
      { 
        // probably need this to be a list.. 
        // of current departments 
        type: 'number',
        name: 'department_id',
        message: `Which department: `,
      }
    ]).then(({title, salary, department_id}) => { // destructure
      params = [
        title,
        salary,
        department_id
      ]
    });

    db.query(sql, params, (err, results) => {
      console.log(results)
      menu();
    })
}

async function addEmployee() {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

  let params;
  // build employee object 
  // first_name, last_name, role_id, manager_id
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: `First name of employee: `,
      },
      {
        type: 'input',
        name: 'last_name',
        message: `Last name of employee: `,
      },
      { 
        // probably need this to be a list.. 
        // of current departments 
        type: 'number',
        name: 'role_id',
        message: `Role ID: `,
        // list roles
      },
      {
        type: 'input',
        name: 'manager_id',
        message: `Manager ID: `, 
        // list with option for null
      }
    ]).then(({first_name, last_name, role_id, manager_id}) => { // destructure
      params = [
        first_name,
        last_name,
        role_id,
        manager_id
      ]
    });

    db.query(sql, params, (err, results) => {
      console.log(results)
      menu();
    })
}

async function updateEmployeeRole() {
  const original = `SELECT employee.*, role.id 
                    AS role_id 
                    FROM employee`;

  const sql = `UPDATE candidates SET party_id = ? 
               WHERE id = ?`;

  let params;

  let employees = []
  
  //fill employees with this
  db.query(original, (err, results) => {
    console.log(results)
  })

  // await inquirer
  // .prompt([
  //   {
  //     type: 'list',
  //     name: 'first_name',
  //     message: `First name of employee: `,
  //     choices: employees
  //   }
  // ]).then(({first_name, last_name, role_id, manager_id}) => { // destructure
  //   params = [
  //     first_name,
  //     last_name,
  //     role_id,
  //     manager_id
  //   ]
  // });

  // db.query(sql, params, (err, results) => {
  //   console.log(results)
    menu();
  // })
}

menu()

// ADD VALIDATION

// MAKE THE TABLE INTERFACE SMART BUILD