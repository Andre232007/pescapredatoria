"use strict";
    const screen = document.getElementById("screen");
    const xmlns = "http://www.w3.org/2000/svg";
    const xlinkns = "http://www.w3.org/1999/xlink";
    window.addEventListener(
        "pointermove",
        (e) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
            rad = 0;
        },
        false
    );
    
    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
    };
    
    let width, height;
    window.addEventListener("resize", () => resize(), false);
    resize();
    
    const prepend = (use, i) => {
        const elem = document.createElementNS(xmlns, "use");
        elems[i].use = elem;
        elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
        screen.prepend(elem);
    };
    
    const N = 40;
    
    const elems = [];
    for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };
    const pointer = { x: width / 2, y: height / 2 };
    const radm = Math.min(pointer.x, pointer.y) - 20;
    let frm = Math.random();
    let rad = 0;
    
    for (let i = 1; i < N; i++) {
        if (i === 1) prepend("Cabeza", i);
        else if (i === 8 || i === 1) prepend("Aletas", i);
        else prepend("Espina", i);
    }
    
    const run = () => {
        requestAnimationFrame(run);
        let e = elems[0];
        const ax = (Math.cos(3 * frm) * rad * width) / height;
        const ay = (Math.sin(4 * frm) * rad * height) / width;
        const easing = 0.1; // Adjust between 0.1 to 0.3
        e.x += (ax + pointer.x - e.x) * easing;
        e.y += (ay + pointer.y - e.y) * easing;
        for (let i = 1; i < N; i++) {
            let e = elems[i];
            let ep = elems[i - 1];
            const a = Math.atan2(e.y - ep.y, e.x - ep.x);
            const dx = ep.x - e.x + (Math.cos(a) * (100 - i)) / 6;
            const dy = ep.y - e.y + (Math.sin(a) * (100 - i)) / 6;
            e.x += dx * 0.6;  // instead of dividing, multiply for GPU-friendly
            e.y += dy * 0.6;
            
            const s = (162 + 4 * (1 - i)) / 70;
        
            const midX = Math.round((ep.x + e.x) / 2);
            const midY = Math.round((ep.y + e.y) / 2);
            const angle = Math.round((180 / Math.PI) * a * 10) / 10;
            const scale = Math.round(s * 900) / 1400;
            
            e.use.setAttributeNS(
              null,
              "transform",
              `translate(${midX},${midY}) rotate(${angle}) scale(${scale},${scale})`
            );

        }
        if (rad < radm) rad++;
        frm += 0.003;
        if (rad > 60) {
            pointer.x += (width / 2 - pointer.x) * 0.08;
            pointer.y += (height / 2 - pointer.y) * 0.08;
        }
    };
    
    run();