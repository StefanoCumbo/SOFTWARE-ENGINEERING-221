import React from 'react';
import useFetch from './useFetch';

const Monitor = () => {
  const { data: parkingLots, loading, error } = useFetch('/api/monitor-parking-lots');

  if (loading) return 'Loading...';
  if (error) return 'Error!';

  return (
    <div>
      {parkingLots && parkingLots.map(lot => (
        <div key={lot.lot_id}>
          <h2>{lot.location}</h2>
          <p>Total Spaces: {lot.capacity}</p>
          <p>Available Spaces: {lot.availability}</p>
          <p>Occupied Spaces: {lot.capacity - lot.availability}</p>
          <p>Type of Parking: {lot.type_of_parking}</p>
          <p>Price: {lot.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Monitor;
