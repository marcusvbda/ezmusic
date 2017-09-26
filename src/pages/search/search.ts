import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YoutubeAPI } from '../../providers/YoutubeAPI';

@Component(
{
  templateUrl: 'search.html'
})
export class SearchPage
{
  searchInput:string="";
  videos:any= false;
  foundVideos:boolean = false;
  constructor(public navCtrl: NavController, public YoutubeAPI: YoutubeAPI) 
  {
      // this.init();
  }

  public init()
  {   
    this.getData();
  }
  
  public getData(filter="")
  {
    this.YoutubeAPI.getData(filter).subscribe(
      data =>
      {
          this.videos = data,
          this.foundVideos=true,
          console.log(data)
      },
      err  => console.log(err)
    );
  }

  public inputCancel()
  {
    this.searchInput="";
  }

  public search()
  {
    if(this.searchInput)
      this.getData(this.searchInput);
    else
    {
      this.videos = false;
      this.foundVideos = false;
    }
  }
  

}
