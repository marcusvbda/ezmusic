import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { $ } from '../providers/HelperProvider';
import { FileTransfer,  FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
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
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer, 
    FileTransferObject,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: $, useClass: $},
    
  ]
})
export class AppModule {}

