import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message

                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
        window.scroll({ 
           top: 0, 
           left: 0, 
           behavior: 'smooth' 
      });
    }

    error(message: string, keepAfterRouteChange = false) {
         this.keepAfterRouteChange = keepAfterRouteChange;
         this.subject.next({ type: 'error', text: message });
         window.scroll({ 
           top: 0, 
           left: 0, 
           behavior: 'smooth' 
        });
    }

    clear() {
        //alert("asdasd");
        // clear by calling subject.next() without parameters
        this.subject.next({});
        //this.subject.complete();

    }
}