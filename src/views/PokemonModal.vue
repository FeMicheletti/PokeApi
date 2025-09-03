<template>
  <div class="overlay" @click.self="closeModal">
    <div class="modal">
      <div v-if="loading">Carregando...</div>
      <div v-else-if="pokemon">
        <h2>{{ pokemon.name.toUpperCase() }} (ID: {{ pokemon.id }})</h2>

        <!-- Sprites -->
        <div class="sprites">
          <img
            v-for="(sprite, key) in sprites"
            :key="key"
            :src="sprite"
            :alt="key"
            v-if="sprite"
          />
        </div>

        <!-- Tipos -->
        <p><strong>Tipos:</strong> {{ pokemon.types.map(t => t.type.name).join(', ') }}</p>

        <!-- Movimentos -->
        <p><strong>Movimentos:</strong></p>
        <ul class="scroll-list">
          <li v-for="move in pokemon.moves" :key="move.move.name">{{ move.move.name }}</li>
        </ul>

        <!-- Jogos -->
        <p><strong>Aparece nos jogos:</strong> {{ pokemon.game_indices.map(g => g.version.name).join(', ') }}</p>

        <!-- Evoluções -->
        <div v-if="evolutions.length">
          <p><strong>Evoluções:</strong></p>
          <ul>
            <li v-for="evo in evolutions" :key="evo">{{ evo }}</li>
          </ul>
        </div>

        <button class="close-btn" @click="closeModal">Fechar</button>
      </div>
      <div v-else>
        <p>Pokémon não encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pokemon = ref<any>(null)
const evolutions = ref<string[]>([])
const loading = ref(true)

const sprites = ref<Record<string, string | null>>({})

async function fetchPokemon() {
  try {
    const id = route.params.id
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    pokemon.value = await res.json()

    sprites.value = {
      front: pokemon.value.sprites.front_default,
      back: pokemon.value.sprites.back_default,
      shinyFront: pokemon.value.sprites.front_shiny,
      shinyBack: pokemon.value.sprites.back_shiny
    }

    await fetchEvolutionChain(pokemon.value.species.url)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function fetchEvolutionChain(speciesUrl: string) {
  const resSpecies = await fetch(speciesUrl)
  const species = await resSpecies.json()
  const evoUrl = species.evolution_chain.url

  const resEvo = await fetch(evoUrl)
  const evoData = await resEvo.json()

  const evoNames: string[] = []
  let evo = evoData.chain

  while (evo) {
    evoNames.push(evo.species.name)
    evo = evo.evolves_to?.[0]
  }

  evolutions.value = evoNames
}

function closeModal() {
  router.push('/')
}

onMounted(() => {
  fetchPokemon()
})
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-height: 90vh;
  overflow-y: auto;
  width: 500px;
  max-width: 90%;
  position: relative;
}

.sprites {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
}

.scroll-list {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.close-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #ef5350;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
