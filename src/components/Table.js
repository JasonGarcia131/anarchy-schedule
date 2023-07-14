
const Table = ({day, setWeeklySchedule, weeklySchedule, index, handleChange}) => {
    
    const remove = (name, i) => {
        const newArray = weeklySchedule[index].employees.filter(item=>item.name != name);
        const tempWeeklySchedule = [...weeklySchedule];
        tempWeeklySchedule[index].employee = newArray;
        setWeeklySchedule(tempWeeklySchedule);
    }

    const addEmployee = (index) => {
        const tempWeeklySchedule = [...weeklySchedule];
        tempWeeklySchedule[index].employees.push({
            name: "",
            time: ""
        });
        setWeeklySchedule(tempWeeklySchedule);
    }

    const mappedEmployees = weeklySchedule[index].employees.map((employee, i) => {
        return (
            <tr>
                <td>
                    <select onChange={(e) => handleChange(e, index, i)} name="time" value={weeklySchedule[index].employees[i].time}>
                        <option defaultValue>Time</option>
                        <option>8:30 PM</option>
                        <option>10:30 PM</option>
                        <option>11:00 PM</option>
                    </select>
                </td>
                <td>
                    <select onChange={(e) => handleChange(e, index, i)} name="name" value={weeklySchedule[index].employees[i].name}>
                        <option defaultValue>Employee</option>
                        <option>Bam</option>
                        <option>Zee</option>
                        <option>Seline</option>
                    </select>
                </td>
                <td onClick={()=>remove(weeklySchedule[index].employees[i].name, i)}>
                    x
                </td>
            </tr>
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        {day}
                    </th>
                    <th>
                        Employee Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {mappedEmployees}
            </tbody>
            <button style={styles.button} onClick={(e)=>addEmployee(index)}>Add employee</button>
        </table>
    )
}

const styles = {
    button: {
        width: '100%'
    }
}

export default Table;