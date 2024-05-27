import React, { useState } from 'react';
import useFetch from './useFetch';

const ParkingLots = () => {



    const [spaceData, setSpaceData] = useState({
      parkingLot: '',
      status: 'available',
    });

    const [updateId, setUpdateId] = useState('');
    const [status, setStatus] = useState('');
    const [removeId, setRemoveId] = useState('')
    
    
  
    
      
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/parking-spaces', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(spaceData),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          console.log('Parking space added successfully!');
          const newSpace = await response.json(); // Get the new space data from the server response
          onAddLot(newSpace); // Update the parent component state
          // Update your component state here to include the new space
        }
      } catch (error) {
        console.error('Error:', error);
      }
    // Here you would send a POST request to your server to add the new parking space
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`/api/parking-space/${removeId}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          console.log('Parking space removed successfully!');
          onRemoveSpace(removeId); // Update the parent component state

        }
      } catch (error) {
        console.error('Error:', error);
      }
    
    // Here you would send a DELETE request to your server to remove a parking space
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(``, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log('Parking space updated successfully!');
        // Update your component state here to reflect the change
        const updatedSpace = await response.json(); // Get the updated space data from the server response
        onUpdateSpace(updatedSpace); // Update the parent component state

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <div className='parking-lot-container'>
      <div>
    <form className='parking-lot-card' onSubmit={handleAdd}>
      <h4 className='parking-lot-card-title'> Add a New Parking Lot </h4>
      <label className='parking-lot-card-label'>
        <strong className='parking-lot-card-label-text'>Parking Lot ID:</strong>
        <input type="text" name="parkingLot" value={spaceData.parkingLot} onChange={(e) => setSpaceData(e.target.value)} required />
      </label>
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
    <form className='parking-lot-card' onSubmit={handleUpdate}>
        <h4 className='parking-lot-card-title'> Block or Reserve a Parking Space </h4>
        <label className='parking-lot-card-label'>
          <strong className='parking-lot-card-label-text'>Parking Space ID to update:</strong>
          <input type="text" value={updateId} onChange={(e) => setUpdateId(e.target.value)} required />
        </label>
        <label className='parking-lot-card-label'>
          <p className='parking-lot-status-text'><strong className='parking-lot-card-label-text'>New status:</strong>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select a status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="blocked">Blocked</option>
          </select></p>
        </label>
        <div className='parking-lot-submit'>
        <button type="submit" className='btn btn-primary'>Update Parking Space</button></div>
      </form></div>

      
    </div>
  );
};

export default ParkingLots;