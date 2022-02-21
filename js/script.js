const API_RICK_MORTHY = 'https://rickandmortyapi.com/api/character';
const containerRef = document.getElementById('container');


async function getData() {
  const result = await fetch(API_RICK_MORTHY);
  const data = await result.json();
  console.log('result', data);
  return data;
}

async function render(){
    const data = await getData();
    const dataMapped = data.results.map((character) => {
        const p = document.createElement('p');
        p.textContent = character.name;
        containerRef.appendChild(p)
    })
}

render();
