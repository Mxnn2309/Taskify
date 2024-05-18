import { useEffect } from "react";

import axios from '../api/axios'

import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Todo = () => {
    const { tasks, dispatch } = useTasksContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchTasks = async () => {
            if (!user) {
                console.error('User not logged in');
                return;
            }
            const response = await axios.get('/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            
            if (response.status === 401) {
                console.error('Unauthorized access');
                return;
            }
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_TASKS', payload: json });
            }
        };
        

        fetchTasks();
    }, [dispatch, user]);

    return (
        <div className="todo">
            <TaskForm />
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Todo;