import React from 'react';
import useFetch from './useFetch';

const ManageRequests = () => {
  const { data: requests, loading, error } = useFetch('http://localhost:8000/manage-requests');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='fetch--container'>

      {requests && requests.map(parkingRequest => (
        <div key={parkingRequest._id} className='card'>
          <h4 className='card-title'> Parking request </h4>
          <p className='card-text'>  <strong>Parking request id : </strong>{parkingRequest._id} </p>
          <button className=' btn btn-primary'>Approve</button>
          <button className='btn btn-primary'>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ManageRequests;
