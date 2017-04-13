import {Component, NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import {BLE} from "@ionic-native/ble";
import {Dialogs} from "@ionic-native/dialogs";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  devices:Array<any> = [];
  isScanning:boolean = false;

  constructor(private zone: NgZone, private ble: BLE, private dialogs: Dialogs) {

  }

  startScan(){
    console.log('start scanning BLE devices');
    this.devices = [];
    this.isScanning = true;
    this.ble.startScan([]).subscribe(
      device => {
        console.log('new device discovered', JSON.stringify(device));
        if(!this.deviceExists(device.id)){
          if(device.name && device.name.indexOf('MacBook') < 0){
            this.zone.run(()=>{
              this.devices.push(device);
            });
          }
        }
        else{
          console.warn('device exists', JSON.stringify(device));
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
    this.dialogs.alert(JSON.stringify(device, null, 2), device.name)
      .then(() => console.log('Dialog dismissed'))
      .catch(e => console.log('Error displaying dialog', e));
  }

}
