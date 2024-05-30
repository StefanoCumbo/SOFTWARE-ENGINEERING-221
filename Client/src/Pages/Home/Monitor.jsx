import React from 'react';
import useFetch from './useFetch';
import { PieChart } from 'react-minimal-pie-chart';

const Monitor = () => {
  const { data: parkingLots, loading, error } = useFetch('http://localhost:8000/monitor-parking-lots');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div className='fetch-container'>
      {parkingLots && parkingLots.map(parkingLot => (
        <div className='parking-lot-entry' key={parkingLot.lot_id}>
          <div className='textual-details'>
            <h2 className='card-title'>{parkingLot.location}</h2>
            <p className='card-text'>Total Spaces: {parkingLot.capacity}</p>
            <p className='card-text'>Available Spaces: {parkingLot.availability}</p>
            <p className='card-text'>Occupied Spaces: {parkingLot.capacity - parkingLot.availability}</p>
            <p className='card-text'>Type of Parking: {parkingLot.type_of_parking}</p>
            <p className='card-text'>Price: {parkingLot.price}</p>
          </div>
          <div className='piechart-container'>
            <div className='piechart-label'> <strong> Available Spaces : </strong>{ parkingLot.availability}</div>
            <PieChart
              data={[
                { title: 'Available', value: parkingLot.availability, color: '#5e3eee' },
                { title: 'Occupied', value: parkingLot.capacity - parkingLot.availability, color: '#e62872' }
              ]}
              label={false}
              radius={42}
              animate
            />
            <div className='piechart-label'> <strong>Occupied Spaces : </strong> { parkingLot.capacity - parkingLot.availability}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Monitor;
