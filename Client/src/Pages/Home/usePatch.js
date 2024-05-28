
import { useState } from "react";

const usePatch = (url) => {
    const [patchError, setPatchError] = useState(null);

   

    const patch = async (id, updateData) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            setPatchError(error)
        }
    };

    return { patch, patchError };
};

export default usePatch;
