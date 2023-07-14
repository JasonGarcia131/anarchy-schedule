import { useState, useEffect } from "react";
import Table from "./Table";
import ViewSchedule from "../screens/ViewSchedule";

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

    const save = () => {
        console.log(weeklySchedule)
    }

    return (
        <div>
            <div style={styles.logoContainer}>
                <img style={styles.logo} src='https://ih1.redbubble.net/image.1120040838.6734/flat,750x1000,075,f.jpg' alt="logo" />
                <h1 style={styles.barName}>The Anarchy Library</h1>
            </div>
            {mappedWeeklySchedule}
            <button onClick={() => save()}>Save Schedule</button>
            <ViewSchedule weeklySchedule={weeklySchedule}/>
        </div>
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
    }
}

export default SetSchedule;