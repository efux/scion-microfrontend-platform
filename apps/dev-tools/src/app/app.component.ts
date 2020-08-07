import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Dimension } from '@scion/toolkit/observable';

interface TitleHolder {
  title: string | Observable<string> | undefined;
}

const BLANK_TITLE = '';

@Component({
  selector: 'devtools-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {

  public primaryTitle: string;
  public detailsTitle: string;
  public showPrimaryOutlet = true;
  public showDetailsOutlet = true;
  public menuBarPosition: 'top' | 'left';

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _router: Router, private _cdRef: ChangeDetectorRef) {
    this.installNavigationEndListener();
  }

  private installNavigationEndListener(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._destroy$),
    ).subscribe((event: NavigationEnd) => {
      this.showDetailsOutlet = event.url.match(/\(details:.*\)/) !== null;

      // Force showing primary outlet if details outlet is deactivated through navigation
      if (!this.showDetailsOutlet) {
        this.showPrimaryOutlet = true;
        this.detailsTitle = BLANK_TITLE;
      }

      this._cdRef.markForCheck();
    });
  }

  public onDimensionChange(dimension: Dimension): void {
    this.menuBarPosition = dimension.clientHeight < dimension.clientWidth ? 'left' : 'top';
  }

  public onTogglePrimaryClicked(): void {
    this.showPrimaryOutlet = !this.showPrimaryOutlet;
  }

  public onPrimaryOutletActivated(component: TitleHolder): void {
    this.updateTitle(component, title => this.primaryTitle = title);
  }

  public onDetailsOutletActivated(component: TitleHolder): void {
    this.updateTitle(component, title => this.detailsTitle = title);
  }

  private updateTitle(component: TitleHolder, titleSetter: (title: string) => void): void {
    if (component.title === undefined) {
      titleSetter(BLANK_TITLE);
    } else if (typeof component.title === 'string') {
      titleSetter(component.title);
    } else {
      component.title.pipe(takeUntil(this._destroy$)).subscribe(title => titleSetter(title));
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
