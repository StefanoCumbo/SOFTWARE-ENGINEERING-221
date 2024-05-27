import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = e.target.elements['email'].value
        const password = e.target.elements['password'].value


        const response = await fetch('http://localhost:8000/login',{  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
            
        });
    
        if (!response.ok) {
            // handle error
            console.log('post request failed from front end' + response.status);
        } else {
            // handle success
            console.log('post request succesfully sent from front end' + response.status);
            navigate('/')
            
        }
        
        
        
       
    };

    return ( 
        <section id="Login" className="register--section">
            <div>
                <p className="login-title"></p>
                <h2>Login</h2>
                <p className="text-lg"> Already a member? log in to access your portal</p>
            </div>
            <form onSubmit={handleSubmit} className="register--form--container">
                <div className="container">
                    <label htmlFor="email" className='register--label'>Email</label>
                    <input type="email" 
                    id="email"
                    name="email"
                    required 
                    className="register--input text-md"
                    />
                
                
                    <label htmlFor="password" className='register--label'>Password</label>
                    <input type="password" 
                    id="password"
                    name="password" 
                    required 
                    className="register--input text-md" 
                    />
                </div>


                <div>
                <button type="submit" className="btn btn-primary register--form--btn">Login</button>

                </div>
                
                
        
            </form>
            
        </section>
    );
}




 
export default Login;


