<template>
      <header class="header">
        <div 
          class="header__pages"
          :class="{active: pageHome}" >
          <RouterLink @click="linkHome" class="link" to="/">Рабочие задания</RouterLink>
        </div>
        <div 
          class="header__pages"
          :class="{active: pageComplete}">
          <RouterLink @click="linkComplete" class="link" to="/complete">Выполненные задания</RouterLink>
        </div>
    </header>
    <RouterView></RouterView>
</template>

<script >
export default {
data() {
  return {
    pageHome: true,
    pageComplete: false,
  }
},
methods: {
  linkHome() {
    this.pageHome = true;
    this.pageComplete = false;
  },
  linkComplete() {
    this.pageHome = false;
    this.pageComplete = true;
  }
},
}
</script>

<style src="./style.css">
</style>
