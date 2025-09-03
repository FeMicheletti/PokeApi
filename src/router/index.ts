import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '@/views/PokedexView.vue'
import PokemonModal from '@/views/PokemonModal.vue';

const routes = [
	{
		path: '/',
		name: 'pokedex',
		component: PokedexView,
	},
	{
		path: '/pokemon/:id',
		components: {
			default: PokedexView,
			modal: PokemonModal
		}
	}
];

const router = createRouter({ history: createWebHistory(), routes });

export default router