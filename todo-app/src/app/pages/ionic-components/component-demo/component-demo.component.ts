import { Component, computed, input, output, signal } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonActionSheet,
  IonAlert,
  IonAvatar,
  IonBackButton,
  IonBackdrop,
  IonBadge,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonLoading,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonNote,
  IonModal,
  IonPopover,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRefresher,
  IonRefresherContent,
  IonReorder,
  IonReorderGroup,
  IonRippleEffect,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
  IonSplitPane,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  alertCircleOutline,
  arrowBackOutline,
  checkmarkCircle,
  close,
  codeSlashOutline,
  copyOutline,
  heart,
  home,
  informationCircleOutline,
  listOutline,
  person,
  pricetagOutline,
  refreshOutline,
  settingsOutline,
  star,
  trashOutline,
} from 'ionicons/icons';
import { IonicComponent } from '../../../data/ionic-components';

const SAMPLE_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="240">
     <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
       <stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#a855f7"/>
     </linearGradient></defs>
     <rect width="480" height="240" fill="url(#g)"/>
     <text x="50%" y="52%" fill="#ffffff" font-family="sans-serif" font-size="26" text-anchor="middle">ion-img</text>
   </svg>`,
)}`;

const SNIPPETS: Record<string, string> = {
  'ion-button': `<ion-button color="primary" fill="solid" size="default">
  主要按钮
</ion-button>`,
  'ion-input': `<ion-input label="标题" labelPlacement="floating"
           fill="outline" placeholder="请输入"></ion-input>`,
  'ion-list': `<ion-list lines="full">
  <ion-item>
    <ion-label>列表项</ion-label>
  </ion-item>
</ion-list>`,
  'ion-item': `<ion-item detail="true">
  <ion-label>点击条目</ion-label>
</ion-item>`,
  'ion-item-sliding': `<ion-item-sliding>
  <ion-item><ion-label>左滑我</ion-label></ion-item>
  <ion-item-options side="end">
    <ion-item-option color="danger">删除</ion-item-option>
  </ion-item-options>
</ion-item-sliding>`,
  'ion-toggle': `<ion-toggle [checked]="true" labelPlacement="start">
  开启通知
</ion-toggle>`,
  'ion-range': `<ion-range aria-label="音量" [value]="40" [pin]="true"></ion-range>`,
  'ion-searchbar': `<ion-searchbar placeholder="搜索" [debounce]="150"
                (ionInput)="onSearch($event)"></ion-searchbar>`,
  'ion-segment': `<ion-segment value="all">
  <ion-segment-button value="all">全部</ion-segment-button>
  <ion-segment-button value="done">已完成</ion-segment-button>
</ion-segment>`,
  'ion-datetime': `<ion-datetime presentation="date" [value]="today"></ion-datetime>`,
  'ion-modal': `<ion-modal [isOpen]="isOpen" (didDismiss)="isOpen = false">
  <ng-template>
    <ion-content class="ion-padding">弹窗内容</ion-content>
  </ng-template>
</ion-modal>`,
  'ion-toast': `<ion-toast message="保存成功" [duration]="1800"
            [isOpen]="show" (didDismiss)="show = false"></ion-toast>`,
  'ion-alert': `<ion-alert header="确认删除" message="删除后不可恢复"
           [buttons]="['取消', '删除']" [isOpen]="show"></ion-alert>`,
  'ion-fab': `<ion-fab vertical="bottom" horizontal="end" slot="fixed">
  <ion-fab-button color="primary"><ion-icon name="add"></ion-icon></ion-fab-button>
</ion-fab>`,
  'ion-tabs': `<ion-tabs>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home"><ion-icon name="home"></ion-icon></ion-tab-button>
  </ion-tab-bar>
</ion-tabs>`,
  'ion-grid': `<ion-grid>
  <ion-row>
    <ion-col size="6">A</ion-col>
    <ion-col size="6">B</ion-col>
  </ion-row>
</ion-grid>`,
  'ion-reorder-group': `<ion-reorder-group [disabled]="false"
                    (ionItemReorder)="onReorder($event)">
  <ion-item>可拖拽项<ion-reorder slot="end"></ion-reorder></ion-item>
</ion-reorder-group>`,
};

@Component({
  selector: 'app-component-demo',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonNote,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonSplitPane,
    IonInput,
    IonTextarea,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonRadio,
    IonRadioGroup,
    IonToggle,
    IonRange,
    IonDatetime,
    IonDatetimeButton,
    IonSegment,
    IonSegmentButton,
    IonFab,
    IonFabButton,
    IonFabList,
    IonChip,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
    IonAvatar,
    IonThumbnail,
    IonImg,
    IonText,
    IonSkeletonText,
    IonProgressBar,
    IonSpinner,
    IonAccordion,
    IonAccordionGroup,
    IonPopover,
    IonModal,
    IonAlert,
    IonActionSheet,
    IonToast,
    IonLoading,
    IonBackdrop,
    IonTabBar,
    IonTabButton,
    IonBackButton,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonFooter,
  ],
  templateUrl: './component-demo.component.html',
  styleUrl: './component-demo.component.scss',
})
export class ComponentDemoComponent {
  readonly item = input.required<IonicComponent>();
  readonly closed = output<void>();

