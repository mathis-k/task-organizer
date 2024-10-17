<script setup lang="ts">
import { computed } from "vue";
import { useTasksStore } from "~/stores/tasks";

const taskStore = useTasksStore();

const columns = [
  { status: "Backlog", title: "Backlog" },
  { status: "Working On", title: "Working On" },
  { status: "Done", title: "Done" },
];

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};

function isUpdatedWithinWeek(task) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return new Date(task.updatedAt) >= oneWeekAgo;
}

const tasks1 = computed(() => {
  return taskStore.tasks
    .filter((task) => task.status === columns[0].status)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
});

const tasks2 = computed(() => {
  return taskStore.tasks
    .filter((task) => task.status === columns[1].status)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
});

const tasks3 = computed(() => {
  return taskStore.tasks
    .filter(
      (task) => task.status === columns[2].status && isUpdatedWithinWeek(task),
    )
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
});

function startDrag(event, task) {
  console.log(task);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("taskID", task._id);
  console.log("Task ID set in dataTransfer:", task._id);
}

async function onDrop(event, status) {
  console.log("onDrop", status);
  const taskID = event.dataTransfer.getData("taskID");
  console.log("taskID", taskID);
  const task = await taskStore.getTask(taskID);
  console.log("task", task);
  if (task && task.status !== status) {
    await taskStore.updateTaskStatus(task._id, status);
  }
}
</script>

<template>
  <div class="kanban-board">
    <div
      class="drop-zone"
      @drop="onDrop($event, columns[0].status)"
      @dragenter.prevent
      @dragover.prevent
    >
      <h3 class="column-title">{{ columns[0].title }}</h3>
      <div
        v-for="task in tasks1"
        :key="task._id"
        class="drag-el"
        draggable="true"
        @dragstart="startDrag($event, task)"
      >
        <TaskCard :task="task" />
      </div>
    </div>
    <div
      class="drop-zone"
      @drop="onDrop($event, columns[1].status)"
      @dragenter.prevent
      @dragover.prevent
    >
      <h3 class="column-title">{{ columns[1].title }}</h3>
      <div
        v-for="task in tasks2"
        :key="task._id"
        class="drag-el"
        draggable="true"
        @dragstart="startDrag($event, task)"
      >
        <TaskCard :task="task" />
      </div>
    </div>
    <div
      class="drop-zone"
      @drop="onDrop($event, columns[2].status)"
      @dragenter.prevent
      @dragover.prevent
    >
      <h3 class="column-title">{{ columns[2].title }}</h3>
      <div
        v-for="task in tasks3"
        :key="task._id"
        class="drag-el-done"
        draggable="true"
        @dragstart="startDrag($event, task)"
      >
        <TaskCard :task="task" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  display: flex;
  gap: 20px;
}
.drop-zone {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  background-color: #2f363d;
}
.drag-el {
  margin-bottom: 10px;
}
.drag-el-done {
  margin-bottom: 10px;
  opacity: 0.7;
}
.column-title {
  font-size: 1.2rem;
  margin-bottom: 25px;
}
</style>
