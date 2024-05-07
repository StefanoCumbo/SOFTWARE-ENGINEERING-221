import React, { useState } from "react";

const Register = ({setUserType}) => {

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

        const response = await fetch('http://localhost:8000/register', { 
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
        console.log('Response status:', response.status);
        console.log('Response data:', await response.json());
    
        if (!response.ok) {
            // handle error
            console.log('Registration failed');
        } else {
            // handle success
            console.log('Registration successful');
        }
    };


        


    
    
    return ( 
        <section id="Register" className="register--section">
            <div>
                <p className="sub--title"> Get In Touch</p>
                <h2>Register</h2>
                <p className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, dicta.</p>
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
                        // pattern="\\+44\\s?[0-9]{4}\\s?[0-9]{6}"
                        // title="Format: +44 xxxx xxxxxx"

                        />

                       
                    </label>
                </div>
                <label htmlFor="user-type" className="register--label">
                        <span className="text-md">User-type</span>
                        <select id="user-type" className="register--input text-md" required value={selectedUserType} onChange={e => setSelectedUserType(e.target.value)}>
                        <option value="" disabled>Select one</option>
                        <option value="Admin">Admin</option>
                        <option value="Driver">Driver</option>
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
