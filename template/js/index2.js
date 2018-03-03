const imglink5 ="url('../template/images/flight/austraila/virgin.jpg')";
const imglink6 ="url('../template/images/flight/austraila/virgin2.jpg')";
const imglink7 ="url('../template/images/flight/austraila/virgin3.jpg')";
const imglink8 ="url('../template/images/flight/austraila/virgin4.jpg')";

let i=0;

let arrOfFlightVirginImages = [imglink5, imglink6, imglink7, imglink8];

c6.style.backgroundImage = arrOfFlightVirginImages[0];
function disp() {
    
        c6.style.backgroundImage = arrOfFlightVirginImages[i];
    
    ++i;
    if(i ===3) i =0;
    }


 setInterval(disp, 4000);