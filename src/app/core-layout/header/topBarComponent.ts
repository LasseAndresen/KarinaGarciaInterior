import {Component, Input, OnInit, OnDestroy, afterNextRender} from '@angular/core';
import {fromEvent, Observable, Subscription, throttleTime} from 'rxjs';
import {NavigationButtonComponent} from "../../components/navigation-button/navigationButtonComponent";
import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'page-header',
  templateUrl: './topBarComponent.html',
  styleUrls: ['./topBarComponent.scss'],
  imports: [
    NavigationButtonComponent,
    NgIf,
    NgTemplateOutlet,
    NgClass
  ],
  standalone: true
})
export class TopBarComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  protected logoSrc: string = 'assets/Placeholder.png';
  protected showMobileMenu = false;
  protected screenWidth = 800;

  constructor(
  ) {
    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => {this.screenWidth = document.body.offsetWidth;
      console.log('screenWidth: ' + this.screenWidth);}

    afterNextRender(() => {
      // Run initial check
      checkScreenSize();

      // Create observable from window resize event throttled so only fires every 500ms
      this._subscriptions.push(fromEvent(window, 'resize').pipe(throttleTime(500)).subscribe(checkScreenSize));
    });
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  public onLogoClick() {}

  public showMobileMenuClicked() {
    this.showMobileMenu = true;
  }

  public hideMobileMenuClicked() {
    this.showMobileMenu = false;
  }
}
