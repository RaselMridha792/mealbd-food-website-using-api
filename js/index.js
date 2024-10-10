const loadFood = async () => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const data = await response.json();
  const foods = data.categories;
  displayFoods(foods);
};

loadFood();

const displayFoods = (foods) => {
  const card = document.getElementById("card-container");
  card.innerHTML = "";
  foods.forEach((food) => {
    const {
      strCategory,
      strCategoryThumb,
      strCategoryDescription,
    } = food;
    const description = strCategoryDescription.slice(0, 120);

    const div = document.createElement("div");
    div.innerHTML = `
                <div class="card card-side bg-base-100 shadow-xl">
                    <figure>
                      <img class="bg-cover w-full"
                        src="${strCategoryThumb}"
                        alt="food" />
                    </figure>
                    <div class="card-body items-start">
                      <h2 class="card-title pb-5">${strCategory}</h2>
                      <p class="text-gray-400">${description}....</p>
                      <button onclick="openCatagory('${strCategory}')" class="link text-yellow-400">View Details</button>
                    </div>
                </div>
        `;
    card.appendChild(div);
  });
};

// for showing modal
const openCatagory = (category) => {
  const getFoodWithId = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    const foodItems = data.meals;
    displayCataryData(foodItems);
  };
  getFoodWithId();

  const displayCataryData = (id) => {
    const cardData = document.getElementById("card-parent");
    const mainCard = document.getElementById('card-container')
    mainCard.innerHTML = "";
    id.forEach((items) => {
      const {strMeal, strMealThumb, idMeal} = items;
      const div = document.createElement("div");
      div.innerHTML = `
                <div class="card card-side bg-base-100 shadow-xl flex-col">
                    <div>
                      <img class="w-auto rounded-xl"
                        src="${strMealThumb}"
                        alt="food" />
                    </div>
                    <div class="card-body items-start">
                      <h2 class="text-2xl card-title pb-5">${strMeal.slice(0,16)} ...</h2>
                      <p class="text-gray-400"></p>
                      <button onclick="openModal('${idMeal}')" class="btn btn-warning">View Details</button>
                    </div>
                </div>
        `;
      cardData.appendChild(div);
    });
  };
};

const openModal=(idMeal)=>{
    const getFoodDetails = async(id) =>{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const meals = data.meals;
        showFoodDetails(meals);
    }
    getFoodDetails(idMeal);


    const showFoodDetails = (meals) =>{
        const meal = meals[0];
        console.log(meal);
        const {strMeal, strCategory, strMealThumb, strArea, strInstructions, strYoutube} = meal
        const strInstruction = strInstructions.slice(0, 140);
        const modalbox = document.getElementById('modal-box');
        modalbox.innerHTML = "";
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <div><h1 class="text-2xl font-bold py-3">${strMeal}</h1></div>
                <hr/ class="pb-5">
                <div class="w-full"><img class="w-8/12 mx-auto rounded-xl" src="${strMealThumb}"/></div>
                <div class="flex flex-col gap-3 py-5 px-5">
                    <p class="text-gray-500"><span class="font-bold text-black">Category :</span>${strCategory?strCategory:"Not Available"}</p>
                    <p class="text-gray-500"><span class="font-bold text-black">Area :</span>${strArea?strArea:"Not Available"}</p>
                    <p class="text-gray-500"><span class="font-bold text-black">Instructions :</span>${strInstruction}
                        <button class="link text-blue-600">...Learn More
                    </button></p>
                    <p class="text-gray-500"><span class="font-bold text-black">YouTube :</span>${strYoutube?strYoutube:"Not Available"}</p>
                    <div class="flex justify-end">
                        <div class="modal-action">
                            <form method="dialog">
                                <button class="btn btn-error">Close</button>
                            </form>
                         </div>
                    </div>
                </div>
            </div>    
        `;
        modalbox.appendChild(div);
    }


    foodModal.showModal()
}


loadPrevius =() =>{
    const cardbody = document.getElementById('card-parent');
    cardbody.innerHTML = "";
    loadFood();
}

// {
//     "idMeal": "52874",
//     "strMeal": "Beef and Mustard Pie",
//     "strDrinkAlternate": null,
//     "strCategory": "Beef",
//     "strArea": "British",
//     "strInstructions": "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.",
//     "strMealThumb": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
//     "strTags": "Meat,Pie",
//     "strYoutube": "https://www.youtube.com/watch?v=nMyBC9staMU",
//     "strIngredient1": "Beef",
//     "strIngredient2": "Plain Flour",
//     "strIngredient3": "Rapeseed Oil",
//     "strIngredient4": "Red Wine",
//     "strIngredient5": "Beef Stock",
//     "strIngredient6": "Onion",
//     "strIngredient7": "Carrots",
//     "strIngredient8": "Thyme",
//     "strIngredient9": "Mustard",
//     "strIngredient10": "Egg Yolks",
//     "strIngredient11": "Puff Pastry",
//     "strIngredient12": "Green Beans",
//     "strIngredient13": "Butter",
//     "strIngredient14": "Salt",
//     "strIngredient15": "Pepper",
//     "strIngredient16": "",
//     "strIngredient17": "",
//     "strIngredient18": "",
//     "strIngredient19": "",
//     "strIngredient20": "",
//     "strMeasure1": "1kg",
//     "strMeasure2": "2 tbs",
//     "strMeasure3": "2 tbs",
//     "strMeasure4": "200ml",
//     "strMeasure5": "400ml",
//     "strMeasure6": "1 finely sliced",
//     "strMeasure7": "2 chopped",
//     "strMeasure8": "3 sprigs",
//     "strMeasure9": "2 tbs",
//     "strMeasure10": "2 free-range",
//     "strMeasure11": "400g",
//     "strMeasure12": "300g",
//     "strMeasure13": "25g",
//     "strMeasure14": "pinch",
//     "strMeasure15": "pinch",
//     "strMeasure16": "",
//     "strMeasure17": "",
//     "strMeasure18": "",
//     "strMeasure19": "",
//     "strMeasure20": "",
//     "strSource": "https://www.bbc.co.uk/food/recipes/beef_and_mustard_pie_58002",
//     "strImageSource": null,
//     "strCreativeCommonsConfirmed": null,
//     "dateModified": null
// }