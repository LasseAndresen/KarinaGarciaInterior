import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'home-page',
    templateUrl: 'homePageComponent.html',
    styleUrls: ['homePageComponent.scss'],
})
export class HomePageComponent {
    @HostBinding() class = 'h-100 overflow-y-auto';
}
