import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { $ } from '../providers/HelperProvider';
import { AjaxProvider } from '../providers/AjaxProvider';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DownloadPage } from '../pages/download/download';
import { Media } from '@ionic-native/media';
@NgModule({
  declarations: [
    MyApp,
    DownloadPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DownloadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer, 
    FileTransferObject,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: $, useClass: $},
    {provide: AjaxProvider, useClass: AjaxProvider} ,
    Media 
  ]
})
export class AppModule {}

