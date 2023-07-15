const Table = ({ day, setWeeklySchedule, weeklySchedule, index, handleChange }) => {

    //Removes element from the weekly schedule array.
    const remove = (name) => {
        console.log('cliked')
        const newArray = weeklySchedule[index].employees.filter(item => item.name !== name);
        const tempWeeklySchedule = [...weeklySchedule];
        tempWeeklySchedule[index].employees = newArray;
        console.log(tempWeeklySchedule);
        setWeeklySchedule(tempWeeklySchedule);
    }

    //adds an employee object to the employees array
    const addEmployee = (index) => {
        const tempWeeklySchedule = [...weeklySchedule];
        tempWeeklySchedule[index].employees.push({
            name: "",
            time: ""
        });
        setWeeklySchedule(tempWeeklySchedule);
    }

    //mapped through the employees array for each element in the weekly schedule array.
    const mappedEmployees = weeklySchedule[index].employees.map((employee, i) => {
        return (
            <tr key={i}>
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
                <td onClick={() => remove(weeklySchedule[index].employees[i].name)}>
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
            <tfoot>
                <tr>
                    <td style={{border: 'none'}}>
                        <button style={styles.button} onClick={(e) => addEmployee(index)}>Add employee</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

const styles = {
    button: {
        width: '100%'
    }
}

export default Table;