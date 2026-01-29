import { useEffect, useRef } from "react";
import { content } from "../../data/content";

const CanvasSection = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Configurar tamaño
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        // Estado de partículas
        const particles = [];

        const addParticle = (x, y) => {
            // Alternar colores rojo/azul
            const color = Math.random() > 0.5 ? "rgba(46, 92, 255, 0.8)" : "rgba(255, 77, 0, 0.8)";
            particles.push({ x, y, radius: Math.random() * 20 + 10, color, life: 1 });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            addParticle(e.clientX - rect.left, e.clientY - rect.top);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Loop de animación
        const render = () => {
            // Desvanecer canvas anterior para efecto rastro
            // ctx.clearRect(0, 0, canvas.width, canvas.height); // Si quieres limpiar total
            // Usa esto para trail suave:
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "source-over";

            particles.forEach((p, index) => {
                p.life -= 0.01;
                p.radius += 0.2;
                if (p.life <= 0) {
                    particles.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative h-screen w-full bg-[#f0f0f0] overflow-hidden flex items-center justify-center">
            {/* Texto Oculto que se revela */}
            <div className="absolute z-0 text-center pointer-events-none">
                <h2 className="text-9xl font-bold text-gray-300 opacity-50 tracking-tighter">
                    {content.canvas.secretDate}
                </h2>
            </div>

            {/* Video "Cuadro" */}
            <div className="relative z-10 w-[400px] h-[500px] border-8 border-white shadow-2xl rotate-3">
                <video
                    src={content.canvas.video}
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Canvas Layer */}
            <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply" />

            <div className="absolute bottom-10 text-gray-500 text-sm uppercase tracking-widest">
                Move your cursor to paint
            </div>
        </section>
    );
};

export default CanvasSection;
