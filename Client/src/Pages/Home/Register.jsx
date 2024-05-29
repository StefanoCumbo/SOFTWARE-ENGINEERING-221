import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Register = ({setUserType}) => {
    const navigate = useNavigate();

    const [selectedUserType, setSelectedUserType] = useState("");




    const handleRegister = async (e) => {
        e.preventDefault();
        setUserType(selectedUserType);
        const firstName = e.target.elements['first-name'].value;
        const lastName = e.target.elements['last-name'].value;
        const userName = e.target.elements['user-name'].value;
        const email = e.target.elements['email'].value;
        const phoneNumber = e.target.elements['phone-number'].value;
        const password = e.target.elements['password'].value;



        const response = await fetch('http://localhost:8000/register',{  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userType: selectedUserType,
                firstName,
                lastName,
                userName,
                email,
                phoneNumber,
                password
            }),
            
        });
    
        if (!response.ok) {
            // handle error
            console.log('post request failed from front end' + response.status);
            // toast.error(responseData.error)
        } else {
            // handle success
            console.log('post request succesfully sent from front end' + response.status);
            navigate('/login')
        }
    };


        


    
    
    return ( 
        <section id="Register" className="register--section">
            <div>
                <p className="sub--title"> Get in Touch</p>
                <h2>Register</h2>
                <p className="text-lg">Register today to receive live updates and make the parking process simple and easy!</p>

            </div>
            <form className="register--form--container"  onSubmit={handleRegister}>
                <div className="container">
                    <label htmlFor="first-name" className="register--label">
                        <span className="text-md">First Name</span>
                        <input type="text"
                         className="register--input text-md"
                         name="first-name"
                         id="first-name"
                         required
                         
                         />
                    </label>
                    <label htmlFor="last-name" className="register--label">
                        <span className="text-md">Last Name</span>
                        <input type="text"
                         className="register--input text-md"
                         name="last-name"
                         id="last-name"
                         required

                         />
                    </label>
                    <label htmlFor="user-name" className="register--label">
                        <span className="text-md">User Name</span>
                        <input type="text"
                         className="register--input text-md"
                         name="user-name"
                         id="user-name"
                         required

                         />
                    </label>
                    <label htmlFor="password" className="register--label">
                        <span className="text-md">Password</span>
                        <input type="password"
                         className="register--input text-md"
                         name="password"
                         id="password"
                         required

                         />
                    </label>
                    <label htmlFor="email" className="register--label">
                        <span className="text-md">Email</span>
                        <input type="email"
                         className="register--input text-md"
                         name="email"
                         id="email"
                         required

                         />
                    </label>
    
                    <label htmlFor="phone-number" className="register--label">
                        <span className="text-md">Phone Number</span>
                        <input type="tel"
                        className="register--input text-md"
                        name="phone-number"
                        id="phone-number"
                        required
                        

                        />

                       
                    </label>
                </div>
                <label htmlFor="user-type" className="register--label">
                        <span className="text-md">User-type</span>
                        <select id="user-type" className="register--input text-md" required value={selectedUserType} onChange={e => setSelectedUserType(e.target.value)}>
                        <option value="" disabled>Select one</option>
                        <option value="admin">admin</option>
                        <option value="driver">driver</option>
                        </select>
                        
                    </label>
                    <label htmlFor="checkbox" className="checkbox--label">
                        <input type="checkbox"  required name="checkbox" id="checkbox"></input>
                        <span className="text-sm">I accept the terms</span>
                       
                        
                    </label>
                    <div>
                        <button className=" btn btn-primary register--form--btn">
                            Submit

                        </button>
                    </div>


            </form>
            
        </section>
    );
}

 
export default Register;
