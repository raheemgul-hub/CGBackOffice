import axios from "axios";
import { DeleteprojectProps } from "../../interfaces/Delete_project";



function ClientActivate({ id, token }: DeleteprojectProps) {
    // initializations
    const Base_URL = 'https://mgmt-api.codegenio.com/api';

    // handle delete
    const handleActivate = () => {
        axios.post(`${Base_URL}/admin/client/activate`, { id }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (response.data.success) {
                alert(response.data.msg);
                window.location.reload();
            } else {
                alert(response.data.errors.general);
            }
        }).catch((error) => {
            console.error("Error Activate Client:", error);
        });
    };

    return (
        // delete button
        <i onClick={handleActivate} className="fa-solid fa-check active"></i>
    );
}

export default ClientActivate;
