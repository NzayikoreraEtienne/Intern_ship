// Stage 1: Background only
new Vue({
    el: '#app',
    mounted() {
        // Get canvas and drawing context
        const canvas = this.$refs.gameCanvas;
        const ctx = canvas.getContext('2d');
        this.drawBackground(ctx);
    },
    methods: {
        drawBackground(ctx) {
            // Sky gradient (light blue to powder blue)
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(1, '#B0E0E6');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 400);

            // Ground (dark brown rectangle)
            ctx.fillStyle = '#5d3a1a';
            ctx.fillRect(0, 350, 800, 50);

            // Grass line (thin green)
            ctx.fillStyle = '#228B22';
            ctx.fillRect(0, 345, 800, 5);
            
        }
    }
});
