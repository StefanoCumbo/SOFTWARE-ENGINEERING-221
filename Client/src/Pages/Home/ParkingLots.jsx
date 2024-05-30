import React, { useState } from 'react';
import useFetch from './useFetch';
import usePatch from './usePatch';
import {toast} from 'react-toastify'
import Modal from 'react-modal';

const ParkingLots = () => {


  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveMessage, setReserveMessage] = useState('');

  const openReserveModal = () => setIsReserveModalOpen(true);
  const closeReserveModal = () => setIsReserveModalOpen(false);



    const [updateId, setUpdateId] = useState('');
    const [status, setStatus] = useState('');
    const [removeId, setRemoveId] = useState('');
    
    
  
    
      
  const handleAdd = async (e) => {
    e.preventDefault();


  };

  const handleRemove = async (e) => {

    e.preventDefault();

      
    
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
    <div className='parking-lot-container'>
      <div>
    <form className='parking-lot-card' onSubmit={handleAdd}>
      <h4 className='parking-lot-card-title'> Add a New Parking Lot </h4>
      <p className='card-text'>click here to add a new parking lot!</p>
      <div className='parking-lot-submit'>
      <button type="submit" className='btn btn-primary'>Add Parking Space</button></div>
    </form>


    <form className='parking-lot-card' onSubmit={handleRemove}>
        <h4 className='parking-lot-card-title'> Remove a Parking Lot </h4>
        <label className='parking-lot-card-label'>
         <strong className='parking-lot-card-label-text'>Parking Space ID to remove:</strong>
         <input type="text" value={removeId} onChange={(e) => setRemoveId(e.target.value)} required />
        </label>
        <div className='parking-lot-submit'>
        <button type="submit" className='btn btn-primary '>Remove Parking Space</button></div>
    </form></div>

    <div>

    <form className='parking-lot-card'>
        <h4 className='parking-lot-card-title'> Block or Reserve a Parking Space </h4>
        <label className='parking-lot-card-label'>
          <strong className='parking-lot-card-label-text'>Parking Space ID to update:</strong>
          <input type="text" value={updateId} onChange={(e) => setUpdateId(e.target.value)} required />
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