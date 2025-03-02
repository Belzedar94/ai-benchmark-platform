// Mock data for development

export interface IModel {
  _id: string;
  name: string;
  provider: string;
  eloScore: number;
  wins: number;
  losses: number;
  draws: number;
  totalAppearances: number;
  arenaType: string;
}

export interface IPrompt {
  _id: string;
  text: string;
  arenaType: string;
  submittedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  usageCount: number;
}

// Mock models data
export const models: Record<string, IModel[]> = {
  text: [
    {
      _id: '1',
      name: 'GPT-4o',
      provider: 'OpenAI',
      eloScore: 1200,
      wins: 120,
      losses: 50,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'text',
    },
    {
      _id: '2',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      eloScore: 1180,
      wins: 110,
      losses: 60,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'text',
    },
    {
      _id: '3',
      name: 'Gemini 1.5 Pro',
      provider: 'Google',
      eloScore: 1150,
      wins: 100,
      losses: 70,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'text',
    },
    {
      _id: '4',
      name: 'Llama 3 70B',
      provider: 'Meta',
      eloScore: 1100,
      wins: 90,
      losses: 80,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'text',
    },
  ],
  svg: [
    {
      _id: '5',
      name: 'GPT-4o',
      provider: 'OpenAI',
      eloScore: 1180,
      wins: 110,
      losses: 60,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'svg',
    },
    {
      _id: '6',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      eloScore: 1150,
      wins: 100,
      losses: 70,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'svg',
    },
    {
      _id: '7',
      name: 'Gemini 1.5 Pro',
      provider: 'Google',
      eloScore: 1120,
      wins: 95,
      losses: 75,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'svg',
    },
  ],
  twigl: [
    {
      _id: '8',
      name: 'GPT-4o',
      provider: 'OpenAI',
      eloScore: 1150,
      wins: 100,
      losses: 70,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'twigl',
    },
    {
      _id: '9',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      eloScore: 1120,
      wins: 95,
      losses: 75,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'twigl',
    },
  ],
  music: [
    {
      _id: '10',
      name: 'GPT-4o',
      provider: 'OpenAI',
      eloScore: 1130,
      wins: 98,
      losses: 72,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'music',
    },
    {
      _id: '11',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      eloScore: 1110,
      wins: 92,
      losses: 78,
      draws: 30,
      totalAppearances: 200,
      arenaType: 'music',
    },
  ],
};

// Mock prompts data
export const prompts: Record<string, IPrompt[]> = {
  text: [
    {
      _id: '1',
      text: 'Explain quantum computing to a 10-year-old child.',
      arenaType: 'text',
      status: 'approved',
      usageCount: 50,
    },
    {
      _id: '2',
      text: 'Write a short poem about the changing seasons.',
      arenaType: 'text',
      status: 'approved',
      usageCount: 45,
    },
    {
      _id: '3',
      text: 'Describe three innovative solutions to reduce plastic waste in oceans.',
      arenaType: 'text',
      status: 'approved',
      usageCount: 40,
    },
  ],
  svg: [
    {
      _id: '4',
      text: 'Create an SVG of a simple landscape with mountains, a sun, and trees.',
      arenaType: 'svg',
      status: 'approved',
      usageCount: 35,
    },
    {
      _id: '5',
      text: 'Generate SVG code for a minimalist logo of a rocket launching.',
      arenaType: 'svg',
      status: 'approved',
      usageCount: 30,
    },
  ],
  twigl: [
    {
      _id: '6',
      text: 'Create a Twigl.app shader that generates a colorful mandelbrot fractal.',
      arenaType: 'twigl',
      status: 'approved',
      usageCount: 25,
    },
    {
      _id: '7',
      text: 'Write a Twigl.app shader that creates a sunset over an ocean with waves.',
      arenaType: 'twigl',
      status: 'approved',
      usageCount: 20,
    },
  ],
  music: [
    {
      _id: '8',
      text: 'Generate ABC notation for a simple folk melody in 4/4 time.',
      arenaType: 'music',
      status: 'approved',
      usageCount: 15,
    },
    {
      _id: '9',
      text: 'Create a short piano piece in the style of Debussy using MusicXML.',
      arenaType: 'music',
      status: 'approved',
      usageCount: 10,
    },
  ],
};

