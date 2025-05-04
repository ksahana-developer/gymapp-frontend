import React from 'react'

const AddedActivitiesInModal = ({ ind, act, setActivities, activity }) => {
    const deleteActivity = (ind) => {
        console.log('index is : ', ind)
        const afterRemoval = activity?.activities?.filter((_, index) => index !== ind)
        console.log(afterRemoval, 'after removal')
        setActivities({ ...activity, activities: afterRemoval })
    }
    return (
        <div className="d-flex align-items-end gap-2">
            <div className="d-flex flex-column gap-1">
                <label htmlFor="activityType" className="form-label m-0">Activity Type</label>
                <input value={act?.type} disabled type="text" className='form-control' name="activityType" id="activityType" />
            </div>
            <div className="d-flex flex-column gap-1">
                <label htmlFor="calories" className="form-label m-0">Calories Burnt</label>
                <input value={act?.calories} disabled type="number" className='form-control' name="calories" id="calories" />
            </div>
            <button onClick={(e) => {
                e.preventDefault()
                deleteActivity(ind)
            }} className="btn btn-danger btn-sm">Remove</button>
        </div>
    )
}

export default AddedActivitiesInModal
