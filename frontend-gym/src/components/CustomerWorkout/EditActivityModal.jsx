import React, { useState, useEffect } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import AddedActivitiesInModal from '../AddedActivitiesInModal/AddedActivitiesInModal';
import './EditActivityModal.css';

const EditActivityModal = ({ setOpenModal, activityData, setIsReload }) => {
    const [activity, setActivity] = useState({ activities: [] })
    
    useEffect(() => {
        if (activityData) {
            setActivity({
                ...activityData,
                inTime: formatTime(new Date(activityData.inTime)),
                outTime: formatTime(new Date(activityData.outTime)),
                date: formatDate(new Date(activityData.inTime))
            });
        }
    }, [activityData]);

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setActivity({ ...activity, [name]: value })
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
        e.preventDefault()
        // Convert date and times to epoch
        const inTimeStr = `${activity.date}T${activity.inTime}`;
        const outTimeStr = `${activity.date}T${activity.outTime}`;
        const inTimeEpoch = new Date(inTimeStr).getTime();
        const outTimeEpoch = new Date(outTimeStr).getTime();

        const reqBody = {
            ...activity,
            inTime: inTimeEpoch,
            outTime: outTimeEpoch
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
            const data = await response.json();
            console.log(data);
            setIsReload(true);
            setOpenModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='centered-content'>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className='text-secondary'>Edit activity</h3>
                <button onClick={() => { setOpenModal(false) }} className="btn btn-danger btn-sm"><IoCloseSharp size={20} /></button>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date of your Workout</label>
                    <input onChange={handleChange} type="date" className='form-control' name="date" id="date" value={activity.date} disabled />
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