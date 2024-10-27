const visionClient = require('../config/visionClient');
const axios = require('axios');
const calculateNutriScore = require('../utils/calculateNutriScore');

const {
   NON_FOOD_KEYWORDS,
   NON_FOOD_KEYWORDS_DIRECTLY,
   FOOD_GRADE_MAP,
} = require('../constants/food');

// function isFoodItem(label) {
//    return FOOD_KEYWORDS.some((keyword) =>
//       label.toLowerCase().includes(keyword)
//    );
// }

function isNonFoodItem(label) {
   const labelAsLowerCase = label.toLowerCase();

   console.log('labelAsLower', labelAsLowerCase);
   if (NON_FOOD_KEYWORDS_DIRECTLY.includes(labelAsLowerCase)) return true;

   return NON_FOOD_KEYWORDS.some((nonFoodKeyword) =>
      labelAsLowerCase.includes(nonFoodKeyword.toLowerCase())
   );
}

exports.analyzeImage = async (req, res) => {
   try {
      // Ensure that an image file is provided
      if (!req.file) {
         return res.status(400).json({ error: 'No image file provided' });
      }

      // Use Google Vision API to analyze the image from the buffer (req.file.buffer)
      const [result] = await visionClient.labelDetection({
         image: { content: req.file.buffer },
      });

      console.log('result', result);

      const labels = result.labelAnnotations;

      // Filter food-related labels
      const foodLabels = labels
         .filter((label) => !isNonFoodItem(label.description))
         .map((label) => label.description);

      let numberOfItems = 0;

      let foodLabelsNew = [];

      const totalNutriScore = foodLabels.reduce((sum, item) => {
         const matchedFood = FOOD_GRADE_MAP.find(
            (eachFoodGradeItem) =>
               eachFoodGradeItem.foodName.toLowerCase() === item.toLowerCase()
         );

         // Check if a match was found
         if (matchedFood) {
            console.log('Matched food item:', matchedFood);
            numberOfItems++;
            foodLabelsNew.push(matchedFood.foodName);
            return sum + matchedFood.nutriScore;
         } else {
            console.log(`No match found for item: ${item}`);
            return sum; // Return the current sum without adding undefined
         }
      }, 0);

      const averageNutriScore =
         numberOfItems > 0 ? totalNutriScore / numberOfItems : 0;
      console.log('Average Nutri-Score:', averageNutriScore);

      res.json({
         foodLabelsFiltered: foodLabelsNew,
         // foodLabelsDirectlyFromGoogle: labels.map(
         //    (eachLabel) => eachLabel.description
         // ),
         //totalNutriScore: totalNutriScore,
         //numberOfItems: numberOfItems,
         nutriScore: averageNutriScore.toFixed(2),
      });
   } catch (error) {
      console.error('Error analyzing image:', error);
      res.status(500).json({ error: 'Error analyzing image' });
   }
};
