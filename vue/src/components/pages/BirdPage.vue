<template>
  <div>
    <BirdModel :birdPosition="birdHeight" ref="bird" />
  </div>
</template>

<script>
import BirdModel from "../BirdModel.vue";
import BirdEngine from "../../engine/birdEngine";

export default {
  name: "BirdPage",
  components: { BirdModel },
  data() {
    return {
      birdHeight: 300,
      birdEngine: null,
    };
  },
  mounted() {
    this.birdEngine = new BirdEngine();
    this.birdEngine.onUpdate((newHeight) => {
      this.birdHeight = newHeight;
    });
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      if (event.code === "Space") {
        this.birdEngine.birdFly();
      }
    },
  },
};
</script>

<style scoped></style>
