<template>
  <main>
    <transition-group name="posts-list">
      <div
      v-for="(task, idx) in completeds"
      :key="task" 
       class="task">
          <h2 class="task__title">{{ task.name }}</h2>
          <div class="task__text">{{ task.text }}</div>
          <button @click="handleBack(task)" class="task__returnBtn">Вернуть</button>
      </div>
      </transition-group>
    </main>
</template>

<script >
export default {
data() {
  return {
    tasks: [],
    completeds: [],
  }
},
mounted() {
  this.completeCheck();
},
methods: {
  completeCheck() {
    localStorage.completeds ? this.completeds = JSON.parse(localStorage.completeds) : this.completeds = [];
  },
  handleBack(task) {
    this.tasks = JSON.parse(localStorage.tasks);
    this.tasks.push(task);
    localStorage.tasks = JSON.stringify(this.tasks);
    this.completeds = this.completeds.filter(t => t != task);
    localStorage.completeds = JSON.stringify(this.completeds);
  }
},
}
</script>

<style src="./style.css">
</style>
