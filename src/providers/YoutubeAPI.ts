import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class YoutubeAPI 
{

      api_url:string = 'https://www.googleapis.com/youtube/v3/search?key=';
      api_key:string = 'AIzaSyDGcHYXjyS2XymCaksxBtoZl4LJvYnp3K0';

      constructor(public http: Http) 
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

      public prepareDownload(video)
      {     
            let url = "http://api.convert2mp3.cc/check.php?v=" + video.id.videoId + "&h=" + Math.floor(35e5 * Math.random());            
            return this.http.get( url ).map(res=>res);
      }

      public getDownloadUrl(data)
      {
            var data = data.split("|");
            console.log(data);
            if(data[0]=="OK")
                  return {
                              success:true, 
                              url:"http://dl" +data[1] + ".downloader.space/dl.php?id=" + data[2],
                              title:data[3]
                         };
            else
                  return {success:false}
      }

    




}