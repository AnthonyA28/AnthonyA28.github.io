---
title: Terminal Velocity of a Sphere
layout: article_post
section: article
tags: ChemicalEngineering
---

The terminal velocity of a sphere is described by the following equation: 


$$
\begin{equation}
v_t = \frac{2 R^2 (\rho_s - \rho)g}{9 \mu}
\end{equation}
$$
 

Where:

​	$v_t$ is the terminal velocity

​	$R$ is the radius of the sphere

​	$\rho_s$ is the density of the sphere 

​	$\rho$  is the density of the medium it is flowing in

​	$g$ is acceleration of gravity

​	$\mu$ is the viscosity of the medium it is flowing in

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Animation Frame</title>
</head>
<body>
    <canvas id="myCanvas" width="800" height="1200"></canvas>
    <input type="range" id="radiusSlider" min="10" max="50" step="1" value="20">
    <label for="radiusSlider">Circle Radius</label>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const pixelsPerSecond = 100; // Speed in pixels per second

    let lastTimestamp = null;
    let width = canvas.width;
    let height = canvas.height;

    let bubblesPerSec = 10;
    let circleList = [];

    const radiusSlider = document.getElementById('radiusSlider');
    const radiusLabel = document.querySelector('label[for="radiusSlider"]');

    function getRandomRadius(baseRadius, variation) {
        const minRadius = baseRadius - (baseRadius * variation);
        const maxRadius = baseRadius + (baseRadius * variation);
        return Math.random() * (maxRadius - minRadius) + minRadius;
    }

    function getRandomPosition(radius) {
        let x, y;
        let isOverlap;
        const maxAttempts = 10; // Limit the number of attempts to prevent infinite loops
        let attempts = 0;

        do {
            isOverlap = false;
            x = Math.random() * (width - 2 * radius) + radius;
            y = -2 * radius - Math.random() * radius; // Above the canvas
            
            // Check for overlap with existing circles
            for (const existingCircle of circleList) {
                const dx = existingCircle.x - x;
                const dy = existingCircle.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < existingCircle.radius + radius) {
                    isOverlap = true;
                    break; // Overlapping, regenerate position
                }
            }

            attempts++;

            // If too many attempts have been made, break the loop
            if (attempts >= maxAttempts) {
                break;
            }

        } while (isOverlap);
        
        return { x, y };
    }

    function getRandomColorShade() {
        const minShade = 100; // Minimum shade value (to avoid very dark colors)
        const maxShade = 150; // Maximum shade value (maximum brightness)
        const shader = Math.floor(Math.random() * (maxShade - minShade + 1)) + minShade;
        const shadeg = Math.floor(Math.random() * (maxShade - minShade + 1)) + minShade;
        const shadeb = Math.floor(Math.random() * (maxShade - minShade + 1)) + minShade;
        return `rgb(${shader}, ${shadeg}, ${shadeb})`;
    }

    function draw(timestamp) {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        // Calculate the time elapsed since the last frame in seconds
        const deltaTime = (timestamp - lastTimestamp) / 1000;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Check if it's time to add a new circle
        if (timestamp - lastBubbleTime >= 1000 / bubblesPerSec) {
            const baseRadius = parseInt(radiusSlider.value);
            const variation = 0.4; 
            const radius = getRandomRadius(baseRadius, variation);
            const position = getRandomPosition(radius);
            const fillColor = getRandomColorShade(); // Random color shade
            circleList.push({ x: position.x, y: position.y, radius, fillColor });
            lastBubbleTime = timestamp;
        }

        // Draw and update circles
        for (let i = 0; i < circleList.length; i++) {
            const circle = circleList[i];
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        	circle.y += pixelsPerSecond*deltaTime*circle.radius*circle.radius/125;
            console.log(deltaTime)
            ctx.fillStyle = circle.fillColor;
            ctx.fill();
            ctx.closePath();

            // Remove circles that are beyond the canvas height
            if (circle.y - circle.radius > height) {
                circleList.splice(i, 1);
                i--; // Adjust the loop index
            }
        }

        // Request the next animation frame
        requestAnimationFrame(draw);

        lastTimestamp = timestamp;
    }

    let lastBubbleTime = 0;

    // Event listener for the radius slider
    radiusSlider.addEventListener('input', function () {
        radiusLabel.innerText = `Circle Radius: ${this.value}`;
    });

    // Start the animation
    requestAnimationFrame(draw);
</script>
</body>
</html>











