export interface TaskItem {
  id: string,
  status: boolean,
  title: string,
}

export interface Tasks {
  tasks: TaskItem[],
  loading: boolean,
  error: boolean,
  updateLoading: boolean,
}

export interface ApiTask {
  [id: string]: TaskItem
}