import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {YoutubeAPI} from '../../providers/YoutubeAPI';
import {$} from '../../providers/HelperProvider';

@Component(
{
  templateUrl: 'search.html'
})
export class SearchPage
{
  private searchInput:string = "";
  private videos:any= [];
  constructor(public navCtrl: NavController, public YoutubeAPI: YoutubeAPI,public $:$, public navParams: NavParams) 
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

  public download(video)
  {
    this.YoutubeAPI.download(video);
  }

}
