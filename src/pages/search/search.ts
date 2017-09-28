import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {YoutubeAPI} from '../../providers/YoutubeAPI';
import {$} from '../../providers/HelperProvider';
import { ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@Component(
{
  templateUrl: 'search.html'
})
export class SearchPage
{
  private searchInput:string = "";
  private videos:any= [];
  constructor(public navCtrl: NavController,
     public YoutubeAPI: YoutubeAPI,
     public $:$,
     public navParams: NavParams,
     public toastCtrl: ToastController,
     private transfer: FileTransfer, 
     private file: File) 
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
    this.YoutubeAPI.prepareDownload(video).subscribe(
      data =>
      {
            let response =  this.YoutubeAPI.getDownloadUrl(data['_body']);
            if(response.success)
            {
                  this.executeDownload( response);
                  this.toast('Wait... the download will start soon');
            }  
            else
            {
                 this.toast('Error downloading');
                 
            }
        },
        err  => 
        {
            this.toast('Error downloading');
        }
      );    
  }

  private executeDownload(data)
  {
    const fileTransfer: FileTransferObject = this.transfer.create();
    // console.log(data['url']);
    fileTransfer.download(data['url'], this.file.dataDirectory + data['title']+'.mp3').then((entry) => 
    {
      this.toast('Download completed');
    }, (error) => 
    {
      console.log(error);
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
