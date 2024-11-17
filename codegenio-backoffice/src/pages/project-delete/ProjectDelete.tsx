import axios from "axios";
import { DeleteprojectProps } from "../../interfaces/Delete_project";
import toast from "react-hot-toast";



function ProjectDelete({ id, token }: DeleteprojectProps) {
    // initializations
    const Base_URL = 'https://mgmt-api.codegenio.com/api';

    // handle delete
    const handleDelete = () => {
        axios.post(`${Base_URL}/admin/project/delete`, { id }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (response.data.success) {
                toast.success(response.data.msg);
                window.location.reload();
            } else {
                toast.error(response.data.errors.general);
                console.log(response)
            }
        })
    };

    return (
        // delete button
        <i onClick={handleDelete} className="fa-solid fa-trash-can delete"></i>
    );
}

export default ProjectDelete;
