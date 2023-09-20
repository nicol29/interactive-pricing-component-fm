import './App.css';
import { useState} from 'react';
import plans from './utils/plans.js';

function App() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isYearly, setIsYearly] = useState(false);
  let isMouseHeld = false;

  const moveSlider = (e: any) => {
    const slider = document.querySelector(".progress-bar") as HTMLElement;

    const calculatedSliderWidth = calculateSliderWidth(e);
    slider.style.width = `${calculatedSliderWidth}%`;

    if (calculatedSliderWidth) {
      if (calculatedSliderWidth < 20) {
        setActiveIndex(0);
      } else if (calculatedSliderWidth > 20 && calculatedSliderWidth < 40) {
        setActiveIndex(1);
      } else if (calculatedSliderWidth > 40 && calculatedSliderWidth < 60) {
        setActiveIndex(2);
      } else if (calculatedSliderWidth > 60 && calculatedSliderWidth < 80) {
        setActiveIndex(3);
      } else {
        setActiveIndex(4);
      }
    }
  }

  const positionSliderOnLift = () => {
    const slider = document.querySelector(".progress-bar") as HTMLElement;

    if (activeIndex === 0) {
      slider.style.width = `0%`;
    } else if (activeIndex === 1) {
      slider.style.width = `25%`;
    } else if (activeIndex === 2) {
      slider.style.width = `50%`;
    } else if (activeIndex === 3) {
      slider.style.width = `75%`;
    } else {
      slider.style.width = `100%`;
    }
  }

  const calculateSliderWidth = (e: any) => {
    const searchBar = document.querySelector(".slider"); 
    const slider = document.querySelector(".progress-bar") as HTMLElement;
    let startPos;

    if (searchBar && slider) {
      const barWidth = searchBar?.getBoundingClientRect().width;

      if (e.touches) {
        startPos = e.touches[0].clientX - searchBar?.getBoundingClientRect().left;
      } else {
        startPos = e.clientX - searchBar?.getBoundingClientRect().left;
      }
      const percentage = (startPos / barWidth) * 100;

      return (percentage > 100) ? 100 : percentage;
    }
  }

  const toggleYearlyPrice = () => {
    const toggleElement = document.querySelector(".yearly-toggle") as HTMLElement;

    if (toggleElement) {
      !isYearly ? toggleElement.style.justifyContent = "flex-end" : toggleElement.style.justifyContent = "flex-start";

      setIsYearly(!isYearly);
    }
  }

  const displayDiscountedPrice = () => {
    if (isYearly) {
      const discount = plans[activeIndex].price * 0.25;

      return plans[activeIndex].price - discount;
    } else {
      return plans[activeIndex].price
    }
  }

  window.addEventListener("mouseup", () => {
    isMouseHeld = false;
    document.body.style.userSelect = "initial";
    positionSliderOnLift();
  });

  window.addEventListener("mousemove", (e) => {
    if (isMouseHeld) moveSlider(e);
  });

  return (
    <section className="component-container">
      <div className="heading-container">
        <h1>Simple, traffic-based pricing</h1>
        <p>Sign-up for our 30-day trial.</p>
        <p>No credit card required.</p>
      </div>
      <article>
        <div className="grid-container">
          <div className="price-slider-container">
            <p>{plans[activeIndex].pageViews} PAGEVIEWS</p>
            <div className="slider" 
              onTouchStart={(e) => moveSlider(e)}
              onTouchMove={(e) => moveSlider(e)}
              onTouchEnd={() => positionSliderOnLift()}
              onMouseDown={(e) => {
                isMouseHeld = true;
                document.body.style.userSelect = "none";
                moveSlider(e);
              }}
            >
              <div className="progress-bar">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="13"><g fill="#80FFF3" fillRule="evenodd"><path d="M16 2.558v7.884a1 1 0 001.735.679l3.639-3.943a1 1 0 000-1.356l-3.64-3.943A1 1 0 0016 2.558zM6 2.558v7.884a1 1 0 01-1.735.679L.626 7.178a1 1 0 010-1.356l3.64-3.943A1 1 0 016 2.558z"/></g></svg>
                </div>
              </div>
            </div>
            <div className="price-container">
              <span>${displayDiscountedPrice()}.00</span>
              / month
            </div>
          </div>
          <div className="billing-period">
            <span>Monthly Billing</span>
            <div className="yearly-toggle" onClick={toggleYearlyPrice}>
              <div></div>
            </div>
            <div className="yearly-discount">
              Yearly Billing
              <div>
                -25%
              </div>
            </div>
          </div>
          <div className="features-container">
            <ul>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="9" height="8"><path fill="none" stroke="#10D8C4" strokeWidth="2" d="M1 4.134l1.907 1.908L7.949 1"/></svg>Unlimited websites</li>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="9" height="8"><path fill="none" stroke="#10D8C4" strokeWidth="2" d="M1 4.134l1.907 1.908L7.949 1"/></svg>100% data ownership</li>
              <li><svg xmlns="http://www.w3.org/2000/svg" width="9" height="8"><path fill="none" stroke="#10D8C4" strokeWidth="2" d="M1 4.134l1.907 1.908L7.949 1"/></svg>Email reports</li>
            </ul>
            <button>Start my trial</button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default App;
