import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Button, Chip, CircularProgress, Input, Stack, Typography } from '@mui/joy';
import { BiDrink, BiRestaurant, BiSearch } from 'react-icons/bi';
import { IoCafe } from 'react-icons/io5';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWt1bWFoIiwiYSI6ImNsc3gxdTl4dTB6eTQyanF0ZXQyZnFvNWgifQ.-Kl5xFcytSklzF7ASxfQkw';

function NearbyRestaurants() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 12;

  const [category, setCategory] = useState('restaurant'); // Default category
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(37.7749); // Default latitude (San Francisco)
  const [lng, setLng] = useState(-122.4194); // Default longitude (San Francisco)
  const markers = useRef([]); // Store markers to clear them later
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const url = `https://google-map-places.p.rapidapi.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=10000&language=en&opennow=true&keyword=${category}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '839ea37f2fmsh798b9b58e610d05p1de960jsn98c1f5d0d4d9',
          'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setRestaurants(data.results);
        setLoading(false);
        setCategory('')
        console.log('Restaurant data:', data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setLoading(false);
        setCategory('')
      }
    };

    fetchRestaurants();
  }, [category]); // Re-fetch data when the category changes

  useEffect(() => {
    if (map.current) return; // Initialize the map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // add navigation control to bottom right
    
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      }), 'bottom-left',
    );
  }, []);

  // update lon and lat when the map is moved
  useEffect(() => {
    if (!map.current) return;

    map.current.on('move', () => {
      setLat(map.current.getCenter().lat.toFixed(4));
      setLng(map.current.getCenter().lng.toFixed(4));
    });
  }, [lat, lng]);

  useEffect(() => {
    // Remove old markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new restaurant markers
    restaurants.forEach((restaurant) => {
      const marker = new mapboxgl.Marker({})
        .setLngLat([restaurant.geometry.location.lng, restaurant.geometry.location.lat])
        .setPopup(new mapboxgl.Popup({
          className: 'restaurant-popup',
        }).setHTML(`
          <div style="font-family: Arial, sans-serif; color: #333; padding: 10px; border-radius: 20px; background-color: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h3 style="font-size: 18px; margin: 0 0 5px;">${restaurant.name}</h3>
    <p style="font-size: 14px; margin: 0 0 8px; color: #777;">${restaurant.vicinity}</p>
    <p style="font-size: 14px; margin: 0;">
      <strong style="color: #ff9800;">⭐ Rating:</strong> ${restaurant.rating}
    </p>
  </div>
        `))
        .addTo(map.current);
      markers.current.push(marker); // Store marker for future cleanup
    });
  }, [restaurants]);

  return (
    <Stack
      sx={{
        height: '93vh',
        width: '100%',
      }}
    >
      <Typography level='h4'>Nearbies</Typography>
      {loading &&
      <Stack
      sx={{
        zIndex: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
      >
      <CircularProgress 
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      />
      </Stack>
      }

        
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }}>
        <Stack
          sx={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 1,
            width: '90vw',
          }}
          flexWrap={'wrap'}
          flexDirection='row' gap={1} marginBottom={2}
          justifyContent='space-between'
        >
          <Stack
           flexDirection='row' gap={1} marginBottom={2}
           >
            <Button 
            startDecorator={<IoCafe />}
            size='sm' variant='solid'
            onClick={() => setCategory('cafeteria')}
          >
            Cafeterias
          </Button>
          <Button
            startDecorator={<BiRestaurant />}
            size='sm' variant="solid"
            onClick={() => setCategory('restaurant')}
          >
            Restaurants
          </Button>
          <Button
            size='sm' variant="solid"
            startDecorator={<BiDrink />}
            onClick={() => setCategory('bar')}
          >
            Bars
          </Button>
          </Stack>
          <Stack
          flexDirection={'row'}
          >
            <Input
              size='sm'
              placeholder='Search for a category'
              onChange={(e) => setSearchValue(e.target.value)}
              endDecorator={<BiSearch />}
            />
            <Button size='sm' variant='solid' color='primary'
            onClick={() => setCategory(searchValue)}
            >Search</Button>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
}

export default NearbyRestaurants;
