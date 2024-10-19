let currSlide = 1;
function switchToSlide(slide){
    document.getElementById(`slide${currSlide}`).hidden = true
    currSlide = slide;
    document.getElementById(`slide${currSlide}`).hidden = false
    if(slide == 3){
        
    }
}