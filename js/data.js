const shotsData = [
  {
    id: "forehand",
    name: "Forehand",
    image: "assets/forehand.JPG",
    difficulty: "Beginner",
    description:
      "The forehand is a fundamental groundstroke hit on the dominant side of the body with the palm facing forward. It's typically the primary weapon for generating power and controlling baseline rallies.",
    usedWhen: [
      "Baseline rallies",
      "Attacking short balls",
      "Passing shots"
    ],
    instructions: [
      "Grip & Stance: Use semi-western grip, stand with feet shoulder-width apart, turn sideways to net with early shoulder rotation",
      "Backswing: Take racket back with non-dominant hand guiding, create a controlled loop, racket head above wrist in loaded position",
      "Weight Transfer: Shift weight to back foot, then push forward onto front foot as you swing, using legs to generate power",
      "Contact Point: Make contact slightly in front of lead hip at waist height, arm extended but not locked, firm wrist at impact",
      "Follow-Through: Swing upward for topspin, finish over opposite shoulder, complete full body rotation facing net",
      "Recovery: Immediately return to ready position, perform split step as opponent hits, prepare for next shot"
    ],
    commonMistakes: [
      "Late preparation",
      "Hitting too close to the body",
      "Over-rotating shoulders",
      "Contact point too close to body",
      "Straight-arm hitting with no knee bend",
      "Stopping the follow-through"
    ],
    coachingTips: [
      "Think low-to-high for topspin",
      "Watch the ball until contact",
      "Relax your grip for better control",
      "Straight-arm hitting with no knee bend",
      "Move feet to find optimal contact zone"

    ],
    drills: [
      "Cross-Court Consistency: Hit 20 consecutive forehands cross-court",
      "Inside-out forehand drill",
      "Shadow Swings: Practice form without ball",
      "Ball Machine Feeding: Adjustable feeds for repetition"
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
      "Stroke hit on the non-dominant side. Two main variants: one-handed (more reach, slice versatility) and two-handed (more power, stability).",
    usedWhen: [
      "Defensive rallies",
      "Cross-court exchanges",
      "Changing direction"
    ],
    instructions: [
      "Grip Setup: Dominant hand uses continental grip, non-dominant uses eastern forehand, hands close together without gap",
      "Preparation: Full shoulder turn until back faces net slightly, racket back with both hands, chin near front shoulder",
      "Swing Initiation: Start forward swing by pushing off back foot, rotate hips toward net, non-dominant arm provides early power",
      "Contact: Hit ball slightly in front of front hip, extend through contact with both arms, keep shoulders level",
      "Finish: Complete follow-through over opposite shoulder, both hands remain on grip, weight fully on front foot",
      "Reset: Release non-dominant hand, return to center, split step for next shot anticipation"
      
    ],
    commonMistakes: [
      "Two-handed: Arms too tight, no shoulder rotation",
      "One-handed: Late preparation, weak grip, dropping racket head",
      "Both: Stepping back on contact, incorrect spacing"
    ],
    coachingTips: [
      "Let the non-dominant hand do most of the work",
      "Stay low with knees",
      "Rotate shoulders, not just arms"
    ],
    drills: [
      "Down-the-Line Focus: Hit 10 consecutive backhands down the line",
      "Backhand consistency drill",
      "Backhand down-the-line drill",
      "Wall Practice: Use court wall for repetitive practice"
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
      "The shot that begins each point, combining power, spin, and placement. Four main types: flat, slice, kick/topspin, and American twist.",
    usedWhen: [
      "Start of every point",
      "Applying pressure",
      "Gaining free points"
    ],
    instructions: [
      "Stance & Grip: Continental grip essential, stand sideways with front foot at 45°, weight on back foot",
      "Toss & Trophy: Toss ball slightly forward into court, extend tossing arm fully, achieve trophy position with racket droppe",
      "Leg Drive & Swing: Bend knees deeply, explode upward, swing upward to contact at full extension",
      "Contact: Pronate forearm at contact, hit ball at highest reach point, different contact points for flat/slice/kick serves",
      "Finish & Landing: Follow through across body to opposite side, land inside court on front foot, maintain balance",
      "Follow Through: Land inside the court",
      "Recovery: Immediately get into ready position, anticipate return, move forward for potential advantage"
    ],
    commonMistakes: [
      "Inconsistent toss",
      "No leg drive",
      "Rushing the motion",
      "Jumping forward instead of up"
    ],
    coachingTips: [
      "Serve rhythm is more important than speed",
      "Use legs for power, not arm",
      "Aim high over the net",
      "Jumping forward instead of up"
    ],
    drills: [
      "Toss consistency drill",
      "Target serving drill",
      "Second serve spin drill",
      "Second Serve First: Always practice second serves more"
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
      "Offensive shot hit before the ball bounces, typically at net. Requires quick reflexes, compact swings, and good positioning.",
    usedWhen: [
      "Net approaches",
      "Doubles play",
      "Finishing points"
    ],
    instructions: [
      "Ready Position: Continental grip, racket in front with elbows away from body, on balls of feet",
      "Preparation & Step: Short backswing only, step forward with opposite foot as you volley, punch don't swing",
      "Contact: Meet ball well in front of body, firm wrist, slight downward angle for drive volleys",
      "Follow-Through: Short, controlled forward punch, minimal follow-through, stop racket after contact",
      "Footwork: Use small adjustment steps between volleys, stay light on feet, maintain athletic stance",
      "Recovery: Immediately return to ready position, racket back in front, prepare for next shot"
      
    ],
    commonMistakes: [
      "Swinging too much",
      "Dropping the racket head",
      "Poor footwork",
      "Wrong grip (forehand grip on volleys)",
      "Standing too close to net (no reaction time)"
    ],
    coachingTips: [
      "Think punch, not swing",
      "Keep racket head above wrist",
      "Move through the volley"
    ],
    drills: [
      "Rapid volley drill",
      "Approach + volley drill",
      "Reflex volley drill",
      "Volley-to-Volley: Both players at net, quick exchanges"
    ],
    proTip:
      "Great volleys are about positioning, not power."
  },

  {
    id: "slice",
    name: "Slice",
    image: "assets/slice.JPG",
    difficulty: " Advanced",
    description:
      "A defensive or change-of-pace shot with backspin, used to buy time, approach net, or change rhythm.",
    usedWhen: [
      "Defensive situations",
      "Low bouncing shots",
      "Changing rhythm"
    ],
    instructions: [
      "Grip & Preparation: Use continental grip, high backswing with racket above contact point, early shoulder turn",
      "Stance: Open or neutral stance, weight balanced or slightly on back foot, keep shoulders level",
      "Forward Motion: Swing high-to-low with slight forward push, keep racket face slightly open, firm wrist",
      "Contact: Make contact in front of body, brush down back of ball, maintain firm wrist through impact",
      "Follow-Through: Finish forward with arm extended toward target, slight upward lift after low point",
      "Recovery: Quick reset to ready position, prepare for opponent's response to low-bouncing ball"
      
    ],
    commonMistakes: [
      "Chopping down too steeply",
      "Late contact",
      "Too much wrist movement"
    ],
    coachingTips: [
      "Target Practice: Place targets for depth control",
      "Slice-Only Rallies: Maintain slice rally with partner",
      "Approach Shot Drill: Slice approach → finish at net",
      "Low Ball Challenge: Partner feeds low balls for slice returns"
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
      },
      {
        title: "Focus under pressure",
        desc: "Improves ability to perform in stressful situations"
      },
      {
        title: "Decision making",
        desc: "Trains fast and accurate choices during rallies"
      },
      {
        title: "Emotional control",
        desc: "Helps manage frustration and stay calm under pressure"
      },
      {
        title: "Confidence building",
        desc: "Success on court improves self-belief and mindset"
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
      },
      {
        title: "Teamwork skills",
        desc: "Doubles play improves communication and cooperation"
      },
      {
        title: "Leadership development",
        desc: "Competitive play builds responsibility and initiative"
      },
      {
        title: "Goal setting",
        desc: "Encourages setting and achieving personal objectives"
      },
      {
        title: "Healthy lifestyle",
        desc: "Promotes long-term active and disciplined living"
      },
      {
        title: "Global community",
        desc: "Connects you with players and cultures worldwide"
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

  const quizData = [
    {
      question: "Which shot starts the point?",
      options: ["Forehand", "Serve", "Volley", "Slice"],
      answer: "Serve"
    },
    {
      question: "Which shot is usually hit at the net?",
      options: ["Backhand", "Slice", "Volley", "Serve"],
      answer: "Volley"
    },
    {
      question: "Which shot uses heavy topspin most often?",
      options: ["Forehand", "Serve", "Slice", "Volley"],
      answer: "Forehand"
    },
    {
      question: "Which shot uses underspin?",
      options: ["Slice", "Forehand", "Serve", "Backhand"],
      answer: "Slice"
    },
    {
      question: "Which grip is most common for a forehand?",
      options: ["Eastern", "Continental", "Two-handed", "Panhandle"],
      answer: "Eastern"
    },
    {
      question: "What is the 'trophy position' part of?",
      options: ["Backhand", "Volley", "Serve", "Slice"],
      answer: "Serve"
    },
    {
      question: "Which shot is best for approaching the net?",
      options: ["Serve", "Slice", "Volley", "Forehand"],
      answer: "Slice"
    },
    {
      question: "Which shot should have the shortest swing?",
      options: ["Forehand", "Backhand", "Serve", "Volley"],
      answer: "Volley"
    },
    {
      question: "What helps generate power on the serve?",
      options: ["Only arm", "Leg drive", "Wrist only", "Grip strength"],
      answer: "Leg drive"
    },
    {
      question: "Where should contact point be for most groundstrokes?",
      options: ["Behind body", "Above head", "In front of body", "Next to hip"],
      answer: "In front of body"
    }
  ];
  
  const roadmapData = [
    {
      title: "Beginner",
      skills: ["forehand"]
    },
    {
      title: "Intermediate",
      skills: [ "backhand","volley"]
    },
    {
      title: "Advanced",
      skills: ["serve", "slice"]
    }
  ];
  
  
  
  