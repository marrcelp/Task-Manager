![demo gif](./src/assets/demo-tasktimer.gif)

# TasksManager – Your Personal Task Timer

See the live version of this project:

- 🕒 [User interface](https://marrcelp.github.io/Task-Manager/)

The goal of this project is to create a simple but functional task timer app that demonstrates interaction with a REST API. Users can add tasks, track the time spent on them, and mark tasks as completed or removed. All operations are persisted via a backend API.

Each task has a built-in stopwatch, which can be started and stopped manually. Once a task is marked as done, it becomes eligible for deletion from the UI. However, all tasks (including removed ones) are still stored in the backend for future reference.

**Main features**:
- Adding new tasks with a custom name.
- Tracking time for each task individually with start/stop buttons.
- Marking tasks as completed (displays a green tick).
- Removing completed tasks from the list (but not from the database).
- Persisting all task data to an external API (`https://13.60.90.67/data`).

---

## 💡 Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![REST API](https://img.shields.io/badge/REST%20API-%23000000.svg?style=for-the-badge&logo=api&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

---

## 💿 Installation

The project uses [npm](https://www.npmjs.com/). To install it, type into the terminal:

```bash
npm install
```
To run the project locally:

```bash
npm start
```
Then open:

- `http://localhost:3000` to view the app in the browser.

API is hosted on a self-configured AWS server and available at:

🔗 `https://13.60.90.67/data`

> ⚠️ **Important:** Since the API uses a self-signed certificate, you may need to open the API URL directly in your browser, click “Advanced” → “Proceed”, and accept the exception **once per browser** to avoid CORS/HTTPS issues.

---

## 🔧 Core functionality

| Feature               | Implementation                                    | Code Snippet                           |
|-----------------------|----------------------------------------------------|----------------------------------------|
| Add a task            | Using form and POST request to the API            | `sendTask(url, newTask)`               |
| Track time with timer | `setInterval` updates time every second           | `this.timer = setInterval(...)`        |
| Mark task as done     | PATCH with `isDone: true`                         | `updateTask(url, id, { isDone: true })`|
| Remove task           | PATCH with `isRemoved: true`                      | `updateTask(url, id, { isRemoved: true })`|

### ⏱ Time formatting

Each task's time is displayed in `hh:mm:ss` format. Example output: `00:10:32`

```js
formatTime = (totalSeconds) => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
```
## 🔮 Future Improvements

In future versions of the **TasksManager**, I would like to enhance the app with the following features:

### 📅 Task Date & Time History

Currently, the app tracks the **total time** spent on a task, but it doesn’t store **when** the task was performed. I want to implement:

- Saving the **exact date** and **time range** (start → stop) for each session a task is running.
- Creating a **list of time entries** for each task – so users can view the full history of when a task was worked on.

Example:
✅ Task: "Write blog post"
▶ 2025-04-24 | 14:03 – 14:45
▶ 2025-04-25 | 09:00 – 09:25

This will make the app more useful for time reporting, personal productivity, and even billing if used professionally.


This will make the app more useful for time reporting, personal productivity, and even billing if used professionally.

---

## 🙋‍♂️ Feel free to contact me

Write sth nice ;) Find me on:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcel-piaszczyk-200ba8181/)
[![Gmail](https://img.shields.io/badge/Gmail-%23D14836.svg?style=for-the-badge&logo=gmail&logoColor=white)](mailto:marcel.piaszczyk@gmail.com)

---

## 👏 Special thanks

Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for support and code review.
