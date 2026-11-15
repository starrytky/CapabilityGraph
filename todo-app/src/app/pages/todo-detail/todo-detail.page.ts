import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  checkmarkCircleOutline,
  chevronBack,
  ellipseOutline,
  saveOutline,
  trashOutline,
} from 'ionicons/icons';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonContent,
    IonInput,
    IonTextarea,
    IonToggle,
    IonNote,
    IonAlert,
    IonToast,
  ],
  templateUrl: './todo-detail.page.html',
  styleUrl: './todo-detail.page.scss',
})
export class TodoDetailPage implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly todo = computed(() => this.todoService.todos().find((item) => item.id === this.id()));

  readonly isDeleteOpen = signal(false);
  readonly toastOpen = signal(false);
  readonly toastMessage = signal('');

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(60)]],
    description: [''],
    completed: [false],
  });

  readonly alertButtons = [
    { text: '取消', role: 'cancel' },
    {
      text: '删除',
      role: 'destructive',
      handler: () => this.remove(),
    },
  ];

  constructor() {
    addIcons({
      trashOutline,
      saveOutline,
      calendarOutline,
      checkmarkCircleOutline,
      ellipseOutline,
      chevronBack,
    });
  }

  ngOnInit(): void {
    const todo = this.todo();
    if (!todo) {
      return;
    }
    this.form.setValue({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    });
  }

  save(): void {
    const todo = this.todo();
    if (!todo) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description, completed } = this.form.getRawValue();
    this.todoService.update(todo.id, { title: title.trim(), description: description.trim(), completed });
    this.toastMessage.set('已保存修改');
    this.toastOpen.set(true);
  }

  remove(): void {
    const todo = this.todo();
    if (!todo) {
      return;
    }
    this.todoService.remove(todo.id);
    this.router.navigate(['/todos']);
  }
}
