import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-snow',
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.scss']
})
export class SnowComponent implements AfterViewInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private snowflakes: any[] = [];
  private animationFrameId: number | null = null;

  ngAfterViewInit() {
    this.canvas = document.getElementById('snowCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();

    window.addEventListener('resize', this.resizeCanvas);
    this.createSnowflakes();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.resizeCanvas);
  }

  private resizeCanvas = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  private createSnowflakes() {
    const count = Math.floor(window.innerWidth / 50);
    this.snowflakes = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      d: Math.random() * 0.5 + 0.2
    }));
  }
  

  private drawSnowflakes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    for (const flake of this.snowflakes) {
      this.ctx.moveTo(flake.x, flake.y);
      this.ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
    }

    this.ctx.fill();
  }

  private updateSnowflakes() {
    for (const flake of this.snowflakes) {
      flake.y += Math.pow(flake.d, 2) + 0.5;
      flake.x += Math.sin(flake.y / 50) * 1.5;
  
      if (flake.y > this.canvas.height) {
        flake.y = -flake.r;
        flake.x = Math.random() * this.canvas.width;
      }
    }
  }

  private animate = () => {
    this.drawSnowflakes();
    this.updateSnowflakes();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}