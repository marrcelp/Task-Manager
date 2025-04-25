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

## ❗️ First-time setup notice

For security reasons, the API is hosted with a **self-signed HTTPS certificate**.  
Before using the app for the first time, you need to manually visit the API link and confirm your browser's security exception:

🔗 https://13.60.90.67

Steps:

1. Open the link above in your browser.
2. Click **“Advanced”** → **“Proceed to 13.60.90.67 (unsafe)”**.
3. Return to the app – it will now be able to fetch data from the API correctly.

> ✅ This only needs to be done **once per browser**.


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

- `http://localhost:4000` to view the app in the browser.

To start the backend, you don't need to run anything locally. The API is already live and running on a server I configured myself on AWS using json-server. It is served over HTTPS with a self-signed certificate using Nginx as a reverse proxy.

API endpoints:

🔗 `https://13.60.90.67/data`

## 🛠️ AWS Server Configuration (short overview)

I manually set up an **Ubuntu-based EC2 instance on AWS** to host the API for this project.

After configuring the firewall and opening the necessary ports (4000 for the app and 443 for HTTPS), I:

- Installed **Node.js** on the server.
- Globally installed **json-server** for quick REST API setup.
- Created a `data.json` file to store the task data.
- Used **PM2** to run the json-server process in the background and keep it alive after reboots.

The API runs on port `4000`, and I configured **Nginx as a reverse proxy** to expose it securely via HTTPS on port `443`.

### 👇 Example PM2 setup command:

```bash
pm2 start json-server --name tasks-api -- \
  --watch /home/ubuntu/tasksmanager/data.json --port 4000
pm2 save
```

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

#### 📅 Task Date & Time History

Currently, the app tracks the **total time** spent on a task, but it doesn’t store **when** the task was performed. I want to implement:

- Saving the **exact date** and **time range** (start → stop) for each session a task is running.
- Creating a **list of time entries** for each task – so users can view the full history of when a task was worked on.

**Example:**

```text
✅ Task: "Write blog post"
▶ 2025-04-24 | 14:03 – 14:45
▶ 2025-04-25 | 09:00 – 09:25
```

This will make the app more useful for time reporting and personal productivity.

---

## 🙋‍♂️ Feel free to contact me

Write sth nice ;) Find me on:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcel-piaszczyk-200ba8181/)
[![Gmail](https://img.shields.io/badge/Gmail-%23D14836.svg?style=for-the-badge&logo=gmail&logoColor=white)](mailto:marcel.piaszczyk@gmail.com)

---

## 👏 Special thanks

Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for support and code review.
