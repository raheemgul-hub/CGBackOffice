// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientAdd.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClientAddProps } from "../../interfaces/Add_Client_Service";
import toast from "react-hot-toast";
function ClientAdd() {

    // initializations
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientAddProps>();
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
            const userRequest = axios.post(Base_URL + '/admin/client/add', {
                full_name: data.name,
                email: data.email,
                contact_1: data.phone,
                whatsapp_contact: data.whatsapp,
                source: data.source
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
                    navigate("/client-list");
                    localStorage.setItem("client_id", response.data.data.id);
                    console.log(response.data.data.id)
                    
                } else {
                    toast.error(response.data.errors.general)

                }
            })
        }
    };
    return (
        <div className="client-container">
            {/* add client page */}
            <div className="client-form">
                <div className="form-header">
                    <h2>Add Client</h2>
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

                        {/* source input */}
                        <input
                            type="text"
                            placeholder="Enter Source e.g (freelancer)"
                            {...register('source', {
                                required: 'Source is required'
                            })}
                        />

                        <button className="client-add" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default ClientAdd