import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
            let url = this.api_url+this.api_key+'&videoCategories=10&type=video&maxResults=10&part=snippet&q='+filter+this.getPageURL(page);
            return url;
      }

      public getPageURL(page="")
      {
            if(page!="")
                  return '&pageToken='+page;
            else
                  return '';
      }





}