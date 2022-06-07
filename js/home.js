// const header = document.querySelector('.put__video'),
// text = document.querySelector('.scoll__text'),
// content = document.querySelector('.section-about');
// sectionOffset = content.offsetTop,
// headerHeight = header.offsetHeight;

const points = document.querySelectorAll(".shogun-draggable-block__product__title");
const dot = document.querySelectorAll(".shogun-draggable-block__product");
const dot2 = document.querySelectorAll(".shogun-draggable-block__hotspot");


// slider
class Slider {
    constructor(sliderElem) {
        this.slider = sliderElem;
        this.sliderItems = sliderElem.getElementsByClassName("slider-item");
        this.indicators = sliderElem.getElementsByClassName("slide-indicator");
        this.nextBtn = sliderElem.querySelector(".slider-control-next");
        this.prevBtn = sliderElem.querySelector(".slider-control-prev");
        this.currentIndex = 0;
        this.prevItemIndex = this.sliderItems.length - 1;
        this.nextItemIndex = 1;
        this.isSliding = false;
        
        // Set Item Indexs if active class is specified on an element other than the first.
        for (let i = 0; i < this.sliderItems.length; i++) {
            if (this.sliderItems[i].classList.contains("active")){
                this.currentIndex = i;
                if (i + 1 === this.sliderItems.length) {
                    this.nextItemIndex = 0;
                }
                this.nextItemIndex = i + 1;
                if (i !== 0) {
                    this.prevItemIndex = i - 1;
                }
                break;
            }
        }
        this.setEventListeners();
        this.indicators[this.currentIndex].classList.add("active");
    }
    setEventListeners() {
        this.prevBtn.addEventListener("click", () => {
            this.prev();
        });
        this.nextBtn.addEventListener("click", () => {
            this.next();
        });
    }
    setIndices(direction) { 
        let index;
        if (direction === "NEXT") {
            index = this.currentIndex === this.sliderItems.length - 1 ? 0 : this.currentIndex + 1;
        } 
        if (direction === "PREV") {
            index = this.currentIndex === 0 ? this.sliderItems.length - 1 : this.currentIndex - 1;
        }
        if (index === 0) {
            this.currentIndex = index;
            this.nextItemIndex = index + 1;
            this.prevItemIndex = this.sliderItems.length - 1;
        } else if (index === this.sliderItems.length - 1) {
            this.currentIndex = this.sliderItems.length - 1;
            this.nextItemIndex = 0;
            this.prevItemIndex = this.currentIndex - 1;
        } else {
            this.currentIndex = index;
            this.nextItemIndex = index + 1;
            this.prevItemIndex = index - 1;
        }
    }
    next() {
        if (this.isSliding) return;
        this.isSliding = !this.isSliding;
        this.sliderItems[this.nextItemIndex].classList.add("next-item");
        setTimeout(() => {
            this.sliderItems[this.currentIndex].classList.add("slide-next");
            this.sliderItems[this.nextItemIndex].classList.add("slide-end");
            this.sliderItems[this.nextItemIndex].classList.add("active");
        }, 20);
        setTimeout(() => {
            this.sliderItems[this.nextItemIndex].classList.remove("next-item", "slide-end");
            this.sliderItems[this.currentIndex].classList.remove("slide-next", "active");
            this.indicators[this.currentIndex].classList.remove("active");
            this.indicators[this.nextItemIndex].classList.add("active");
            this.setIndices("NEXT");
            this.isSliding = false;
        }, 400);
    }
    prev() {
        if (this.isSliding) return;
        this.isSliding = !this.isSliding;
        this.sliderItems[this.prevItemIndex].classList.add("prev-item");
        setTimeout(() => {
            this.sliderItems[this.currentIndex].classList.add("slide-prev");
            this.sliderItems[this.prevItemIndex].classList.add("slide-end");
            this.sliderItems[this.prevItemIndex].classList.add("active");
        }, 20);
        setTimeout(() =>  {
            this.sliderItems[this.prevItemIndex].classList.remove("prev-item", "slide-end");
            this.sliderItems[this.currentIndex].classList.remove("slide-prev", "active");
            this.indicators[this.currentIndex].classList.remove("active");
            this.indicators[this.prevItemIndex].classList.add("active");
            this.setIndices("PREV");
            this.isSliding = false;
        }, 400);
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    
    // document.addEventListener('scroll', function() {
    //   const scrollVal = window.scrollY ;
      
    //   if(scrollVal < 800) {
    //     text.style.opacity = 1 - ( scrollVal / headerHeight);
    //     header.style.filter = 'grayscale('+ 1.5 * scrollVal / headerHeight +')';
    //     text.style.transform = `translateY(${scrollVal / 3}px)`;
    //     console.log('dziala');
    //   }
    // })

    const slider = new Slider(
        document.querySelector(".slider")
    );




    

    points.forEach((img,i) => {
        img.addEventListener("mouseover", (e) => {
            // const captionElement = e.target.parentElement;
            // console.log(captionElement)
            
            dot[i].classList.add("active");
            console.log(dot[i])
            dot2[i].classList.add("active");
        });
    });

    points.forEach((img,i) => {
        img.addEventListener("mouseleave", (e) => {
            dot[i].classList.remove("active");
            dot2[i].classList.remove("active");
        });
    });

});
