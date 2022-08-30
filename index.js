const employeeNode = document.querySelector("#add-employee");
const empContainer = document.querySelector(".employee-container");
const empForm = document.querySelector(".employee-form");
const empFirstName = document.querySelector("#firstName");
const empLastName = document.querySelector("#lastName");
const empPrefferedName = document.querySelector("#prefferedName");
const empEmail = document.querySelector("#email");
const empJobTitle = document.querySelector("#jobTitle");
const empOffice = document.querySelector("#office");
const empPhoneNumber = document.querySelector("#phoneNumber");
const empSkypeId = document.querySelector("#skypeid");
const empDepartement = document.querySelector("#Departement");
const submitBtn = document.querySelector('#submitBtn');
const closeBtn = document.querySelector('#closeBtn');
const searchNode = document.querySelector("#search-keyword");
const filterNode = document.querySelector("#filters-name");
const clearBtn = document.querySelector('.clear-btn');
const editBtn = document.querySelectorAll('.bi-pencil');
for(let x of editBtn)
{
    x.addEventListener('click',function(event){
        editFunction(event);
    })
}
const countNode = new Map();

const navIT = document.querySelector('#it');
const navHumanResource = document.querySelector('#humanResource');
const navMD = document.querySelector('#md');
const navSales = document.querySelector('#sales');
const navSeattle = document.querySelector('#seattle');
const navIndia = document.querySelector('#india');
const navSharePointHead = document.querySelector('#sharepointPractice');
const navNetDevelopmentHead = document.querySelector('#netDevelpment');
const navRecruitingExpert = document.querySelector('#recruitingExpert');
const navBiDeveloper = document.querySelector('#biDeveloper');
const navBusinessAnalyst = document.querySelector('#businessAnalyst');
let isEdit = false;
let currentEvent;
onReload();
function onReload()
{
    countNodeFunction();
    empContainer.innerHTML="";
    const data = JSON.parse(localStorage.getItem('data'));
    if(data)
    {
    for(let x of data)
    {
        employeeDetailsTemplate(x.preferredName,x.jobTitle,x.departement);
        initializeCountNode(x.departement.toLowerCase());
        initializeCountNode(x.office.toLowerCase());
        initializeCountNode(x.jobTitle.toLowerCase());
    }
}
    sideBarNodeCounts();
}
clearBtn.addEventListener('click',(e)=>{
    searchNode.value="";
    onReload();
    
})
submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    // console.log(isEdit);
    if(validations())
    {
    if(!isEdit)
    {
        const employee = createNewEmployee();
        const empData = JSON.parse(localStorage.getItem('data'));
        var employeeDetails = [];
        if(empData)
        {       
        for(let x of empData)
        {
            employeeDetails.push(x);
        }
        }
        employeeDetails.push(employee);
        localStorage.setItem('data',JSON.stringify(employeeDetails));
    }
    else
    {
        var empData = JSON.parse(localStorage.getItem('data'));
        var empName;
        if(currentEvent.target.children.length === 0)
         empName = currentEvent.target.parentNode.children[0].innerText;
         else
         empName = currentEvent.target.children[0].innerText;
        empData.map((x)=>{
            if(x.preferredName===empName)
            {
                x.firstName=empFirstName.value;
                x.preferredName = empFirstName.value+' '+empLastName.value;
                x.jobTitle = empJobTitle.value;
                x.office = empOffice.value;
                x.lastName = empLastName.value;
                x.departement = empDepartement.value;
                x.email = empEmail.value;
                x.skypeId = empSkypeId.value;
                x.phoneNumber = empPhoneNumber.value;
                console.log(x);
            }
            
        })
        isEdit=false;
        localStorage.setItem('data',JSON.stringify(empData));
        // console.log(empData);
    }
    clearInputs(); // to clear all the input field after submission
    empFormDisplay();
    onReload();
 } // to display the fresh list of employee on the screen
})

