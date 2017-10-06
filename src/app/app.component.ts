import { Component,ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DownloadPage } from '../pages/download/download';
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
  rootPage:any = DownloadPage;
  appMenuItems: Array<MenuItem>;
  constructor(public platform: Platform, public statusBar: StatusBar)
  {
    
  }

  

}