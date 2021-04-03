import { AutoBind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import * as Validation from '../utils/validation.js';
import Component from './base-component.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 5,
      maxLength: 20,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
      maxLength: 100,
    };
    const peopleValidatable: Validation.Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
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
