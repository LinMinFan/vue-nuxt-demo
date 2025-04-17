<script>
export default {
  name: 'DefaultLayout',
}
</script>

<template>
    <div>
      <header>
        <nav>
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/about">About</nuxt-link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Nuxt />
      </main>
      <footer>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  </template>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
}

footer {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f4f4f4;
}
</style>