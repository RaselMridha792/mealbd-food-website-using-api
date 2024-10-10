const loadFood =async()=>{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const data = await response.json();
    const foods = data.categories;
    displayFoods(foods);
}

loadFood()

const displayFoods= (foods)=> {
    const card = document.getElementById('card-container');
    foods.forEach(food => {
        const  {idCategory, strCategory, strCategoryThumb, strCategoryDescription} = food;
        const description = strCategoryDescription.slice(0,120)
        const div = document.createElement('div');
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
                      <button onclick="openModal(${idCategory})" class="link text-yellow-400">View Details</button>
                    </div>
                </div>
        `;
        card.appendChild(div);
    });
}


// for showing modal 
const openModal=(id)=>{
    const getFoodWithId = async()=>{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=5277${id}`);
        const data = await response.json();
        console.log(data);
    }
    getFoodWithId()
    const modalbox = document.getElementById('modal-box');
    const div = document.createElement('div');
    div.innerHTML = `

    `;
    console.log(id);
    modalbox.appendChild(div);




    const modal = document.getElementById('foodModal');
    modal.showModal();


}

// {
//     "idCategory": "1",
//     "strCategory": "Beef",
//     "strCategoryThumb": "https://www.themealdb.com/images/category/beef.png",
//     "strCategoryDescription": "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
// }