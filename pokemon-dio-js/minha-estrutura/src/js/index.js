// index.js

// Modelo de Dados do Pokémon
class Pokemon {
    constructor() {
        this.number = null
        this.name = ''
        this.type = ''
        this.types = []
        this.photo = ''
    }
}

// API do Pokémon
const pokeApi = {}

// Função para converter os detalhes da API para o modelo Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    // Fallback caso a imagem principal não esteja disponível
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default || pokeDetail.sprites.front_default

    return pokemon
}

// Função para obter detalhes de um Pokémon específico
pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// Função para obter uma lista de Pokémons com base no offset e limite
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonsDetails => pokemonsDetails)
}

// Seletores de Elementos do DOM
const pokemonList = document.getElementById('pokemonList')
const searchButton = document.getElementById('searchButton')
const pokemonNumberInput = document.getElementById('pokemonNumberInput')

// Constantes
const maxRecords = 151
const limit = 10

// Função para converter um objeto Pokémon em um elemento HTML de lista
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
    </li>
  `
}

// Função para carregar e exibir um único Pokémon
function loadSinglePokemon(number) {
    const offset = number - 1
    const url = `https://pokeapi.co/api/v2/pokemon/${number}/`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado')
            }
            return response.json()
        })
        .then(convertPokeApiDetailToPokemon)
        .then(pokemon => {
            pokemonList.innerHTML = convertPokemonToLi(pokemon)
        })
        .catch(error => {
            pokemonList.innerHTML = `<li>Pokémon não encontrado. Por favor, insira um número válido entre 1 e 151.</li>`
            console.error(error)
        })
}

// Evento de clique para buscar o Pokémon
searchButton.addEventListener('click', () => {
    const number = parseInt(pokemonNumberInput.value, 10)

    if (isNaN(number) || number < 1 || number > maxRecords) {
        pokemonList.innerHTML = `<li>Por favor, insira um número válido entre 1 e 151.</li>`
        return
    }

    loadSinglePokemon(number)
})

// Opcional: Permitir busca ao pressionar "Enter"
pokemonNumberInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        searchButton.click()
    }
})

// Carregar o primeiro Pokémon por padrão (Opcional)
loadSinglePokemon(1)
