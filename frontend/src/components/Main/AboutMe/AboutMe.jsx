import './AboutMe.css';
import { Link } from 'react-router-dom';
import userPhoto from '../../../images/user-photo.png';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__line"></div>
      <div className="about-me__content">
        <div className="about-me__text-content">
          <h3 className="about-me__title">Анна</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__description">Я родилась и живу в Минске, закончил факультет философии и социальных наук БГУ. Люблю читать, смотреть кино, танцую латину. Недавно начала кодить. С 2016 года работаю в контекстной рекламе. Желание двигаться вперед в своем профессиональном развитии привело меня на курсы Яндекс.Практикума.</p>
          <Link to="https://github.com/LAnna94" className="about-me__link" target="_blank" rel="noreferrer">Github</Link>
        </div>
        <img src={userPhoto} alt="Фото студента" className="about-me__photo" />
      </div>
    </section>
  )
}

export default AboutMe;
