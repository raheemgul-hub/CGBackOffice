import axios from "axios";
import { DeleteprojectProps } from "../../interfaces/Delete_project";
import toast from "react-hot-toast";



function ProjectActivate({ id, token }: DeleteprojectProps) {
    // initializations
    const Base_URL = 'https://mgmt-api.codegenio.com/api';

    // handle delete
    const handleActivate = () => {
        axios.post(`${Base_URL}/admin/project/activate`, { id }, {
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
            console.error("Error Activate project:", error);
        });
    };

    return (
        // delete button
        <i onClick={handleActivate} className="fa-solid fa-check active"></i>
    );
}

export default ProjectActivate;
