import { Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  checkmarkDoneOutline,
  close,
  listOutline,
  saveOutline,
  trashOutline,
} from 'ionicons/icons';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonList,
    IonItemSliding,
    IonItem,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonCheckbox,
    IonBadge,
    IonProgressBar,
    IonFab,
    IonFabButton,
    IonModal,
    IonNote,
    IonInput,
    IonTextarea,
    IonToast,
  ],
  templateUrl: './todo-list.page.html',
  styleUrl: './todo-list.page.scss',
})
export class TodoListPage {
  private readonly todoService = inject(TodoService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly todos = this.todoService.filteredTodos;
  readonly filter = this.todoService.filter;
  readonly total = this.todoService.total;
  readonly activeCount = this.todoService.activeCount;
  readonly completedCount = this.todoService.completedCount;

  readonly progress = computed(() => {
    const total = this.total();
    return total === 0 ? 0 : this.completedCount() / total;
  });

  readonly isCreateOpen = signal(false);
  readonly toastOpen = signal(false);
  readonly toastMessage = signal('');

  readonly createForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    description: [''],
  });

  constructor() {
    addIcons({
      add,
      close,
      trashOutline,
      checkmarkDoneOutline,
      listOutline,
      saveOutline,
    });
  }

  selectFilter(value: 'all' | 'active' | 'completed'): void {
    this.todoService.filter.set(value);
  }

  toggle(todo: Todo): void {
    this.todoService.toggle(todo.id);
  }

  remove(todo: Todo): void {
    this.todoService.remove(todo.id);
    this.showToast(`已删除「${todo.title}」`);
  }

  clearCompleted(): void {
    const count = this.completedCount();
    if (count === 0) {
      return;
    }
    this.todoService.clearCompleted();
    this.showToast(`已清理 ${count} 项已完成待办`);
  }

  openCreate(): void {
    this.createForm.reset({ title: '', description: '' });
    this.isCreateOpen.set(true);
  }

  closeCreate(): void {
    this.isCreateOpen.set(false);
  }

  submitCreate(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    const { title, description } = this.createForm.getRawValue();
    this.todoService.add(title, description);
    this.isCreateOpen.set(false);
    this.showToast('已添加新待办');
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastOpen.set(true);
  }
}
