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
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    TabsPage
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
    TabsPage
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

