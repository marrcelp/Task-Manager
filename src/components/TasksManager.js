import React from 'react';
import { sendTask, fetchTask, updateTask } from './tasksProvider';
// const url = 'http://localhost:3005/data';
const url = 'https://13.60.90.67/data';


class TasksManager extends React.Component {
    timer = null;
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
                console.log('Pobrane dane:', tasks);
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

        if(this.timer){
            clearInterval(this.timer)
        }

        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                return {
                    ...task,
                    isRunning: task.id === id
                };
            });
            return { tasks: newTasks };
        });

        this.timer = setInterval(() => {
            this.setState(state => {
                const newTasks = state.tasks.map(task => {
                    if(task.id === id){
                        updateTask(url, id, {time: task.time + 1, isRunning: true})
                        return {...task, time: task.time +1, isRunning: true }
                    }

                    return task;
                });

                return {
                    tasks: newTasks,
                }
            })
        }, 1000)
    }

    stopTime(id) {

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    
        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.id === id) {
                    updateTask(url, id, {isRunning: false});
                    return {...task, isRunning: false};
                }
                return task;
            });
    
            return { tasks: newTasks };
        });
    }

    finishTask(id){
        this.stopTime(id);

        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.id === id) {
                    updateTask(url, id, {isDone: true})
                    return {...task, isDone: true};
                }
                return task;
            });
            return { tasks: newTasks };
        });
    }

    removeTask(id){
        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.id === id){
                    updateTask(url, id, {isRemoved: true});
                    return {...task, isRemoved: true}
                }
                return task;
            });
            return {tasks: newTasks}
        })
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
            <div className='task'>
            <section className='task__top'>
                <h1 className='task__title' onClick={ this.onClick }>TasksManager</h1>
                <form className='task__form' onSubmit={this.submitHandler}>
                    <input name='taskName' value={ taskName } onChange={ this.inputChange } className='task__name' type='text' placeholder='Task name'></input>
                    <button className='task__button' type='submit'>Add task</button>
                </form>
            </section>
            <section className='task__bottom'>
                <ul className='task__list'>
                    {tasks
                    .filter((task) => !task.isRemoved)
                    .sort((a, b) => a.isDone - b.isDone)
                    .map((task)=> {
                        return(
                        <li className='task__element' >
                            <header className='task__header'>{task.name}</header>
                            <p className='task__timer'>{this.formatTime(task.time)}</p>
                            <div className='btn__container'>
                            <button className='task__btn' onClick={() => task.isRunning? this.stopTime(task.id) : this.incrementTime(task.id)}>{task.isRunning ? 'Stop' : 'Start'}</button>
                            <button className='task__btn' onClick={() => this.finishTask(task.id)}>zakończone</button>
                            <button className='task__btn' onClick={() => this.removeTask(task.id)} disabled={!task.isDone}>usuń</button>
                            </div>
                            <span className="material-symbols-outlined" style={{ display: task.isDone ? 'inline-block' : 'none' }}>check</span>
                        </li>
                        )
                    })}
                </ul>
            </section>
            </div>
        )
    }
}

export default TasksManager;