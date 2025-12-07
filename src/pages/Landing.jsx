import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg.png';
import frontBg from '../assets/front-bg.png';
import frontSticker from '../assets/front-stk.webp';
import backSticker from '../assets/back.webp';
import mainSticker from '../assets/main-stk.webp';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const handleTilt = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10; // left/right
    const rotateX = -((y / rect.height) - 0.5) * 10; // up/down

    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
  };

  const handleEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-scale', '1.03');
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--tilt-scale', '1');
  };

  return (
    <div
      className="landing"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div
        ref={cardRef}
        className="card"
        onMouseMove={handleTilt}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div
          className="outside"
          aria-label="Invitation cover"
        >
          <div
            className="front"
            style={{
              backgroundImage: `url(${frontBg})`,
            }}
          >
            <div className="hiee">
              <p>Hiee Susu!!</p>
            </div>
            <div className="front-sticker">
              <img src={frontSticker} alt="Hiee Susu!" />
            </div>
          </div>
          <div className="back">
            <div className="back-sticker">
              <img src={backSticker} alt="Phool !!" />
            </div>
          </div>
        </div>

        <div className="inside">
          <div className="Text">
            <p>Wanna Date? pleaseeee</p>
          </div>
          <div className="main-sticker">
            <img src={mainSticker} alt="Wanna Date?" />
          </div>
          <div className="buttons">
            <button
              className="btn"
              id="yesButton"
              type="button"
              onClick={() => navigate('/yes')}
            >
              Yes
            </button>
            <button
              className="btn"
              id="noButton"
              type="button"
              onClick={() => navigate('/no')}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
