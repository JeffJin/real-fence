import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListingPage} from "../pages/listing/listing";
import {SettingsPage} from "../pages/settings/settings";
import {IBeacon} from "@ionic-native/ibeacon";
import {BLE} from "@ionic-native/ble";
import {Dialogs} from "@ionic-native/dialogs";
import {GoogleMaps} from "@ionic-native/google-maps";

@NgModule({
  declarations: [
    MyApp,
    ListingPage,
    ContactPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListingPage,
    ContactPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IBeacon,
    BLE,
    Dialogs,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
