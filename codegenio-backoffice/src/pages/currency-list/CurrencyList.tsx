// ClientList.tsx
import { Link } from "react-router-dom";
import "../client-add/ClientAdd.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { CurrencyAddProps } from "../../interfaces/Currency_Add_Service";
import CurrencyDelete from "../currency-delete/CurrencyDelete";

import CurrencyDeactivate from "../currency-deactivate/CurrencyDeactivate";
import CurrencyActivate from "../currency-activate/CurrencyActivation";

function CurrencyList() {

    // initializations 
    const Base_URL = 'https://mgmt-api.codegenio.com/api';
    const RelativePath = '/admin/currency/list';
    const [users, setUsers] = useState<CurrencyAddProps[]>([]);
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
                    <h2>Currency List</h2>
                    <Link to="/currency-add">
                        <button className="add-review-button">Add Currency<i className="fa-solid fa-plus add"></i></button>
                    </Link>
                </div>
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th> Currency Full Name</th>
                            <th>Currency Short Name</th>
                            <th>status</th>
                            <th>Actions</th>
                            <th> Activate Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data: any) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.full_name}</td>
                                <td>{data.short_name}</td>
                                <td>{data.status}</td>
                            
                                <td>
                                    <div className="icons">
                                        <CurrencyDelete id={data.id} token={token} />
                                        <Link to={`/currency-update/${data.id}`}>
                                            <i className="fa-solid fa-pen-to-square update"></i>
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    <div className="icons">
                                        <CurrencyActivate id={data.id} token={token} />
                                        <CurrencyDeactivate id={data.id} token={token} />
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

export default CurrencyList;
