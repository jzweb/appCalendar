//Your API Key: 8ff4cf2b-cc78-40b0-98c1-1c4191d10fdf

var months = ["January","Febrary","March","April","May","June","July","Agoust","September","October","november","December"];
var days =["Sunday","Monday","Tusday","wednesday","Thursday","Friday","Saturday"];

var totalDaysMonth = [];

function setDaysMonth(year){
    for(var  i = 1; i < 13; i++) {
        const m = daysInMonth(i, year);
        totalDaysMonth.push(m);
        
    }
    
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}


fillSelect();

function fillSelect() {
    var lista;
    var countries =['AR Argentina','AO Angola','AT Austria','AU Australia','AW Aruba','AX Åland Islands','BA Bosnia and Herzegovina',
    'BE Belgium','BG Bulgaria','BO Bolivia','BR Brazil','BS The Bahamas','CA Canada','CH Switzerland','CN China','CO Colombia',
    'CR Costa Rica','CU Cuba','CZ Czech Republic','DE Germany','DK Denmark','DO Dominican Republic','EC Ecuador','ES Spain',
    'FI Finland','FR France','GB United Kingdom','GB-ENG England','GB-NIR Northern Ireland','GB-SCT Scotland',
    'GB-WLS Wales','GR Greece','GT Guatemala','HK Hong Kong','HN Honduras','HR Croatia','HU Hungary','ID Indonesia','IE Ireland',
    'IN India','IL Israel','IS Iceland','IT Italy','JP Japan','KZ Kazakhstan','LS Lesotho','LU Luxembourg','MG Madagascar','MQ Martinique',
    'MT Malta','MU Mauritius','MX Mexico','MZ Mozambique','NG Nigeria','NL Netherlands','NO Norway','PE Peru','PK Pakistan','PH Philippines',
    'PL Poland','PR Puerto Rico','PT Portugal','PY Paraguay','RE Réunion','RO Romania','RU Russia','SC Seychelles','SE Sweden','SG Singapore','SI Slovenia',
    'ST Sao Tome and Principe','SK Slovakia','TN Tunisia','TR Turkey','UA Ukraine','US United States','UY Uruguay','VE Venezuela','ZA South Africa'];

    lista = document.getElementById("listCountries"); 

    for(var i=0; i < countries.length; i++){ 
        var option = new Option(countries[i], countries[i]);
        option.value =countries[i].slice(0,2);
        lista.appendChild(option);
    }
}

// use de Api Rest for holidays
function findHolidays(country,day,month,year,counter) {
    var xhttp = new XMLHttpRequest();
    var holiday = false;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            if(res.holidays!=0){
                    document.getElementsByClassName("cel")[counter-1].setAttribute("class", "holi");
            }
      }
    };
    xhttp.open("GET", "https://holidayapi.com/v1/holidays?key=8ff4cf2b-cc78-40b0-98c1-1c4191d10fdf&country="+country+"&year="+year+"&day="+day+"&month="+month, true);
    xhttp.send();
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

//Checking for not empty filds
function check(){
    const startDate = document.getElementById("inicio").value;
    const endDate = parseInt(document.getElementById("fin").value);
    if(startDate!=''){
        document.getElementById('btn-submit').disabled = false;
    }else{document.getElementById('btn-submit').disabled = true;}
} 

function getData(){
        
        
        var date1;//fecha entrada
        var date2;//fecha fin
        var entryMonth;
        var dayLimit;
        var limit;
        var monthToFind;
        var startDate = document.getElementById("inicio").value;
        var endDate = parseInt(document.getElementById("fin").value);
        date1 = new Date(startDate);
        date2 = new Date(date1);
        date2.setDate(date1.getDate() + endDate);
        entryMonth = date1.getMonth();
        var selector = document.getElementById('listCountries');
        var country = selector[selector.selectedIndex].value;
        var numberDaysmonth = daysInMonth(date1.getMonth(),date1.getFullYear());//startDay.getMonth(),startDay.getFullYear()
        // Set the days of each month depends the year
        setDaysMonth(date1.getUTCFullYear());

        // Show month and year on calendar
        for(var i=0;i < months.length; i++){
            if(i == entryMonth){
                document.getElementById('month').innerHTML="<h1>"+months[i]+" - " +date1.getUTCFullYear()+"</h1>";
                monthToFind = i+1;
                break;
            }
        }
        
        var monthLength = totalDaysMonth[this.month];
        var html = document.getElementsByClassName("days")[0].innerHTML;
        //
        var daystart =date1.getDay();
        var comenzo =false;
        var days=date1.getDate();
        dayLimit=parseInt(date2.getDate());
       
        //this is loop for weeks(row)
        var counter = 0;
        for (var i = 0; i < 5; i++) {
            html += '<tr>';
            // this loop is for weekdays (cells)
            for (var j = 0; j <7; j++) { 
                if(j==0 || j==6){
                    html += '<td class="weekend">';}
                else{
                    html += '<td class="week">';
                }
                
                
                if(daystart==j){
                    comenzo=true;
                }
                if(comenzo){
                    
                    if(dayLimit > numberDaysmonth){
                        limit = dayLimit;
                    }else{
                        limit = numberDaysmonth;
                    }
                    if(days< dayLimit){ 
                        counter++;
                        html+='<div class="cel">';
                        findHolidays(country,days,monthToFind,parseInt(date1.getUTCFullYear()),counter);
                        html += days;
                        html+='</div>';
                        days++;
                    }
                }
                
                html +='</td>';
            }
            html += '</tr>';
        
        }
        document.getElementsByClassName("days")[0].innerHTML = html;
        document.getElementById('box').style.display="block";
        
    }

 