import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const arenaType = url.searchParams.get('arenaType') || 'text';
  
  const responses = {
    text: {
      prompt: "Explain quantum computing to a 10-year-old child.",
      modelA: {
        id: "1",
        name: "GPT-4o",
        response: "Quantum computing is like having a super-special toy that can play many games at once, while regular computers can only play one game at a time. Imagine you have a maze puzzle. A regular computer would try one path, then if it's wrong, go back and try another path, one by one. But a quantum computer is like having a magical toy that can try ALL the paths through the maze at the same time!"
      },
      modelB: {
        id: "2",
        name: "Claude 3 Opus",
        response: "Imagine you have a toy box with lots of different toys. A normal computer is like playing with one toy at a time. You can play with the teddy bear, then put it down and play with the race car, then put that down and play with the blocks. Quantum computing is like being able to play with ALL your toys at the same time!"
      }
    },
    svg: {
      prompt: "Create an SVG of a simple landscape with mountains, a sun, and trees.",
      modelA: {
        id: "5",
        name: "GPT-4o",
        response: `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <!-- Sky -->
  <rect width="400" height="300" fill="#87CEEB" />
  
  <!-- Sun -->
  <circle cx="320" cy="80" r="40" fill="#FFD700" />
  <g>
    <line x1="320" y1="20" x2="320" y2="10" stroke="#FFD700" stroke-width="4" />
    <line x1="320" y1="150" x2="320" y2="140" stroke="#FFD700" stroke-width="4" />
    <line x1="260" y1="80" x2="250" y2="80" stroke="#FFD700" stroke-width="4" />
    <line x1="390" y1="80" x2="380" y2="80" stroke="#FFD700" stroke-width="4" />
  </g>
  
  <!-- Mountains -->
  <polygon points="0,300 150,100 300,300" fill="#6B8E23" />
  <polygon points="150,300 350,150 550,300" fill="#556B2F" />
  
  <!-- Trees -->
  <rect x="50" y="250" width="10" height="30" fill="#8B4513" />
  <polygon points="30,250 80,250 55,200" fill="#228B22" />
  <polygon points="35,220 75,220 55,180" fill="#228B22" />
  
  <rect x="120" y="260" width="10" height="30" fill="#8B4513" />
  <polygon points="100,260 150,260 125,210" fill="#228B22" />
  <polygon points="105,230 145,230 125,190" fill="#228B22" />
</svg>`
      },
      modelB: {
        id: "6",
        name: "Claude 3 Opus",
        response: `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <!-- Sky background -->
  <rect width="400" height="300" fill="#87CEEB"/>
  
  <!-- Sun -->
  <circle cx="300" cy="70" r="30" fill="#FFD700"/>
  <g stroke="#FFD700" stroke-width="3">
    <line x1="300" y1="30" x2="300" y2="20"/>
    <line x1="300" y1="120" x2="300" y2="110"/>
    <line x1="260" y1="70" x2="250" y2="70"/>
    <line x1="350" y1="70" x2="340" y2="70"/>
  </g>
  
  <!-- Mountains -->
  <polygon points="0,300 100,150 200,300" fill="#6B8E23"/>
  <polygon points="150,300 250,120 350,300" fill="#556B2F"/>
  
  <!-- Trees -->
  <rect x="50" y="250" width="10" height="50" fill="#8B4513"/>
  <polygon points="30,250 80,250 55,200" fill="#228B22"/>
  <polygon points="35,220 75,220 55,180" fill="#228B22"/>
  
  <rect x="150" y="260" width="10" height="40" fill="#8B4513"/>
  <polygon points="130,260 180,260 155,220" fill="#228B22"/>
  <polygon points="135,230 175,230 155,190" fill="#228B22"/>
</svg>`
      }
    },
    twigl: {
      prompt: "Create a Twigl.app shader that generates a colorful mandelbrot fractal.",
      modelA: {
        id: "8",
        name: "GPT-4o",
        response: `void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    
    vec2 c = uv * 2.5 - vec2(0.7, 0.0);
    vec2 z = vec2(0.0);
    
    float iter = 0.0;
    const float MAX_ITER = 100.0;
    
    for(float i = 0.0; i < MAX_ITER; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        
        if(dot(z, z) > 4.0) {
            iter = i;
            break;
        }
    }
    
    if(iter == 0.0) {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        float t = iter / MAX_ITER;
        vec3 color = 0.5 + 0.5 * cos(3.0 + t * 15.0 + vec3(0.0, 0.6, 1.0));
        fragColor = vec4(color, 1.0);
    }
}`
      },
      modelB: {
        id: "9",
        name: "Claude 3 Opus",
        response: `precision highp float;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord.xy - 0.5 * iResolution.xy) / min(iResolution.y, iResolution.x);
    
    // Scale and position the fractal
    uv *= 3.0;
    uv -= vec2(0.5, 0.0);
    
    vec2 c = uv;
    vec2 z = vec2(0.0);
    float iteration = 0.0;
    const float MAX_ITER = 100.0;
    
    for (float i = 0.0; i < MAX_ITER; i++) {
        // z = z² + c
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        
        if (length(z) > 2.0) {
            iteration = i;
            break;
        }
    }
    
    // Smooth coloring
    float normalized = iteration / MAX_ITER;
    
    // Create a colorful gradient based on iteration count
    vec3 color = vec3(
        0.5 + 0.5 * sin(normalized * 20.0 + iTime),
        0.5 + 0.5 * sin(normalized * 20.0 + 2.0 + iTime * 0.7),
        0.5 + 0.5 * sin(normalized * 20.0 + 4.0 + iTime * 0.3)
    );
    
    // Black for points inside the set
    if (iteration == MAX_ITER) {
        color = vec3(0.0);
    }
    
    fragColor = vec4(color, 1.0);
}`
      }
    },
    music: {
      prompt: "Generate ABC notation for a simple folk melody in 4/4 time.",
      modelA: {
        id: "10",
        name: "GPT-4o",
        response: `X:1
T:Simple Folk Melody
M:4/4
L:1/8
K:G
|: "G"G2 B2 "D"A2 F2 | "G"G2 D2 "C"E4 | "G"D2 G2 "D"F2 A2 | "G"B2 A2 G4 :|
|: "C"e2 c2 "G"B2 G2 | "D"A2 F2 "G"G4 | "C"E2 G2 "D"F2 A2 | "G"G2 F2 G4 :|`
      },
      modelB: {
        id: "11",
        name: "Claude 3 Opus",
        response: `X:1
T:Gentle Meadow
C:AI Generated
M:4/4
L:1/8
K:D
|: "D"D2 F2 A2 F2 | "G"B2 A2 "D"F4 | "A"E2 A2 "D"F2 D2 | "A"E2 C2 "D"D4 :|
|: "D"f2 d2 "A"e2 c2 | "G"B2 d2 "D"A4 | "G"B2 A2 "A"G2 E2 | "D"F2 E2 D4 :|`
      }
    }
  };
  
  return NextResponse.json(responses[arenaType as keyof typeof responses] || responses.text);
}