// Make a GET request to the PokeAPI to retrieve a list of Pokemon
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => response.json()) // Convert the response to JSON
  .then(data => {
    // Loop through the list of Pokemon
    data.results.forEach(pokemon => {
      // Extract the name and URL of the Pokemon
      const name = pokemon.name;
      const url = pokemon.url;
      
      // Make another GET request to the PokeAPI to retrieve the sprite image of the Pokemon
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Extract the sprite image URL and types from the response
          const spriteUrl = data.sprites.front_default;
          const types = data.types.map(type => type.type.name);
          
          // Create a new div element to display the Pokemon
          const pokemonElement = document.createElement('div');
          pokemonElement.classList.add('pokemon');
          pokemonElement.dataset.type = types.join(' '); // Add the data-type attribute
          
          // Create an image element to display the sprite image
          const spriteElement = document.createElement('img');
          spriteElement.src = spriteUrl;
          
          // Create a heading element to display the name of the Pokemon
          const nameElement = document.createElement('h2');
          nameElement.textContent = name.charAt(0).toUpperCase() + name.slice(1);;
          
          // Append the sprite image, name, and pokemonElement to the DOM
          
          pokemonElement.appendChild(spriteElement);
          pokemonElement.appendChild(nameElement);
          document.getElementById('pokemon-list').appendChild(pokemonElement);
        });
    });
  });

// Add the filter functionality
const typeFilter = document.getElementById('type-filter');
typeFilter.addEventListener('change', () => {
  const selectedType = typeFilter.value;
  const pokemonElements = document.querySelectorAll('.pokemon');
  
  pokemonElements.forEach(pokemonElement => {
    if (selectedType === '' || pokemonElement.dataset.type.includes(selectedType)) {
      // Show the Pokemon element
      pokemonElement.style.display = 'flex';
    } else {
      // Hide the Pokemon element
      pokemonElement.style.display = 'none';
    }
  });
});

// Add the search functionality
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  // Perform the search
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.toLowerCase(); // Make the search query lowercase for case-insensitive search
  const pokemonElements = document.querySelectorAll('.pokemon');
    
  pokemonElements.forEach(pokemonElement => {
    const name = pokemonElement.querySelector('h2').textContent.toLowerCase(); // Make the Pokemon name lowercase for case-insensitive search
        
    if (name.includes(searchQuery)) {
      // Show the Pokemon element if it matches the search query
      pokemonElement.style.display = 'flex';
    } else {
      // Hide the Pokemon element if it does not match the search query
      pokemonElement.style.display = 'none';
    }
  });
});


const pokemonElements = document.querySelectorAll('.pokemon');

pokemonElements.forEach(pokemonElement => {
  pokemonElement.addEventListener('click', () => {
    // Extract the name of the Pokemon from the element
    const name = pokemonElement.querySelector('h2').textContent;

    // Redirect the user to the Pokemon page
    window.location.assign(`/pokemon/${name}`);
  });
});


