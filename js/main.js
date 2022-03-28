const pokemonContainer = document.getElementById('pokecont');
const pokemon_number = 151;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};




//Bara de busqueda
const searchPokemon=event=>{
	event.preventDefault();
	const {value}=event.target.busqueda;
	fetch (`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
	.then(data=>data.json())
	.then(response=>convertirData(response))
} 


const convertirData= data=>{
const sprite= data.sprites.front_default;
const {stats,types}=data;
console.log(data);
$(pokemonContainer).empty();
CreaCarta(data);
}


function CreaCarta(data){
	const Elemento=document.createElement("div");
	Elemento.classList.add('data');
	const poke_types = data.types.map(el =>el.type.name);
	const type=main_types.find(type=>poke_types.indexOf(type)>-1)
	const name=	data.name[0].toUpperCase() + data.name.slice(1);
	const color= colors[type];
	const pokeStats=data.stats;
	Elemento.style.background=color;
	const pokeInnerHTML = `
<div class="img_cont2">
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif"/>
</div>
<div class="info2">
<span class="number2">#${data.id.toString().padStart(3, '0')}</span>
<h3 class="name2">${name}</h3>
<h4 class="type2">Type: <span>${type}<br></span></h4>
</div>
<div class="stats">
<h4 class="titulo1">Stats</h4>
<span class="0"><b>HP:</b>${data.stats[0].base_stat}<br></span>
<span class="1"><b>Ataque:</b>${data.stats[1].base_stat}<br></span>
<span class="2"><b>Defensa:</b>${data.stats[2].base_stat}<br></span>
<span class="3"><b>Ataque Especia:</b>${data.stats[3].base_stat}<br></span>
<span class="4"><b>Defensa Especial:</b>${data.stats[4].base_stat}<br></span>
<span class="5"><b>Velocidad:</b>${data.stats[5].base_stat}</span>
</div>
<div class="ataques">
<h4 class="titulo2">Ataques</h4>
<span class="0">${data.moves[0].move.name}<br></span>
<span class="1">${data.moves[1].move.name}<br></span>
</div>

 `;
	Elemento.innerHTML = pokeInnerHTML;
pokemonContainer.appendChild(Elemento);
}


const main_types=Object.keys(colors);
console.log(main_types)

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemon_number; i++) {
		await getPokemon(i);
	}
};
const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon){
const pokemonEl=document.createElement('div');
pokemonEl.classList.add('pokemon');

const poke_types = pokemon.types.map(el =>el.type.name);
const type=main_types.find(type=>poke_types.indexOf(type)>-1)
const name=	pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color= colors[type];
	
	pokemonEl.style.background=color;
	
const pokeInnerHTML = `
<div class="img_cont">
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif"/>
</div>
<div class="info">
<span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
<h3 class="name">${name}</h3>
<small class="type">Type: <span>${type}</span></small>
</div>`;
pokemonEl.innerHTML = pokeInnerHTML;
pokemonContainer.appendChild(pokemonEl);
}
fetchPokemons();