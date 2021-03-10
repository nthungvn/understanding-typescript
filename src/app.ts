const button = document.querySelector('button')!;

function add(num1: number, num2: number, type: string) {
  if (type === 'number') {
    return num1 + num2;
  }
  return;
}

function clickHandler(message: string) {
  // const userName = 'Hung';

  console.log('Clicked ' + message);
}

button?.addEventListener('click', clickHandler.bind(null, "You're welcome!"));

// Remove comment
