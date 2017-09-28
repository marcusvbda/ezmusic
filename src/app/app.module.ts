import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { YoutubeAPI } from '../providers/YoutubeAPI';
import { $ } from '../providers/HelperProvider';

import { SplashScreen } from '@ionic-native/splash-screen';

import { StatusBar } from '@ionic-native/status-bar';
import { SearchPage } from '../pages/search/search';


@NgModule({
  declarations: [
    MyApp,
    SearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: $, useClass: $},    
    {provide: YoutubeAPI, useClass: YoutubeAPI},
    {provide: FileTransfer, useClass: FileTransfer},
    {provide: File, useClass: File},
  ]
})
export class AppModule {}

