import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import {AppModule} from './app/app.module'
import {environment} from './environments/environment'
import * as tmImage from '@teachablemachine/image'

const URL = environment.teachableMachineURL

export const getModel = async () => {
    const modelURL = URL + 'model.json'
    const metadataURL = URL + 'metadata.json'

    return await tmImage.load(modelURL, metadataURL)
}

if (environment.production) {
    enableProdMode()
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))
