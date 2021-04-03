namespace App {
  export class ProjectItem
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
}
