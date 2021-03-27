class ProjectInput {
  private templateEl: HTMLTemplateElement;
  private hostEl: HTMLDivElement;
  private el: HTMLFormElement;

  constructor() {
    this.templateEl = document.getElementById(
      'project-input'
    ) as HTMLTemplateElement;
    this.hostEl = document.getElementById('app') as HTMLDivElement;

    const importedNote = document.importNode(this.templateEl.content, true);
    this.el = importedNote.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.el);
  }
}
const projectInput = new ProjectInput();

