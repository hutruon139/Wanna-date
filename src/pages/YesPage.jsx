import { useEffect, useRef } from 'react';
import './YesPage.css';

const COLORS = [
  [235, 90, 70],
  [97, 189, 79],
  [242, 214, 0],
  [0, 121, 191],
  [195, 119, 224],
];

const NUM_CONFETTI = 40;

function YesPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    let w = 0;
    let h = 0;
    let xpos = 0.9;
    let animationId;

    const range = (a, b) => (b - a) * Math.random() + a;

    const resizeWindow = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event) => {
      xpos = event.pageX / w;
    };

    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    document.addEventListener('mousemove', handleMouseMove);

    const drawCircle = (x, y, r, style) => {
      context.beginPath();
      context.moveTo(x, y);
      context.bezierCurveTo(x - 17, y + 14, x + 13, y + 5, x - 5, y + 22);
      context.lineWidth = 2;
      context.strokeStyle = style;
      context.stroke();
    };

    const drawCircle2 = (x, y, r, style) => {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + 6, y + 9);
      context.lineTo(x + 12, y);
      context.lineTo(x + 6, y - 9);
      context.closePath();
      context.fillStyle = style;
      context.fill();
    };

    const drawCircle3 = (x, y, r, style) => {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + 5, y + 5);
      context.lineTo(x + 10, y);
      context.lineTo(x + 5, y - 5);
      context.closePath();
      context.fillStyle = style;
      context.fill();
    };

    class Confetti {
      constructor() {
        this.style = COLORS[~~range(0, COLORS.length)];
        this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
        this.r = ~~range(2, 6);
        this.r2 = 2 * this.r;
        this.replace();
      }

      replace() {
        this.opacity = 0;
        this.dop = 0.03 * range(1, 4);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        this.vy = 0.7 * this.r + range(-1, 1);
      }

      draw() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;

        if (this.opacity > 1) {
          this.opacity = 1;
          this.dop *= -1;
        }

        if (this.opacity < 0 || this.y > this.ymax) {
          this.replace();
        }

        if (!(this.x > 0 && this.x < this.xmax)) {
          this.x = (this.x + this.xmax) % this.xmax;
        }

        drawCircle(this.x, this.y, this.r, `${this.rgb},${this.opacity})`);
        drawCircle3(0.5 * this.x, this.y, this.r, `${this.rgb},${this.opacity})`);
        drawCircle2(1.5 * this.x, 1.5 * this.y, this.r, `${this.rgb},${this.opacity})`);
      }
    }

    const confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());

    const step = () => {
      context.clearRect(0, 0, w, h);
      confetti.forEach((piece) => piece.draw());
      animationId = window.requestAnimationFrame(step);
    };

    step();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeWindow);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="yes-page">
      <h1>It&apos;s a date</h1>
      <div className="heart" aria-hidden="true" />
      <canvas ref={canvasRef} className="confetti-canvas" />
    </div>
  );
}

export default YesPage;
