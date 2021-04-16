const button = document.querySelector("input");

button.addEventListener("click", buttonHit);

function buttonHit(){


fetch("https://api.spoonacular.com/recipes/random?apiKey=f547939e371f49cdbb08bd54ce24fe23")
//https://api.spoonacular.com/recipes/findByIngredients?apiKey=f547939e371f49cdbb08bd54ce24fe23&ingredients=apples,+flour,+sugar&number=2 this is how a link would look like with other function. Enter the function first, then in this case &what ingredients
.then((response) => response.json())
.then ((data) =>{
console.log(data);


let newDiv = document.createElement("div");

let title = document.createElement("h2");

title.innerText = data.recipes[0].title;
console.log(data.recipes[0].title) 

newDiv.append(title);


for (let i = 0; data.recipes[0].extendedIngredients[i]; i++){
    let ingredients = document.createElement("p");
    console.log(data.recipes[0].extendedIngredients[i].name);
    ingredients.innerText = data.recipes[0].extendedIngredients[i].name;
    ingredients.classList.add("ingredients");

    /*let ingredientsImg = document.createElement("img");
    ingredientsImg.setAttribute("src", ingredientsImg.image)*/

    newDiv.append(ingredients);
    //newDiv.append(ingredientsImg);
}
for (let i = 0; data.recipes[0].analyzedInstructions[0].steps[i]; i++){
    let instructions = document.createElement("p");
    console.log(data.recipes[0].analyzedInstructions[0].steps[i].step);
    instructions.innerText = data.recipes[0].analyzedInstructions[0].steps[i].step;
    

    /*let ingredientsImg = document.createElement("img");
    ingredientsImg.setAttribute("src", ingredientsImg.image)*/

    newDiv.append(instructions);
    //newDiv.append(ingredientsImg);
}





document.querySelector("body").append(newDiv);




})
}