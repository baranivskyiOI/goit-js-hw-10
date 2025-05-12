const formData = {
    email: "",
    message: "",
};

const form = document.querySelector(".feedback-form");
const dataKey = "FORM_DATA" 

try {

    const saveData = JSON.parse(localStorage.getItem(dataKey)) || {};

    const { email: localEmail = "", message: localMessage = "" } = saveData;
    
    form.elements.email.value = localEmail;
    form.elements.message.value = localMessage;

    formData.email = localEmail;
    formData.message = localMessage;
    
} catch (error) {
    console.log(error);
}


form.addEventListener("input", (e) => {
    
    formData.email = form.elements.email.value;
    formData.message = form.elements.message.value;
    
    
    const stringifyFormData = JSON.stringify(formData)
    
    localStorage.setItem(dataKey, stringifyFormData);    
    
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (form.elements.email.value === "" || form.elements.message.value === "") {
        alert("Please fill in all fields");
        return;
    }

    console.log(formData);
        
    formData.email = "";
    formData.message = ""; 

    localStorage.removeItem(dataKey);

    e.target.reset();
});
