import { Component,ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SearchPage } from '../pages/search/search';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp 
{
  @ViewChild(Nav) nav: Nav;
  rootPage:any = SearchPage;
  appMenuItems: Array<MenuItem>;
  constructor(public platform: Platform, public statusBar: StatusBar)
  {
    
  }

}