  readonly name = computed(() => this.item().name);
  readonly flush = computed(() =>
    [
      'ion-header',
      'ion-footer',
      'ion-content',
      'ion-menu',
      'ion-menu-button',
      'ion-menu-toggle',
      'ion-split-pane',
      'ion-item-sliding',
      'ion-item-divider',
      'ion-item-group',
      'ion-accordion',
      'ion-accordion-group',
      'ion-tab-bar',
      'ion-tab-button',
      'ion-refresher',
      'ion-refresher-content',
      'ion-infinite-scroll',
      'ion-infinite-scroll-content',
      'ion-reorder',
      'ion-reorder-group',
    ].includes(this.name()),
  );
  readonly snippet = computed(
    () => SNIPPETS[this.item().name] ?? `<${this.item().name}></${this.item().name}>`,
  );
  readonly sampleImg = SAMPLE_IMG;

  // ---- 按钮属性 ----
  readonly btnFill = signal<'solid' | 'outline' | 'clear'>('solid');
  readonly btnSize = signal<'small' | 'default' | 'large'>('default');
  readonly btnColor = signal('primary');

  // ---- 输入属性 ----
  readonly inputFill = signal<'outline' | 'solid'>('outline');
  readonly labelPlacement = signal<'floating' | 'stacked' | 'start'>('floating');
  readonly inputValue = signal('Ionic 8');
  readonly textValue = signal('这是 ion-textarea，支持 autoGrow 自动增高。');

  // ---- 表单状态 ----
  readonly toggleOn = signal(true);
  readonly checkA = signal(true);
  readonly checkB = signal(false);
  readonly radio = signal('standard');
  readonly rangeVal = signal(45);
  readonly segVal = signal('all');
  readonly selectVal = signal<string | undefined>('ionic');
  readonly dateVal = signal('2026-11-11T09:30:00');
  readonly chipSelected = signal(true);
  readonly accordionVal = signal<string[]>(['panel-1']);
  readonly checkedChip = signal(false);
  readonly tabVal = signal('home');
  readonly crumb = signal(2);
  readonly otp = signal('');

  // ---- 搜索 ----
  readonly searchTerm = signal('');
  readonly searchSource = ['Angular', 'Ionic', 'Capacitor', 'Stencil', 'React', 'Vue'];
  readonly searchResults = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    return term
      ? this.searchSource.filter((x) => x.toLowerCase().includes(term))
      : this.searchSource;
  });

  // ---- 列表 / 滚动 ----
  readonly slidingItems = signal(['左滑我试试', '再滑一个', '滑动后点删除']);
  readonly refresherCount = signal(0);
  readonly infiniteItems = signal(Array.from({ length: 8 }, (_, i) => `列表项 ${i + 1}`));
  readonly infinityDone = signal(false);
  readonly reorderList = signal(['写文案', '改样式', '联调接口', '发版本']);

  // ---- 浮层 ----
  readonly toastOpen = signal(false);
  readonly toastMsg = signal('');
  readonly alertOpen = signal(false);
  readonly sheetOpen = signal(false);
  readonly loadingOpen = signal(false);
  readonly popoverOpen = signal(false);
  readonly innerModalOpen = signal(false);
  readonly fabOpen = signal(false);
  readonly menuOpen = signal(false);
  readonly backdropOpen = signal(false);

  readonly actionButtons = [
    { text: '分享', handler: () => this.toast('已选择：分享') },
    { text: '复制链接', handler: () => this.toast('已选择：复制链接') },
    { text: '取消', role: 'cancel' },
  ];

  readonly alertButtons = [
    { text: '取消', role: 'cancel' },
    { text: '删除', role: 'destructive', handler: () => this.toast('已点击删除') },
  ];

  constructor() {
    addIcons({
      add,
      close,
      copyOutline,
      codeSlashOutline,
      trashOutline,
      refreshOutline,
      checkmarkCircle,
      heart,
      star,
      home,
      person,
      settingsOutline,
      listOutline,
      pricetagOutline,
      informationCircleOutline,
      alertCircleOutline,
      arrowBackOutline,
    });
  }

  setBtnFill(fill: 'solid' | 'outline' | 'clear'): void {
    this.btnFill.set(fill);
  }

  removeSliding(index: number): void {
    this.slidingItems.update((items) => items.filter((_, i) => i !== index));
    this.toast('已删除一项');
  }

  resetSliding(): void {
    this.slidingItems.set(['左滑我试试', '再滑一个', '滑动后点删除']);
  }

  doRefresh(event: CustomEvent): void {
    setTimeout(() => {
      this.refresherCount.update((n) => n + 1);
      (event.target as any).complete();
      this.toast('下拉刷新完成');
    }, 700);
  }

  loadMore(event: CustomEvent): void {
    if (this.infinityDone()) {
      (event.target as any).complete();
      return;
    }
    setTimeout(() => {
      const current = this.infiniteItems();
      const next = Array.from({ length: 4 }, (_, i) => `列表项 ${current.length + i + 1}`);
      this.infiniteItems.set([...current, ...next]);
      if (this.infiniteItems().length >= 20) {
        this.infinityDone.set(true);
      }
      (event.target as any).complete();
    }, 600);
  }

  onReorder(event: CustomEvent): void {
    const detail = event.detail as any;
    this.reorderList.set(detail.complete(this.reorderList()));
    this.toast('顺序已更新');
  }

  onSearch(event: CustomEvent): void {
    this.searchTerm.set((event.detail as { value?: string }).value ?? '');
  }

  async copySnippet(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.snippet());
      this.toast('代码已复制');
    } catch {
      this.toast(this.snippet());
    }
  }

  previewToast(message = '这是一条 ion-toast 轻提示'): void {
    this.toast(message);
  }

  showLoading(): void {
    this.loadingOpen.set(true);
  }

  toast(message: string): void {
    this.toastMsg.set(message);
    this.toastOpen.set(true);
  }
}
