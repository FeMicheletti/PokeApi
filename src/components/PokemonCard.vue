<script setup lang="ts">
	defineProps({
		pokemon: {
			type: Object,
			required: true
		}
	});
</script>

<template>
	<div class="card text-center shadow-sm p-3 rounded-3" @click="$emit('click')">
		<img class="card-img-top img-fluid mx-auto" :src="pokemon.sprite" :alt="pokemon.name" />
		<div class="card-body">
			<h2 class="card-title h6 text-capitalize"> {{ pokemon.name }} </h2>
			<div class="d-flex justify-content-center flex-wrap gap-1">
				<span v-for="type in pokemon.types" :key="type" class="badge text-white px-2 py-1 text-capitalize" :class="type.toLowerCase()">
					{{ type }}
				</span>
			</div>
		</div>
	</div>
</template>

<style>
	.card:hover {
		transform: scale(1.03);
		transition: 0.2s ease-in-out;
	}

	/* Tipos comuns do Pokémon */
	.badge.fire { background-color: #f08030; }
	.badge.water { background-color: #6890f0; }
	.badge.grass { background-color: #78c850; }
	.badge.electric { background-color: #f8d030; color: #333; }
	.badge.psychic { background-color: #f85888; }
	.badge.ice { background-color: #98d8d8; color: #333; }
	.badge.rock { background-color: #b8a038; }
	.badge.ground { background-color: #e0c068; color: #333; }
	.badge.flying { background-color: #a890f0; }
	.badge.bug { background-color: #a8b820; }
	.badge.poison { background-color: #a040a0; }
	.badge.normal { background-color: #a8a878; }
	.badge.ghost { background-color: #705898; }
	.badge.dark { background-color: #705848; }
	.badge.dragon { background-color: #7038f8; }
	.badge.fairy { background-color: #ee99ac; color: #333; }
	.badge.fighting { background-color: #c03028; }
	.badge.steel { background-color: #b8b8d0; }
</style>
