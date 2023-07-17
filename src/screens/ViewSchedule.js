import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "../api/axios";

const DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ViewSchedule = () => {

    const [weeklySchedule, setWeeklySchedule] = useState([]);
    const [updated, setUpdated] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getSchedule();
    }, []);

    const getSchedule = async () => {
        // Controller to abort requests
        const controller = new AbortController();
        setIsLoading(true);
        const response = await axios.get('/schedule', {
            signal: controller.signal
        });
        setWeeklySchedule(response.data[0].schedule);
        controller.abort();
        // Gets the day from timestamp in a numerical value.
        const date = new Date(response.data[0].createdAt);
        let day = date.getDay();
        let dayOfWeek = day === 0 ? DAYSOFWEEK[6] : DAYSOFWEEK[day - 1];
        setUpdated(dayOfWeek);
        setIsLoading(false)
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
            {
                isLoading
                    ?
                    <div style={styles.loader}>
                        <ClipLoader
                            size={130}
                            color="blue"
                        />
                    </div>
                    : <>
                        <div style={styles.logoContainer}>
                            <img style={styles.logo} src='https://ih1.redbubble.net/image.1120040838.6734/flat,750x1000,075,f.jpg' alt="logo" />
                            <h1 style={styles.barName}>The Anarchy Library</h1>
                        </div>
                        <p style={{ color: "white" }}>Last Updated:</p>
                        <h1 style={{ color: "white" }}>{updated}</h1>
                        {mappedWeeklySchedule.map(item => item)}
                    </>
            }

        </div>
    )
}

const styles = {
    loader: {
        display: 'flex',
        placeItems: 'center',
        placeContent: 'center',
        height: '100vh',
        width: '100%'
    },
    logoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    logo: {
        width: '20%'
    },
    barName: {
        width: '80%',
        color: 'white'
    },
}

export default ViewSchedule