import React, { useState } from 'react';
import {toast} from 'react-toastify'
const ManageUsers = () => {
    const [userId, setUserId] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/delete/${userId}`, {  
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: userId
        }),
    });

    if (!response.ok) {
        // handle error
        console.log('delete request failed from front end: ' + response.status);
        toast.error('Could not remove this user');
    } else {
        // handle success
        console.log('delete request successfully sent from front end: ' + response.status);
        toast.success('User has been removed');
        setUserId('');
    }

        
    };

    const handleBan = async (e) =>{
        e.preventDefault();



        const response = await fetch(`http://localhost:8000/ban/${userId}`,{  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId
                
            }),
            
        });
    
        if (!response.ok) {
            // handle error
            console.log('post request failed from front end' + response.status);
            toast.error('could not ban this user')
        } else {
            // handle success
            console.log('post request succesfully sent from front end' + response.status);
            toast.success('User has been banned')
            setUserId('')
        }

    }

    

    return (
        
        <div className='register--section '>
            
            <h2>Manage Users</h2>
            <p className='text-lg'>Please enter the id of the user you would like to ban / remove!</p>


            
            <form  className= 'register--form--container'>
                <div className='container'>
                    <label className='register--label'>
                         <input className='register--input text-md'
                          type="text"
                         placeholder="Enter User ID"
                         value={userId}
                         onChange={(e) => setUserId(e.target.value)}
                         required
                />

                    </label>
                

                </div>
                <div>
                <button type="button" className='btn btn-primary'  onClick={handleDelete}>Remove User</button>
                <button type="button" className='btn btn-primary'  onClick={handleBan}>Ban User</button>

                </div>
               
            </form>
        </div>
    );
};

export default ManageUsers;