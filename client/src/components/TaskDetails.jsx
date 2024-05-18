import { useState } from 'react';
import { useTasksContext } from "../hooks/useTasksContext.jsx";
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import axios from '../api/axios'

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();
    const [completed, setCompleted] = useState(task.complete);

    const deleteTask = async () => {
        if (!user) {
            console.error('User not logged in');
            return;
        }
        const response = await axios.delete('/tasks/' + task._id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (response.status === 401) {
            console.error('Unauthorized access');
            return;
        }
        const json = await response.data;
        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: json });
        }
    };

    const completeTask = async () => {
        if (!user) {
            console.error('User not logged in');
            return;
        }
        try {
            const response = await axios.put(`/tasks/${task._id}`, { complete: !completed },{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });
            if (response.status === 401) {
                console.error('Unauthorized access');
                return;
            }
            if (response.ok) {
                const updatedTask = await response.data;
                setCompleted(updatedTask.complete);
                dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <div className={"task-details " + (completed ? "is-complete" : "")}>
            <input type="checkbox" className="checkbox" checked={completed} onChange={completeTask} />
            <div className="text">
                <h4>{task.title}</h4>
                <p>{task.desc}</p>
            </div>
            <div>
                <span onClick={deleteTask}><ion-icon name="trash-outline" size="large"></ion-icon></span>
            </div>
        </div>
    );
}

export default TaskDetails;
