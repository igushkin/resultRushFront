import {Injectable} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  sidebarOpened: boolean;

  constructor(private deviceDetector: DeviceDetectorService) {
    this.sidebarOpened = deviceDetector.isDesktop();
  }
}
