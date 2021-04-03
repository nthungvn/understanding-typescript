/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../decorators/autobind.ts" />

namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    private assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      ) as HTMLUListElement;
      listEl.innerHTML = '';
      this.assignedProjects.forEach((project) => {
        new ProjectItem(`${this.type}-projects-list`, project);
      });
    }

    protected renderContent() {
      const listId = `${this.type}-projects-list`;
      this.el.querySelector('ul')!.id = listId;
      this.el.querySelector(
        'h2'
      )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const list = this.el.querySelector('ul')!;
        list.classList.add('droppable');
        event.dataTransfer!.dropEffect = 'move';
      }
    }

    @AutoBind
    dragLeaveHandler(event: DragEvent): void {
      this.removeHighlighted();
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
      event.preventDefault();
      this.removeHighlighted();
      const projectId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        projectId,
        this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
      );
    }

    configure() {
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter(
          (project) => project.status.toLowerCase() === this.type
        );
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });

      this.el.addEventListener('dragover', this.dragOverHandler);
      this.el.addEventListener('dragleave', this.dragLeaveHandler);
      this.el.addEventListener('drop', this.dropHandler);
    }

    private removeHighlighted() {
      const list = this.el.querySelector('ul')!;
      list.classList.remove('droppable');
    }
  }
}
