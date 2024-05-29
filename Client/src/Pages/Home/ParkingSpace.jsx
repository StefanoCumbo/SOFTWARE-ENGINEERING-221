// ParkingSpace component in React
import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useParams } from 'react-router-dom';


const ParkingSpace = () => {


  const [mapUrl, setMapUrl] = useState('');

  const [parkingSpace, setParkingSpace] = useState(null);
  const {id} = useParams();
  const { data, loading, error } = useFetch(`http://localhost:8000/parkingSpaces/${id}`);


  useEffect(() => {
    if (data) {
      setParkingSpace(data);
      const location = data.parkingLot.location;
      switch(location){
        case 'UEA Triangle Car Park':
          setMapUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.9240294172296!2d1.2232818758774548!3d52.62521697208893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d9e0db3db8418b%3A0xfe069c518ecf58c8!2sUEA%20Triangle%20Car%20Park!5e0!3m2!1sen!2suk!4v1716920571952!5m2!1sen!2suk")
          break;
        case 'UEA West Car Park':
          setMapUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422.094882105252!2d1.2334776758771904!3d52.622129472088105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d9e127f9f3c96d%3A0x96d5313eada44c3d!2sUEA%20West%20Car%20Park!5e0!3m2!1sen!2suk!4v1716920532525!5m2!1sen!2suk")
          break;
        case 'UEA Main Car Park':
          setMapUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422.030315833545!2d1.2405585758773037!3d52.62329627208845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d9e12674071d6d%3A0x33549ed4dc54f786!2sUEA%20Car%20Park!5e0!3m2!1sen!2suk!4v1716920477132!5m2!1sen!2suk")
          break;
        default:
          setMapUrl('')
          break;
      }




    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: from parking space component {error.message}</div>;

  return (
    <div className='container'>
      {parkingSpace && (
        <>
          <div className='card'>
            <h4 className='card-title'>Parking Space Details</h4>
            <h2 className='card-text'>Please make your way to the car park listed below.</h2>
            <p className='card-text'><strong>ID:</strong> {parkingSpace._id}</p>
            <p className='card-text'><strong>Status:</strong> {parkingSpace.status}</p>
            <p className='card-text'><strong>Location:</strong> {parkingSpace.parkingLot.location}</p>
            <p className='card-text'><strong>Type of Parking:</strong> {parkingSpace.parkingLot.type_of_parking}</p>
            <p className='card-text'><strong>Price:</strong> {parkingSpace.parkingLot.price}£ per hour</p>
            {/* Add more details as needed */}
          </div>
          {mapUrl && (
            <div className='map'>
              <iframe
                title="Parking Space Location"
                src={mapUrl}
                className="iframe-map"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}
        </>
      )}
    </div>
  );
  
};

export default ParkingSpace;
