import React, { useState, useEffect } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import AddedActivitiesInModal from '../AddedActivitiesInModal/AddedActivitiesInModal';
import './EditActivityModal.css';

const EditActivityModal = ({ setOpenModal, activityData, setIsReload }) => {
    const [activity, setActivity] = useState({ activities: [] })
    const [error, setError] = useState("")
    
    useEffect(() => {
        if (activityData) {
            // Extract date and convert times to UTC
            const inDate = new Date(activityData.inTime)
            const date = new Date(inDate).setUTCHours(0, 0, 0, 0)
            
            setActivity({
                ...activityData,
                date,
                inTime: formatTimeForInput(new Date(activityData.inTime)),
                outTime: formatTimeForInput(new Date(activityData.outTime))
            });
        }
    }, [activityData]);

    const formatTimeForInput = (date) => {
        return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
    };

    const formatDateForInput = (epoch) => {
        if (!epoch) return "";
        const date = new Date(epoch);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "date") {
            // Convert date to epoch timestamp at midnight
            const epochDate = new Date(value).setUTCHours(0, 0, 0, 0);
            setActivity({ ...activity, [name]: epochDate });
        } else {
            setActivity({ ...activity, [name]: value });
        }
    }

    const [workoutValues, setWorkoutValues] = useState({ type: "", calories: '' })
    const handleWorkoutValuesChange = (e) => {
        const { name, value } = e.target
        setWorkoutValues({ ...workoutValues, [name]: value })
    }

    const addWorkoutToList = (e) => {
        e.preventDefault()
        setActivity({ ...activity, activities: [...activity.activities, workoutValues] })
        setWorkoutValues({ type: "", calories: "" })
    }

    const updateActivity = async (e) => {
        e.preventDefault();
        
        if (!activity.date || !activity.inTime || !activity.outTime) {
            setError("Please fill in all date and time fields");
            return;
        }

        if (!activity.activities || activity.activities.length === 0) {
            setError("Please add at least one activity");
            return;
        }

        // Split times into hours and minutes
        const [inHours, inMinutes] = activity.inTime.split(':')
        const [outHours, outMinutes] = activity.outTime.split(':')

        // Create UTC timestamps
        const activityDate = new Date(activity.date)
        
        const inTimeDate = new Date(activityDate)
        inTimeDate.setUTCHours(parseInt(inHours), parseInt(inMinutes), 0, 0)
        
        const outTimeDate = new Date(activityDate)
        outTimeDate.setUTCHours(parseInt(outHours), parseInt(outMinutes), 0, 0)

        const reqBody = {
            ...activity,
            date: activityDate.getTime(),
            inTime: inTimeDate.getTime(),
            outTime: outTimeDate.getTime()
        };

        try {
            const response = await fetch(`http://localhost:5000/api/log/${activity.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify(reqBody)
            });
            
            if (!response.ok) {
                throw new Error('Failed to update activity');
            }

            const data = await response.json();
            console.log('Activity updated:', data);
            setIsReload(true);
            setOpenModal(false);
        } catch (error) {
            console.error('Error updating activity:', error);
            setError("Failed to update activity. Please try again.");
        }
    }

    return (
        <div className='centered-content'>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className='text-secondary'>Edit activity</h3>
                <button onClick={() => { setOpenModal(false) }} className="btn btn-danger btn-sm"><IoCloseSharp size={20} /></button>
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date of your Workout</label>
                    <input 
                        onChange={handleChange}
                        type="date"
                        className='form-control'
                        name="date"
                        id="date"
                        value={formatDateForInput(activity.date)}
                        disabled
                    />
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2" style={{ width: "100%" }} >
                    <div className="mb-3" style={{ width: "50%" }} >
                        <label htmlFor="inTime" className="form-label">Workout Started At</label>
                        <input onChange={handleChange} type="time" id="inTime" className='form-control' name="inTime" value={activity.inTime} />
                    </div>
                    <div className="mb-3" style={{ width: "50%" }}>
                        <label htmlFor="outTime" className="form-label">Workout finished at</label>
                        <input onChange={handleChange} type="time" id="outTime" className='form-control' name="outTime" value={activity.outTime} />
                    </div>
                </div>
                <div className="d-flex flex-column gap-2 mb-3">
                    {activity?.activities?.map((act, ind) => (
                        <AddedActivitiesInModal key={ind} ind={ind} act={act} setActivities={setActivity} activity={activity} />
                    ))}
                </div>

                <div className="d-flex mb-3" role="search">
                    <select value={workoutValues?.type} onChange={handleWorkoutValuesChange} name='type' className="form-select form-select-sm me-2" aria-label=".form-select-sm example">
                        <option value="">Select Activity</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Jogging">Jogging</option>
                        <option value="Walking">Walking</option>
                        <option value="Weight Training">Weight Training</option>
                    </select>
                    <input value={workoutValues?.calories} onChange={handleWorkoutValuesChange} name='calories' className="form-control me-2" type="search" placeholder="180 Cal 🔥.." aria-label="Search" />
                    <button disabled={workoutValues?.type === '' || workoutValues?.calories === 0 || workoutValues?.calories === ""} onClick={addWorkoutToList} className="btn btn-primary btn-sm" >Add</button>
                </div>
                <button onClick={updateActivity} className="btn btn-primary btn-sm">Update Activity</button>
            </form>
        </div>
    )
}

export default EditActivityModal