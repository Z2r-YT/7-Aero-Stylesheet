document.getElementById("taskbaricons").onmousemove = e => {
    for(const card of document.getElementsByClassName("taskbarbutton")) {
      const taskbarIcon = card.querySelector(".taskbaricon");
      
      if (taskbarIcon) {
        const canvas = document.createElement("canvas");
        canvas.width = taskbarIcon.clientWidth;
        canvas.height = taskbarIcon.clientHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(taskbarIcon, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  
        let totalR = 0, totalG = 0, totalB = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          totalR += imageData[i];
          totalG += imageData[i + 1];
          totalB += imageData[i + 2];
        }
        const numPixels = imageData.length / 4; // Each pixel has 4 values (R, G, B, Alpha)
  
        const averageR = Math.round(totalR / numPixels);
        const averageG = Math.round(totalG / numPixels);
        const averageB = Math.round(totalB / numPixels);
  
        const brightnessMultiplier = 1.5; // Adjust this value for desired brightness
        const brighterR = Math.min(255, averageR * brightnessMultiplier);
        const brighterG = Math.min(255, averageG * brightnessMultiplier);
        const brighterB = Math.min(255, averageB * brightnessMultiplier);
        
        const brighterColor = `rgb(${brighterR}, ${brighterG}, ${brighterB})`;
        
        card.style.setProperty("--img-colour", brighterColor);
      }
      
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }