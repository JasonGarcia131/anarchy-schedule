import { Link } from "react-router-dom";

const Admin = () => {
    return(
        <div>
            <Link to='/setschedule'>Set Schedule</Link>
            <Link to='/admin/viewschedule'>View Schedule</Link>
        </div>
    )
}

export default Admin;