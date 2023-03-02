let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
  if (adding == false) {
    adding = true;
    target.appendChild(create_item());
  } else {
    error.innerHTML = message;
  }
});

const create_item = () => {
  //use the createElement() function to create a DOM element of type div
  const item=  document.createElement("div");
  //use the add method of the classList object to add the existing CSS class of item to the item element
  item.classList.add("item");
  //give the item an id of item- plus the current value of order
  //item.setAttribute("id","item-"+order);
  item.id="item-"+order;
  //make the item draggable
  item.draggable=true;
  //add an event listener that listens for the dragstart event to item
//When creating the event listener, pass an arrow function as the handler.
//The arrow function should accept a single parameter of event,
//and it should return a call to the setData() method.
//The setData() method is part of the DataTransfer object,
//which needs to be accessed through the event
  item.addEventListener('dragstart', event=>
    event.dataTransfer.setData("text", event.target.id)
  );

  //add an event listener that listens for the dragend event to item
  //it should return a call to the clearData() method.
  //The clearData() method is part of the DataTransfer object
  //which needs to be accessed through the event
  item.addEventListener('dragend', event=>
    event.dataTransfer.clearData()
  );

  //use the createElement() method to create a DOM element of type input
  const input=document.createElement("input");
  //Append this new input element to the item element with the correct DOM method.
  //parent.appendChild(child);
  item.appendChild(input);

  //use the createElement() method to create a DOM element of type button
  const save_btn=document.createElement("button");
  //Change the innerHTML property of the save_btn element to Save
  save_btn.innerHTML='Save';

//register an event listener for save_btn that listens for a click event.
//Pass an arrow function as the handler. The arrow function does not need to accept any parameters.
  save_btn.addEventListener('click',()=>{
    //set the HTML of the error element to an empty string
    error.innerHTML='';
    //test whether the value of input is not equal to an empty string
    if(input.value!==''){
      //add 1 to order and reassign the value back to order
      order+=1;
      //change the HTML of the item element to the value of the input
      item.innerHTML=input.value;
      adding=false;
    }else{
      //set the HTML of the error element to the message string
      error.innerHTML=message;
    };
  });

  //save_btn are complete, append it to the item element
  item.appendChild(save_btn);

  return item;

};

document.querySelectorAll('.drop').forEach(element => {
  //add an event listener that listens for the drop event to element
  element.addEventListener('drop',event=>{
    //prevent the default action of event
    event.preventDefault();
    //get the data in 'text' with the getData() method
    const id=event.dataTransfer.getData("text");

    //As the last line of the drop event handler,
    //append the element that has an id of id to event.target.
    //Hint: use the getElementById() method of document
    event.target.appendChild(document.getElementById(id));
  });

  //add an event listener that listens for the dragover event to element.
  //When creating the event listener, pass an arrow function as the handler.
  //The arrow function should accept a single parameter of event
  //and prevent the default action of event
  element.addEventListener('dragover',event=>
    //prevent the default action of event
    event.preventDefault()
  );

});
