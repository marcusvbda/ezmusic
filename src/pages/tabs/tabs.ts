import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { MyMusics } from '../mymusics/mymusics';

@Component(
{
  templateUrl: 'tabs.html'
})
export class TabsPage 
{

  tabSearch:any    = SearchPage;
  tabMyMusics:any  = MyMusics;

  constructor() 
  {

  }
}
