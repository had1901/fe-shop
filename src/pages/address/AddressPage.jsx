import React, { useEffect, useRef } from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './AddressPage.module.scss'
import AddressMap from '../../components/address/AddressMap'
import mapboxgl from 'mapbox-gl'


const listAddress = [
  {
    title: 'TÂN BÌNH - HOÀNG HOA THÁM',
    address: '78-80-82 Hoàng Hoa Thám, Phường Bảy Hiền, TP.HCM',
    map: 'https://maps.app.goo.gl/yNFuHkrBSZRGc3s49',
  },
  {
    title: 'TP THỦ ĐỨC - KHA VẠN CÂN',
    address: '905 Phường Linh Tây, TP.HCM',
    map: 'https://maps.app.goo.gl/wVy8YCeoYGB5T7vw8',
  },
  {
    title: 'QUẬN 5 - TRẦN HƯNG ĐẠO',
    address: '1081-1083 Trần Hưng Đạo, Phường An Đông, TP.HCM',
    map: 'https://maps.app.goo.gl/Gx3sk3cT4pYfQSJF7',
  },
  {
    title: 'BÌNH THẠNH - NGUYỄN CỬU VÂN',
    address: '63 Nguyễn Cửu Vân, Phường Gia Định, TP.HCM',
    map: 'https://maps.app.goo.gl/idUpAFfE1b7U26KJA',
  },
  
]

function AddressPage() {
    const cs = useStyles(styles)
    const mapRef = useRef(null)
  
    useEffect(() => {
      if (mapRef.current) return
      mapboxgl.accessToken = 'pk.eyJ1IjoiZHVjdG9jbHgwMSIsImEiOiJjbWRrM2k0eXEwdHB4Mm1vajczbGwxaXFtIn0.FMgzB3BYi6cCUnT-i-6iMQ';
      mapRef.current = new mapboxgl.Map({
        container: 'map', // container ID
        // style: 'mapbox://styles/mapbox/streets-v12', // style URL
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
        // style: 'mapbox://styles/mapbox/standard',
        // center: [105.8342, 21.0278], // Hà Nội chẳng hạn
        center: [-74.5, 40],
        zoom: 2,
        attributionControl: false,
        // pitch: 60, // Góc nghiêng để thấy 3D
        // bearing: -30, // Góc xoay
        // antialias: true // Để mượt 3D
      })
      mapRef.current.on('style.load', () => {
        mapRef.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.terrain-rgb',
          tileSize: 512,
          // maxzoom: 12
        })
        mapRef.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
        mapRef.current.setLight({
          anchor: 'viewport',
          intensity: 0.5
        })
        // map.addLayer({
        //   id: '3d-buildings',
        //   source: 'composite',
        //   'source-layer': 'building',
        //   filter: ['==', 'extrude', 'true'],
        //   type: 'fill-extrusion',
        //   minzoom: 15,
        //   paint: {
        //     'fill-extrusion-color': '#aaa',
        //     'fill-extrusion-height': [
        //       'interpolate', ['linear'], ['zoom'],
        //       15, 0,
        //       15.05, ['get', 'height']
        //     ],
        //     'fill-extrusion-base': ['get', 'min_height'],
        //     'fill-extrusion-opacity': 0.6
        //   }
        // })
      })

      
      return () => mapRef.current?.remove()
    },[])
  return (
    <div className={'container'}>
        <div className={cs('address')}>
          <h2 className={cs('heading')}>Cửa hàng tại Hà Nội</h2>
          <div className='row'>
            <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12'>
              <div className={cs('box')}>
                <AddressMap title='Đống Đa - Thái Hà' address='162-164 Thái Hà, Phường Đống Đa, Hà Nội' link='https://maps.app.goo.gl/bFrvK9HhaGrkKxe89' />
              </div>
            </div>
          </div>
          <div className={cs('map-container')}><div id="map" className={cs('mapbox')}></div></div>
          <h2 className={cs('heading')}>Cửa hàng tại TP. Hồ Chí Minh</h2>
          <div className='row gutter-1'>
              {listAddress.map(item => (
                <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                  <div className={cs('box')}>
                    <AddressMap title={item.title} address={item.address} link={item.map} />
                  </div>
                </div>
              ))}
          </div>
        </div>
    </div>
  )
}

export default AddressPage