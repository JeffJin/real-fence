import { Component } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { GoogleMaps, CameraPosition, LatLng, MarkerOptions, Marker,
  GoogleMap, GoogleMapsEvent
} from "@ionic-native/google-maps";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private platform: Platform) {
  }

  // Load map only after view is initialized
  ngAfterViewInit() {
    this.platform.ready().then(() => this.onPlatformReady());
  }

  onPlatformReady(): void{
    this.googleMaps.isAvailable().then((result) => {
      console.log('Google Map is available')

      if(result){
        setTimeout(() => {
          this.loadMap();
        }, 2000);
      }
      else{
        console.error('googleMaps.isAvailable', result);
      }
    });
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    // let element: HTMLElement = document.getElementById('contact_map');
    // console.log('element.id', element.id);
    // let map: GoogleMap = this.googleMaps.create(element);

    let map:GoogleMap = new GoogleMap('contact_map');

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };

    map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }
}
