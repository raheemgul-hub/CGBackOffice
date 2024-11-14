
import { useForm } from "react-hook-form";

import "../project-save/ProjectSave.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { EmployeeAddProps } from "../../interfaces/Employee_Add_Service";



function ClientUpdate() {

    //initialization
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeAddProps>();
    const navigate = useNavigate();
    const Base_URL = 'https://mgmt-api.codegenio.com/api'
    const [token, setToken] = useState("");
    const { id, } = useParams<{ id: string }>();



    // get token from local storage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);






    const onSubmit = (data: any) => {
        const userRequest = axios.post(Base_URL + '/admin/employee/update', {
            id:id,
            full_name: data.name,
            email: data.email,
            contact_1: data.phone,
            contact_2: data.whatsapp,
            address: data.address,
            join_date: data.join_date,
            description: data.description
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        userRequest.then((response) => {
            console.log("client-update", response)
            if (response.data.success === true) {
                alert(response.data.msg);
                reset();
                navigate("/employee-list");
            } else {
                alert(response.data.errors.general)

            }
        })

    };
    return (
        <div className="mainn">
            {/* header */}
            <div className="header navbar">
                <div className="logo"><img src="https://codegenio.com/images/logo.svg" alt="logo" /></div>
                <Link to="/employee-list">
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
            {/* login page */}
            <div className="login-page">
                <div className="top">
                    <h2>Update Employee</h2>
                </div>
                {/* input fields */}
                <div className="input">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name input */}
                        <input
                            type="text"
                            placeholder="Enter Full Name "
                            {...register('name', {
                                required: 'Name is required'
                            })}
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        {/* email input */}
                        <input
                            type="text"
                            placeholder="Enter Email "
                            {...register('email', {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                        {/* phon number input */}
                        <input
                            type="tel"
                            placeholder="Enter Phone Number"
                            {...register("phone", {
                                required: { value: true, message: "*Phone number is required." },
                            })}
                        />
                        {/* whatsApp number input */}
                        <input
                            type="tel"
                            placeholder="Enter WhatsApp Number"
                            {...register("whatsapp", {
                                required: { value: true, message: "*WhatsApp number is required." },
                            })}
                        />
                        {/* address input */}
                        <textarea
                            placeholder="Enter Address"
                            {...register('address', {
                                required: '*Address is required'
                            })}
                        />
                        {/* join date input */}
                        <input
                            type="date"
                            placeholder=" Enter Join date"
                            {...register("join_date", {
                                required: { value: true, message: "*join date is required." },
                            })}
                        />
                        {/* description input */}
                        <textarea
                            placeholder="Enter Description"
                            {...register('description', {
                                required: '*Description is required'
                            })}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>


            </div>
        </div>
    )
};

export default ClientUpdate;
