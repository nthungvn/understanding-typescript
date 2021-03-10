const button = document.querySelector('button');

function add(num1: number, num2: number, type: string) {
  if (type === 'number') {
    return num1 + num2;
  }
  return;
}

button?.addEventListener('click', () => {
  // const userName = 'Hung';

  console.log('Clicked');
});

// Remove comment
