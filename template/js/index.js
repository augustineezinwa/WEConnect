
const imglink1 ="url('../template/images/hotels/turkey/mardanpalace.jpg')";
const imglink2 ="url('../template/images/flight/austraila/virgin3.jpg')";
const imglink3 ="url('../template/images/supermarket/shoprite/shoprite3.jpg')";
const imglink4 ="url('../template/images/recreation/balboapark.jpg')";


let i=0;
let arrOfImages = [imglink1, imglink2, imglink3, imglink4];



function disp() {
    

 c4.style.backgroundImage = arrOfImages[i];
 //c6.style.backgroundImage = arrOfFlightVirginImages[i];

 ++i;

 if(i ===3) i =0;
}


setInterval(disp, 5000);