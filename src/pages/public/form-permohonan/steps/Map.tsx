import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { notification } from '../../../../utils/Recoils';
import { createNotifcation } from '../../../../utils/Helpers';
import { useEffect, useRef, useState } from 'react';
import GButton from '../../../../components/GButton';
import { TextField, InputLabel } from '@mui/material';

type MapProps = {
  show: boolean;
  lokasi?: string;
  coordinate?: string;
  onSelect: (coordinate: string) => void;
  onClose: () => void;
}
export default function Map({ show = false, lokasi = '', coordinate = '', onSelect, onClose }: MapProps) {
  const [open, setOpen] = useState(show);
  const [_n, setN] = useRecoilState(notification);
  const mapContainer = useRef<any>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(9.4);

  const [latString, setLatString] = useState('')
  const [longString, setLongString] = useState('')



  useEffect(() => {
    setOpen(show);
    setMapReady(false);

    setLatString('')
    setLongString('')
    if (show) {
      if (coordinate != '') {
        const coord = coordinate.split(',');
        setLng(Number(coord[1]));
        setLat(Number(coord[0]));

        setLatString(coord[0])
        setLongString(coord[1])

      }
      getToken();
    }
  }, [show]);

  useEffect(() => {
    if (mapReady) {
      const map: any = new mapboxgl.Map({
        container: mapContainer.current,
        // style: 'mapbox://styles/mapbox/satellite-v9',
        style: '/json/pola_ruang_mapbox.json',
        center: [119.8309, -8.5952],
        zoom: zoom,
      });

      mapRef.current = map;

      const geocoderInit = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      map.addControl(geocoderInit);
      if (lokasi) {
        geocoderInit.query(lokasi);
      }

      const marker = new mapboxgl.Marker().setLngLat(map.getCenter()).addTo(map);
      markerRef.current = marker;
      map.on('move', () => {
        const latitude = map.getCenter().lng.toFixed(4)
        const longtitude = map.getCenter().lat.toFixed(4)

        marker.setLngLat(map.getCenter());
        setLng(latitude);
        setLat(longtitude);



        setZoom(map.getZoom().toFixed(2));
      });



      return () => map.remove();
    }
  }, [mapReady]);

  const getToken = async () => {
    try {
      const res: any = await axios.get('/services/map-token');
      mapboxgl.accessToken = res?.data?.data?.token;
      setMapReady(true);
    } catch (error: any) {
      setN(createNotifcation(error.message));
    }
  }

  const pinCoordinate = () => {
    onSelect(`${lat},${lng}`);
  }

  const clearCoordinate = () => {
    onSelect('');
  }

  const handleClose = () => {
    onClose();
  };


  const handleChangeLatitude = (e: any) => {
    setLatString(e.target.value)
    if (!isNaN((Number(e.target.value)))) {
      setLat(Number(e.target.value))

    }
  }

  const handleChangeLongtitude = (e: any) => {
    setLongString(e.target.value)
    if (!isNaN((Number(e.target.value)))) {
      setLng(Number(e.target.value))

    }
  }

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      const map = mapRef.current;
      const marker = markerRef.current;

      try {
        const newCenter: [number, number] = [Number(lng), Number(lat)];
        map.setCenter(newCenter);
        marker.setLngLat(newCenter);
      } catch (e: any) {
        alert(e.message)
      }

    }
  }, [latString, longString]);

  return (
    <Dialog
      open={open}
      onClose={() => false}
      fullWidth
      maxWidth='md'
      scroll='body'
    >
      <DialogContent className='!bg-gdarkgray-700 !rounded-xl !px-10'>
        <DialogTitle className='!font-quicksand' variant='h4' mb={2} align='center'>
          Koordinat Lahan yang Dimohonkan
        </DialogTitle>
        <div ref={mapContainer} className='w-full h-[600px] z-10' />
        <div className='flex gap-4'>
          <div className='z-50  '>
            <InputLabel className='!font-quicksand text-sm  !text-white'>Latitude</InputLabel>

            <TextField className=' !text-red-200' color='secondary' size='small' value={latString} onChange={handleChangeLatitude} />
          </div>
          <div className='z-50  '>
            <InputLabel className='!font-quicksand text-sm  !text-white'>Longtitude</InputLabel>

            <TextField className=' !text-red-200' color='secondary' size='small' value={longString} onChange={handleChangeLongtitude} />
          </div>
        </div>
        <DialogActions className='!mt-5'>
          <div className="flex justify-around w-full">
            <GButton color='secondary' onClick={handleClose}>Batal</GButton>
            <div className="flex gap-5">
              <GButton color='error' onClick={clearCoordinate}>Hapus</GButton>
              <GButton color='success' onClick={pinCoordinate}>Simpan</GButton>
            </div>
          </div>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}