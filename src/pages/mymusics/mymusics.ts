import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {$} from '../../providers/HelperProvider';
import { SearchPage } from '../search/search';

@Component(
{
  templateUrl: 'mymusics.html'
})
export class MyMusics 
{
  private musics:any = {};
  private showList:boolean;
  public  searchPage:SearchPage;

  constructor(public navCtrl: NavController,public $:$,public navParams: NavParams) 
  {
    console.log(this.navParams.get('music'));
    this.showList = ( $.sizeOf(this.musics) > 0  );
  }

 

}





