import { provideZoneChangeDetection, NgModule } from "@angular/core";
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

@NgModule({ providers: [ provideZoneChangeDetection() ] })
export class ZoneChangeDetectionModule {}


TestBed.initTestEnvironment(
  [ZoneChangeDetectionModule, BrowserDynamicTestingModule],
  platformBrowserDynamicTesting()
);