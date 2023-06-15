import { create, StateCreator } from "zustand";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskManager = {
  tasks: Task[];
  addTask: (title: string) => void;
  searchTask: (title: string) => Task[];
  updateTask: (taskId: number, title: string, completed: boolean) => void;
  deleteTask: (taskId: number) => void;
};

const createState: StateCreator<TaskManager> = (set) => ({
  tasks: [],
  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now(),
          title,
          completed: false,
        },
      ],
    })),
  searchTask: (title) =>
    state.tasks.filter((task:Task) =>
      task.title.toLowerCase().includes(title.toLowerCase())
    ),
  updateTask: (taskId, title, completed) =>
  set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, title, completed } : task
    ),
  })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
});

const useTaskManager = create(createState);

export {
  useTaskManager
}