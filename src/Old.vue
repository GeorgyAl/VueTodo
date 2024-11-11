<template>
    <header class="header">
      <div class="header__pages"></div>
      <div class="header__startPage">
        Рабочие задания
      </div>
      <div class="header__completePage">
        <RouterLink to="/complete">Выполненные задания</RouterLink>
      </div>
  </header>
  <RouterView></RouterView>
  <main>
      <div class="creator">
          <button @click="taskviewer = !taskviewer" class="creator__btn">Добавить задачу</button>
      </div>
      <div v-show="taskviewer" class="creator__form">
          <div class="creator__title">
              <label for="title">
                  Заголовок
                  <input
                    v-model="tasktitle"
                    class="creator__input" 
                    type="text" 
                    id="title">
              </label>
          </div>
          <div class="creator__mainText">
              <label for="mainText">
                  Форма
                  <input
                      v-model="tasktext"
                      class="creator__input" 
                      type="text" 
                      id="mainText">
              </label>
          </div>
          <button @click="tasktransfer" class="creator__btn">Добавить</button>
        </div>
      <div
      v-for="(task, idx) in tasks"
      :key="task" 
       class="task">
          <h2 class="task__title">{{ task.name }}</h2>
          <div class="task__text">{{ task.text }}</div>
          {{ clones[idx] }}
          <div class="task__btnWrapper">
              <button @click="handleComplete(task)" class="task__completeBtn">Выполненно</button>
              <button @click="handleDelete(task)" class="task__deleteBtn">Удалить</button>
              <button @click="handleEdit(task)" class="task__editBtn">Изменить</button>
          </div>
          <div v-if="task.state" class="creator__form">
          <div class="creator__title">
              <label for="title">
                  Заголовок
                  <input
                    v-model="clones[idx].name"
                    class="creator__input" 
                    type="text" 
                    id="title">
              </label>
          </div>
          <div class="creator__mainText">
              <label for="mainText">
                  Форма
                  <input
                      v-model="clones[idx].text"
                      class="creator__input" 
                      type="text" 
                      id="mainText">
              </label>
          </div>
          <button @click="taskUpdate(task, idx)" class="creator__btn">Сохранить</button>
        </div>
      </div>
      {{ tasks }}
      {{ completeds }}
      {{ clones }}
  </main>
</template>

<script >
export default {
data() {
  return {
    tasktitle: '',
    tasktext: '',
    taskviewer: '',
    tasks: [],
    completeds: [],
    clones: [],
  }
},
mounted() {
  this.taskCheck();
},
methods: {
  taskCheck() {
    localStorage.tasks ? this.tasks = JSON.parse(localStorage.tasks) : this.tasks = [];
    this.clones = JSON.parse(JSON.stringify(this.tasks));
    console.log(localStorage.tasks)
  },
  tasktransfer() {
    if(this.tasktitle && this.tasktext) {
      const newTask = {
      name: this.tasktitle,
      text: this.tasktext,
      state: false,
    }
    this.tasks.push(newTask);
    localStorage.tasks = JSON.stringify(this.tasks);
    this.tasktitle = '';
    this.tasktext = '';
    this.taskviewer = !this.taskviewer;
    }
  },
  handleDelete(task) {
    this.tasks = this.tasks.filter(t => t != task);
    localStorage.tasks = JSON.stringify(this.tasks);
  },
  taskUpdate(task, id) {
    task.name = this.clones[id].name;
    task.text = this.clones[id].text;
    task.state = !task.state;
    localStorage.tasks = JSON.stringify(this.tasks);
    this.clones = JSON.parse(JSON.stringify(this.tasks));
  },
  handleEdit(task) {
    task.state = !task.state;
    this.clones = JSON.parse(JSON.stringify(this.tasks));
  },
  handleComplete(task) {
    this.completeds.push(task);
    this.tasks = this.tasks.filter(t => t != task);
    localStorage.completeds = JSON.stringify(this.completeds);
    localStorage.tasks = JSON.stringify(this.tasks);
  }
},
}
</script>

<style src="./style.css">
</style>
