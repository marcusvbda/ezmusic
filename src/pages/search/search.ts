import {Component,NgZone} from '@angular/core';
import {NavController,Platform, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import {$} from '../../providers/HelperProvider';
import 'rxjs/add/operator/map';
import {File} from '@ionic-native/file';
import { DownloadingPage } from '../downloading/downloading';
import {DownloadProvider} from '../../providers/DownloadProvider';
import { AlertController } from 'ionic-angular';


@Component(
{
  templateUrl: 'search.html'
})

export class SearchPage
{
  private searchInput:string = "";
  private videos:any= [];
  public api_url:string  = 'https://www.googleapis.com/youtube/v3/search?key=';
  public api_url2:string = 'https://www.googleapis.com/youtube/v3/videos?key=';
  public api_key:string = 'AIzaSyDGcHYXjyS2XymCaksxBtoZl4LJvYnp3K0';

  constructor(
    public navCtrl: NavController,
    public $:$,
    public navParams: NavParams,
    public http: Http,
    public toastCtrl:ToastController,
    public platform:Platform,
    public _zone: NgZone,
    public file:File,
    public downloadProvider : DownloadProvider,
    public alertCtrl: AlertController
    ) 
  {    
  
  }


  private getApiURL(filter="",page="")
  {
    let url = this.api_url+this.api_key+'&videoCategoryId=10&type=video&maxResults=15&part=snippet&q='+filter+this.getPageURL(page);
    return url;
  }

  public getPageURL(page="")
  {
    if(page!="")
        return '&pageToken='+page;
    else
        return '';
  }

  public getData(filter="",page="")
  {
    let ids:string;
    this.http.get(this.getApiURL(filter,page)  ).map(res=>res.json()).subscribe(
      data =>
      {
          ids = this.getIds(data);
          this.http.get(this.getApiURL(filter,page)  ).map(res=>res.json()).subscribe(
            data =>
            {
              this.http.get(this.api_url2+this.api_key + "&id="+ids+"&part=contentDetails,snippet").map(res=>res.json()).subscribe(
                data =>
                {
                    this.videos = data;
                });
            });
      }
    );

  }
 
  private getIds(data)
  {
    let ids:string = "";   
    
    for(let i=0;i<data.items.length;i++)
    {
       ids+=data.items[i].id.videoId+",";
    }
    return ids.substr(1,(ids.length - 1));
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
    this.http.get(this.getApiURL(this.searchInput,this.videos.nextPageToken)  ).map(res=>res.json()).subscribe(
      data =>
      {
        let ids = this.getIds(data);

        this.http.get(this.getApiURL(this.searchInput,this.videos.nextPageToken)  ).map(res=>res.json()).subscribe(
          data =>
          {
            this.http.get(this.api_url2+this.api_key + "&id="+ids+"&part=contentDetails,snippet").map(res=>res.json()).subscribe(
              data =>
              {
                this.videos = this.mergeVideos(this.videos,data);
                infiniteScroll.complete();
              });
          },
          err  => this.videos = []
        );
      },
      err  => this.videos = []
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

    
  public addToStack(video)
  {
    const alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to add '+video.snippet.title+' to your download list?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => 
          {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => 
          {
            this.downloadProvider.add(video); 
            this.toast(video.snippet.title+" added to your download list, check the download page to run the list");
          }
        }
      ]
    });
    alert.present();
  }

  


  public toast(msg)
  {
    let toast = this.toastCtrl.create(
    {
       message: msg,
       duration: 6000
    });
    toast.present();
  }
    
   



}
