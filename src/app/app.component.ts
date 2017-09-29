import { Component } from '@angular/core';
import { Platform ,ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp 
{
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, modalCtrl: ModalController) 
  {  
      platform.ready().then(() => 
      {  
          statusBar.styleDefault();  
      });  
  }

  

}