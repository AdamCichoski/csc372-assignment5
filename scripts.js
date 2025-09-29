const userOptions = document.querySelectorAll(".option");

userOptions.forEach(item => {
    item.addEventListener("click", ()=> {
        console.log(`Option ${item.id} selected`);
    });
});


