
import { useForm } from "react-hook-form";

import "../project-save/ProjectSave.css"
import { ProjectSaveProps } from "../../interfaces/Save_Project_Service";
import {  useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



function ProjectUpdate() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectSaveProps>();
    const navigate = useNavigate();
    const Base_URL = 'https://mgmt-api.codegenio.com/api'
    // const [Client_id, setClientId] = useState("");
    const [token, setToken] = useState("");
    const { id, client_id } = useParams<{ id: string, client_id: string }>(); 
    
    // const [id, setId] = useState([]);

    // get token from local storage
    useEffect(() => {
        // const storedClientId = localStorage.getItem("client_id");
        // if (storedClientId) {
        //     setClientId(storedClientId);
        // }
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
        // const storedId: Array<any> = JSON.parse(localStorage.getItem("Data") || "[]");
        // if (storedId) {
        //    storedId.map((item: any) => {
        //        setId(item.id)
        //    })
        // }
    }, []);






    const onSubmit = (data: any) => {
        const userRequest = axios.post(Base_URL + '/admin/project/update', {
            id: id,
            title: data.title,
            client_id: client_id,
            award_date: data.award_date,
            start_date: data.start_date,
            initial_agreed_budget: data.initial_agreed_budget
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        userRequest.then((response) => {
            console.log("project-Update", response)
            if (response.data.success === true) {
                toast.success(response.data.msg);
                reset();
                navigate("/project-list");
            } else {
                toast.error(response.data.errors.general)

            }
        })

    };
    return (
        <div className="main">
            <form onSubmit={handleSubmit(onSubmit)} className="project-details-form">

                <div className="form-group">
                    <div className="review-header">
                        <h2> Update Project Details</h2>
                    </div>
                    <label>Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p className="error">{errors.title.message}</p>}
                </div>
                <div className="form-group">
                    <label>Award Date</label>
                    <input
                        type="date"
                        {...register("award_date", { required: "Award Date is required" })}
                    />
                    {errors.award_date && <p className="error">{errors.award_date.message}</p>}
                </div>

                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        {...register("start_date", { required: "Start Date is required" })}
                    />
                    {errors.start_date && <p className="error">{errors.start_date.message}</p>}
                </div>

                <div className="form-group">
                    <label>Initial Agreed Budget</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("initial_agreed_budget", { required: "Budget is required", valueAsNumber: true })}
                    />
                    {errors.initial_agreed_budget && <p className="error">{errors.initial_agreed_budget.message}</p>}
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default ProjectUpdate;
