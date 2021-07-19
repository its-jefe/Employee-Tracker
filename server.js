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
console.log(`╔════════════════════════════════════════════════════════════════════════════════════════╗\n║   ╔══════╗  ╔═════════╗  ╔══════╗  ╔═╗       ╔══════╗  ╔═╗   ╔═╗  ╔══════╗  ╔══════╗   ║\n║   ║ ╔════╝  ║ ╔═╗ ╔═╗ ║  ║ ╔══╗ ║  ║ ║       ║ ╔══╗ ║  ║ ║   ║ ║  ║ ╔════╝  ║ ╔════╝   ║\n║   ║ ╚═══╗   ║ ║ ║ ║ ║ ║  ║ ╚══╝ ║  ║ ║       ║ ║  ║ ║  ╚╗╚═══╝╔╝  ║ ╚═══╗   ║ ╚═══╗    ║\n║   ║ ╔═══╝   ║ ║ ╚═╝ ║ ║  ║ ╔════╝  ║ ║       ║ ║  ║ ║   ╚═╗ ╔═╝   ║ ╔═══╝   ║ ╔═══╝    ║\n║   ║ ╚════╗  ║ ║     ║ ║  ║ ║       ║ ╚════╗  ║ ╚══╝ ║     ║ ║     ║ ╚════╗  ║ ╚════╗   ║\n║   ╚══════╝  ╚═╝     ╚═╝  ╚═╝       ╚══════╝  ╚══════╝     ╚═╝     ╚══════╝  ╚══════╝   ║\n║                                                                                        ║\n║      ╔═══════╗  ╔══════╗  ╔══════╗  ╔══════╗  ╔═╗  ╔═╗   ╔══════╗  ╔══════╗   ╔═╗      ║\n║      ╚══╗ ╔══╝  ║ ╔══╗ ║  ║ ╔══╗ ║  ║ ╔════╝  ║ ║ ╔╝╔╝   ║ ╔════╝  ║ ╔══╗ ║   ║ ║      ║   \n║         ║ ║     ║ ╚══╝ ║  ║ ╚══╝ ║  ║ ║       ║ ╚═╝╔╝    ║ ╚══╗    ║ ╚══╝ ║   ║ ║      ║   \n║         ║ ║     ║ ╔═╗ ╔╝  ║ ╔══╗ ║  ║ ║       ║ ╔═╗╚╗    ║ ╔══╝    ║ ╔═╗ ╔╝   ╚═╝      ║   \n║         ║ ║     ║ ║ ╚╗╚╗  ║ ║  ║ ║  ║ ╚════╗  ║ ║ ╚╗╚╗   ║ ╚════╗  ║ ║ ╚╗╚╗   ╔═╗      ║\n║         ╚═╝     ╚═╝  ╚═╝  ╚═╝  ╚═╝  ╚══════╝  ╚═╝  ╚═╝   ╚══════╝  ╚═╝  ╚═╝   ╚═╝      ║\n╚════════════════════════════════════════════════════════════════════════════════════════╝        
`
)

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
          `8. Exit`
        ]
      }
    ]).then((passedObject) => { // pass menu-item number to switch
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
      // ends Node
      console.log(` GoodBye!`)
      process.kill(process.pid, "SIGINT");
  }
}

// 1 - FINISHED
function viewDepartments() {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err, results) => {
    // create a string for each row.. make super ballin
    // get all object keys .. find the largest value + 2 for side spacing
    // add them all together .. add dividers etc

    console.log(`| id | name                  |`)
    for (const { id, name } of results) {
      console.log(`| ${id}  | ${name} |`)
    }

    menu();
  });
}

// 2  - FINISHED
function viewRoles() {
  const sql = 'SELECT * FROM role';
  db.query(sql, (err, results) => {
    console.log('')
    console.log(`| id | title    | salary | department_id |`)
    for (const { id, title, salary, department_id } of results) {
      console.log(`${id}  ${title}  ${salary}  ${department_id}`)
    }
    console.log('')
    menu();
  });
}

// 3 : TODO: Add Department and get name by ID or just table join?
function viewEmployees() {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, results) => {
    console.log('')
    console.log(`| id | first_name | last_name | role_id | manager_id |`)
    for (const { id, first_name, last_name, role_id, manager_id } of results) {
      console.log(`${id}  ${first_name}  ${last_name}  ${role_id}  ${manager_id}`)
    }
    console.log('')
    menu();
  });
}

// 4 - FINISHED
async function addDepartment() {
  const sql = `INSERT INTO department (name) 
              VALUES (?)`;

  let params;

  // TODO: uppercase first letter after spaces 
  // split . touppercase . join

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

async function getDepartments() {
  const original = `SELECT *
                    FROM department`;
  let hodor = [];

  db.query(original, (err, results) => {
    for (row of results) {
      let { id, name } = row
      hodor.push(`${id} ${name}`)
    }   
  })

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
      type: 'list',
      name: 'department_id',
      message: `Which department: `,
      choices: hodor
    }
  ]).then(({ title, salary, department_id }) => { // destructure
    params = [
      title,
      salary,
      department_id[0]
    ]
  });

  return params;
} 
// get employees (for inquirer lists)
async function getEmployees() {
  const original = `SELECT id, first_name, last_name
                    FROM employee`;
  let employees = []

  //fill employees with this
  db.query(original, async (err, results) => {
    for (row of results) {
      let { id, first_name, last_name } = row
      employees.push(`${id}. ${first_name} ${last_name}`)
    }
    console.log(`- - - - - - - - - - - - - - - - - - - -
    `)
    console.log(employees)
    console.log(employees.length)

    await inquirer
      .prompt([
        {
          type: 'list',
          name: 'name',
          message: `Pick your emloyee: `,
          pageSize: employees.length,
          choices: employees
        }
      ]).then((choice) => { // destructure
        console.log(choice)
        console.log(choice.index)
        menu();
      });
  })
}

async function addRole() {

  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

  // build role object
  // title, salary, department_id
  let params = await getDepartments();

  console.log(params);

  db.query(sql, params, (err, results) => {
    console.log(results);
    menu();
  })
}

// NEED TO ADD DEPARTMENTS TO THIS -> queries should probably be based off of departments for choosing roles and managers 
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
        message: `Role of employee: `,
        // list roles
      },
      {
        type: 'input',
        name: 'manager_id',
        message: `Manager ID: `,
        // list with option for null
      }
    ]).then(({ first_name, last_name, role_id, manager_id }) => { // destructure
      params = [
        first_name,
        last_name,
        role_id,
        manager_id
      ]
    });

  db.query(sql, params, (err, results) => {
    console.log(results);
    menu();
  })
}


async function updateEmployeeRole() {
  const sql = `UPDATE employee SET role_id = ? 
               WHERE id = ?`;

  let employees = await getEmployees(); // to fill inquirer list


  // db.query(sql, params, (err, results) => {
  //   console.log(results)
  // menu();
  // })
}

menu()

// ADD VALIDATION

// MAKE THE TABLE INTERFACE SMART BUILD