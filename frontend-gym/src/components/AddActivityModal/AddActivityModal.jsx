import React, { useState } from 'react'
import './addActivityModal.css'
import { IoCloseSharp } from "react-icons/io5";
import AddedActivitiesInModal from '../AddedActivitiesInModal/AddedActivitiesInModal';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const AddActivityModal = ({ setOpenModal }) => {
    const [activity, setActivity] = useState({ activities: [] })
    const [error, setError] = useState("")
    
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "date") {
            // Convert date to epoch timestamp at midnight of that day
            const epochDate = new Date(value).setHours(0, 0, 0, 0)
            setActivity({ ...activity, [name]: epochDate })
        } else {
            setActivity({ ...activity, [name]: value })
        }
    }

    // Helper function to format epoch to YYYY-MM-DD for date input
    const formatDateForInput = (epoch) => {
        if (!epoch) return ""
        const date = new Date(epoch)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
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

    const createActivity = async (e) => {
        e.preventDefault()
        
        if (!activity.date || !activity.inTime || !activity.outTime) {
            setError("Please fill in all date and time fields")
            return
        }

        if (!activity.activities || activity.activities.length === 0) {
            setError("Please add at least one activity")
            return
        }

        // Create date in UTC
        const activityDate = new Date(activity.date)
        const [inHours, inMinutes] = activity.inTime.split(':')
        const [outHours, outMinutes] = activity.outTime.split(':')

        // Create UTC timestamps
        const inTimeDate = new Date(activityDate)
        inTimeDate.setUTCHours(parseInt(inHours), parseInt(inMinutes), 0, 0)
        
        const outTimeDate = new Date(activityDate)
        outTimeDate.setUTCHours(parseInt(outHours), parseInt(outMinutes), 0, 0)

        const reqBody = {
            ...activity,
            date: activityDate.getTime(),
            inTime: inTimeDate.getTime(),
            outTime: outTimeDate.getTime()
        }

        try {
            const response = await fetch("http://localhost:5000/api/log/activity", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify(reqBody)
            })
            
            if (!response.ok) {
                throw new Error('Failed to create activity')
            }

            const data = await response.json()
            console.log('Activity created:', data)
            setOpenModal(false)
        } catch (error) {
            console.error('Error creating activity:', error)
            setError("Failed to create activity. Please try again.")
        }
    }

    return (
        <div className='centered-content'>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className='text-secondary'>Add an activity</h3>
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
                    />
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