// Mock responses for LLMs
export const mockResponses: Record<string, Record<string, string>> = {
  text: {
    'GPT-4o': `Quantum computing is like having a super-special toy that can play many games at once, while regular computers can only play one game at a time.

Imagine you have a maze puzzle. A regular computer would try one path, then if it's wrong, go back and try another path, one by one. But a quantum computer is like having a magical toy that can try ALL the paths through the maze at the same time!

Regular computers use bits, which are like light switches that can be either ON or OFF (we call these 1 or 0). But quantum computers use "qubits" which are super weird - they can be ON, OFF, or kind of both at the same time (until you look at them)!

It's a bit like Schrödinger's cat - a famous thought experiment where a cat in a box can be both alive and dead until you open the box to check. Qubits are in this strange "superposition" state until we measure them.

Scientists are excited about quantum computers because they might solve really hard problems that would take regular computers thousands of years to figure out, like creating new medicines or understanding complicated weather patterns.

But quantum computers are still very new and tricky to build - they need to be kept super cold (colder than space!) and are very sensitive to their surroundings.`,
    'Claude 3 Opus': `Imagine you have a toy box with lots of different toys. A normal computer is like playing with one toy at a time. You can play with the teddy bear, then put it down and play with the race car, then put that down and play with the blocks.

Quantum computing is like being able to play with ALL your toys at the same time!

Here's how it works: Normal computers use things called "bits" that can be either 0 or 1 - like a light switch that's either OFF or ON.

But quantum computers use special things called "qubits." And qubits have a superpower! They can be 0, 1, or both 0 AND 1 at the same time! It's like having a magic light switch that can be OFF, ON, or somehow both OFF and ON together.

Because of this superpower, quantum computers can think about many, many different answers all at once, instead of checking them one by one like a normal computer.

Scientists are excited about quantum computers because they might help us solve really big problems that would take normal computers thousands of years to figure out - like creating new medicines, understanding how stars work, or making better materials for things like batteries or airplanes.

Quantum computers are still very new though - they're super delicate and need to be kept extremely cold (colder than outer space!). Scientists are still figuring out how to make them work better.

Does that make sense?`,
  },
  svg: {
    'GPT-4o': `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <!-- Sky -->
  <rect width="400" height="300" fill="#87CEEB" />
  
  <!-- Sun -->
  <circle cx="320" cy="80" r="40" fill="#FFD700" />
  <g>
    <line x1="320" y1="20" x2="320" y2="10" stroke="#FFD700" stroke-width="4" />
    <line x1="320" y1="150" x2="320" y2="140" stroke="#FFD700" stroke-width="4" />
    <line x1="260" y1="80" x2="250" y2="80" stroke="#FFD700" stroke-width="4" />
    <line x1="390" y1="80" x2="380" y2="80" stroke="#FFD700" stroke-width="4" />
    <line x1="275" y1="35" x2="265" y2="25" stroke="#FFD700" stroke-width="4" />
    <line x1="375" y1="135" x2="365" y2="125" stroke="#FFD700" stroke-width="4" />
    <line x1="375" y1="35" x2="365" y2="25" stroke="#FFD700" stroke-width="4" />
    <line x1="275" y1="135" x2="265" y2="125" stroke="#FFD700" stroke-width="4" />
  </g>
  
  <!-- Mountains -->
  <polygon points="0,300 150,100 300,300" fill="#6B8E23" />
  <polygon points="150,300 350,150 550,300" fill="#556B2F" />
  <polygon points="250,300 400,180 550,300" fill="#808000" />
  
  <!-- Snow caps -->
  <polygon points="150,100 130,130 170,130" fill="white" />
  <polygon points="350,150 330,170 370,170" fill="white" />
  <polygon points="400,180 385,195 415,195" fill="white" />
  
  <!-- Trees -->
  <!-- Tree 1 -->
  <rect x="50" y="250" width="10" height="30" fill="#8B4513" />
  <polygon points="30,250 80,250 55,200" fill="#228B22" />
  <polygon points="35,220 75,220 55,180" fill="#228B22" />
  <polygon points="40,190 70,190 55,160" fill="#228B22" />
  
  <!-- Tree 2 -->
  <rect x="120" y="260" width="10" height="30" fill="#8B4513" />
  <polygon points="100,260 150,260 125,210" fill="#228B22" />
  <polygon points="105,230 145,230 125,190" fill="#228B22" />
  <polygon points="110,200 140,200 125,170" fill="#228B22" />
  
  <!-- Tree 3 -->
  <rect x="200" y="240" width="10" height="30" fill="#8B4513" />
  <polygon points="180,240 230,240 205,190" fill="#228B22" />
  <polygon points="185,210 225,210 205,170" fill="#228B22" />
  <polygon points="190,180 220,180 205,150" fill="#228B22" />
  
  <!-- Tree 4 -->
  <rect x="280" y="250" width="10" height="30" fill="#8B4513" />
  <polygon points="260,250 310,250 285,200" fill="#228B22" />
  <polygon points="265,220 305,220 285,180" fill="#228B22" />
  <polygon points="270,190 300,190 285,160" fill="#228B22" />
</svg>`,
    'Claude 3 Opus': `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <!-- Sky background -->
  <rect width="400" height="300" fill="#87CEEB"/>
  
  <!-- Sun -->
  <circle cx="300" cy="70" r="30" fill="#FFD700"/>
  <g stroke="#FFD700" stroke-width="3">
    <line x1="300" y1="30" x2="300" y2="20"/>
    <line x1="300" y1="120" x2="300" y2="110"/>
    <line x1="260" y1="70" x2="250" y2="70"/>
    <line x1="350" y1="70" x2="340" y2="70"/>
    <line x1="272" y1="42" x2="265" y2="35"/>
    <line x1="335" y1="105" x2="328" y2="98"/>
    <line x1="328" y1="42" x2="335" y2="35"/>
    <line x1="265" y1="105" x2="272" y2="98"/>
  </g>
  
  <!-- Mountains -->
  <polygon points="0,300 100,150 200,300" fill="#6B8E23"/>
  <polygon points="150,300 250,120 350,300" fill="#556B2F"/>
  <polygon points="300,300 350,200 400,300" fill="#808000"/>
  
  <!-- Snow caps on mountains -->
  <polygon points="100,150 85,170 115,170" fill="white"/>
  <polygon points="250,120 235,140 265,140" fill="white"/>
  <polygon points="350,200 340,210 360,210" fill="white"/>
  
  <!-- Trees -->
  <!-- Tree 1 -->
  <rect x="50" y="250" width="10" height="50" fill="#8B4513"/>
  <polygon points="30,250 80,250 55,200" fill="#228B22"/>
  <polygon points="35,220 75,220 55,180" fill="#228B22"/>
  <polygon points="40,190 70,190 55,160" fill="#228B22"/>
  
  <!-- Tree 2 -->
  <rect x="150" y="260" width="10" height="40" fill="#8B4513"/>
  <polygon points="130,260 180,260 155,220" fill="#228B22"/>
  <polygon points="135,230 175,230 155,190" fill="#228B22"/>
  <polygon points="140,200 170,200 155,170" fill="#228B22"/>
  
  <!-- Tree 3 -->
  <rect x="320" y="240" width="10" height="60" fill="#8B4513"/>
  <polygon points="300,240 350,240 325,190" fill="#228B22"/>
  <polygon points="305,210 345,210 325,160" fill="#228B22"/>
  <polygon points="310,180 340,180 325,130" fill="#228B22"/>
</svg>`,
  },
};

