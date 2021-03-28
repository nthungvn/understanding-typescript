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

class ProjectList {
  private templateEl: HTMLTemplateElement;
  private hostEl: HTMLDivElement;
  private projectListSection: HTMLElement;
  // private listEl: HTMLUListElement;

  constructor(private type: 'active' | 'finished') {
    this.templateEl = document.getElementById(
      'project-list'
    ) as HTMLTemplateElement;
    this.hostEl = document.getElementById('app') as HTMLDivElement;
    const importedNode = document.importNode(this.templateEl.content, true);
    this.projectListSection = importedNode.firstElementChild as HTMLElement;
    this.projectListSection.id = `${this.type}-projects`;

    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.projectListSection.querySelector('ul')!.id = listId;
    this.projectListSection.querySelector(
      'h2'
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private attach() {
    this.hostEl.insertAdjacentElement('beforeend', this.projectListSection);
  }
}

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
    this.descriptionInputEl = this.formEl.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputEl = this.formEl.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
    this.attach();
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
    const descriptionValidatble: Validatable = {
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
      !validate(descriptionValidatble) ||
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
      console.log(title, description, people);
      this.clearUserInput();
    }
  }

  private configure() {
    this.formEl.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.formEl);
  }
}
const projectInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const finishedProjects = new ProjectList('finished');
