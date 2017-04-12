import {Component, NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import {BLE} from "@ionic-native/ble";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  devices:Array<any> = [];
  isScanning:boolean = false;

  constructor(private zone: NgZone, private ble: BLE) {

  }

  startScan(){
    console.log('start scanning BLE devices');
    this.devices = [];
    this.isScanning = true;
    this.ble.startScan([]).subscribe(
      device => {
        console.log('new device discovered', device);

        if(!this.deviceExists(device.id)){
          console.log('adding new device into queue', device);
          if(device.name){
            this.zone.run(()=>{
              this.devices.push(device);
            });
          }
        }
      },
      err => {
        console.log('scanning device failed', err);

      }
    );
  }

  private deviceExists(id:string){
    for(var i = 0; i < this.devices.length; i++){
      if(this.devices[i].id == id){
        return true;
      }
    }
    return false;
  }

  stopScan(){
    console.log('stop scanning BLE devices');
    this.ble.stopScan().then(
      result => {
        console.log('device scanning stopped', result);
        this.isScanning = false;
      },
      err => {
        console.log('stopping device failed', err);

      }
    );
  }

  connectToDevice(device) {
    console.log('Connect To BLE Device');
    console.log(JSON.stringify(device))
    // this.navCtrl.push(DevicePage, {
    //   device: device
    // });
  }

}
