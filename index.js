class Employee{
    constructor(firstName,lastName,preferredName,email,jobTitle,office,phoneNumber,skypeId,departement)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.prefferedName = preferredName;
        this.email = email;
        this.jobTitle = jobTitle;
        this.office = office;
        this.phoneNumber = phoneNumber;
        this.skypeId = skypeId;
        this.departement = departement;
    }
}
let isEdit = false;
let currentEvent;
const jobTitles = ['SharePoint Practice Head','.Net Development Lead','Recruiting Expert','Bi Developer','Business Analyst'];
const jobTitlesIds = ['sharepointPractice','netDevelpoment','recruitingExpert','biDeveloper','businessAnalyst'];
const departementSearch = ['it','human Resource','md','sales'];
const departement = ['IT','Human Resources','MD','Sales'];
const departementIds = ['it','humanResource','md','sales'];
const offices = ['Seattle','India'];
const officesIds = ['seattle','india'];

const ulDepartement = document.querySelector('#departement');
const ulOffices = document.querySelector('#Offices');
const ulJobTitles = document.querySelector('#jobTitles');
const employeeNode = document.querySelector("#add-employee");
const empContainer = document.querySelector(".employee-container");
const empForm = document.querySelector(".employee-form");
const empFirstName = document.querySelector("#firstName");
const empLastName = document.querySelector("#lastName");
const empPrefferedName = document.querySelector("#preferredName");
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
const charContainer = document.querySelector('.char-container');
const errorFirstName = document.querySelector('.errorFirstName');
const errorLastName =document.querySelector('.errorLastName');
const errorPhoneNumber = document.querySelector('.errorPhoneNumber');
const errorEmail = document.querySelector('.errorEmail');
const errorSkypeId = document.querySelector('.errorSkypeId');
var navIT,navHumanResource,navMd,navSales,navSeattle,navIndia,navSharePointHead,navNetDevelopmentHead,navRecruitingExpert,navBiDeveloper,navBusinessAnalyst;
var isActiveContainer=undefined;

const countNode = new Map();
const dropDown = new Map();

window.onload = function()
{
    initializeDropDown();
    createDropDownTemplate();
    createFormDropDownTemplate();
    createListItems();
    filterByFirstNameTemplate();
    for(let x of editBtn)
    {
        x.addEventListener('click',function(event){
            editFunction(event);
        })
    }
     navIT = document.querySelector('#it');
     navHumanResource = document.querySelector('#humanResource');
     navMD = document.querySelector('#md');
     navSales = document.querySelector('#sales');
     navSeattle = document.querySelector('#seattle');
     navIndia = document.querySelector('#india');
     navSharePointHead = document.querySelector('#sharepointPractice');
     navNetDevelopmentHead = document.querySelector('#netDevelpoment');
     navRecruitingExpert = document.querySelector('#recruitingExpert');
     navBiDeveloper = document.querySelector('#biDeveloper');
     navBusinessAnalyst = document.querySelector('#businessAnalyst');
     onReload();
    
}
function createFormDropDownTemplate()
{
    for(let i=0;i<departement.length;i++)
    {
    const opt = document.createElement('option');
    opt.setAttribute('value',departement[i]);
    opt.innerText = departement[i];
    if(departement[i]=='Human Resources')
    opt.setAttribute('selected','');
    empDepartement.appendChild(opt);
    }

    for(let i=0;i<jobTitles.length;i++)
    {
    const opt = document.createElement('option');
    opt.setAttribute('value',jobTitles[i]);
    opt.innerText = jobTitles[i];
    if(i===0)
    opt.setAttribute('selected','');
    empJobTitle.appendChild(opt);
    }

    for(let i=0;i<offices.length;i++)
    {
    const opt = document.createElement('option');
    opt.setAttribute('value',offices[i]);
    opt.innerText = offices[i];
    if(i===0)
    opt.setAttribute('selected','');
    empOffice.appendChild(opt);
    }
}
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
        initializeCountNode(x.departement);
        initializeCountNode(x.office);
        initializeCountNode(x.jobTitle);
    }
    }
    sideBarNodeCounts();
}

clearBtn.addEventListener('click',(e)=>{
    searchNode.value="";
    if(isActiveContainer)
    isActiveContainer.style.backgroundColor="";
    onReload();
    
})
submitBtn.addEventListener('click',(e)=>{
    clearValidations();
    console.log("helo");
    e.preventDefault();
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
            }
            
        })
        isEdit=false;
        localStorage.setItem('data',JSON.stringify(empData));
    }
    clearInputs(); // to clear all the input field after submission
    empFormDisplay();
    onReload();
 } // to display the fresh list of employee on the screen
})

