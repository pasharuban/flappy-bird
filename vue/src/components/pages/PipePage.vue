<template>
  <div>
    <div v-for="(pipe, index) in pipes" :key="index">
      <PipeModel
        :direction="pipe.direction"
        :height="pipe.height"
        :positionX="pipe.positionX"
        ref="pipe"
      />
      <PipeModel
        :direction="pipe.direction === 'up' ? 'down' : 'up'"
        :height="640 - pipe.height"
        :positionX="pipe.positionX"
        ref="pipe"
      />
    </div>
  </div>
</template>

<script>
import PipeModel from "../PipeModel.vue";
import PipeEngine from "../../engine/pipeEngine";

export default {
  name: "PipePage",
  components: { PipeModel },
  data() {
    return {
      pipes: [],
      pipeEngine: null,
    };
  },
  mounted() {
    this.pipeEngine = new PipeEngine();
    this.pipeEngine.onUpdate((newPipes) => {
      this.pipes = newPipes;
      this.$emit("collisionCheck", this.pipes);
    });
  },
  methods: {
    startGame() {
      this.pipeEngine.startPipeGeneration();
      this.pipeEngine.startGameLoop();
    },
    stopGame() {
      this.pipeEngine.stopGame();
    },
  },
};
</script>

<style scoped></style>
