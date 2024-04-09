import {Component, Input} from "@angular/core";

@Component({
    selector: 'navigation-button',
    templateUrl: './navigationButtonComponent.html',
    styleUrls: ['./navigationButtonComponent.scss'],
    standalone: true
})
export class NavigationButtonComponent {
    @Input({required: true}) title: string = '';
    @Input({required: true}) route: string = '';
}
