import React, { act, useState } from 'react'
import './addActivityModal.css'
import { IoCloseSharp } from "react-icons/io5";
import AddedActivitiesInModal from '../AddedActivitiesInModal/AddedActivitiesInModal';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const AddActivityModal = ({ setOpenModal }) => {
    const [activity, setActivity] = useState({ activities: [] })
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
    // const [value, setValue] = useState('2022-04-17T15:30');
    const createActivity = async (e) => {
        // Combine date and inTime
        const inTimeStr = `${activity?.date}T${activity?.inTime}`
        const outTimeStr = `${activity?.date}T${activity?.outTime}`

        // Convert to epoch timestamps
        const inTimeEpoch = new Date(inTimeStr).getTime()
        const outTimeEpoch = new Date(outTimeStr).getTime()
        const reqBody = {
            ...activity,
            inTime: inTimeEpoch,
            outTime: outTimeEpoch,
            // date: activity?.date // should find an approach to convert date, inTime & outTime to epoch
        }
        console.log(reqBody, reqBody?.inTime, 'inTime')
        try {
            e.preventDefault()
            const response = await fetch("http://localhost:5000/api/log/activities", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify(activity)
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='centered-content'>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className='text-secondary'>Add an activity</h3>
                <button onClick={() => { setOpenModal(false) }} className="btn btn-danger btn-sm"><IoCloseSharp size={20} /></button>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date of your Workout</label>
                    <input onChange={handleChange} type="date" className='form-control' name="date" id="date" />
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2" style={{ width: "100%" }} >
                    <div className="mb-3" style={{ width: "50%" }} >
                        <label htmlFor="inTime" className="form-label">Workout Started At</label>
                        <input onChange={handleChange} type="time" id="inTime" className='form-control' name="inTime" />
                    </div>
                    <div className="mb-3" style={{ width: "50%" }}>
                        <label htmlFor="outTime" className="form-label">Workout finised at</label>
                        <input onChange={handleChange} type="time" id="outTime" className='form-control' name="outTime" />
                    </div>
                </div>
                <div className="d-flex flex-column gap-2 mb-3">
                    {activity?.activities?.map((act, ind) => {
                        return (
                            <AddedActivitiesInModal ind={ind} act={act} setActivities={setActivity} activity={activity} />
                        )
                    })}
                </div>

                <div class="d-flex mb-3" role="search">
                    <select value={workoutValues?.type} onChange={handleWorkoutValuesChange} name='type' class="form-select form-select-sm me-2" aria-label=".form-select-sm example">
                        <option value="" selected>Select Activity</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Jogging">Jogging</option>
                        <option value="Walking">Walking</option>
                        <option value="Weight Training">Weight Training</option>
                    </select>
                    <input value={workoutValues?.calories} onChange={handleWorkoutValuesChange} name='calories' class="form-control me-2" type="search" placeholder="180 Cal 🔥.." aria-label="Search" />
                    <button disabled={workoutValues?.type === '' || workoutValues?.calories === 0 || workoutValues?.calories === ""} onClick={addWorkoutToList} class="btn btn-primary btn-sm" >Add</button>
                </div>
                <button onClick={createActivity} className="btn btn-primary btn-sm">Add Activity Log</button>
            </form>
        </div>
    )
}

export default AddActivityModal
