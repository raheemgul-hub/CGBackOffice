import axios from "axios";
import { ClientDeleteProps } from "../../interfaces/Delete_Client_Service";
import toast from "react-hot-toast";


function EmployeeDelete({ id, token }: ClientDeleteProps) {
    // initializations
    const Base_URL = 'https://mgmt-api.codegenio.com/api';

    // handle delete
    const handleDelete = () => {
        axios.post(`${Base_URL}/admin/employee/delete`, { id }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (response.data.success) {
                toast.success(response.data.msg);
                window.location.reload();
            } else {
                toast.error(response.data.errors.general);
            }
        }).catch((error) => {
            console.error("Error deleting employee:", error);
        });
    };

    return (
        // delete button
        <i onClick={handleDelete} className="fa-solid fa-trash-can delete"></i>
    );
}

export default EmployeeDelete;
