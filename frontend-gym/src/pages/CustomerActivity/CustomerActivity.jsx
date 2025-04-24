import React, { useState } from 'react'
// import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CustomerActivityLog from '../../components/CustomerActivityLog/CustomerActivityLog';

const CustomerActivity = () => {
  const getMonth = (month) => {
    if (month === 0) {
      return "Jan"
    } else if (month === 1) {
      return "Feb"
    } else if (month === 2) {
      return "Mar"
    } else if (month === 3) {
      return 'Apr'
    }
    else if (month === 4) {
      return "May"
    } else if (month === 5) {
      return "June"
    } else if (month === 6) {
      return "July"
    } else if (month === 7) {
      return "Aug"
    } else if (month === 8) {
      return "Sep"
    } else if (month === 9) {
      return "Oct"
    } else if (month === 10) {
      return 'Nov'
    }
    else if (month === 11) {
      return 'Dec'
    }
    else {
      return 'Invalid month'
    }
  }
  const [date, setDate] = useState(new Date())
  console.log(date, typeof (date))
  console.log(`${(new Date(date)).getDate()} ${getMonth((new Date(date)).getMonth())} ${(new Date(date)).getFullYear()}`)

  
  return (
    <div className='d-flex flex-column border border-white rounded-2 p-2 mt-3 mx-2' >
      <h5 className='mb-2' >{`${(new Date(date)).getDate()} ${getMonth((new Date(date)).getMonth())} ${(new Date(date)).getFullYear()}`} </h5>
      <div className="d-flex flex-column ">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="d-flex flex-column p-2">
        <h5>Your recent Activities</h5>
        <CustomerActivityLog/>
      </div>
    </div>
  )
}

export default CustomerActivity
