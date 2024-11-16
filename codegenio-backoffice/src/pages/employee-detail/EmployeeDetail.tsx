import axios from "axios";
import { useEffect, useState } from "react";
import { EmployeeDetailProps } from "../../interfaces/Employee_List_service";
import { useParams } from "react-router-dom";
import "./EmployeeDetail.css"

function EmployeeDetail() {
    const Base_URL = "https://mgmt-api.codegenio.com/api";
    const [employees, setEmployees] = useState<EmployeeDetailProps[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    // Get token from local storage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    // Fetch employee details
    useEffect(() => {
        if (token && id) {
            axios
                .post(
                    `${Base_URL}/admin/employee/detail`,
                    { id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        setEmployees([response.data.data]); // Assuming the response contains one employee's details.
                    } else {
                        setError("Failed to fetch employee details.");
                    }
                })
                .catch(() => {
                    setError("An error occurred while fetching employee details.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [token, id]);

    // Loading and error handling
    if (loading) {
        return <div className="loader-container">Loading employee details...

            <div className="loader">
                <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                </div>
                <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                </div>
                <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                </div>
                <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                </div>
            </div>
        </div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (employees.length === 0) {
        return <div>No employee details found.</div>;
    }

    return (
        <div className="employee-detail">
            <h2>Employee Detail</h2>
            {employees.map((employee) => (
                <ul key={employee.id}>
                    <li><strong>Email:</strong> {employee.email}</li>
                    <li><strong>Description:</strong> {employee.description}</li>
                    <li><strong>Full Name:</strong> {employee.full_name}</li>
                    <li><strong>Contact 1:</strong> {employee.contact_1}</li>
                    <li><strong>Contact 2:</strong> {employee.contact_2}</li>
                    <li><strong>Address:</strong> {employee.address}</li>
                    <li><strong>Join Date:</strong> {employee.join_date}</li>
                    <li><strong>Date of Birth:</strong> {employee.dob || "Not provided"}</li>
                    <li><strong>Gender:</strong> {employee.gender}</li>
                    <li><strong>User Type:</strong> {employee.user_type}</li>
                    <li><strong>Status:</strong> {employee.status}</li>
                    <li><strong>Account Status:</strong> {employee.account_status}</li>
                    <li><strong>Email Verified At:</strong> {employee.email_verified_at || "Not verified"}</li>
                    <li><strong>Last Login:</strong> {employee.last_login || "Not logged in"}</li>
                    <li><strong>State:</strong> {employee.state || "Not provided"}</li>
                    <li><strong>Created At:</strong> {employee.created_at}</li>
                    <li><strong>Updated At:</strong> {employee.updated_at}</li>
                </ul>
            ))}
        </div>
    );
}

export default EmployeeDetail;
