import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { $ } from '../providers/HelperProvider';
import { AjaxProvider } from '../providers/AjaxProvider';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { DownloadPage } from '../pages/download/download';
import { Media } from '@ionic-native/media';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
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
    FileTransfer, 
    FileTransferObject,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: $, useClass: $},
    {provide: AjaxProvider, useClass: AjaxProvider} ,
    Media ,
    PhonegapLocalNotification
  ]
})
export class AppModule {}

