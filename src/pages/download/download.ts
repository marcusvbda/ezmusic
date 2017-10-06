import {Component,NgZone} from '@angular/core';
import {NavController,Platform, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController, LoadingController  } from 'ionic-angular';
import {$} from '../../providers/HelperProvider';
import 'rxjs/add/operator/map';
import {File} from '@ionic-native/file';
import {AjaxProvider} from '../../providers/AjaxProvider';
import { AlertController } from 'ionic-angular';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { Keyboard } from 'ionic-native';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
declare var cordova;

@Component(
{
  templateUrl: 'download.html'
})
export class DownloadPage
{
  private searchInput:string = "";
  private videos:any= [];
  public api_url:string  = 'https://www.googleapis.com/youtube/v3/search?key=';
  public api_url2:string = 'https://www.googleapis.com/youtube/v3/videos?key=';
  public api_key:string = 'AIzaSyDGcHYXjyS2XymCaksxBtoZl4LJvYnp3K0';
  public urlMp3:string="";
  public playingId:string="";
  public progress:number=0;
  public downloading_id:any=null;
  public btnDownloadText = 'Download';
  public loading:any;
  public StorageDir = '/storage/emulated/0/musics/';
  constructor(
    public navCtrl: NavController,
    public $:$,
    public navParams: NavParams,
    public http: Http,
    public toastCtrl:ToastController,
    public platform:Platform,
    public _zone: NgZone,
    public file:File,
    public alertCtrl: AlertController,
    public ajaxProvider:AjaxProvider,
    public transfer:FileTransfer,
    public localNotification:PhonegapLocalNotification,
    public loadingController:LoadingController
    ) 
  {    
    this.loading = this.loadingController.create({
      spinner: 'crescent',
      content: 'Please wait...'
    });


    platform.ready().then(() => 
    {
      // console.log(this.StorageDir);
    })
  }
  
  public fileTransfer: FileTransferObject;

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
                  this.loading.dismiss();
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
    this.videos = [];   
    this.searchInput="";    
  }

  public search()
  {
    this.loading.present();  
    if(this.searchInput)
      this.getData(this.searchInput);
    else
      this.videos = [];

    Keyboard.close();
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

    
  public toast(msg)
  {
    let toast = this.toastCtrl.create(
    {
       message: msg,
       duration: 3000
    });
    toast.present();
  }
    
   
  public play(video)
  {
    if(this.downloading_id!=null)
    {
      return this.toast("Wait the download finish to start another one");
    }
    this.playingId =  video.id;    
    let result = this.ajaxProvider.get("http://api.convert2mp3.cc/check.php?v=" + this.playingId + "&h=" + Math.floor(35e5 * Math.random()));  
    let data = result.split("|");    
    this.urlMp3 =  encodeURI("http://dl" +data[1] + ".downloader.space/dl.php?id=" + data[2]);
  }

  public download(video,url)
  {    
    const alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you confirm download of '+video.snippet.title+'.mp3?',
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
            this.downloadFile(video,url); 
          }
        }
      ]
    });
    alert.present();
  }

  private downloadFile(video,url)
  {    
    this.downloading_id = video.id;
    this.fileTransfer = this.transfer.create();
    this.fileTransfer.onProgress((progress) => 
    {
      this._zone.run(() =>  
      {
        if (progress.lengthComputable) 
        {
          let porcent = Math.round((progress.loaded / progress.total) * 100);
          this.btnDownloadText = porcent+'%';
        }
      });   
        
    } );

    let title = video.snippet.title+".mp3";

    let  target = this.StorageDir + title;
    
    
    this.fileTransfer.download(encodeURI(url) , target , true ).then(
    (entry) => 
    {
      this.toast(video.snippet.title+".mp3"+' is successfully downloaded');
      this.progress=0;   
      this.downloading_id=null;  
      this.btnDownloadText = 'Download';      
      this.notification(video.snippet.title+".mp3","Sucessfully Downloaded");
    }, 
    (error) => 
    {
      if( error.code==4)
        this.toast('Download Aborted'); 
      else
        this.toast('Error downloading. Error code: '+ error.code); 
      console.log(error);
      this.downloading_id=null;
      this.btnDownloadText = 'Download';
    }); 
    
  }

  public abortDownload()
  {    
    const alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Abort download ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => 
          {
            // console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => 
          {
            this.fileTransfer.abort();
          }
        }
      ]
    });
    alert.present();
  }


  private notification(title,msg)
  {
    this.localNotification.requestPermission().then(
    (permission) => 
    {
      if (permission === 'granted') 
      {    
        this.localNotification.create(title, 
        {
          body: msg,
          icon: 'assets/icon/favicon.ico'
        });
    
      }
    });
  }

  

}
