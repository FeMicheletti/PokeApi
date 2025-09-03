import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        pokemons: [] as Array<any>,
        lastUpdated: null as string | null,
        isLoading: false
    }),

    actions: {
        async loadPokemons() {
            const now = new Date();
            const last = this.lastUpdated ? new Date(this.lastUpdated) : null;

            if (last && now.getTime() - last.getTime() < (24 * 60 * 60 * 1000) && this.pokemons.length > 0) return;

            this.isLoading = true;

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000`)
                const data = await response.json()

                this.pokemons = await Promise.all(await data.results.map(async(p: any, index: number) => {
                    const resPoke = await fetch(p.url)
                    const detailPoke = await resPoke.json();

                    return {
                        id: detailPoke.id,
                        name: detailPoke.name,
                        sprite: detailPoke.sprites.front_default,
                        types: detailPoke.types.map((t: any) => t.type.name),
                        url: p.url
                    }
                }));
                this.lastUpdated = now.toISOString()
            } catch (err) {
                console.error("Erro ao carregar Pokémons", err)
            } finally {
                this.isLoading = false
            }
        }
    },
    persist: true
})
