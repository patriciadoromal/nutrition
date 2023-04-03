import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {CustomMobileNet} from '@teachablemachine/image'
import {MEALS} from 'app/core/constants/meals'
import {checkIfStringsAreEqual} from 'app/core/helpers/helper'
import {Meal} from 'app/core/models/meal.model'
import {empty} from 'app/core/pipes/is-empty.pipe'
import {getModel} from 'main'

@Component({
    selector: 'prediction',
    templateUrl: './prediction.component.html',
    styleUrls: ['./prediction.component.scss'],
})
export class PredictionComponent implements OnInit {
    constructor() {}

    @ViewChild('videoElement')
    videoElement: ElementRef

    model: CustomMobileNet

    cameraStream: MediaStream

    interval: any

    meals: Meal[] = []

    ngOnInit() {
        this.getModel()
    }

    ngOnDestroy(): void {
        this.stopCamera()

        clearInterval(this.interval)
    }

    async getModel() {
        this.model = await getModel()

        this.startCamera()
    }

    async startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            })

            const videoElement = document.getElementById(
                'camera-preview',
            ) as HTMLVideoElement

            videoElement.srcObject = stream
            videoElement.play()

            this.predict()
        } catch (err) {
            console.error('Failed to start camera:', err)
        }
    }

    async predict() {
        if (this.model) {
            const prediction = await this.model.predict(
                this.videoElement.nativeElement,
                true,
            )

            this.handlePrediction(prediction)
        }
    }

    handlePrediction(
        prediction: {
            className: string
            probability: number
        }[],
    ) {
        console.log(MEALS)

        const excludes = []

        this.meals = MEALS.map((meal, index) => {
            return {...meal, id: index}
        })
            .filter((m, i) => !excludes.includes(i))
            .map((meal, index) => {
                const classification = prediction
                    .filter((m, i) => !excludes.includes(i))
                    .find((p) => checkIfStringsAreEqual(p.className, meal.name))

                if (
                    empty(classification) ||
                    empty(classification.probability)
                ) {
                    return {
                        ...meal,
                        probability: 0,
                    }
                }

                return {...meal, probability: classification?.probability ?? 0}
            })
            .sort((a, b) => b.probability - a.probability) as any

        requestAnimationFrame(() => {
            this.predict()
        })
    }

    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach((track) => track.stop())
            this.cameraStream = null
        }

        const videoElement = this.videoElement.nativeElement
        videoElement.srcObject = null
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
