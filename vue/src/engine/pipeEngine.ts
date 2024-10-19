type Pipe = {
  direction: "up" | "down";
  height: number;
  positionX: number;
};

type UpdateCallback = (pipes: Pipe[]) => void;

export default class PipeEngine {
  private pipes: Pipe[] = [];
  private pipeInterval: NodeJS.Timeout | null = null;
  private gameInterval: NodeJS.Timeout | null = null;
  private updateCallbacks: UpdateCallback[] = [];

  startPipeGeneration(): void {
    this.pipeInterval = setInterval(() => {
      const height = this.getRandomInt(200, 600);
      this.pipes.push({
        direction: "up",
        height,
        positionX: 100,
      });
      this.notifyUpdate();
    }, 2000);
  }

  startGameLoop(): void {
    this.gameInterval = setInterval(() => {
      this.pipes = this.pipes
        .map((pipe) => ({
          ...pipe,
          positionX: pipe.positionX - 1,
        }))
        .filter((pipe) => pipe.positionX > -20);
      this.notifyUpdate();
    }, 100);
  }

  stopGame(): void {
    if (this.pipeInterval) {
      clearInterval(this.pipeInterval);
    }
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
  }

  onUpdate(callback: UpdateCallback): void {
    this.updateCallbacks.push(callback);
  }

  private notifyUpdate(): void {
    this.updateCallbacks.forEach((callback) => callback(this.pipes));
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