closeBtn.addEventListener('click',function(){
    empFormDisplay();
    isEdit=false;
})
employeeNode.addEventListener('click',function(){
    empFormDisplay();
})
searchNode.addEventListener('keyup',function(){
    searchEmployee(searchNode.value,filterNode.value);
})
function clearInputs()
{
    empFirstName.value="";
    empLastName.value="";
    empDepartement.value="";
    empEmail.value="";
    empPrefferedName.value="";
    empSkypeId.value="";
    empOffice.value="";
    empPhoneNumber.value="";
    empJobTitle.value="";
}
function empFormDisplay(firstName='',lastName='',email='',jobTitle='',office='',phoneNumber='',skypeId='',departement='')
{
    if(empForm.style.display==="none")
        empForm.style.display="block";
    else
        empForm.style.display="none";
    empFirstName.value=firstName;
    empLastName.value=lastName;
    empDepartement.value=departement;
    empEmail.value=email;
    // empPrefferedName.value=preferredName;
    empSkypeId.value=skypeId;
    empOffice.value=office;
    empPhoneNumber.value=phoneNumber;
    empJobTitle.value=jobTitle;
}
function createNewEmployee()
{
    const employee = new Object;
    employee.firstName = empFirstName.value;
    employee.lastName = empLastName.value;
    employee.preferredName = empFirstName.value+" "+empLastName.value;
    employee.email = empEmail.value;
    employee.jobTitle = empJobTitle.value;
    employee.office = empOffice.value;
    employee.phoneNumber = empPhoneNumber.value;
    employee.skypeId = empSkypeId.value;
    employee.departement = empDepartement.value;
    return employee;
}
// createEmployeeTemplate();
function createEmployeeTemplate()
{
    const empData = localStorage.getItem("data");
}
function employeeDetailsTemplate(firstname,desg,dept)
{

    const div = document.createElement('div');
    const name = document.createElement('p');
    const desigination = document.createElement('p');
    const departement = document.createElement('p');
    const footerIcons = document.createElement('div');
    const icon1 = document.createElement('span');
    const icon2 = document.createElement('span');
    const icon3 = document.createElement('span');
    const icon4 = document.createElement('span');
    const icon5 = document.createElement('span');


    name.setAttribute('id','name');
    departement.setAttribute("class",'info');
    desigination.setAttribute("class",'info');
    div.setAttribute('class','employee-info-container');
    footerIcons.setAttribute('class',"footer-icons")
    icon1.setAttribute('class','bi-telephone-fill');
    icon2.setAttribute('class','bi-envelope-fill');
    icon3.setAttribute('class','bi-chat-fill');
    icon4.setAttribute('class','bi-star-fill');
    icon5.setAttribute('class','bi-heart-fill');
    div.addEventListener('click',(e)=>{
        editFormField(e);
    })

    name.innerText = firstname;
    desigination.innerText = desg;
    departement.innerText = dept;

    footerIcons.appendChild(icon1);
    footerIcons.appendChild(icon2);
    footerIcons.appendChild(icon3);
    footerIcons.appendChild(icon4);
    footerIcons.appendChild(icon5);
    div.appendChild(name);
    div.appendChild(desigination);
    div.appendChild(departement);
    div.appendChild(footerIcons);

    empContainer.appendChild(div);

}
function searchEmployee(content,basedOn="preferredName")
{
    const empData = localStorage.getItem('data');
    const empParsedData = JSON.parse(empData);
    const filterList = [];
    for(let x of empParsedData)
    {
        if(x[basedOn].toLowerCase().indexOf(content.toLowerCase())>-1)
            filterList.push(x);
    }
    pushFilterEmployee(filterList);
}

