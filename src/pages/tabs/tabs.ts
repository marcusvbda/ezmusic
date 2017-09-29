import { Component } from '@angular/core';

import { SearchPage } from '../search/search';

@Component(
{
  templateUrl: 'tabs.html'
})
export class TabsPage 
{

    tabSearch:any = SearchPage;

    constructor() 
    {
      
    }
}