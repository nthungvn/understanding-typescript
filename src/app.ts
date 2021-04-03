/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />

namespace App {
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  function validate(config: Validatable) {
    let isValid = true;
    if (config.required) {
      isValid = isValid && !!config.value;
    }
    if (config.minLength != null && typeof config.value === 'string') {
      isValid = isValid && config.value.length >= config.minLength;
    }
    if (config.maxLength != null && typeof config.value === 'string') {
      isValid = isValid && config.value.length <= config.maxLength;
    }
    if (config.min != null && typeof config.value === 'number') {
      isValid = isValid && config.value >= config.min;
    }
    if (config.max != null && typeof config.value === 'number') {
      isValid = isValid && config.value <= config.max;
    }
    return isValid;
  }

  function AutoBind(_: any, __: String, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value;

    const updatedDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get: function () {
        return originalFn.bind(this);
      },
    };
    return updatedDescriptor;
  }

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

  const projectState = ProjectState.getInstance();

  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected templateEl: HTMLTemplateElement;
    protected hostEl: T;
    protected el: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateEl = document.getElementById(
        templateId
      ) as HTMLTemplateElement;
      this.hostEl = document.getElementById(hostElementId) as T;
      const importedNode = document.importNode(this.templateEl.content, true);
      this.el = importedNode.firstElementChild as U;

      if (newElementId) {
        this.el.id = newElementId;
      }

      this.attach(insertAtStart);
    }

    protected attach(insertAtBeginning: boolean) {
      this.hostEl.insertAdjacentElement(
        insertAtBeginning ? 'afterbegin' : 'beforeend',
        this.el
      );
    }

    protected abstract configure?(): void;
    protected abstract renderContent?(): void;
  }

  class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    get persons() {
      if (this.project.people === 1) {
        return '1 person';
      }
      return `${this.project.people} persons`;
    }

    constructor(hostElementId: string, private project: Project) {
      super('single-project', hostElementId, false, project.id);
      this.configure();
      this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.el.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {
      console.log('Drag End');
    }

    renderContent() {
      this.el.querySelector('h2')!.textContent = this.project.title;
      this.el.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.el.querySelector('p')!.textContent = this.project.description;
    }

    configure() {
      this.el.addEventListener('dragstart', this.dragStartHandler);
      this.el.addEventListener('dragend', this.dragEndHandler);
    }
  }

  class ProjectList
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
        const projectItem = new ProjectItem(
          `${this.type}-projects-list`,
          project
        );
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

  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    private titleInputEl: HTMLInputElement;
    private descriptionInputEl: HTMLInputElement;
    private peopleInputEl: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');
      this.titleInputEl = this.el.querySelector('#title') as HTMLInputElement;
      this.descriptionInputEl = this.el.querySelector(
        '#description'
      ) as HTMLInputElement;
      this.peopleInputEl = this.el.querySelector('#people') as HTMLInputElement;
      this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputEl.value;
      const enteredDescription = this.descriptionInputEl.value;
      const enteredPeople = +this.peopleInputEl.value;
      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
        minLength: 5,
        maxLength: 20,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
        maxLength: 100,
      };
      const peopleValidatable: Validatable = {
        value: enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Please enter a valid input!');
        return;
      } else {
        return [enteredTitle, enteredDescription, enteredPeople];
      }
    }

    private clearUserInput() {
      this.titleInputEl.value = '';
      this.descriptionInputEl.value = '';
      this.peopleInputEl.value = '';
    }

    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const value = this.gatherUserInput();
      if (Array.isArray(value)) {
        const [title, description, people] = value;
        projectState.addProject(title, description, people);
        this.clearUserInput();
      }
    }

    protected configure() {
      this.el.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}
  }
  const projectInput = new ProjectInput();
  const activeProjects = new ProjectList('active');
  const finishedProjects = new ProjectList('finished');
}