function pushFilterEmployee(filterList)
{
    empContainer.innerHTML="";
    for(let x of filterList)
    {
        employeeDetailsTemplate(x.firstName,x.desigination,x.departement);
    }
}
function countNodeFunction()
{
    countNode.set('it',0);
    countNode.set('human resources',0);
    countNode.set('md',0);
    countNode.set('sales',0);
    countNode.set('seattle',0);
    countNode.set('india',0);
    countNode.set('sharepoint practice head',0);
    countNode.set('.net development lead',0);
    countNode.set('recruititng expert',0);
    countNode.set('bi developer',0);
    countNode.set('business analyst',0);

}
function initializeCountNode(field)
{
    countNode.set(field,countNode.get(field)+1);
}
function sideBarNodeCounts()
{
    navIT.innerText='('+countNode.get('it')+')';
    navHumanResource.innerText = '('+countNode.get('human resources') +')';
    navMD.innerText = '('+countNode.get('md')+')';
    navSales.innerText = '('+countNode.get('sales')+')';
    navSeattle.innerText = '('+countNode.get('seattle')+')';
    navIndia.innerText = '('+countNode.get('india')+')';
    navSharePointHead.innerText = '('+countNode.get('sharepoint practice head')+')';
    navNetDevelopmentHead.innerText = '('+countNode.get('.net development lead')+')';
    navRecruitingExpert.innerText = '('+countNode.get('recruititng expert')+')';
    navBiDeveloper.innerText = '('+countNode.get('bi developer')+')';
    navBusinessAnalyst.innerText = '('+countNode.get('business analyst')+')';
}
function searchEmployeeByFirstName(A='A')
{
    // make a function to get item from local storage
    var empData = JSON.parse(localStorage.getItem('data'));
    let filterList = empData.filter((x)=>{
        if(x.firstName[0]===A)
            return true;
    })
    pushFilterEmployee(filterList);
}
function filterByFirstName()
{
    var firstChar = event.currentTarget.innerText;
    searchEmployeeByFirstName(firstChar);

}
function editFormField(e)
{
    empFormDisplay();
    var empData = JSON.parse(localStorage.getItem('data'));
    var empName = e.currentTarget.children[0].innerText;
    empData.forEach(e => {
        if(e.preferredName === empName)
        {
            empFirstName.value = e.firstName;
            empLastName.value = e.lastName;
            empDepartement.value = e.departement;
            empOffice.value = e.office;
            empJobTitle.value = e.jobTitle;
            empPhoneNumber.value = e.phoneNumber;
            empPrefferedName.value = e.preferredName;
            empSkypeId.value = e.skypeId;
            empDepartement.value = e.departement;
            empEmail.value = e.email;

            empFirstName.disabled = true;
            empLastName.disabled = true;
            empDepartement.disabled = true;
            empOffice.disabled = true;
            empJobTitle.disabled = true;
            empPhoneNumber.disabled = true;
            empPrefferedName.disabled = true;
            empSkypeId.disabled = true;
            empDepartement.disabled = true;
            empEmail.disabled = true;
            

        }
    });
        
    currentEvent = e;
    isEdit = true;
}
function editFunction(e)
{
    
    e.target.parentNode.children[1].disabled=false;
    e.target.parentNode.children[1].focus();
}
function validations()
{
    if(empFirstName.value==='')
    {
    alert("Enter First Name");
    empFirstName.focus();
    }
    else if(empLastName.value==='')
    {
    alert("Enter LastName");
    empLastName.focus();
    }
    // else if(empPrefferedName.value === '')
    // {
    //     alert("Enter Preferred Name");
    //     empPrefferedName.focus();
    // }
    else if(empEmail.value ==='')
    {
    alert("Enter Email");
    empEmail.focus();
    }
    else if(empJobTitle.value ==='')
    {
    alert("Enter JobTitle");
    empJobTitle.focus();
    }
    else if(empOffice.value ==='')
    {
    alert("Enter office");
    empOffice.focus();
    }
    else if(empPhoneNumber.value ===''||empPhoneNumber.value.length<10)
    {
    alert("Enter Valid PhoneNumber");
    empPhoneNumber.focus();
    }
    else if(empSkypeId.value ==='')
    {
    alert("Enter SkyapeId");
    empSkypeId.focus();
    }
    else if(empDepartement.value === '')
    {
    alert("Enter Valid Departement");
    empDepartement.focus();

    }
    else
    {
        return ValidateEmail(empEmail.value);
    }
}
function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
      return true;
    } else {
      alert("Invalid email address!");
      return false;
    }
  
  }
  
  