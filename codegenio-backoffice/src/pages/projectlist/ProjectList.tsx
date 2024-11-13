import { Link } from "react-router-dom";
import "../clientList/ClientList.css";
import "./ProjectList.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { SaveProjectProps } from "../../interfaces/Save_Project_Service";
import DeleteProject from "../deleteproject/DeleteProject";
import ProjectActivate from "../projectActivate/ProjectActivate";
import ProjectDeactivate from "../projectDeactivate/ProjectDeactivate";


function ProjectList() {

    // initializations 
    const Base_URL = 'https://mgmt-api.codegenio.com/api';
    const RelativePath = '/admin/project/list';
    const [projects, setProjects] = useState<SaveProjectProps[]>([]);
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
                    setProjects(response.data.data.data);
                    console.log("projects list response", response);
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
                    <h2>Project List</h2>
                    <Link to="/saveproject">
                        <button className="add-review-button">Add Project<i className="fa-solid fa-plus add"></i></button>
                    </Link>
                </div>
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Client ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Award Date</th>
                            <th>Start Date</th>
                            <th>Initial Budget</th>
                            <th>Actions</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project: any) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.client_id}</td>
                                <td>{project.title}</td>
                                <td>{project.status}</td>
                                <td>{project.award_date}</td>
                                <td>{project.start_date}</td>
                                <td>{project.initial_agreed_budget}</td>
                                <td>
                                    <div className="icons">
                                        <DeleteProject id={project.id} token={token} />
                                        <Link to={`/updateproject/${project.id}/${project.client_id}`}>
                                        <i className="fa-solid fa-pen-to-square update"></i>
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    <div className="icons">
                                        <ProjectActivate id={project.id} token={token} />
                                        <ProjectDeactivate id={project.id} token={token} />
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

export default ProjectList;
