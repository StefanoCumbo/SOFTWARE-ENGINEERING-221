import React, { useState } from 'react';
import useFetch from './useFetch';
import { useEffect } from 'react';
import usePatch from './usePatch';

import {toast} from 'react-toastify'

const ManageRequests = () => {


//create state for parking requests so you can dynamically remove them when they are App / Rej 
  const [requests, setRequests] = useState(null); // Add this line



  const { data: fetchData, loading, error } = useFetch('http://localhost:8000/manage-requests');
  const {patch } = usePatch('http://localhost:8000/manage-requests');

//initially load the parking requests when the page loads up
  useEffect(() => {
    setRequests(fetchData); 
}, [fetchData]);

  const handleApprove = (id) =>{
    const updateData = {status: 'approved'};
    patch(id, updateData);
    if(!error){
      setRequests(requests.filter( request => request._id !== id));
      toast.success('Parking request has been approved')
    }


  }
  const handleReject = (id)=>{
    const updateData = {status: 'rejected'}
    patch(id, updateData);
    if(!error){
      setRequests(requests.filter( request => request._id !== id));
      toast.success('Parking request has been rejected')
    }

  }



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='fetch--container'>
      {requests && requests.map(parkingRequest => {
        const arrivalDateTime = new Date(parkingRequest.arrivalDateTime).toLocaleString();
        const departureDateTime = new Date(parkingRequest.departureDateTime).toLocaleString();

        return (
          <div key={parkingRequest._id} className='card'>
            <h4 className='card-title'> Parking request id : {parkingRequest._id} </h4>
            <p className='card-text'>  <strong>Destination : </strong>{parkingRequest.destination } </p>
            <p className='card-text'> Arrival Date/Time: {arrivalDateTime}</p>
            <p className='card-text'> Departure Date/Time: {departureDateTime}</p>
            <button className=' btn btn-primary' onClick={()=> handleApprove(parkingRequest._id)}> Approve</button>
            
            <button className='btn btn-primary' onClick={()=> handleReject(parkingRequest._id)}>Reject</button>

          </div>
        )
      })}
    </div>
  );
};

export default ManageRequests;