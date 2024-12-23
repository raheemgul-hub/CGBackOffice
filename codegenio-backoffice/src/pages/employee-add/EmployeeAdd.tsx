
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeAdd.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { EmployeeAddProps } from "../../interfaces/Employee_Add_Service";
import toast from "react-hot-toast";

function EmployeeAdd() {

    // initializations
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeAddProps>();
    const navigate = useNavigate();
    const Base_URL = 'https://mgmt-api.codegenio.com/api'
    const [token, setToken] = useState("");


    // get token from local storage
    useEffect(() => {
        const storedData = localStorage.getItem("token");
        if (storedData) {
            setToken(storedData);
        }
    }, []);

    // set data to backend
    const formSubmit = (data: any) => {
        if (token) {
            const userRequest = axios.post(Base_URL + '/admin/employee/add', {
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
                console.log(response)
                if (response.data.success === true) {
                    toast.success(response.data.msg);
                    reset();
                    navigate("/employee-list");
                    localStorage.setItem("employee_id", response.data.data.id);
                    console.log(response.data.data.id)
                } else {
                    toast.error(response.data.errors.general)

                }
            })
        }
    };
    return (
        <div className="employee-container">
            {/* add employee page */}
            <div className="employee-form">
                <div className="form-header">
                    <h2>Add Employee</h2>
                </div>
                {/* input fields */}
                <div className="form-input">
                    <form onSubmit={handleSubmit(formSubmit)}>
                        {/* Name input */}
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            {...register('name', {
                                required: 'Name is required'
                            })}
                        />
                        {errors.name && <p className="form-error">{errors.name.message}</p>}

                        {/* email input */}
                        <input
                            type="text"
                            placeholder="Enter Email"
                            {...register('email', {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}

                        {/* phone number input */}
                        <input
                            type="tel"
                            placeholder="Enter Phone Number"
                            {...register("phone", {
                                required: { value: true, message: "*Phone number is required." },
                            })}
                        />

                        {/* WhatsApp number input */}
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
                            placeholder="Enter Join Date"
                            {...register("join_date", {
                                required: { value: true, message: "*Join date is required." },
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
}
export default EmployeeAdd