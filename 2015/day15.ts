import { defaultDict } from "../util/utils";

type IngredientProperty = Record<string, number>;

type Ingredient = {
  name: string;
  properties: IngredientProperty;
};

type Ingredients = Record<string, Ingredient>;

const getRecipeScore = (
  recipe: string[],
  ingredients: Ingredients
): [number, number] => {
  const amounts = defaultDict(0);

  for (const ing of recipe) {
    amounts[ing]++;
  }

  let finalScore = 1;
  let caloriesScore = 0;

  for (const prop in ingredients.Butterscotch) {
    if (prop === "calories") {
      for (const ing in amounts) {
        caloriesScore += amounts[ing] * ingredients[ing][prop];
      }
      continue;
    }

    let propScore = 0;

    for (const ing in amounts) {
      propScore += amounts[ing] * ingredients[ing][prop];
    }

    if (propScore <= 0) return [0, 0];

    finalScore *= propScore;
  }

  return [finalScore, caloriesScore];
};

const getRecipeScores = (
  positions,
  start,
  ingredients,
  ingredientNames,
  scores = [],
  recipe = []
) => {
  if (positions === 100) {
    const [recipeScore, caloriesScore] = getRecipeScore(recipe, ingredients);
    if (recipeScore > 0) scores.push([recipeScore, caloriesScore]);
    return scores;
  }

  for (let i = start; i < ingredientNames.length; ++i) {
    recipe[positions] = ingredientNames[i];
    getRecipeScores(
      positions + 1,
      i,
      ingredients,
      ingredientNames,
      scores,
      recipe
    );
  }

  return scores;
};

const parseIngredients = (input) => {
  const ingredientNames = [];
  const ingredients = input
    .split("\n")
    .reduce((ingredients: Ingredients, ing): Ingredients => {
      const [name, propertiesString] = ing.split(": ");
      ingredientNames.push(name);
      ingredients[name] = propertiesString.split(", ").reduce((props, p) => {
        const [propName, propAmount] = p.split(" ");

        props[propName] = Number(propAmount);

        return props;
      }, {});

      return ingredients;
    }, {});
  return [ingredients, ingredientNames];
};

export const getMaxCookieScore = (input): Ingredient[] => {
  const [ingredients, ingredientNames] = parseIngredients(input);

  const scores = getRecipeScores(0, 0, ingredients, ingredientNames);

  return scores.reduce((m, [n]) => (n > m ? n : m), 0);
};

export const getMaxCookieScoreSkinny = (input): Ingredient[] => {
  const [ingredients, ingredientNames] = parseIngredients(input);

  const scores = getRecipeScores(0, 0, ingredients, ingredientNames);

  return scores
    .filter(([, callories]) => callories === 500)
    .reduce((m, [n]) => (n > m ? n : m), 0);
};
