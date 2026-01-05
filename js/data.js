const shotsData = [
  {
    id: "forehand",
    name: "Forehand",
    image: "assets/forehand.JPG",
    difficulty: "Beginner → Advanced",
    description:
      "The foundation of tennis — a powerful baseline weapon hit on the dominant side.",
    usedWhen: [
      "Baseline rallies",
      "Attacking short balls",
      "Passing shots"
    ],
    instructions: [
      "Ready Position: Knees bent, feet shoulder-width apart, racket in front",
      "Unit Turn: Rotate shoulders and hips as ball approaches",
      "Backswing: Take racket back early, racket head above wrist",
      "Step In: Transfer weight to front foot as you swing",
      "Contact Point: Meet ball slightly in front of body, waist height",
      "Follow Through: Finish over opposite shoulder, full extension",
      "Recovery: Return to ready position immediately"
    ],
    commonMistakes: [
      "Late preparation",
      "Hitting too close to the body",
      "Over-rotating shoulders",
      "Stopping the follow-through"
    ],
    coachingTips: [
      "Think low-to-high for topspin",
      "Watch the ball until contact",
      "Relax your grip for better control"
    ],
    drills: [
      "Cross-court forehand rally",
      "Inside-out forehand drill",
      "Forehand consistency drill (20 balls)"
    ],
    proTip:
      "Most professional points are built around a strong forehand — consistency matters more than power."
  },

  {
    id: "backhand",
    name: "Backhand",
    image: "assets/backhand.jpg",
    difficulty: "Intermediate",
    description:
      "A groundstroke hit from the non-dominant side, essential for rally stability.",
    usedWhen: [
      "Defensive rallies",
      "Cross-court exchanges",
      "Changing direction"
    ],
    instructions: [
      "Two-Handed Grip: Dominant hand continental, non-dominant hand eastern",
      "Early Preparation: Turn shoulders immediately",
      "Take Racket Back: Lead with racket head",
      "Step Across: Step into the shot with front foot",
      "Contact Point: Ball aligned with front hip",
      "Drive Through: Extend arms through contact zone",
      "Finish High: Racket finishes over shoulder"
    ],
    commonMistakes: [
      "Late contact",
      "Arms too close to body",
      "Poor footwork"
    ],
    coachingTips: [
      "Let the non-dominant hand do most of the work",
      "Stay low with knees",
      "Rotate shoulders, not just arms"
    ],
    drills: [
      "Cross-court backhand rally",
      "Backhand consistency drill",
      "Backhand down-the-line drill"
    ],
    proTip:
      "A reliable backhand wins matches by forcing errors, not by hitting winners."
  },

  {
    id: "serve",
    name: "Serve",
    image: "assets/serve.JPG",
    difficulty: "Advanced",
    description:
      "The most important shot in tennis — it starts every point.",
    usedWhen: [
      "Start of every point",
      "Applying pressure",
      "Gaining free points"
    ],
    instructions: [
      "Stance: Feet shoulder-width, front foot at 45° angle",
      "Ball Toss: Consistent, slightly in front",
      "Trophy Pose: Elbow bent, knees loaded",
      "Explosion: Push up with legs",
      "Contact: Full extension, wrist pronation",
      "Follow Through: Land inside the court",
      "Recovery: Prepare for return"
    ],
    commonMistakes: [
      "Inconsistent toss",
      "No leg drive",
      "Rushing the motion"
    ],
    coachingTips: [
      "Serve rhythm is more important than speed",
      "Use legs for power, not arm",
      "Aim high over the net"
    ],
    drills: [
      "Toss consistency drill",
      "Target serving drill",
      "Second serve spin drill"
    ],
    proTip:
      "A great serve is built on repetition, not strength."
  },

  {
    id: "volley",
    name: "Volley",
    image: "assets/voley.JPG",
    difficulty: "Intermediate",
    description:
      "An offensive shot hit before the ball bounces, usually at the net.",
    usedWhen: [
      "Net approaches",
      "Doubles play",
      "Finishing points"
    ],
    instructions: [
      "Ready Position: Racket up, knees bent",
      "Short Backswing: Punch motion",
      "Step Forward: Weight transfer",
      "Firm Wrist: No flipping",
      "Contact Point: In front of body",
      "Follow Through: Short and controlled",
      "Split Step: React to opponent"
    ],
    commonMistakes: [
      "Swinging too much",
      "Dropping the racket head",
      "Poor footwork"
    ],
    coachingTips: [
      "Think punch, not swing",
      "Keep racket head above wrist",
      "Move through the volley"
    ],
    drills: [
      "Rapid volley drill",
      "Approach + volley drill",
      "Reflex volley drill"
    ],
    proTip:
      "Great volleys are about positioning, not power."
  },

  {
    id: "slice",
    name: "Slice",
    image: "assets/slice.JPG",
    difficulty: "Intermediate → Advanced",
    description:
      "An underspin shot used for control, defense, and variation.",
    usedWhen: [
      "Defensive situations",
      "Low bouncing shots",
      "Changing rhythm"
    ],
    instructions: [
      "Continental grip",
      "High-to-low swing path",
      "Open racket face",
      "Contact in front",
      "Extend toward target",
      "Stay low with knees",
      "Quick recovery"
    ],
    commonMistakes: [
      "Chopping down too steeply",
      "Late contact",
      "Too much wrist movement"
    ],
    coachingTips: [
      "Glide under the ball smoothly",
      "Use slice to stay in points",
      "Keep the ball low"
    ],
    drills: [
      "Defensive slice rally",
      "Slice approach drill",
      "Backhand slice consistency drill"
    ],
    proTip:
      "Slice is a tactical weapon — use it to disrupt rhythm."
  }
];
  const benefitsData = {
    physical: [
      {
        title: "Full-body workout",
        desc: "Engages legs, core, arms, and shoulders simultaneously"
        
      },
      {
        title: "Cardiovascular health",
        desc: "Improves heart health and endurance through continuous movement"
      },
      {
        title: "Bone strength",
        desc: "Weight-bearing nature helps prevent osteoporosis"
      },
      {
        title: "Improved coordination",
        desc: "Develops hand-eye coordination and timing"
      },
      {
        title: "Enhanced flexibility",
        desc: "Constant stretching for shots increases range of motion"
      },
      {
        title: "Better balance and agility",
        desc: "Quick directional changes improve stability"
      },
      {
        title: "Muscle tone",
        desc: "Builds lean muscle without excessive bulk"
      },
      {
        title: "Weight management",
        desc: "Burns 400–600+ calories per hour"
      },
      {
        title: "Improved reflexes",
        desc: "Rapid response to ball trajectory sharpens reaction time"
      },
      {
        title: "Increased speed",
        desc: "Short sprints build explosive acceleration"
      }
    ],
  
    mental: [
      {
        title: "Stress relief",
        desc: "Physical activity releases endorphins and reduces cortisol"
      },
      {
        title: "Strategic thinking",
        desc: "Develops problem-solving and tactical planning skills"
      },
      {
        title: "Improved concentration",
        desc: "Requires constant focus on ball and opponent"
      },
      {
        title: "Mental toughness",
        desc: "Builds resilience through point-by-point competition"
      },
      {
        title: "Discipline",
        desc: "Regular practice develops consistency and work ethic"
      }
    ],
  
    social: [
      {
        title: "Social interaction",
        desc: "Opportunity to meet people through clubs and tournaments"
      },
      {
        title: "Lifetime sport",
        desc: "Can be played from childhood through senior years"
      },
      {
        title: "Sportsmanship",
        desc: "Teaches respect, fairness, and grace under pressure"
      },
      {
        title: "Time management",
        desc: "Balancing practice with other responsibilities"
      },
      {
        title: "Confidence building",
        desc: "Mastering skills and winning points boosts self-esteem"
      }
    ]
  };
  
  
  const aboutContent = {
    name: "Andreea",
    paragraph: "Hi, I’m Andreea. Tennis has shaped who I am — discipline, resilience, and confidence. I’ve spent years training, competing, and learning the details that make a difference on court. This platform combines my passion for tennis and technology to help others learn the game the right way, from fundamentals to advanced techniques.",
    images: [
      "assets/mystory1.JPG",
      "assets/mystory2.JPG"
    ]
  };
  
  
  