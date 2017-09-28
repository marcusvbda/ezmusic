import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { YoutubeAPI } from '../providers/YoutubeAPI';
import { $ } from '../providers/HelperProvider';

import { SplashScreen } from '@ionic-native/splash-screen';

import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { MyMusics } from '../pages/mymusics/mymusics';


@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    TabsPage,
    MyMusics
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    TabsPage,
    MyMusics
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: $, useClass: $},    
    {provide: YoutubeAPI, useClass: YoutubeAPI},
  ]
})
export class AppModule {}

