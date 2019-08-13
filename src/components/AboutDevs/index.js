import React from 'react';

const AboutDevs = () => {
  const devs = [
    {
      name: "Jon Peterson",
      role: "BE",
      summary:
        "A tinkerer by nature, I enjoy hacking away on an interesting idea and learning new tricks along the way. I’m always looking for a new idea or technology to explore!"
    },
    {
      name: "Justin Pyktel",
      role: "FE",
      summary:
        "TBD"
    },
    {
      name: "Lynne Rang",
      role: "FE",
      summary:
        "TBD"
    },
    {
      name: "Rachael Drennan",
      role: "FE/BE",
      summary:
        "TBD"
    }
  ];

  const randomizeDevs = () => {
    // Resource:
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    for (let i = devs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [devs[i], devs[j]] = [devs[j], devs[i]];
    }
  }

  const renderDevs = () => {
    randomizeDevs();

    return devs.map(dev => {
      return (
        <article className="dev" key={dev.name}>
          <div className="dev-pic">
            
          </div>
          <h3>{dev.name}</h3>
          <h5>Role: {dev.role}</h5>
          <p>{dev.summary}</p>
        </article>
      )
    })
  }

  return (
    <div className="AboutDevs">
      <h2>Top Secret Case Files:</h2>
      <section className="devs">
        {renderDevs()}
      </section>
    </div>
  )
}

export default AboutDevs;