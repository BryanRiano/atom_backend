export interface Task {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly completed: boolean;
}
