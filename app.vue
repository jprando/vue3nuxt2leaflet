<template>
  <Html lang="pt-BR">

  <Head>
    <Title>vue3 + nuxt3 + leaflet</Title>
    <Meta name="description" content="testando vue3 + nuxtjs3 + leaflet" />
  </Head>

  <Body>
    <Mapa :markers="markers" />
  </Body>

  </Html>
</template>

<script setup>
const markers = ref([
  {
    title: 'teste 123',
    location: [51.505, -0.09],
  },
  {
    title: 'teste 456',
    location: [51.52, -0.1],
  },
  {
    title: 'teste 789',
    location: [51.48, -0.108],
  },
])
</script>

<style>
* {
  margin: 0px;
  padding: 0px
}
</style>