const API_RICK_MORTHY = 'https://rickandmortyapi.com/api/character';
const containerList = document.getElementById('container-list');
const containerDet = document.getElementById("container-detail");

async function getDataAll() {
  const result = await fetch(API_RICK_MORTHY);
  const data = await result.json();
  console.log('result', data);
  return data;
}

async function render(){

  while (containerList.firstChild != null){
    containerList.removeChild(containerList.firstChild);
  }

  containerList.style.display = "flex";
  containerDet.style.display = "none";
  const data = await getDataAll();
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

    const button = document.createElement('button');
    button.textContent = 'Show Detail';
    button.addEventListener("click", function (){detail(character.id)}, false);
    button.className = 'btn btn-primary';
    body.appendChild(button);

    div.appendChild(body);
    containerList.appendChild(div);
  })
}

async function getData(id){
  const result = await fetch(API_RICK_MORTHY+'/'+id);
  const data = await result.json();
  console.log('result', data);
  return data;
}

async function detail(id) {
  
  while (containerDet.firstChild != null){
    containerDet.removeChild(containerDet.firstChild);
  }

  // Mustra el detail y oculta la lista 
  containerList.style.display = "none";
  containerDet.style.display = "flex";

  containerDet.style.justifyContent = "center";
  
  const character = await getData(id);
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

  const parrafo1 = document.createElement('p');
  parrafo1.textContent = 'Gender: ' + character.gender;
  parrafo1.className = 'card-text';
  body.appendChild(parrafo1);

  const parrafo2 = document.createElement('p');
  parrafo2.textContent = 'Specie: '+ character.species;
  parrafo2.className = 'card-text';
  body.appendChild(parrafo2);

  const parrafo3 = document.createElement('p');
  parrafo3.textContent = 'Location: '+ character.location.name;
  parrafo3.className = 'card-text';
  body.appendChild(parrafo3);

  const divList = document.createElement('div');
  divList.className = "btn-group";
  
  divList.innerHTML = '<button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">'+
                            'Episodes'+
                          '</button>'

  const ul = document.createElement('ul');
  ul.className = "dropdown-menu";
  
  character.episode.map((episode, id) =>{
    const li =document.createElement('li');
    const a = document.createElement('a');
    a.className = "dropdown-item";
    var link = episode.split("/");
    a.textContent = "Episode - " + link[link.length - 1];
    a.href = episode;
    li.appendChild(a);
    ul.appendChild(li);
  })

  divList.appendChild(ul);

  body.appendChild(divList);
  div.appendChild(body);
  const button = document.createElement('button');
  button.textContent = 'Home';
  button.addEventListener("click", render, false);
  button.className = 'btn btn-primary';
  div.appendChild(button);
  
  
  containerDet.appendChild(div);
}

render();