<template>
  <div class="game-container">
    <div class="background"></div>
    <div class="ui">
      <button @click="startGame" v-if="!isGameStarted">Начать игру</button>
      <div class="lives" v-if="isGameStarted">
        <span v-for="n in lives" :key="n" class="heart">❤️</span>
      </div>
      <BirdPage v-if="isGameStarted" @collision="endGame" ref="bird" />
      <PipePage
        v-if="isGameStarted"
        @collisionCheck="checkCollision"
        ref="pipe"
      />
    </div>
  </div>
</template>

<script>
import BirdPage from "./BirdPage.vue";
import PipePage from "./PipePage.vue";
import BirdEngine from "../../engine/birdEngine";
import PipeEngine from "../../engine/pipeEngine";

export default {
  name: "GamePage",
  components: { BirdPage, PipePage },
  data() {
    return {
      isGameStarted: false,
      lives: 3,
      birdEngine: null,
      pipeEngine: null,
    };
  },
  methods: {
    startGame() {
      this.isGameStarted = true;
      this.birdEngine = new BirdEngine();
      this.pipeEngine = new PipeEngine();
      this.birdEngine.startGameLoop();
      this.pipeEngine.startPipeGeneration();
    },
    endGame() {
      this.isGameStarted = false;
      this.birdEngine.stopGameLoop();
      this.pipeEngine.stopGame();
      this.lives = 3;
    },
    checkCollision(pipes) {
      const birdRect = this.$refs.bird.$el.getBoundingClientRect();

      const collision = pipes.some(() => {
        const pipeRect = this.$refs.pipe.$el.getBoundingClientRect();
        return (
          birdRect.bottom > pipeRect.top &&
          birdRect.top < pipeRect.bottom &&
          birdRect.left < pipeRect.right &&
          birdRect.right > pipeRect.left
        );
      });
      if (collision) {
        this.lives--;
        if (this.lives <= 0) {
          this.endGame();
        }
      }
    },
  },
};
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.background {
  background-image: url("@/assets/background.png");
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.ui {
  position: relative;
  z-index: 1;
  text-align: center;
}
.heart {
  margin: 0 5px;
  font-size: 24px;
}
</style>
