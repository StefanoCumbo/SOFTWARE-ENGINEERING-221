import React, { useState } from 'react';
import useFetch from './useFetch';
import usePatch from './usePatch';
import {toast} from 'react-toastify'
import Modal from 'react-modal';

const ParkingLots = () => {
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [availability, setAvailability] = useState(0);
  const [typeOfParking, setTypeOfParking] = useState('');
  const [price, setPrice] = useState('');



  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveMessage, setReserveMessage] = useState('');

  const openReserveModal = () => setIsReserveModalOpen(true);
  const closeReserveModal = () => setIsReserveModalOpen(false);



    const [updateId, setUpdateId] = useState('');
    const [status, setStatus] = useState('');
    const [removeId, setRemoveId] = useState('');
    
    
  
  
    const handleAdd = async (e) => {
      e.preventDefault();
  
      // Create the new parking lot object
      const newParkingLot = {
        location,
        capacity,
        availability,
        type_of_parking: typeOfParking,
        price
      };
  
      try {
          const response = await fetch('http://localhost:8000/parking-lot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newParkingLot),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            toast.success('Parking lot added successfully!');
            console.log('Parking lot added successfully!');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to add parking lot.');
        }
    };

    const handleRemove = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch(`http://localhost:8000/parking-lot/${removeId}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            console.log('Parking lot removed successfully!');
            toast.success('Parking lot removed successfully!');
            setRemoveId('')
  
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to remove parking lot.');
        }
      
      // Here you would send a DELETE request to your server to remove a parking space
    };


  const{ patch, error: patchError} = usePatch('http://localhost:8000/manage-ParkingSpaces')

  const handleBlock = async(id) => {

    const blockData = {

      status: 'blocked'
      
    }
    try {
      await patch(id, blockData);
      if ( !patchError) {
        toast.success('Parking Space has been blocked');
        setRemoveId('')
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  


  const handleReserve = async(id)=>{

    const reserveData = {
      status: 'reserved',
      reservedFor: reserveMessage

    }
    try {
      await patch(id, reserveData);
      if (!patchError) {
        toast.success('Parking Space has been reserved');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  
///This is called when the modal is clicked
  const handleSubmitReservation = async (e) => {
    e.preventDefault();
    await handleReserve(updateId);
    closeReserveModal();
  };
  

  

    
  

  return (
    <div className='fetch--container'>
      <form className='parking-lot-card' onSubmit={handleAdd}>
         <h4 className='parking-lot-card-title'> Add a New Parking Lot </h4>

         <div className='parking-lot-card-label-div'>   
            <label className='parking-lot-card-label'>
             <strong className='parking-lot-card-label-text'>Location:</strong>
             <input className='parking-lot-input' type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
           </label>
         </div>

         <div className='parking-lot-card-label-div'>
           <label className='parking-lot-card-label'>
             <strong className='parking-lot-card-label-text'>Capacity: </strong>
              <input className='parking-lot-input' type="number" min="0" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
            </label>
         </div>

          <div className='parking-lot-card-label-div'>
            <label className='parking-lot-card-label'>
                <strong className='parking-lot-card-label-text'>Availability: </strong>
                <input className='parking-lot-input' type="number" min="0" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
            </label>
          </div>

           <div className='parking-lot-card-label-div'>
             <label className='parking-lot-card-label'>
               <strong  className='parking-lot-card-label-text'>Parking : </strong>
                  <select className='parking-lot-input' value={typeOfParking} onChange={(e) => setTypeOfParking(e.target.value)} required>
                   <option value="">Select a parking type</option>
                   <option value="Disabled Parking">Disabled Parking</option>
                   <option value="Visitor Parking">Visitor Parking</option>
                    <option value="Staff/Student Parking">Staff/Student Parking</option>
                 </select>
              </label>
           </div>

            <div className='parking-lot-card-label-div'>
               <label className='parking-lot-card-label'>
                <strong className='parking-lot-card-label-text'>Price: </strong>
                <input className='parking-lot-input' type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
              </div>

            <div className='parking-lot-submit'>
              <button type="submit" className='btn btn-primary'>Add Parking Lot</button>
            </div>
    </form>
   
    <form className='parking-lot-card' onSubmit={handleRemove}>
        <h4 className='parking-lot-card-title'> Remove a Parking Lot </h4>
        <label className='parking-lot-card-label'>
         <strong className='parking-lot-card-label-text'>Parking Lot ID to remove:</strong>
         <input className='parking-lot-input' type="text" value={removeId} onChange={(e) => setRemoveId(e.target.value)} required />
        </label>
        <div className='parking-lot-submit'>
        <button type="submit" className='btn btn-primary '>Remove Parking Lot</button></div>
    </form>

    <div>

    <form className='parking-lot-card'>
        <h4 className='parking-lot-card-title'> Block or Reserve a Parking Space </h4>
        <label className='parking-lot-card-label'>
          <strong className='parking-lot-card-label-text'>Parking Space ID to update:</strong>
          <input className='parking-lot-input' type="text" value={updateId} onChange={(e) => setUpdateId(e.target.value)} required />
        </label>

        
        <div className='parking-lot-submit'>
        <button type="button" className='btn btn-primary ' onClick={()=> handleBlock(updateId)}>Block parking space</button>
        <button type="button" className='btn btn-primary' onClick={openReserveModal}> Reserve parking space </button> 

        </div>
        
        

      </form></div>


      <Modal isOpen={isReserveModalOpen} onRequestClose={closeReserveModal} className={'modal'}>
      <h2 className='parking-lot-card-title'>Reserve Parking Space</h2>
      <form className='register--form--container' onSubmit={handleSubmitReservation}>
        <label className='register--label'>
          please enter a reservation message.
          <input className='register--input text-md'
            type="text"
            value={reserveMessage}
            onChange={(e) => setReserveMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='btn btn-primary'>Submit Reservation</button>
      </form>
    </Modal>
  

      
    </div>
  );

};
export default ParkingLots;