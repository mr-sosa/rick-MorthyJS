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
      const div = document.createElement('div');
      div.className = 'card text-white bg-dark mb-3';

      const image = document.createElement('img');
      image.className = 'card-img-top';
      image.src = character.image;
      div.appendChild(image);

      const body = document.createElement('div');
      body.className = 'card-body';

      const name = document.createElement('h5');
      name.textContent = character.name;
      name.className = 'card-title';
      body.appendChild(name);

      const parrafo = document.createElement('p');
      parrafo.textContent = 'Specie: '+ character.species + ' - Gender: ' + character.gender;
      parrafo.className = 'card-text';
      body.appendChild(parrafo);

      div.appendChild(body);
      containerRef.appendChild(div);
    })
}

render();
