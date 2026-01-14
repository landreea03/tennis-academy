const achievementsList = [
    {
      id: "first_shot",
      title: "First Step",
      desc: "Learn your first shot",
      check: user => Object.values(user.progress).some(v => v === true)
    },
    {
      id: "first_favorite",
      title: "Explorer",
      desc: "Favorite your first shot",
      check: user => Object.values(user.favorites).some(v => v === true)
    },
    {
      id: "halfway",
      title: "Halfway There",
      desc: "Learn 50% of shots",
      check: user => {
        const learned = Object.values(user.progress).filter(v => v).length;
        return learned >= shotsData.length / 2;
      }
    },
    {
      id: "all_shots",
      title: "Tennis Pro",
      desc: "Learn all shots",
      check: user => {
        const learned = Object.values(user.progress).filter(v => v).length;
        return learned === shotsData.length;
      }
    },
    {
      id: "first_quiz",
      title: "Quiz Beginner",
      desc: "Complete your first quiz",
      check: user => user.quizScores.length >= 1
    },
    {
      id: "perfect_score",
      title: "Perfect Score",
      desc: "Score 100% on a quiz",
      check: user => user.quizScores.some(q => q.score === q.total)
    }
  ];
  