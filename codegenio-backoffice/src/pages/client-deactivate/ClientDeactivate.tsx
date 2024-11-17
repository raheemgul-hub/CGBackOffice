import axios from "axios";
import { DeleteprojectProps } from "../../interfaces/Delete_project";
import toast from "react-hot-toast";



function ClientDeactivate({ id, token }: DeleteprojectProps) {
    // initializations
    const Base_URL = 'https://mgmt-api.codegenio.com/api';

    // handle delete
    const handleActivate = () => {
        axios.post(`${Base_URL}/admin/client/deactivate`, { id }, {
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
            toast.error(error.response.data.errors.general);
        });
    };

    return (
        // delete button
        <i onClick={handleActivate} className="fa-solid fa-xmark deactive"></i>
    );
}

export default ClientDeactivate;
