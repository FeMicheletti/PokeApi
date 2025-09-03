<script setup lang="ts">
	import { computed, ref, onMounted } from 'vue';
	import { usePokemonStore } from '@/store/pokemonStore';
	import PokemonCard from '@/components/PokemonCard.vue';

	const store = usePokemonStore();
	const pokemons = computed(() => store.pokemons);
	const selectedPokemon = ref(null);

	onMounted(() => {
		store.loadPokemons();
	});

	const openModal = (pokemon:any) => {
		selectedPokemon.value = pokemon;
	};
</script>

<template>
	<div class="pokemon-list">
		<PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" @click="openModal(pokemon)" />
	</div>
</template>

<style>
	.pokemon-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1rem;
		padding: 1rem;
	}
</style>