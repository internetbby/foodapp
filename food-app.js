const button = document.querySelector("input#submit");
const APIKey = "f547939e371f49cdbb08bd54ce24fe23";

const deleteButton = document.querySelector("input#delete");

let buttonHitCounter = 0 ; //keeps track on how many times button has been hit

button.addEventListener("click", buttonHit);
deleteButton.addEventListener("click", deleteButtonHit);

function buttonHit() {
  let diet = "";
  let checkBoxes = document.querySelectorAll("input[type='checkbox']");
  checkBoxes.forEach((checkbox) => {
    if (checkbox.checked == true) {
      diet += `${checkbox.id},`;
    }
  }); // this is responsible for adding the requirements for the meal

  let typedIngredients = document.getElementById("includedIngredients").value;
  let forming = typedIngredients.split(" ").join(",");
  console.log(forming);

  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKey}&diet=${diet}&ignorePantry=true&includeIngredients=${forming}&addRecipeInformation=true&`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let newDiv = document.createElement("div");
      newDiv.classList.add("newDiv")
      
      let title = document.createElement("h2");
      title.classList.add("title")

      if (data.results.offset == 0 ){
        title.innerText = "no recipe found";
      }

      title.innerText = data.results[buttonHitCounter].title;
      console.log(data.results[buttonHitCounter].title);

     

      newDiv.append(title); // gives title

      let ingredients = document.createElement("p");
      for (
        n = 0; n < data.results[buttonHitCounter].analyzedInstructions[0].steps.length; n++) {
        for (i = 0;i <data.results[buttonHitCounter].analyzedInstructions[0].steps[n].ingredients.length; i++) {
          ingredients.textContent +=" " +data.results[buttonHitCounter].analyzedInstructions[0].steps[n].ingredients[i].name;
          ingredients.classList.add("ingredients");
        }
      }

      let instructions = document.createElement("p");

      for ( i = 0; i < data.results[buttonHitCounter].analyzedInstructions[0].steps.length; i++) {
        instructions.textContent += data.results[buttonHitCounter].analyzedInstructions[0].steps[i].step;
      }

      newDiv.append(ingredients);
      newDiv.append(instructions);

      document.querySelector("body").append(newDiv);

      buttonHitCounter++
    });
}

function deleteButtonHit(){
  let deletedDiv = document.getElementsByClassName("newDiv");
  document.getElementsByTagName.removeChild(newDiv);

}
