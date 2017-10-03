import {Component,NgZone} from '@angular/core';
import {NavController,Platform, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import {$} from '../../providers/HelperProvider';
import {DownloadProvider} from '../../providers/DownloadProvider';
import {AjaxProvider} from '../../providers/AjaxProvider';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';


@Component(
{
  templateUrl: 'downloading.html'
})
export class DownloadingPage 
{
    progress:number=0;
    api_url:string  = 'https://www.googleapis.com/youtube/v3/search?key=';
    api_url2:string = 'https://www.googleapis.com/youtube/v3/videos?key=';
    api_key:string = 'AIzaSyDGcHYXjyS2XymCaksxBtoZl4LJvYnp3K0';
    httpResponse: Observable<any>;
    checkedData:any;
    downloading_id:any=null;
    constructor(
      public navCtrl: NavController,
      public $:$,
      public navParams: NavParams,
      public http: Http,
      public toastCtrl:ToastController,
      private transfer: FileTransfer,
      public platform:Platform,
      public _zone: NgZone,
      public file:File,
      public downloadProvider : DownloadProvider,
      public ajaxProvider:AjaxProvider
     ) 
   {    
    // 
   }

   public downloadStack()
   {   
      if(this.downloadProvider.get().length>0)
      {
        this.downloading_id = this.downloadProvider.get()[0].id;        
        this.toast('Starting '+this.downloadProvider.get()[0].snippet.title+".mp3"); 
        let checkedData = this.checkItem(this.downloadProvider.get()[0]);
        this.downloadFile(checkedData['url'], checkedData['title']+".mp3",this.downloading_id);
      }
      else
      {
        this.toast('All downloads finished'); 
        this.downloading_id = null;
      }
   }

    public checkItem(item)
    {
      let url = "http://api.convert2mp3.cc/check.php?v=" + item.id + "&h=" + Math.floor(35e5 * Math.random());   
      return this.getDownloadUrl(this.ajaxProvider.get(url));
    }

    public getDownloadUrl(data)
    {
      var data = data.split("|");
      if(data[0]=="OK")
        return{
           success:true, 
           url:encodeURI("http://dl" +data[1] + ".downloader.space/dl.php?id=" + data[2]),
           title:data[3]
        };
      else
        return {success:false}
    }


    public downloadFile(url, filename,videoid) 
    {
        let fileTransfer: FileTransferObject = this.transfer.create();
        let target = '/storage/emulated/0/EzMusic/' + filename;
      
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
          this.toast(filename+' was successfully downloaded, check your library');
          this.progress=0;     
          this.downloadProvider.removeFirst();
          this.downloadStack();
        }, 
        (error) => 
        {
          this.toast(filename +' was not successfully downloaded. Error code: '+ error.code); 
          this.downloadProvider.removeFirst();
          this.downloadStack();
        }); 
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