<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';

    const menuOpen = ref(false);
    const isHeaderVisible = ref(true);
    let lastScrollY = window.scrollY;

    const handleScroll = ():void => {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) < 10) return;
        isHeaderVisible.value = currentScrollY < lastScrollY || currentScrollY < 50;
        lastScrollY = currentScrollY;

        //* Fecha os icons caso estejam abertos
        menuOpen.value = false;
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<template>
    <header class="text-center shadow-lg py-1 position-fixed top-0 w-100 z-3 transition-transform gradient-directional" :class="{ 'header-hidden': !isHeaderVisible, 'header-visible': isHeaderVisible }">
        <!-- Itens Principais -->
        <h2 class="fs-1 fw-bold text-shadow-2-2-4-black">🔍 Pokédex</h2>
        <span class="position-absolute top-50 start-0 translate-middle-y ms-3 cursor-pointer z-6" @click="menuOpen = !menuOpen" >
            <i class="bi d-inline-block fs-2 transition-transform z-6" :class="menuOpen ? 'bi-x transform-rotate' : 'bi-list transform-reverse-rotate'"></i>
        </span>

        <!-- Buscar -->
        <span class="position-absolute top-50 start-0 translate-middle-y ms-3 cursor-pointer z-5" @click="" >
            <i class="bi bi-search d-inline-block fs-4 transition-transform" :class="menuOpen ? 'opacity-100 transform-left-right-6' : 'opacity-0'"></i>
        </span>

        <!-- Aleatorio -->
        <span class="position-absolute top-50 start-0 translate-middle-y ms-3 cursor-pointer z-4" @click="">
            <i class="bi bi-dice-6 d-inline-block fs-4 transition-transform" :class="menuOpen ? 'opacity-100 transform-left-right-7' : 'opacity-0'"></i>
        </span>
    </header>
    <div class="position-fixed top-0 start-0 w-100 h-100 z-n1 gradient-directional"></div>
    <main class="pt-6">
        <router-view />
        <router-view name="modal" />
    </main>
</template>

<style scoped>
    .header-hidden {
        transform: translateY(-100%);
        opacity: 0;
    }

    .header-visible {
        transform: translateY(0);
        opacity: 1;
    }
</style>