const ViewSchedule = ({ weeklySchedule }) => {

    const mappedWeeklySchedule = weeklySchedule.map((day) => {
        const employees = day.employees.map(emp =>
            <tr>
                <td>{emp.name}</td>
                <td>{emp.time}</td>
            </tr>
        )

        return (
            <table>
                <thead>
                    <caption>{day.day}</caption>
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

    console.log(mappedWeeklySchedule)
    return (
        <div>
            {mappedWeeklySchedule.slice(1).map(item=>item)}
        </div>
    )
}

export default ViewSchedule