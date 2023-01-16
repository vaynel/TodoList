
(() => {
    let slideIdx = 0;

    slide.style.width = `${$('.slide>li').length * 100}%`;

    let moveSlide = () => {
        let move = -$('.slide>li')[slideIdx].offsetLeft;
        $('#slide').style.transform = `translateX(${move}px)`;
    }
    let getElementIndex = element => {
        let eIdx;
        let parent = element.parentElement;
        let sibeling = Array.prototype.slice.call(parent.children);
        sibeling.forEach((e, i) => {
            if (e === element) {
                eIdx = i;
            }
        })
        return eIdx;
    }

    leftArrow.addEventListener('click', ev => {
        // slide가 이동해야하는 거리
        slideIdx++;
        if (slideIdx >= $('.slide>li').length) slideIdx = 0;
        moveSlide();
    })

    rightArrow.addEventListener('click', ev => {
        // slide가 이동해야하는 거리
        slideIdx--;
        if (slideIdx < 0) slideIdx = $('.slide>li').length - 1;
        moveSlide();
    })

    $('.btn_nav').forEach(e => {
        e.addEventListener('mouseover', ev => {
            e.style.backgroundColor = 'lightcoral';
        });

        e.addEventListener('mouseout', ev => {
            ;
            e.style.backgroundColor = 'white';
        });

        e.addEventListener('click', ev => {
            slideIdx = (getElementIndex(ev.target));
            moveSlide();
        })
    })

})();




