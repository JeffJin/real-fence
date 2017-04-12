import { Component } from '@angular/core';

import { ListingPage } from '../listing/listing';
import { ContactPage } from '../contact/contact';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListingPage;
  tab2Root = SettingsPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
