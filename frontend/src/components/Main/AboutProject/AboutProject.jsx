import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__header">О проекте</h2>
      <div className="about-project__line"></div>
      <div className="two-columns">
        <div className="two-columns__column">
          <h3 className="two-columns__header">Дипломный проект включал 5 этапов</h3>
          <p className="two-columns__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="two-columns__column">
          <h3 className="two-columns__header">На выполнение диплома ушло 5 недель</h3>
          <p className="two-columns__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project-progress">
        <div className="project-progress__scale project-progress__scale_color_green">1 неделя</div>
        <div className="project-progress__scale">4 недели</div>
        <div className="project-progress__text">Back-end</div>
        <div className="project-progress__text">Front-end</div>
      </div>
    </section>
  )
}

export default AboutProject;
