import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MAIN_ROUTING} from './core/routes/_main.routing'

const routes: Routes = [...MAIN_ROUTING]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
