import { Link } from "react-router-dom"
import "./ClientList.css"
import { useEffect, useState } from "react";
import axios from "axios";
function ClientList() {
    const Base_URL = 'https://mgmt-api.codegenio.com/api'
    const RelativePath = '/admin/client/list'
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState("");
    useEffect(() => {
        const storedData = localStorage.getItem("token");
        if (storedData) {
            setToken(storedData);
        }
    }, []);

    useEffect(() => {
        if (token) {
            const usersReq = axios.get(Base_URL + RelativePath, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            usersReq.then((response) => {
                if (response.data.success === true) {
                    setUsers(response.data.data.data);
                    console.log(response)
                } else {
                    console.log('Something is wrong with backend server');
                }

            });

        }
    }, [token]);


    const handledelete = (id: any) => {
        const userRequest = axios.post(Base_URL + '/admin/client/delete' , {
            id: id
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        
            userRequest.then((response) => {
                if (response.data.success === true) {
                    alert(response.data.msg);
                    window.location.reload();
                    console.log("response2",response)
                } else {
                    alert(response.data.errors.general);
                    console.log("response3", response)
                }
            })
        
    }

    return (
        <div className="list">
            <div className="review-table-container">
                <div className="review-header">
                    <h2>Client List</h2>
                    <Link to="/addclient">
                        <button className="add-review-button">Add Client<i className="fa-solid fa-plus add"></i></button>
                    </Link>


                </div>
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th> Contact No</th>
                            <th>Whatsapp No</th>
                            <th>Source</th>
                            <th>Actions</th>
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
                                <td>{data.source}</td>
                                <td>{
                                    <div className="icons">
                                        <i onClick={() => {handledelete(data.id) }} className="fa-solid fa-trash-can delete">
                                        </i><i className="fa-solid fa-pen-to-square edit"></i>
                                    </div>}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClientList