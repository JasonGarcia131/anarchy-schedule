import { useState, useEffect } from "react";
import Table from "./Table";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const DAYSOFWEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SetSchedule = () => {

    const [weeklySchedule, setWeeklySchedule] = useState([
        {
            day: '',
            employees: [{
                name: '',
                time: ''
            }]
        }
    ]);

    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Loops through the DAYSOFWEEK array and sets each element equal to the day key.
    useEffect(() => {
        DAYSOFWEEK.forEach((day) => setWeeklySchedule((prevData) => [...prevData, {
            day, employees: [{
                name: '',
                time: ''
            }]
        }]))
    }, []);

    const handleChange = (e, index, i) => {
        e.preventDefault();
        const { name, value } = e.target;
        const newArray = [...weeklySchedule];
        // Handles the change of the specified element (index) for nested employee array.
        newArray[index].employees[i][name] = value;
        setWeeklySchedule(newArray);
    }

    const mappedWeeklySchedule = weeklySchedule.slice(1).map((day, index) => {
        return (
            <Table
                key={index}
                day={day.day}
                setWeeklySchedule={setWeeklySchedule}
                weeklySchedule={weeklySchedule}
                index={index + 1}
                handleChange={handleChange}
            />
        )
    })

    const save = async () => {
        setIsLoading(true);
        let newObj = {
            schedule: ""
        }
        newObj.schedule = weeklySchedule;
        // Makes a, object copy of the state variable to send the database.
        // This is to save the schedule into one document.
        newObj.schedule.shift();
        const response = await axios.put('/schedule/admin/setschedule', newObj);
        setIsLoading(false);
        response.status === 200 ? setSuccess("Schedule Sent!") : setSuccess("Something went wrong");

    }

    return (
        <div>
            {
                !isLoading
                    ? <>
                        <div style={styles.logoContainer}>
                            <img style={styles.logo} src='https://ih1.redbubble.net/image.1120040838.6734/flat,750x1000,075,f.jpg' alt="logo" />
                            <h1 style={styles.barName}>The Anarchy Library</h1>
                        </div>
                        {
                            success.length > 0
                                ? (
                                    <div style={styles.successContainer}>
                                        <p style={styles.successMessage}>{success}</p>
                                        <Link to='/viewschedule'>View Schedule</Link>
                                    </div>
                                )
                                : (
                                    <>
                                        {mappedWeeklySchedule}
                                        <button onClick={() => save()}>Save Schedule</button>
                                    </>

                                )

                        }
                    </>
                    : <div style={{ textAlign: 'center' }}>
                        <ClipLoader
                            size={150}
                            color="blue"
                        />
                    </div>
            }

        </div >
    )
}

const styles = {
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
    successContainer: {
        width: '100%',
        padding: '10px',
        border: '2px solid red',
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        justifyContent: 'center'
    },
    successMessage: {
        color: 'white',
        fontSize: '1.5rem'
    }
}

export default SetSchedule;