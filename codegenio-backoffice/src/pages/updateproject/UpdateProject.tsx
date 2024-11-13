
import { useForm } from "react-hook-form";

import "../saveProject/SaveProject.css"
import { SaveProjectProps } from "../../interfaces/Save_Project_Service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



function UpdateProject() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SaveProjectProps>();
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
            console.log("updateProject", response)
            if (response.data.success === true) {
                alert(response.data.msg);
                reset();
                navigate("/projectlist");
            } else {
                alert(response.data.errors.general)

            }
        })

    };
    return (
        <div className="main">
            <div className="header navbar">
                <div className="logo"><img src="https://codegenio.com/images/logo.svg" alt="logo" /></div>
                <Link to="/clientlist">
                    <button className="button">
                        <div className="button-box">
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                            <span className="button-elem">
                                <svg viewBox="0 0 46 40">
                                    <path
                                        d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                    </button>
                </Link>
            </div>
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

export default UpdateProject;
