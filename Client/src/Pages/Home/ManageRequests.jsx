import React, { useState } from 'react';
import useFetch from './useFetch';
import { useEffect } from 'react';
import usePatch from './usePatch';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const ManageRequests = ({setApprovedParkingSpaceId}) => {



  const locationMapping = {
    'The Innovation Centre': 'UEA Triangle Car Park',
    'New Science Building': 'UEA West Car Park',
    'Norwich Business School': 'UEA West Car Park',
    'The Enterprise Centre': 'UEA West Car Park',
    'Uea Law School': 'UEA Main Car Park',
    'INTO': 'UEA Main Car Park'
  };
  




//create state for parking requests so you can dynamically remove them when they are App / Rej 
  const [requests, setRequests] = useState(null); // Add this line
  const [parkingSpaces, setParkingSpaces] = useState(null)
  const navigate = useNavigate();



  const { data: fetchData, loading, error } = useFetch('http://localhost:8000/manage-requests');
  const {patch, patchError } = usePatch('http://localhost:8000/manage-requests');
  const { data: fetchParkingSpaces } = useFetch('http://localhost:8000/parkingSpaces');

//initially load the parking requests when the page loads up
  useEffect(() => {
    setRequests(fetchData); 
    setParkingSpaces(fetchParkingSpaces)
    
}, [fetchData, fetchParkingSpaces]);

  const handleApprove = (id) =>{

    if (!requests || !parkingSpaces) {
      toast.error('Data is still loading. Please try again later.');
      return;
    }

    const parkingRequest = requests.find((request) => request._id === id);
    const assignedLocation = locationMapping[parkingRequest.destination]

    const assignedParkingSpace = parkingSpaces.find((space) => space.parkingLot.location === assignedLocation
      && space.status === 'available'
    );

    if (!assignedParkingSpace) {
      toast.error(`No available parking space found for location: ${assignedLocation}`);
      return;
    }


    const updateData = {
      status: 'approved',
      assignedSpace: assignedParkingSpace._id
    };
    patch(id, updateData);
    if(!error){
      setRequests(requests.filter( request => request._id !== id));
      toast.success('Parking request has been approved')
      setApprovedParkingSpaceId(assignedParkingSpace._id)
      navigate(`/parking-space/${assignedParkingSpace._id}`)
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
  if (error) return <div>Error: from manage request  {error.message}</div>;

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