import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class YoutubeAPI 
{

      api_url:string = 'https://www.googleapis.com/youtube/v3/search?key=';
      api_key:string = 'AIzaSyDGcHYXjyS2XymCaksxBtoZl4LJvYnp3K0';

      constructor(public http: Http,public toastCtrl: ToastController) 
      {

      }

      public getData(filter="",page="") 
      {
            return this.http.get(this.getApiURL(filter,page)  ).map(res=>res.json());
      }

      private getApiURL(filter="",page="")
      {
            let url = this.api_url+this.api_key+'&videoCategoryId=10&type=video&maxResults=5&part=snippet&q='+filter+this.getPageURL(page);
            return url;
      }

      public getPageURL(page="")
      {
            if(page!="")
                  return '&pageToken='+page;
            else
                  return '';
      }

      public download(video)
      {     
            let url = "http://api.convert2mp3.cc/check.php?v=" + video.id.videoId + "&h=" + Math.floor(35e5 * Math.random());
            
            this.http.get( url ).map(res=>res).subscribe(
            data =>
            {
                  let response =  this.getDownloadUrl(data['_body']);
                  if(response.success)
                  {
                        top.location.href= response['url'];
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

      private getDownloadUrl(data)
      {
            var data = data.split("|");
            if(data[0]=="OK")
                  return {
                              success:true, 
                              url:"http://dl" +data[1] + ".downloader.space/dl.php?id=" + data[2]
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



}