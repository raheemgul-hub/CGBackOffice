// 
import "./EmployeeList.css"
import { useEffect, useState } from "react";
import { EmployeeListProps } from "../../interfaces/Employee_List_service";
import axios from "axios";
import { Link } from "react-router-dom";
import EmployeeActivation from "../employee-activation/EmployeeActivation";
import EmployeeDeActivation from "../employee-deactivation/EmployeeDeActivation";
import EmployeeDelete from "../employee-delete/EmployeeDelete";

function EmployeeList() {

    // initializations 
    const Base_URL = 'https://mgmt-api.codegenio.com/api';
    const RelativePath = '/admin/employee/list';
    const [employees, setEmployees] = useState<EmployeeListProps[]>([]);
    const [token, setToken] = useState("");

    //get token from local storage
    useEffect(() => {
        const storedData = localStorage.getItem("token");
        if (storedData) {
            setToken(storedData);
        }
    }, []);


    // get data from backend
    useEffect(() => {
        if (token) {
            axios.get(Base_URL + RelativePath, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                if (response.data.success) {
                    setEmployees(response.data.data);
                    console.log(response);
                } else {
                    console.log('Something is wrong with backend server');
                }
            });
        }
    }, [token]);
    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Employee List</h2>
                <Link to="/employee-add">
                    <button className="add-employee-button">Add Employee <i className="fa-solid fa-plus add"></i></button>
                </Link>
            </div>
            <div className="table-scroll">
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Contacts</th>
                            <th>Address</th>
                            <th>Join Date</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Account Status</th>
                            <th>Email Verified</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.full_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.gender}</td>
                                <td className="contact">{employee.contact_1}<br />{employee.contact_2}</td>
                                <td>{employee.address}</td>
                                <td>{employee.join_date}</td>
                                <td>{employee.status}</td>
                                <td>{employee.description}</td>
                                <td>{employee.account_status}</td>
                                <td>{employee.email_verified_at ? "Verified" : "Not Verified"}</td>
                                <td>
                                    <div className="icons">
                                        <EmployeeActivation id={employee.id} token={token} />
                                        <EmployeeDeActivation id={employee.id} token={token} />
                                    </div>
                                </td>
                                <td>
                                    <div className="icons">
                                        <EmployeeDelete id={employee.id} token={token} />
                                        <Link to={`/employee-update/${employee.id}`}>
                                            <i className="fa-solid fa-pen-to-square update"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default EmployeeList