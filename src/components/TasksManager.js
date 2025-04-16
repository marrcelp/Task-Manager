import React from 'react';
import { sendTask, fetchTask } from './tasksProvider';
const url = 'http://localhost:3005/data';

class TasksManager extends React.Component {
    state = {
        tasks: [],
        taskName: '',
        time: 0,
        isRunning: false,
        isDone: false,
        isRemoved: false
    }

    componentDidMount(){
        fetchTask(url)
            .then(tasks => {
                this.setState({
                    tasks: tasks
                })
            })
            .catch(err => {
                console.error('Blad przy pobieraniu danych:', err);
            })
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log(tasks)
    }

    addTask = (task) => {
        this.setState({
            tasks: [...this.state.tasks, task]
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        
        const { taskName, time } = this.state;
        if(taskName){
            const newTask = {
                name: taskName,
                time: parseInt(time),
                isRunning: false,
                isDone: false,
                isRemoved: false
            }

            sendTask(url, newTask)
                .then((savedTask) => {
                    this.setState({
                        tasks: [...this.state.tasks, savedTask],
                        taskName: ''
                    }, () => console.log(this.state.tasks))
                })
                .catch((err) =>{
                    alert('Blad przy zapisie zadania. Spróbuj ponownie');
                    console.error('Blad przy zapisie taska:', err);
                })

        } else {
            alert ('Pole Task name nie moze być puste!');
        }

    }

    inputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    incrementTime(id){
        const timer = setInterval(() => {
            this.setState(state => {
                const newTasks = state.tasks.map(task => {
                    if(task.id === id){
                        return {...task, time: task.time +1 }
                    }

                    return task;
                });

                return {
                    tasks: newTasks,
                }
            })
        }, 1000)
    }

    formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
    
        return `${hours}:${minutes}:${seconds}`;
    }
    

    render() {
        const { taskName, tasks } = this.state;
        return (
            <>
            <section>
                <h1 onClick={ this.onClick }>TasksManager</h1>
                <form className='task__form' onSubmit={this.submitHandler}>
                    <input name='taskName' value={ taskName } onChange={ this.inputChange } className='task__name' type='text' placeholder='Task name'></input>
                    <button className='task__button' type='submit'>Add task</button>
                </form>
            </section>
            <section>
                <ul>
                    {tasks.map((task)=> {
                        return(
                        <li>
                            <header>{task.name}, {this.formatTime(task.time)}</header>
                            <button onClick={() => this.incrementTime(task.id)}>start/stop</button>
                            <button>zakończone</button>
                            <button disabled="true">usuń</button>
                        </li>
                        )
                    })}
                </ul>
            </section>
            </>
        )
    }
}

export default TasksManager;