namespace App {
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}
