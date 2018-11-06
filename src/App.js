/* 
 * Copyright (c) 2018 Bruce Schubert.
 * The MIT License
 * http://www.opensource.org/licenses/mit-license
 */
import React, { Component } from 'react'
import 'worldwindjs'; // WorldWind
import Globe from 'worldwind-react-globe'
import { 
  CardColumns, 
  Container } from 'reactstrap'
import { 
  LayersCard, 
  MarkersCard, 
  NavBar, 
  NavBarItem, 
  SearchBox, 
  SettingsCard, 
  Tools } from 'worldwind-react-globe-bs4'

import MarsBackgroundLayer from './api/MarsBackgroundLayer';
import MarsSimpleCylindricalRasters from './api/MarsSimpleCylindricalRasters';
import MarsMdim21Layer from './api/MarsMdim21Layer';
import MarsMolaColorLayer from './api/MarsMolaColorLayer';
import MarsFeatureNamesLayer from './api/MarsFeatureNamesLayer';

import './App.css'

/* global WorldWind */

export default class App extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      // Initial lat/log at Elisium Planitia - Insight landing site
      lat: 2.983,
      lon: 154.74,
      alt: 10e6,
      globe: null
    }
    
    this.globeRef = React.createRef()
    this.layersRef = React.createRef()
    this.markersRef = React.createRef()
    this.settingsRef = React.createRef()
  }
  
  componentDidMount() {
    // Get the component with the WorldWindow after mounting
    this.setState({globe: this.globeRef.current})
    
    const globe = this.globeRef.current;
    var wwd = globe.wwd;
    
    //
    wwd.globe = new WorldWind.Globe(new WorldWind.ElevationModel());
    
    // This globe's equatorial radius in meters.
    wwd.globe.equatorialRadius = 3396200;
    var flattening = 0.00589;
    // This globe's polar radius in meters.
    wwd.globe.polarRadius = wwd.globe.equatorialRadius * (1 - flattening);
    //This globe's eccentricity squared.
    wwd.globe.eccentricitySquared = (2 * flattening) - (flattening * flattening);      
  }
  
  render() {
    
    const globe = this.globeRef.current
    
    // USGS Astrogeology WMS https://astrowebmaps.wr.usgs.gov/webmapatlas/Layers/maps.html
    
    const layers = [
      {layer: new MarsBackgroundLayer(), options: {category: 'background', enabled: true}},
      {layer: new MarsSimpleCylindricalRasters(), options: {category: 'base', enabled: false}},
      {layer: new MarsMolaColorLayer(), options: {category: 'base', enabled: false}},
      {layer: new MarsMdim21Layer(), options: {category: 'base', enabled: false}},
      {layer: new MarsFeatureNamesLayer(), options: {category: 'overlay', enabled: false}},
      {layer: 'renderables', options: {category: 'data', enabled: true, displayName: 'Markers'}},
      {layer: 'compass', options: {category: 'setting', enabled: false}},
      {layer: 'coordinates', options: {category: 'setting', enabled: true}},
      {layer: 'view-controls', options: {category: 'setting', enabled: true}},
      {layer: 'stars', options: {category: 'setting', enabled: true}},
//      {layer: 'atmosphere-day-night', options: {category: 'setting', enabled: false}}
    ]
    
    const navbarItems = [
      <NavBarItem key='lyr' title='Layers' icon='list' collapse={this.layersRef.current}/>,
      <NavBarItem key='mkr' title='Markers' icon='map-marker' collapse={this.markersRef.current}/>,
      <NavBarItem key='set' title='Settings' icon='cog' collapse={this.settingsRef.current}/>
    ]
   
    const navbarSearch = <SearchBox globe={globe}/>
    
    return (
      <div>
        <NavBar 
            logo='images/mars-icon.png'
            title='Mars'
            href='https://github.com/EarthViewer/mars'
            items={navbarItems}
            />
        <Container fluid className='p-0'>
          <div className='globe'>
              <Globe 
                backgroundColor='black'
                ref={this.globeRef} 
                layers={layers}
                latitude={this.state.lat}
                longitude={this.state.lon}
                altitude={this.state.alt} 
                />
          </div>
          <div className='overlayTools noninteractive'>
              <Tools 
                globe={globe} 
                markers={this.markersRef.current}
                markersLayerName='Markers'/>
          </div>
          <div className='overlayCards noninteractive'>
            <CardColumns>
              <LayersCard
                ref={this.layersRef}
                categories={['overlay', 'base']} 
                globe={globe} />
              <MarkersCard
                ref={this.markersRef}
                globe={globe}
                markersLayerName='Markers' />
              <SettingsCard
                ref={this.settingsRef}
                categories={['setting']} 
                globe={globe} />
            </CardColumns>
          </div>
        </Container>
      </div>
    )
  }
}
