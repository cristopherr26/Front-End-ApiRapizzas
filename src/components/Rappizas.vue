<script setup lang="ts">
    import rapizzasImage from '@/assets/rapizzas.png';

</script>

<template>
    <div class="rapizzas-container">
        <header class="header">
            <h1 class="title">RAPIZZAS</h1>
            <p class="subtitle">Una forma novedosa de ordenar</p>
        </header>

    <div class="image-section">
      <img
        :src="rapizzasImage"
        alt="Rapizzas banner"
        class="banner"
      />
    </div>

    <footer class="footer">
      <p class="footer-text">Tu pizza favorita, servida con rapidez </p>
    </footer>
  </div>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");

.rapizzas-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%);
  font-family: "Nunito", sans-serif;
  color: #2c2c2c;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-top: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.2rem;
  color: #444;
}

.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.banner {
  max-width: 90%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.footer {
  text-align: center;
  margin-bottom: 1.5rem;
}

.footer-text {
  font-size: 1rem;
  color: #3a3a3a;
}
</style>
