import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HelperProvider} from '../../providers/HelperProvider';

@Component(
{
  templateUrl: 'mymusics.html'
})
export class MyMusics 
{
  private musicPlaying:any = null;
  private musics:any = {};
  private showList:boolean;
  constructor(public navCtrl: NavController,public Helper:HelperProvider,public navParams: NavParams) 
  {
    this.checkList();
  }

  private checkList():void
  {
    this.showList = ( this.Helper.sizeOf(this.musics) > 0  );
  }
}
