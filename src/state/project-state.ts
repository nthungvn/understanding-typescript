namespace App {

  type Listener<T> = (projects: T[]) => void;

  abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (!this.instance) {
        this.instance = new ProjectState();
      }
      return this.instance;
    }

    addProject(title: string, description: string, people: number) {
      const project = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.ACTIVE
      );
      this.projects.push(project);
      this.notifyListeners();
    }

    moveProject(id: string, newStatus: ProjectStatus) {
      const project = this.projects.find((project) => project.id === id);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.notifyListeners();
      }
    }

    private notifyListeners() {
      this.listeners.forEach((listenerFn) => listenerFn(this.projects.slice()));
    }
  }

  export const projectState = ProjectState.getInstance();
}
