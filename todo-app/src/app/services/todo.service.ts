import { Injectable, computed, effect, signal } from '@angular/core';
import { Todo, TodoFilter } from '../models/todo.model';

const STORAGE_KEY = 'ionic-angular-todos-v1';

const SEED_TODOS: Todo[] = [
  {
    id: 'seed-1',
    title: '体验 Ionic 8 + Angular 19',
    description: '列表页支持滑动删除、勾选完成，点击条目进入详情页。',
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 30,
    updatedAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: 'seed-2',
    title: '用 Node 20.11.1 跑起来',
    description: 'Angular CLI 19 要求 Node ^20.11.1，当前工程已锁定该版本。',
    completed: true,
    createdAt: Date.now() - 1000 * 60 * 90,
    updatedAt: Date.now() - 1000 * 60 * 60,
  },
];

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly _todos = signal<Todo[]>(this.load());

  readonly todos = this._todos.asReadonly();
  readonly total = computed(() => this._todos().length);
  readonly completedCount = computed(() => this._todos().filter((t) => t.completed).length);
  readonly activeCount = computed(() => this.total() - this.completedCount());

  readonly filter = signal<TodoFilter>('all');
  readonly filteredTodos = computed(() => {
    const filter = this.filter();
    const todos = [...this._todos()].sort((a, b) => b.createdAt - a.createdAt);
    if (filter === 'active') {
      return todos.filter((t) => !t.completed);
    }
    if (filter === 'completed') {
      return todos.filter((t) => t.completed);
    }
    return todos;
  });

  constructor() {
    effect(() => {
      const todos = this._todos();
      this.persist(todos);
    });
  }

  byId(id: string): Todo | undefined {
    return this._todos().find((t) => t.id === id);
  }

  add(title: string, description = ''): Todo {
    const now = Date.now();
    const todo: Todo = {
      id: `todo-${now}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this._todos.update((todos) => [todo, ...todos]);
    return todo;
  }

  update(id: string, changes: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>): void {
    this._todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...changes, updatedAt: Date.now() } : todo,
      ),
    );
  }

  toggle(id: string, completed?: boolean): void {
    const current = this.byId(id);
    if (!current) {
      return;
    }
    this.update(id, { completed: completed ?? !current.completed });
  }

  remove(id: string): void {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  clearCompleted(): void {
    this._todos.update((todos) => todos.filter((todo) => !todo.completed));
  }

  private load(): Todo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return SEED_TODOS;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Todo[]) : SEED_TODOS;
    } catch {
      return SEED_TODOS;
    }
  }

  private persist(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // 隐私模式或存储空间不足时忽略，内存中的状态仍然可用
    }
  }
}
