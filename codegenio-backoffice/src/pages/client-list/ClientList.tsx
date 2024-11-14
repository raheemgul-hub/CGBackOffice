// ClientList.tsx
import { Link } from "react-router-dom";
import "./ClientList.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { ClientListProps } from "../../interfaces/Client_List_Service";
import ClientActivate from "../client-activate/ClientActivate";
import ClientDelete from "../client-delete/ClientDelete";
import ClientDeactivate from "../client-deactivate/ClientDeactivate";
function ClientList() {

    // initializations 
    const Base_URL = 'https://mgmt-api.codegenio.com/api';
    const RelativePath = '/admin/client/list';
    const [users, setUsers] = useState<ClientListProps[]>([]);
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
                    setUsers(response.data.data.data);
                    console.log(response);
                } else {
                    console.log('Something is wrong with backend server');
                }
            });
        }
    }, [token]);


    return (
        <div className="list">
            <div className="review-table-container">
                <div className="review-header">
                    <h2>Client List</h2>
                    <Link to="/client-add">
                        <button className="add-review-button">Add Client<i className="fa-solid fa-plus add"></i></button>
                    </Link>
                </div>
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No</th>
                            <th>Whatsapp No</th>
                            <th>Status</th>
                            <th>Source</th>
                            <th>Actions</th>
                            <th> Activate Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data: any) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.full_name}</td>
                                <td>{data.email}</td>
                                <td>{data.contact_1}</td>
                                <td>{data.whatsapp_contact}</td>
                                <td>{data.status}</td>
                                <td>{data.source}</td>
                                <td>
                                    <div className="icons">
                                        <ClientDelete id={data.id} token={token} />
                                        <Link to={`/client-update/${data.id}`}>
                                            <i className="fa-solid fa-pen-to-square update"></i>
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    <div className="icons">
                                        <ClientActivate id={data.id} token={token} />
                                        <ClientDeactivate id={data.id} token={token} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientList;
