import {afterNextRender, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription, throttleTime} from 'rxjs';
import {NavigationButtonComponent} from "../../components/navigation-button/navigationButtonComponent";
import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'page-header',
  templateUrl: './topBarComponent.html',
  styleUrls: ['./topBarComponent.scss'],
  imports: [
    NavigationButtonComponent,
    NgIf,
    NgTemplateOutlet,
    NgClass,
    FontAwesomeModule
  ],
  standalone: true,
})
export class TopBarComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  // Icons
  protected faBars = faBars;
  protected faClose = faXmark;

  protected showMobileMenu = false;
  protected mobileWidth = false;

  constructor(private _cdf: ChangeDetectorRef) {

    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => {
      this.mobileWidth = document.body.offsetWidth < 900;
      this._cdf.detectChanges();
    };

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
    this._cdf.detectChanges();
  }

  public hideMobileMenuClicked() {
    this.showMobileMenu = false;
    this._cdf.detectChanges();
  }
}
