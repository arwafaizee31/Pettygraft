import React from 'react';

export default function(){
    return(
<div>     <div className="col-my-pets-owner" 
// ontouchstart="this.classList.toggle('hover');"
ontouchstart="this.classList.toggle('hover');"
>
          <div className="container-my-pets-owner-card">
            <div className="front" 
            // style="background-image: url(cureLogo.png)"
            >
              <div className="inner">
                <p>cure.fit</p>
                <span>Be better every day</span>
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.
                </p>
                <a href="https://www.cult.fit/" target="_blank"><button type="button"
                    className="btn btn-outline-dark rounded-0">cult.fit</button></a>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
}
