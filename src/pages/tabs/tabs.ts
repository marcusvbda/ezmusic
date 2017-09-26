import { Component } from '@angular/core';

import { SongsPage } from '../songs/songs';
import { SearchPage } from '../search/search';

@Component(
{
  templateUrl: 'tabs.html'
})
export class TabsPage 
{

  tabSongs:any  = SongsPage;
  tabSearch:any = SearchPage;

  constructor() 
  {

  }
}
