class ProjectInput {
  private templateEl: HTMLTemplateElement;
  private hostEl: HTMLDivElement;
  private formEl: HTMLFormElement;

  private titleInputEl: HTMLInputElement;
  private descriptionInputEl: HTMLInputElement;
  private peopleInputEl: HTMLInputElement;

  constructor() {
    this.templateEl = document.getElementById(
      'project-input'
    ) as HTMLTemplateElement;
    this.hostEl = document.getElementById('app') as HTMLDivElement;

    const importedNote = document.importNode(this.templateEl.content, true);
    this.formEl = importedNote.firstElementChild as HTMLFormElement;
    this.formEl.id = 'user-input';
    this.titleInputEl = this.formEl.querySelector('#title') as HTMLInputElement;
    this.descriptionInputEl = this.formEl.querySelector('#description') as HTMLInputElement;
    this.peopleInputEl = this.formEl.querySelector('#people') as HTMLInputElement;
    this.configure();
    this.attach();
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputEl.value);
    console.log(this.descriptionInputEl.value);
    console.log(this.peopleInputEl.value);
  }

  private configure() {
    this.formEl.addEventListener('submit', this.submitHandler.bind(this))
  }

  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.formEl);
  }
}
const projectInput = new ProjectInput();