// Mock API functions
export const getModels = (arenaType: string): Promise<IModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(models[arenaType] || []);
    }, 1000);
  });
};

export const getPrompts = (arenaType: string, status: string = 'approved'): Promise<IPrompt[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredPrompts = (prompts[arenaType] || []).filter(
        (prompt) => prompt.status === status
      );
      resolve(filteredPrompts);
    }, 1000);
  });
};

export const getRandomPrompt = (arenaType: string): Promise<IPrompt | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredPrompts = (prompts[arenaType] || []).filter(
        (prompt) => prompt.status === 'approved'
      );
      if (filteredPrompts.length === 0) {
        resolve(null);
      } else {
        const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
        resolve(filteredPrompts[randomIndex]);
      }
    }, 1000);
  });
};

export const getRandomModels = (arenaType: string, count: number = 2): Promise<IModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arenaModels = models[arenaType] || [];
      if (arenaModels.length < count) {
        resolve(arenaModels);
      } else {
        // Shuffle array and take first 'count' elements
        const shuffled = [...arenaModels].sort(() => 0.5 - Math.random());
        resolve(shuffled.slice(0, count));
      }
    }, 1000);
  });
};

export const getLLMResponse = (modelName: string, prompt: string, arenaType: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Try to get a predefined response
      const arenaResponses = mockResponses[arenaType] || {};
      const response = arenaResponses[modelName];
      
      if (response) {
        resolve(response);
      } else {
        // Generate a generic response if no predefined response exists
        resolve(`This is a mock response from ${modelName} for the prompt: "${prompt}"`);
      }
    }, 1500);
  });
};

export const submitVote = (
  promptId: string,
  modelAId: string,
  modelBId: string,
  winner: string,
  arenaType: string
): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would update the database
      console.log(`Vote recorded: Prompt ${promptId}, Winner: ${winner}, Arena: ${arenaType}`);
      resolve({ success: true });
    }, 1000);
  });
};

export const submitPrompt = (
  text: string,
  arenaType: string,
  submittedBy?: string
): Promise<{ success: boolean; promptId: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would add to the database
      console.log(`Prompt submitted: "${text}" for arena ${arenaType}`);
      resolve({ success: true, promptId: `new-${Date.now()}` });
    }, 1000);
  });
};