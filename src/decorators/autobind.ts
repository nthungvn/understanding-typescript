namespace App {
  export function AutoBind(_: any, __: String, descriptor: PropertyDescriptor) {
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

}
