<script setup lang = "ts">


</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navegador</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav d-flex align-items-center gap-2">
    <li class="nav-item">
      <router-link to="/rapizzas" class="btn-nav">Rapizzas</router-link>
    </li>
    <li class="nav-item text-dark"></li>
    <li class="nav-item">
      <router-link to="/employee" class="btn-nav">Empleados</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/login" class="btn-nav">Login</router-link>
    </li>
  </ul>
</div>

  </div>
</nav>

</template>

<style scoped>

.btn-nav {
  display: inline-block;
  background-color: #007bff;      
  color: #fff;                  
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 8px;
  text-decoration: none;
}

</style>