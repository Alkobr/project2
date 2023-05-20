const readline = require('readline');

class Task {
  constructor(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

class TodoApp {
  constructor() {
    this.tasks = [];
  }

  addTask(description, dueDate, priority) {
    const newTask = new Task(description, dueDate, priority);
    this.tasks.push(newTask);
    console.log('Task added successfully!');
  }

  listAllTasks() {
    if (this.tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      console.log('All tasks:');
      this.tasks.forEach((task, index) => {
        console.log(`${index + 1}) Description: ${task.description}`);
        console.log(`   Due Date: ${task.dueDate}`);
        console.log(`   Priority: ${task.priority}`);
        console.log(`   Status: ${task.completed ? 'Completed' : 'Incomplete'}`);
        console.log('------------------------');
      });
    }
  }

  listCompletedTasks() {
    const completedTasks = this.tasks.filter(task => task.completed);
    if (completedTasks.length === 0) {
      console.log('No completed tasks found.');
    } else {
      console.log('Completed tasks:');
      completedTasks.forEach((task, index) => {
        console.log(`${index + 1}) Description: ${task.description}`);
        console.log(`   Due Date: ${task.dueDate}`);
        console.log(`   Priority: ${task.priority}`);
        console.log('------------------------');
      });
    }
  }

  markTaskAsDone(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index].completed = true;
      console.log('Task marked as done!');
    } else {
      console.log('Invalid task index.');
    }
  }

  deleteTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      console.log('Task deleted successfully!');
    } else {
      console.log('Invalid task index.');
    }
  }

  sortTasksByDueDate() {
    if (this.tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      const sortedTasks = this.tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      console.log('Tasks sorted by due date:');
      sortedTasks.forEach((task, index) => {
        console.log(`${index + 1}) Description: ${task.description}`);
        console.log(`   Due Date: ${task.dueDate}`);
        console.log(`   Priority: ${task.priority}`);
        console.log('------------------------');
      });
    }
  }

  sortTasksByPriority() {
    if (this.tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      const sortedTasks = this.tasks.slice().sort((a, b) => a.priority - b.priority);
      console.log('Tasks sorted by priority:');
      sortedTasks.forEach((task, index) => {
        console.log(`${index + 1}) Description: ${task.description}`);
        console.log(`   Due Date: ${task.dueDate}`);
        console.log(`   Priority: ${task.priority}`);
        console.log('------------------------');
      });
    }
  }

  clearAllTasks() {
    this.tasks = [];
    console.log('All tasks cleared.');
  }

  start() {
    console.log('***************************');
    console.log('Welcome to JS TODO-APP');
    console.log('***************************');
    console.log('Select an action:');
    console.log('1) Add a new task');
    console.log('2) List all tasks');
    console.log('3) List completed tasks');
    console.log('4) Mark a task as done');
    console.log('5) Delete a task');
    console.log('6) Sort tasks by due date');
    console.log('7) Sort tasks by priority');
    console.log('8) Clear all tasks');
    console.log('9) Quit');
    console.log('***************************');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter your choice: ', (choice) => {
      switch (choice) {
        case '1':
          rl.question('Enter task description: ', (description) => {
            rl.question('Enter due date (YYYY-MM-DD): ', (dueDate) => {
              rl.question('Enter priority (1-5): ', (priority) => {
                this.addTask(description, dueDate, parseInt(priority));
                this.start();
              });
            });
          });
          break;
        case '2':
          this.listAllTasks();
          this.start();
          break;
        case '3':
          this.listCompletedTasks();
          this.start();
          break;
        case '4':
          rl.question('Enter task index to mark as done: ', (index) => {
            this.markTaskAsDone(index - 1);
            this.start();
          });
          break;
        case '5':
          rl.question('Enter task index to delete: ', (index) => {
            this.deleteTask(index - 1);
            this.start();
          });
          break;
        case '6':
          this.sortTasksByDueDate();
          this.start();
          break;
        case '7':
          this.sortTasksByPriority();
          this.start();
          break;
        case '8':
          this.clearAllTasks();
          this.start();
          break;
        case '9':
          console.log('Goodbye!');
          rl.close();
          break;
        default:
          console.log('Invalid choice.');
          this.start();
          break;
      }
    });
  }
}

const todoApp = new TodoApp();
todoApp.start();
