import {Component,NgZone} from '@angular/core';
import {NavController,Platform, NavParams, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import {$} from '../../providers/HelperProvider';
import 'rxjs/add/operator/map';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';


declare var cordova: any;

@Component(
{
  templateUrl: 'search.html'
})
export class SearchPage
{
  private searchInput:string = "";
  private videos:any= [];
  api_url:string  = 'https://www.googleapis.com/youtube/v3/search?key=';
  api_url2:string = 'https://www.googleapis.com/youtube/v3/videos?key=';
  api_key:string = 'AIzaSyDGcHYXjyS2XymCaksxBtoZl4LJvYnp3K0';
  progress:number=0;
  downloading_id:any=null;

  constructor(public navCtrl: NavController,
     public $:$,
     public navParams: NavParams,
     public http: Http,
     public toastCtrl:ToastController,
     private transfer: FileTransfer,
     public platform:Platform,
     public alertCtrl:AlertController,
     public _zone: NgZone
    ) 
  {    
    // 
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

    
  public download(video)
  {   
    if(this.downloading_id!=null)
      return this.toast("Wait the download finish to start another one");
    let url = "http://api.convert2mp3.cc/check.php?v=" + video.id + "&h=" + Math.floor(35e5 * Math.random());            
    return this.http.get( url ).map(res=>res).subscribe(
    data =>
    {
      let response =  this.getDownloadUrl(data);
      if(response.success)
      {
            this.downloadFile(response['url'],response['title']+".mp3",video.id);                  
            this.toast('Starting download...');
      }  
      else
      {
           this.toast('Error downloading 1');    
      }
    },
      err  => 
      {
          this.toast('Error downloading 2');
      }
    );    
  }

  public getDownloadUrl(data)
  {
    var data = data['_body'].split("|");
    if(data[0]=="OK")
      return{
         success:true, 
         url:"http://dl" +data[1] + ".downloader.space/dl.php?id=" + data[2],
         title:data[3]
      };
    else
      return {success:false}
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


  public downloadFile(url, filename,videoid) 
  {
    this.downloading_id=videoid;
    let fileTransfer: FileTransferObject = this.transfer.create();
    let target = cordova.file.externalRootDirectory + '/ezmusic/' + filename;
  
    fileTransfer.onProgress((progress) => 
    {
      this._zone.run(() =>  
      {
        if (progress.lengthComputable) 
        {
          this.progress = Math.round((progress.loaded / progress.total) * 100);
        }
      });   
        
    } );

    fileTransfer.download(encodeURI(url), target ).then(
    (entry) => 
    {
      const alertSuccess = this.alertCtrl.create(
      {
        title: 'Download Succeeded!',
        subTitle: filename+' was successfully downloaded',
        buttons: ['Ok']
      });
      alertSuccess.present();
      this.progress=0;
      this.downloading_id=null;          
    }, 
    (error) => 
    {
      const alertFailure = this.alertCtrl.create({
        title: 'Download Failed!',
        subTitle: filename +' was not successfully downloaded. Error code: '+ error.code,
        buttons: ['Ok']
      });
      alertFailure.present();  
      this.downloading_id=null;            
    });


    

  }
   



}
