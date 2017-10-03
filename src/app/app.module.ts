import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { $ } from '../providers/HelperProvider';
import { DownloadProvider } from '../providers/DownloadProvider';
import { AjaxProvider } from '../providers/AjaxProvider';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SearchPage } from '../pages/search/search';
import { DownloadingPage } from '../pages/downloading/downloading';
@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    DownloadingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    DownloadingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer, 
    FileTransferObject,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: $, useClass: $},
    {provide: DownloadProvider, useClass: DownloadProvider},
    {provide: AjaxProvider, useClass: AjaxProvider},
    
  ]
})
export class AppModule {}

