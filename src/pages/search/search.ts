import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {YoutubeAPI} from '../../providers/YoutubeAPI';
import {HelperProvider} from '../../providers/HelperProvider';

import { MyMusics } from '../mymusics/mymusics';

@Component(
{
  templateUrl: 'search.html'
})
export class SearchPage
{
  private searchInput:string = "";
  private videos:any= [];
  private myMusics:any = MyMusics;
  constructor(public navCtrl: NavController, public YoutubeAPI: YoutubeAPI,public Helper:HelperProvider,public navParams: NavParams) 
  {
       
  }

  public getData(filter="")
  {
    this.YoutubeAPI.getData(filter).subscribe(
      data =>
      {
          this.videos = data
          // ,console.log(data)
      },
      err  =>
        this.videos = []
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
      this.videos = [];
  }

  public nextPage(infiniteScroll) 
  {
      this.YoutubeAPI.getData(this.searchInput,this.videos.nextPageToken).subscribe(
        data =>
        {
            this.videos = this.mergeVideos(this.videos,data),
            infiniteScroll.complete()      
            // ,console.log(this.videos)
        },
        err  => 
          this.videos = []
      );    
  }

  private mergeVideos(videos,data)
  {
      if(videos!=[])
      {
        videos.nextPageToken = data.nextPageToken;
        for(let i=0;i<data.items.length;i++)
        {
          videos.items.push(data.items[i]);  
        }
      }
      return videos;
  }

  public play(video)
  {
    // donwload first
    // save in the cache
    // get music id
    let music = {id:1,title:'toxicity',author:'system of a down',duration:'224'};
    this.navCtrl.push(this.myMusics,{music : music});
  }

}