closeBtn.addEventListener('click',function(){
    empFormDisplay();
    clearInputs();
    isEdit=false;
    clearValidations();
    
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
    empDepartement.value="Human Resources";
    empEmail.value="";
    empPrefferedName.value="";
    empSkypeId.value="";
    empOffice.value="Seattle";
    empPhoneNumber.value="";
    empJobTitle.value="SharePoint Practice Head";
}
function empFormDisplay(firstName='',lastName='',preferredName='',email='',phoneNumber='',skypeId='')
{
    if(empForm.style.display==="none")
        empForm.style.display="block";
    else
        empForm.style.display="none";
    empFirstName.disabled=false;
    empLastName.disabled=false;
    empEmail.disabled=false;
    empSkypeId.disabled=false;
    empPhoneNumber.disabled=false;
    empDepartement.disabled=false;
    empJobTitle.disabled=false;
    empOffice.disabled=false;
}
function createNewEmployee()
{
    const employee = new Employee;
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
    const divImg = document.createElement('div');
    const divDetails = document.createElement('div');
    const img = document.createElement('img');
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
    img.setAttribute('class','user-image');
    divDetails.setAttribute('class','emp-details');
    divImg.setAttribute('class','user-img');
    img.src="assets/user.png";
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
    divImg.appendChild(img);

    divDetails.appendChild(name);
    divDetails.appendChild(desigination);
    divDetails.appendChild(departement);
    divDetails.appendChild(footerIcons);
    
    div.appendChild(divImg);
    div.appendChild(divDetails);

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
        employeeDetailsTemplate(x.preferredName,x.jobTitle,x.departement);
    }
}
function createListItems()
{
   
    for(let i=0;i<jobTitles.length;i++)
    {
        const li=document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');
        li.setAttribute('class',"py-md-1 py-sm-0");
        a.setAttribute('href',"javascript:void(0)");
        a.setAttribute('onclick',`searchEmployee('${jobTitles[i]}','jobTitle')`)
        a.innerText=jobTitles[i];
        span.setAttribute('id',jobTitlesIds[i]);
        span.setAttribute('class',"list-padding");
        li.appendChild(a);
        li.appendChild(span);
        ulJobTitles.appendChild(li);
    }
    for(let i=0;i<departement.length;i++)
    {
        const li=document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');
        li.setAttribute('class',"py-md-1 py-sm-0");
        a.setAttribute('href',"javascript:void(0)");
        a.setAttribute('onclick',`searchEmployee('${departementSearch[i]}','departement')`)
        a.innerText=departement[i];
        span.setAttribute('id',departementIds[i]);
        span.setAttribute('class',"list-padding");

        li.appendChild(a);
        li.appendChild(span);
        ulDepartement.appendChild(li);
    }
    for(let i=0;i<offices.length;i++)
    {
        const li=document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');
        li.setAttribute('class',"py-md-1 py-sm-0");
        a.setAttribute('href',"javascript:void(0)");
        a.setAttribute('onclick',`searchEmployee('${offices[i]}','office')`)
        a.innerText=offices[i];
        span.setAttribute('id',officesIds[i]);
        span.setAttribute('class',"list-padding");

        li.appendChild(a);
        li.appendChild(span);
        ulOffices.appendChild(li);
    }
    
}
function filterByFirstNameTemplate()
{
    const div = document.createElement('div');
    const icon = document.createElement('i');
    div.setAttribute('class','char');
    icon.setAttribute('class',"bi bi-person");
    div.appendChild(icon);
    div.setAttribute('onclick','onReload()');
    charContainer.appendChild(div);
    for(let i=0;i<26;i++)
    {
        const div2 = document.createElement('div');
        div2.setAttribute('class','char');
        div2.setAttribute('onclick','filterByFirstName()');
        div2.innerText=String.fromCharCode(i+65);
        charContainer.appendChild(div2);
        
    }
    
}
function createDropDownTemplate()
{
    dropDown.forEach((value,key)=>{
        const opt = document.createElement('option');
        opt.setAttribute('value',value);
        if(value=='preferredName')
        opt.setAttribute('selected','')
        opt.innerText = key;
        filterNode.appendChild(opt);
    })

    
}
function initializeDropDown()
{
    dropDown.set('Preferred Name','preferredName');
    dropDown.set('First Name','firstName');
    dropDown.set('Last Name','lastName');
    dropDown.set('Email','email');
    dropDown.set('Job Title','jobTitle');
    dropDown.set('Office','office');
    dropDown.set('Departement','departement');
    dropDown.set('Phone Number','phoneNumber');
    dropDown.set('Skype ID','skypeId');
}
function countNodeFunction()
{
    countNode.set('IT',0);
    countNode.set('Human Resources',0);
    countNode.set('MD',0);
    countNode.set('Sales',0);
    countNode.set('Seattle',0);
    countNode.set('India',0);
    countNode.set('SharePoint Practice Head',0);
    countNode.set('.Net Development Lead',0);
    countNode.set('Recruiting Expert',0);
    countNode.set('Bi Developer',0);
    countNode.set('Business Analyst',0);

}
function initializeCountNode(field)
{
    countNode.set(field,countNode.get(field)+1);
}
function sideBarNodeCounts()
{
    console.log(navIT);
    navIT.innerText='('+countNode.get('IT')+')';
    navHumanResource.innerText = '('+countNode.get('Human Resources') +')';
    navMD.innerText = '('+countNode.get('MD')+')';
    navSales.innerText = '('+countNode.get('Sales')+')';
    navSeattle.innerText = '('+countNode.get('Seattle')+')';
    navIndia.innerText = '('+countNode.get('India')+')';
    navSharePointHead.innerText = '('+countNode.get('SharePoint Practice Head')+')';
    navNetDevelopmentHead.innerText = '('+countNode.get('.Net Development Lead')+')';
    navRecruitingExpert.innerText = '('+countNode.get('Recruiting Expert')+')';
    navBiDeveloper.innerText = '('+countNode.get('Bi Developer')+')';
    navBusinessAnalyst.innerText = '('+countNode.get('Business Analyst')+')';
}
function searchEmployeeByFirstName(A='A')
{
    // make a function to get item from local storage
    var empData = JSON.parse(localStorage.getItem('data'));
    let filterList = empData.filter((x)=>{
        if(x.firstName[0]===A ||x.firstName[0]==A.toLowerCase())
            return true;
    })
    pushFilterEmployee(filterList);
}
function filterByFirstName()
{
    var currentContainer = event.currentTarget;
    var firstChar = currentContainer.innerText;
    if(isActiveContainer===currentContainer)
    {
        isActiveContainer.style.backgroundColor="";
        isActiveContainer=undefined;
        onReload();
    }
    else if(isActiveContainer!==undefined)
    {
        isActiveContainer.style.backgroundColor="";
        currentContainer.style.backgroundColor='green';
        isActiveContainer=currentContainer;
        searchEmployeeByFirstName(firstChar);
    }
    else
    {
        isActiveContainer=currentContainer;
        currentContainer.style.backgroundColor = 'green';
        searchEmployeeByFirstName(firstChar);
    }
    
    

}
function editFormField(e)
{
    empFormDisplay(); 
    var empData = JSON.parse(localStorage.getItem('data'));
    var empName = e.currentTarget.children[1].children[0].innerText;
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
function clearValidations()
{
    errorEmail.style.display='none';
    errorFirstName.style.display='none';
    errorLastName.style.display='none';
    errorPhoneNumber.style.display='none';
    errorSkypeId.style.display='none';
    console.log(errorPhoneNumber);
}
function editFunction(e)
{
    e.target.parentNode.children[0].disabled=false;
    e.target.parentNode.children[0].focus();
}
function validations()
{
    if(empFirstName.value==='')
    {
        errorFirstName.style.setProperty('display','block','important');
        empFirstName.focus();
    }
    else if(empLastName.value==='')
    {
        errorLastName.style.setProperty('display','block','important');
        empLastName.focus();
    }
    else if(empEmail.value ==='')
    {
        errorEmail.style.setProperty('display','block','important');
        empEmail.focus();
    }
    else if(empJobTitle.value ==='')
    {
        empJobTitle.focus();
    }
    else if(empOffice.value ==='')
    {
        empOffice.focus();
    }
    else if(empPhoneNumber.value ===''||empPhoneNumber.value.length<10)
    {
        errorPhoneNumber.style.setProperty('display','block','important');
        empPhoneNumber.focus();
    }
    else if(empSkypeId.value ==='')
    {
        errorSkypeId.style.setProperty('display','block','important');
        empSkypeId.focus();
    }
    else if(empDepartement.value === '')
    {
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
        errorEmail.style.setProperty('display','block','important');
      return false;
    }
  
  }
  
  