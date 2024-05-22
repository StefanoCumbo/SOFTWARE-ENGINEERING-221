import React from 'react';
import useFetch from './useFetch';

const ManageRequests = () => {
  const { data: requests, loading, error } = useFetch('http://localhost:8000/manage-requests');

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
            <button className=' btn btn-primary'>Approve</button>
            <button className='btn btn-primary'>Reject</button>
          </div>
        )
      })}
    </div>
  );
};

export default ManageRequests;