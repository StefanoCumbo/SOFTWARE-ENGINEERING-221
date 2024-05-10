import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        
        // Replace w authencation code bwlow
        
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return ( 
        <section id="Login" className="register--section">
            <div>
                <p className="login-title"></p>
                <h2>Login</h2>
                <p className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, dicta.</p>
            </div>
            <form onSubmit={handleSubmit} className="register--form--container">
                <div className="container">
                    <label htmlFor="email" className='register--label'>Email</label>
                    <input type="email" 
                    id="email"
                    name="email"
                    required 
                    className="register--input text-md"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                
                
                    <label htmlFor="password" className='register--label'>Password</label>
                    <input type="password" id="password" name="password" required className="register--input text-md" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button type="submit" className="btn btn-primary register--form--btn">Login</button>
                </div>
        
            </form>
            
        </section>
    );
}




 
export default Login;


