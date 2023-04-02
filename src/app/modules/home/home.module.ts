import {HomeComponent} from './home.component'
import {HomeSection1Component} from './home-section1/home-section1.component'
import {HomeSection2Component} from './home-section2/home-section2.component'
import {HomeSection3Component} from './home-section3/home-section3.component'
import {HomeSection4Component} from './home-section4/home-section4.component'
import {NgModule} from '@angular/core'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'

@NgModule({
    declarations: [
        HomeComponent,
        HomeSection1Component,
        HomeSection2Component,
        HomeSection3Component,
        HomeSection4Component,
    ],
    imports: [SharedModule, RouterModule],
})
export class HomeModule {}
