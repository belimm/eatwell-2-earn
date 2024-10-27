function calculateNutriScore(nutrients) {
   const {
      ENERC_KCAL: calories,
      FAT: fat,
      FASAT: satFat,
      SUGAR: sugar,
      NA: sodium,
      FIBTG: fiber,
      PROCNT: protein,
   } = nutrients;

   // Calculate negative points
   let negativePoints =
      (calories / 100) * 1 +
      (satFat / 1) * 2 +
      (sugar / 1) * 1.5 +
      (sodium / 100) * 1;

   // Calculate positive points
   let positivePoints = (fiber / 1) * 1 + (protein / 1) * 1;

   const nutriScore = negativePoints - positivePoints;

   // Map the Nutri-Score value to a grade (A-E)
   let grade;
   if (nutriScore <= 0) grade = 'A';
   else if (nutriScore <= 3) grade = 'B';
   else if (nutriScore <= 10) grade = 'C';
   else if (nutriScore <= 18) grade = 'D';
   else grade = 'E';

   return { nutriScore, grade };
}

module.exports = calculateNutriScore;
