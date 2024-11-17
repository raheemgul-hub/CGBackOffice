import axios from "axios";
import { DeleteprojectProps } from "../../interfaces/Delete_project";
import toast from "react-hot-toast";


function CurrencyDeactivate({ id, token }: DeleteprojectProps) {
    // initializations
    const Base_URL = 'https://mgmt-api.codegenio.com/api';

    // handle delete
    const handleDeactivate = () => {
        axios.post(`${Base_URL}/admin/currency/deactivate`, { id }, {
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
            console.error("Error In Deactivate currency:", error);
        });
    };

    return (
        // delete button
        <i onClick={handleDeactivate} className="fa-solid fa-xmark deactive"></i>
    );
}

export default CurrencyDeactivate;
