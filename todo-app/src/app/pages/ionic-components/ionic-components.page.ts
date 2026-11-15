import { Component, computed, signal } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonAvatar,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonProgressBar,
  IonRange,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  constructOutline,
  copyOutline,
  createOutline,
  cubeOutline,
  gridOutline,
  imagesOutline,
  layersOutline,
  navigateOutline,
  star,
} from 'ionicons/icons';
import {
  IONIC_COMPONENTS,
  IONIC_COMPONENT_TOTAL,
  IonicComponent,
} from '../../data/ionic-components';
import { ComponentDemoComponent } from './component-demo/component-demo.component';

@Component({
  selector: 'app-ionic-components',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonBadge,
    IonText,
    IonButton,
    IonIcon,
    IonToggle,
    IonCheckbox,
    IonRange,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonProgressBar,
    IonSpinner,
    IonSkeletonText,
    IonAvatar,
    IonThumbnail,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonNote,
    IonToast,
    IonModal,
    ComponentDemoComponent,
  ],
  templateUrl: './ionic-components.page.html',
  styleUrl: './ionic-components.page.scss',
})
export class IonicComponentsPage {
  readonly total = IONIC_COMPONENT_TOTAL;

  readonly searchTerm = signal('');
  readonly toastOpen = signal(false);
  readonly toastMessage = signal('');
  readonly selected = signal<IonicComponent | null>(null);

  // 预览区交互状态
  readonly toggleOn = signal(true);
  readonly rangeValue = signal(64);
  readonly segment = signal('list');

  readonly filteredGroups = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return IONIC_COMPONENTS;
    }
    return IONIC_COMPONENTS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.zh.toLowerCase().includes(term) ||
          item.desc.toLowerCase().includes(term),
      ),
    })).filter((group) => group.items.length > 0);
  });

  readonly expandedGroups = computed(() => {
    if (this.searchTerm().trim()) {
      return this.filteredGroups().map((group) => group.key);
    }
    return ['layout'];
  });

  constructor() {
    addIcons({
      gridOutline,
      createOutline,
      imagesOutline,
      layersOutline,
      navigateOutline,
      constructOutline,
      cubeOutline,
      copyOutline,
      chevronForwardOutline,
      star,
    });
  }

  onSearchInput(event: Event): void {
    const value = (event as CustomEvent<{ value?: string | null }>).detail?.value ?? '';
    this.searchTerm.set(value);
  }

  async copy(item: IonicComponent): Promise<void> {
    const snippet = `<${item.name}></${item.name}>`;
    try {
      await navigator.clipboard.writeText(snippet);
      this.toastMessage.set(`已复制 ${snippet}`);
    } catch {
      this.toastMessage.set(`组件名：${item.name}`);
    }
    this.toastOpen.set(true);
  }

  openDemo(item: IonicComponent): void {
    this.selected.set(item);
  }

  closeDemo(): void {
    this.selected.set(null);
  }
}
