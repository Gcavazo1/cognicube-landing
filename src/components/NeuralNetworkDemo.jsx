import React, { useEffect, useRef } from 'react';

// Neural Network Demo Component
const NeuralNetworkDemo = ({ width = 600, height = 400 }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Neural network nodes
    let nodes = [];
    
    // Set up the neural network structure
    const setupNetwork = () => {
      nodes = [];
      
      // Input layer
      for (let i = 0; i < 5; i++) {
        nodes.push({
          x: width * 0.15,
          y: height * 0.2 + (height * 0.6 / 4) * i,
          radius: 6,
          layer: 0,
          connections: [],
          vx: 0,
          vy: 0,
          activation: Math.random()
        });
      }
      
      // Hidden layer 1
      for (let i = 0; i < 7; i++) {
        nodes.push({
          x: width * 0.4,
          y: height * 0.15 + (height * 0.7 / 6) * i,
          radius: 6,
          layer: 1,
          connections: [],
          vx: 0,
          vy: 0,
          activation: Math.random()
        });
      }
      
      // Hidden layer 2
      for (let i = 0; i < 7; i++) {
        nodes.push({
          x: width * 0.6,
          y: height * 0.15 + (height * 0.7 / 6) * i,
          radius: 6,
          layer: 2,
          connections: [],
          vx: 0,
          vy: 0,
          activation: Math.random()
        });
      }
      
      // Output layer
      for (let i = 0; i < 3; i++) {
        nodes.push({
          x: width * 0.85,
          y: height * 0.3 + (height * 0.4 / 2) * i,
          radius: 6,
          layer: 3,
          connections: [],
          vx: 0,
          vy: 0,
          activation: Math.random()
        });
      }
      
      // Create connections between layers
      const inputNodes = nodes.filter(node => node.layer === 0);
      const hiddenNodes1 = nodes.filter(node => node.layer === 1);
      const hiddenNodes2 = nodes.filter(node => node.layer === 2);
      const outputNodes = nodes.filter(node => node.layer === 3);
      
      // Connect input to hidden1
      inputNodes.forEach(inputNode => {
        hiddenNodes1.forEach(hiddenNode => {
          inputNode.connections.push({
            to: nodes.indexOf(hiddenNode),
            weight: Math.random() * 2 - 1
          });
        });
      });
      
      // Connect hidden1 to hidden2
      hiddenNodes1.forEach(hiddenNode1 => {
        hiddenNodes2.forEach(hiddenNode2 => {
          hiddenNode1.connections.push({
            to: nodes.indexOf(hiddenNode2),
            weight: Math.random() * 2 - 1
          });
        });
      });
      
      // Connect hidden2 to output
      hiddenNodes2.forEach(hiddenNode => {
        outputNodes.forEach(outputNode => {
          hiddenNode.connections.push({
            to: nodes.indexOf(outputNode),
            weight: Math.random() * 2 - 1
          });
        });
      });
    };
    
    // Draw the neural network
    const drawNetwork = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      nodes.forEach(node => {
        node.connections.forEach(conn => {
          const targetNode = nodes[conn.to];
          const weight = conn.weight;
          
          // Calculate color based on weight
          let connColor;
          if (weight > 0) {
            // Positive weights - yellow/gold
            connColor = `rgba(255, 221, 0, ${Math.abs(weight) * 0.5})`;
          } else {
            // Negative weights - cyan
            connColor = `rgba(0, 255, 255, ${Math.abs(weight) * 0.5})`;
          }
          
          // Draw connection line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = connColor;
          ctx.lineWidth = Math.abs(weight) * 2 + 0.5;
          ctx.stroke();
        });
      });
      
      // Draw nodes
      nodes.forEach(node => {
        // Glowing effect
        const glowRadius = 8 + 4 * node.activation;
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        
        // Color based on layer
        let nodeColor;
        switch(node.layer) {
          case 0: // Input layer
            nodeColor = 'rgba(255, 221, 0, 0.8)'; // Yellow
            break;
          case 1: // Hidden layer 1
            nodeColor = 'rgba(255, 86, 34, 0.8)'; // Orange
            break;
          case 2: // Hidden layer 2
            nodeColor = 'rgba(236, 64, 122, 0.8)'; // Pink
            break;
          case 3: // Output layer
            nodeColor = 'rgba(0, 255, 255, 0.8)'; // Cyan
            break;
          default:
            nodeColor = 'rgba(255, 255, 255, 0.8)'; // White
        }
        
        // Set gradient colors
        gradient.addColorStop(0, nodeColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        // Draw glow
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };
    
    // Animation frame
    let animationId;
    let lastTime = 0;
    
    // Animation function
    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Random signal propagation
      if (Math.random() < 0.05) {
        const inputNodes = nodes.filter(node => node.layer === 0);
        const randomNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];
        if (randomNode) randomNode.activation = Math.random();
      }
      
      // Update node activations
      for (let layer = 0; layer < 3; layer++) {
        const currentLayerNodes = nodes.filter(node => node.layer === layer);
        const nextLayerNodes = nodes.filter(node => node.layer === layer + 1);
        
        currentLayerNodes.forEach(node => {
          node.connections.forEach(conn => {
            const targetNode = nodes[conn.to];
            targetNode.activation = (targetNode.activation + node.activation * conn.weight * 0.1) / 1.1;
            targetNode.activation = Math.max(0, Math.min(1, targetNode.activation));
          });
        });
      }
      
      // Add slight movement to nodes
      nodes.forEach(node => {
        // Random movement
        node.vx += (Math.random() - 0.5) * 0.05;
        node.vy += (Math.random() - 0.5) * 0.05;
        
        // Damping
        node.vx *= 0.95;
        node.vy *= 0.95;
        
        // Apply movement
        node.x += node.vx;
        node.y += node.vy;
        
        // Constrain to original position
        const layerX = width * (0.15 + node.layer * 0.7 / 3);
        let layerYSpacing;
        let layerYOffset;
        
        switch(node.layer) {
          case 0: // Input layer
            layerYSpacing = height * 0.6 / 4;
            layerYOffset = height * 0.2;
            break;
          case 1: 
          case 2: // Hidden layers
            layerYSpacing = height * 0.7 / 6;
            layerYOffset = height * 0.15;
            break;
          case 3: // Output layer
            layerYSpacing = height * 0.4 / 2;
            layerYOffset = height * 0.3;
            break;
          default:
            layerYSpacing = height * 0.7 / 4;
            layerYOffset = height * 0.15;
        }
        
        const nodeIndex = nodes.filter(n => n.layer === node.layer).indexOf(node);
        const originalY = layerYOffset + layerYSpacing * nodeIndex;
        
        // Apply spring force toward original position
        node.vx += (layerX - node.x) * 0.01;
        node.vy += (originalY - node.y) * 0.01;
      });
      
      // Draw updated network
      drawNetwork();
      
      // Continue animation
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    const init = () => {
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Set up the network
      setupNetwork();
      
      // Start animation
      animationId = requestAnimationFrame(animate);
    };
    
    init();
    
    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [width, height]);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        maxWidth: width,
        maxHeight: height,
        display: 'block',
        margin: '0 auto',
        borderRadius: '4px'
      }}
    />
  );
};

export default NeuralNetworkDemo; 