import axios from "axios";
import { DeleteprojectProps } from "../../interfaces/Delete_project";


function CurrencyDeactivation({ id, token }: DeleteprojectProps) {
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
                alert(response.data.msg);
                window.location.reload();
            } else {
                alert(response.data.errors.general);
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

export default CurrencyDeactivation;