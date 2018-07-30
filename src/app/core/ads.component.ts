import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

export interface AdsenseConfig {
  /** adsense account ca-pub-XXXXXXXXXXXXXXXX */
  adClient: string;
  /** ad slot/number */
  adSlot?: string | number;
  /** data-ad-format default: auto */
  adFormat?: string;
  /** ins element display style */
  display?: string;
  /** ins element height in px */
  width?: number;
  /** ins element width in px */
  height?: number;
  /** used for in-feed ads */
  layout?: string;
  /** used for in-feed ads */
  layoutKey?: string;
  /** enable page-level ads */
  pageLevelAds?: boolean;
  /** on first load sometimes adsense is not ready */
  timeOutRetry?: number;
  adtest?: string;
}

@Component({
  selector: 'oms-ads',
  template: `
  <ins #ins class="adsbygoogle"
    [ngStyle]="{'display': display, 'width.px': width, 'height.px': height }"
    [attr.data-ad-client]="adClient"
    [attr.data-ad-slot]="adSlot"
    [attr.data-ad-format]="adFormat"
    [attr.data-ad-region]="adRegion"
    [attr.data-layout]="layout"
    [attr.data-adtest]="adtest"
    [attr.data-layout-key]="layoutKey">
  </ins>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdsComponent implements OnInit, AfterViewInit, OnDestroy {
  /** adsense account ca-pub-XXXXXXXXXXXXXXXX */
  @Input() adClient: string;
  /** ad slot/number */
  @Input() adSlot: string | number;
  @Input() adFormat: string;
  /** can be manually set if you need all ads on a page to have same id page-xxx */
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;
  /** ins element display style */
  @Input() display: string;
  /** ins element height in px */
  @Input() width: number;
  /** ins element width in px */
  @Input() height: number;
  /** used for in-feed ads */
  @Input() layout: string;
  /** used for in-feed ads */
  @Input() layoutKey: string;
  /** enable page-level ads */
  @Input() pageLevelAds: boolean;
  /** on first load sometimes adsense is not ready */
  @Input() timeOutRetry: number;
  /** sets up some sort of google test ad */
  @Input() adtest: string;
  @ViewChild('ins') ins: any;

  private config: AdsenseConfig;

  constructor() {
    this.config = {
      adClient: 'ca-pub-1489394126581641',
      pageLevelAds: true,
      adtest: 'something',
    };
  }

  ngOnInit() {
    const config = this.config;
    function use<T>(source: T, defaultValue: T): T {
      return config && source !== undefined ? source : defaultValue;
    }
    this.adClient = use(this.adClient, config.adClient);
    this.adSlot = use(this.adSlot, config.adSlot);
    this.adFormat = use(this.adFormat, config.adFormat || 'auto');
    this.display = use(this.display, config.display || 'block');
    this.width = use(this.width, config.width);
    this.height = use(this.height, config.height);
    this.layout = use(this.layout, config.layout);
    this.layoutKey = use(this.layoutKey, config.layoutKey);
    this.pageLevelAds = use(this.pageLevelAds, config.pageLevelAds);
    this.timeOutRetry = use(this.timeOutRetry, config.timeOutRetry || 200);
    this.adtest = use(this.adtest, config.adtest);
  }
  ngOnDestroy() {
    const iframe = this.ins.nativeElement.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.src = 'about:blank';
      iframe.remove();
    }
  }

  /**
   * attempts to push the ad twice. Usually if one doesn't work the other
   * will depeding on if the browser has the adsense code cached and
   * if its the first page to be loaded
   */
  ngAfterViewInit() {
    const res = this.push();
    if (res instanceof TypeError) {
      setTimeout(() => this.push(), this.timeOutRetry);
    }
  }

  push() {
    const p: any = {};
    if (this.pageLevelAds) {
      p.google_ad_client = this.adClient;
      p.enable_page_level_ads = true;
    }
    try {
      const adsbygoogle = window['adsbygoogle'];
      adsbygoogle.push(p);
      return true;
    } catch (e) {
      return e;
    }
  }
}
