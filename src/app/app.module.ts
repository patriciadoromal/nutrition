import {SharedModule} from './shared/shared.module'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {provideFirestore, getFirestore} from '@angular/fire/firestore'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {initializeApp, provideFirebaseApp} from '@angular/fire/app'
import {environment} from '../environments/environment'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import {AngularFireModule} from '@angular/fire/compat'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
