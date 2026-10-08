"use client";

import { useEffect, useRef } from "react";

export type InteractiveDNAProps = {
  interactionRadius?: number;
  interactionStrength?: number;
  returnSpeed?: number;
  particleCount?: number;
  connectionDistance?: number;
  animationSpeed?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  phase: number;
  radius: number;
  depth: number;
  color: string;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  velocityX: number;
  velocityY: number;
  active: boolean;
  dragging: boolean;
  pointerId: number | null;
};

type DNAHelix = {
  strands: [Particle[], Particle[]];
  centerY: number;
  amplitude: number;
  phaseOffset: number;
};

const colors = ["#67e8f9", "#7ba7ff", "#a78bfa", "#e8f4ff"];
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function InteractiveDNA({
  interactionRadius = 170,
  interactionStrength = 0.42,
  returnSpeed = 0.035,
  particleCount = 30,
  connectionDistance = 142,
  animationSpeed = 0.32,
}: InteractiveDNAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!container || !canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer: PointerState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      velocityX: 0,
      velocityY: 0,
      active: false,
      dragging: false,
      pointerId: null,
    };

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let phase = 0;
    let frameId = 0;
    let previousTime = 0;
    let visible = false;
    let disposed = false;
    let dnaHelices: DNAHelix[] = [];
    let networkParticles: Particle[] = [];

    const makeParticle = (x: number, y: number, index: number): Particle => ({
      x,
      y,
      vx: 0,
      vy: 0,
      baseX: x,
      baseY: y,
      phase: index * 2.399,
      radius: 0.8 + ((index * 13) % 10) / 10,
      depth: 0.3 + ((index * 7) % 8) / 10,
      color: colors[index % colors.length],
    });

    const seedNetwork = (count: number) => {
      networkParticles = Array.from({ length: count }, (_, index) => {
        const x = width * (0.06 + (((index * 37) % 89) / 100));
        const y = height * (0.12 + (((index * 53) % 76) / 100));
        return makeParticle(x, y, index + 100);
      });
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const mobile = width < 640;
      const tablet = width < 1024;
      const count = Math.round(
        particleCount * (mobile ? 0.4 : tablet ? 0.68 : 1),
      );
      const segments = Math.round(mobile ? 15 : tablet ? 23 : clamp(width / 34, 24, 38));
      const centerY = height * 0.5;
      const amplitude = Math.min(height * 0.32, mobile ? 78 : 132);
      const margin = Math.min(width * 0.06, 92);

      dnaHelices = [{
        strands: [0, 1].map((strand) =>
          Array.from({ length: segments }, (_, index) => {
            const x = margin + ((width - margin * 2) * index) / (segments - 1);
            const angle = (index / (segments - 1)) * Math.PI * 4.4;
            return makeParticle(
              x,
              centerY + Math.sin(angle + strand * Math.PI) * amplitude,
              index + strand * segments,
            );
          }),
        ) as [Particle[], Particle[]],
        centerY,
        amplitude,
        phaseOffset: 0,
      }];

      seedNetwork(count);
      drawFrame(0, true);
    };

    const resetPointer = () => {
      pointer.active = false;
      pointer.dragging = false;
      pointer.pointerId = null;
      pointer.velocityX = 0;
      pointer.velocityY = 0;
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const inside = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;

      if (!inside) {
        if (!pointer.dragging) pointer.active = false;
        return;
      }

      const dx = x - pointer.targetX;
      const dy = y - pointer.targetY;
      pointer.velocityX = clamp(dx, -45, 45);
      pointer.velocityY = clamp(dy, -45, 45);
      pointer.targetX = x;
      pointer.targetY = y;
      pointer.active = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      updatePointer(event);
      if (pointer.active) {
        pointer.dragging = true;
        pointer.pointerId = event.pointerId;
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (pointer.pointerId === event.pointerId) resetPointer();
    };

    const updateParticle = (
      particle: Particle,
      baseX: number,
      baseY: number,
      delta: number,
    ) => {
      const pointerWeight = pointer.active
        ? Math.pow(
            Math.max(
              0,
              1 -
                Math.hypot(
                  particle.x - pointer.x,
                  particle.y - pointer.y,
                ) / interactionRadius,
            ),
            2,
          )
        : 0;

      if (pointerWeight > 0) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const force = interactionStrength * pointerWeight * (pointer.dragging ? 2.8 : 1);

        if (pointer.dragging) {
          particle.vx +=
            (-dx * 0.012 + pointer.velocityX * 0.055) * pointerWeight;
          particle.vy +=
            (-dy * 0.012 + pointer.velocityY * 0.055) * pointerWeight;
        } else {
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      }

      particle.vx += (baseX - particle.x) * returnSpeed * delta;
      particle.vy += (baseY - particle.y) * returnSpeed * delta;
      particle.vx *= Math.pow(0.84, delta);
      particle.vy *= Math.pow(0.84, delta);
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
    };

    const drawParticle = (particle: Particle, alpha: number) => {
      context.beginPath();
      context.fillStyle = particle.color;
      context.globalAlpha = alpha;
      context.shadowColor = particle.color;
      context.shadowBlur = particle.radius > 1.6 ? 5 : 0;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
    };

    const drawFrame = (time: number, staticFrame = false) => {
      if (disposed || width <= 0 || height <= 0) return;

      const delta = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
      previousTime = time;
      context.clearRect(0, 0, width, height);

      if (!staticFrame && !reducedMotion.matches) {
        phase += animationSpeed * 0.012 * delta;
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.14 * delta;
      pointer.y += (pointer.targetY - pointer.y) * 0.14 * delta;
      pointer.velocityX *= Math.pow(0.75, delta);
      pointer.velocityY *= Math.pow(0.75, delta);

      const allDNAparticles: Particle[] = [];
      dnaHelices.forEach((helix) => {
        const angleStep = (Math.PI * 4.4) / (helix.strands[0].length - 1);

        for (let strand = 0; strand < 2; strand += 1) {
          const particles = helix.strands[strand];
          context.beginPath();
          context.strokeStyle = strand === 0 ? "#67e8f9" : "#a78bfa";
          context.lineWidth = 1.1;
          context.globalAlpha = 0.16;

          particles.forEach((particle, index) => {
            const angle = index * angleStep + phase + helix.phaseOffset + strand * Math.PI;
            const depth = Math.cos(angle);
            const baseY = helix.centerY + Math.sin(angle) * helix.amplitude;
            updateParticle(particle, particle.baseX, baseY, delta);
            if (index === 0) context.moveTo(particle.x, particle.y);
            else context.lineTo(particle.x, particle.y);
            particle.depth = depth;
            allDNAparticles.push(particle);
          });
          context.stroke();
        }

        for (let index = 0; index < helix.strands[0].length; index += 1) {
          const first = helix.strands[0][index];
          const second = helix.strands[1][index];
          const depth = (first.depth + 1) / 2;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = depth > 0.5 ? "#c7efff" : "#8795ed";
          context.globalAlpha = 0.1 + depth * 0.14;
          context.lineWidth = depth > 0.55 ? 0.9 : 0.65;
          context.stroke();
          drawParticle(first, 0.3 + depth * 0.36);
          drawParticle(second, 0.3 + (1 - depth) * 0.36);
        }
      });

      networkParticles.forEach((particle, index) => {
        const driftX = Math.sin(phase * 0.65 + particle.phase) * 4;
        const driftY = Math.cos(phase * 0.82 + particle.phase) * 7;
        updateParticle(
          particle,
          particle.baseX + driftX,
          particle.baseY + driftY,
          delta,
        );

        for (let next = index + 1; next < networkParticles.length; next += 1) {
          const other = networkParticles[next];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance >= connectionDistance) continue;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = particle.color;
          context.globalAlpha = (1 - distance / connectionDistance) * 0.17;
          context.lineWidth = 0.7;
          context.stroke();
        }

        for (const helix of dnaHelices) {
          let nearest: Particle | undefined;
          let nearestDistance = connectionDistance * 0.72;
          for (const dnaStrand of helix.strands) {
            for (const dnaParticle of dnaStrand) {
              const distance = Math.hypot(
                particle.x - dnaParticle.x,
                particle.y - dnaParticle.y,
              );
              if (distance < nearestDistance) {
                nearest = dnaParticle;
                nearestDistance = distance;
              }
            }
          }
          if (nearest) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nearest.x, nearest.y);
            context.strokeStyle = particle.color;
            context.globalAlpha = (1 - nearestDistance / (connectionDistance * 0.72)) * 0.12;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }

        drawParticle(particle, 0.22 + particle.depth * 0.28);
      });

      if (pointer.active && !reducedMotion.matches) {
        const ripple = context.createRadialGradient(
          pointer.x,
          pointer.y,
          2,
          pointer.x,
          pointer.y,
          interactionRadius * 0.7,
        );
        ripple.addColorStop(0, "rgba(103,232,249,0.08)");
        ripple.addColorStop(0.45, "rgba(123,167,255,0.035)");
        ripple.addColorStop(1, "rgba(123,167,255,0)");
        context.beginPath();
        context.fillStyle = ripple;
        context.globalAlpha = 1;
        context.arc(pointer.x, pointer.y, interactionRadius * 0.7, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      if (visible && !reducedMotion.matches) {
        frameId = window.requestAnimationFrame((nextTime) => drawFrame(nextTime));
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        window.cancelAnimationFrame(frameId);
        previousTime = 0;
      } else if (!reducedMotion.matches) {
        window.cancelAnimationFrame(frameId);
        frameId = window.requestAnimationFrame((time) => drawFrame(time));
      } else {
        drawFrame(0, true);
      }
    });
    observer.observe(container);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("blur", resetPointer);

    const onMotionChange = () => {
      window.cancelAnimationFrame(frameId);
      previousTime = 0;
      if (visible) {
        if (reducedMotion.matches) drawFrame(0, true);
        else frameId = window.requestAnimationFrame((time) => drawFrame(time));
      }
    };
    reducedMotion.addEventListener("change", onMotionChange);
    resize();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", resetPointer);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, [
    animationSpeed,
    connectionDistance,
    interactionRadius,
    interactionStrength,
    particleCount,
    returnSpeed,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
    </div>
  );
}
