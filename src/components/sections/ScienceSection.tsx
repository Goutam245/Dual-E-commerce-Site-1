import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

function MoleculeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const atoms = [
      { x: 0, y: 0, z: 0, radius: 12, color: 'hsl(187, 100%, 50%)' },
      { x: 40, y: 30, z: 20, radius: 8, color: 'hsl(187, 100%, 60%)' },
      { x: -35, y: 40, z: -15, radius: 8, color: 'hsl(187, 100%, 60%)' },
      { x: 30, y: -45, z: 25, radius: 8, color: 'hsl(187, 100%, 60%)' },
      { x: -45, y: -30, z: -20, radius: 8, color: 'hsl(187, 100%, 60%)' },
      { x: 50, y: -10, z: -30, radius: 6, color: 'hsl(187, 100%, 70%)' },
      { x: -20, y: 60, z: 30, radius: 6, color: 'hsl(187, 100%, 70%)' },
    ];

    const bonds = [
      [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6],
    ];

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Rotate atoms
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      const rotatedAtoms = atoms.map(atom => {
        const x = atom.x * cos - atom.z * sin;
        const z = atom.x * sin + atom.z * cos;
        return { ...atom, x, z, screenX: centerX + x * 1.5, screenY: centerY + atom.y * 1.5, depth: z };
      });

      // Sort by depth for proper rendering
      const sortedAtoms = [...rotatedAtoms].sort((a, b) => a.depth - b.depth);

      // Draw bonds
      ctx.strokeStyle = 'hsl(187, 100%, 50%)';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;
      
      bonds.forEach(([i, j]) => {
        const a1 = rotatedAtoms[i];
        const a2 = rotatedAtoms[j];
        ctx.beginPath();
        ctx.moveTo(a1.screenX, a1.screenY);
        ctx.lineTo(a2.screenX, a2.screenY);
        ctx.stroke();
      });

      // Draw atoms
      sortedAtoms.forEach(atom => {
        const scale = (atom.depth + 100) / 150;
        const radius = atom.radius * scale;
        
        ctx.globalAlpha = 0.3 + scale * 0.5;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          atom.screenX, atom.screenY, 0,
          atom.screenX, atom.screenY, radius * 2
        );
        gradient.addColorStop(0, atom.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(atom.screenX, atom.screenY, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = atom.color;
        ctx.beginPath();
        ctx.arc(atom.screenX, atom.screenY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      rotation += 0.005;
      animationId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export function ScienceSection() {
  return (
    <section id="science" className="py-24 bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Molecule Visualization */}
          <div className="relative h-[400px] lg:h-[500px] order-2 lg:order-1">
            {/* DNA Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 400 500" className="w-full h-full">
                {[...Array(10)].map((_, i) => (
                  <g key={i}>
                    <path
                      d={`M200 ${i * 50} Q240 ${i * 50 + 25} 200 ${i * 50 + 50} Q160 ${i * 50 + 75} 200 ${i * 50 + 100}`}
                      fill="none"
                      stroke="hsl(187 100% 50%)"
                      strokeWidth="1"
                    />
                    <path
                      d={`M200 ${i * 50} Q160 ${i * 50 + 25} 200 ${i * 50 + 50} Q240 ${i * 50 + 75} 200 ${i * 50 + 100}`}
                      fill="none"
                      stroke="hsl(187 100% 50%)"
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </svg>
            </div>
            
            <MoleculeVisualization />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-accent text-sm font-medium uppercase tracking-wider mb-4 block">
              Research & Development
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Backed by Science
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              Our peptides undergo rigorous scientific validation at every stage. From synthesis 
              to final quality control, we employ cutting-edge analytical methods including 
              HPLC, mass spectrometry, and amino acid analysis to ensure pharmaceutical-grade purity.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="text-primary-foreground/70">
                  Published research partnerships with leading institutions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="text-primary-foreground/70">
                  Continuous quality improvement through advanced analytics
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="text-primary-foreground/70">
                  Transparent batch testing with accessible documentation
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="btn-glow rounded-full text-primary-foreground"
            >
              Explore Our Research
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
