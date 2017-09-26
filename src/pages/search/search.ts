import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component(
{
  templateUrl: 'search.html'
})
export class SearchPage
{
  searchInput:string="";
  constructor(public navCtrl: NavController) 
  {

  }

  public inputCancel()
  {
    this.searchInput="";
  }

}
