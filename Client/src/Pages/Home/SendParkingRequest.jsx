
import {useNavigate } from "react-router-dom";
import {toast} from "react-toastify"


const SendParkingRequest = () => {
    const navigate = useNavigate();




    const handleSubmit = async(e)=>{
        e.preventDefault();
        const destination = e.target.elements['destination'].value
        const arrivalDateTime = e.target.elements['arrivalDateTime'].value
        const departureDateTime = e.target.elements['departureDateTime'].value
        const email = e.target.elements['email'].value


        console.log(destination, arrivalDateTime, departureDateTime, email)

        const response = await fetch('http://localhost:8000/sendParkingRequest',{  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destination,
                arrivalDateTime,
                departureDateTime,
                email
            }),
            
        });
    
        if (!response.ok) {
            // handle error
            console.log('post request failed from front end' + response.status);
            
        } else {
            // handle success
            console.log('post request succesfully sent from front end' + response.status);
            toast.success("Parking request sent!")

            navigate('/')
        }



        

    }



    return ( 
        <section className="register--section">
            <div>
                <p className="sub--title"> Parking request form</p>
                <h1>Send Parking Request to Admin</h1>

            </div>
            <form className="register--form--container" onSubmit={handleSubmit}>
                <div className="container">
                    <label htmlFor="destination" className="register--label">
                    <span className="text-md">Destination (select one)</span>
                    <select id="destination" className="register--input text-md" required>
                    <option value="" disabled>Select one</option>
                    
                    <option value="The Innovation Centre">The Innovation Centre</option>
                    <option value="New Science Building">New Science Building</option>
                    <option value="Norwich Business School">Norwich Business School</option>
                    <option value="The Enterprise Centre">The Enterprise Centre</option>
                    <option value="Uea Law School">Uea Law School</option>
                    <option value="INTO">INTO</option>
                    </select>
                    </label>

                    {/* Arival/ Departure Date and Time */}
                    <label htmlFor="arrivalDateTime" className="register--label">
                        <span className="text-md">Arrival Date and Time</span>
                        <input type="datetime-local" id="arrivalDateTime" className="register--input text-md" required />
                    </label>

                    <label htmlFor="departureDateTime" className="register--label">
                        <span className="text-md">Departure Date and Time</span>
                        <input type="datetime-local" id="departureDateTime" className="register--input text-md" required />
                    </label>
                    <label htmlFor="first-name" className="register--label">
                        <span className="text-md">Enter email</span>
                        <input type="text"
                         className="register--input text-md"
                         name="email"
                         id="email"
                         required
                         
                         />
                    </label>

                
                </div>
                <div>
                        <button className=" btn btn-primary register--form--btn">
                            Submit

                        </button>
                </div>
               


            </form>

        </section>
        

        
        
     );
}
 
export default SendParkingRequest;