import { useEffect, useState } from "react";
import axios from "../api/axios";

const DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ViewSchedule = () => {

    const [weeklySchedule, setWeeklySchedule] = useState([]);
    const [updated, setUpdated] = useState("");

    useEffect(() => {
        getSchedule();
    }, []);

    const getSchedule = async () => {
        const response = await axios.get('/schedule');
        setWeeklySchedule(response.data[0].schedule);
        //Gets the day from timestamp
        const date = new Date(response.data[0].createdAt);
        let day = date.getDay();
        let dayOfWeek = DAYSOFWEEK[day-1];
        setUpdated(dayOfWeek);
    }

    const mappedWeeklySchedule = weeklySchedule.map((day, i) => {

        //Loops through employees array for each day of the week.
        const employees = day.employees.map((emp, i) =>
            <tr key={i}>
                <td>{emp.name}</td>
                <td>{emp.time}</td>
            </tr>
        )

        return (
            <table key={i}>
                <caption>{day.day}</caption>
                <thead>
                    <tr>
                        <th>
                            Employee Name
                        </th>
                        <th>
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees}
                </tbody>
            </table>

        )
    })

    return (
        <div>
            <p style={{ color: "white" }}>Last Updated:</p>
            <h1 style={{ color: "white" }}>{updated}</h1>
            {mappedWeeklySchedule.map(item => item)}
        </div>
    )
}

export default ViewSchedule