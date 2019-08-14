import React from 'react';

const AboutDevs = (props) => {
  const devs = [
    {
      name: "Jon Peterson",
      gH: "https://github.com/joequincy",
      role: "BE",
      summary:
        "A tinkerer by nature, I enjoy hacking away on an interesting idea and learning new tricks along the way. I’m always looking for a new idea or technology to explore!"
    },
    {
      name: "Justin Pyktel",
      gH: "https://github.com/SiimonStark",
      role: "FE",
      summary:
        "TBD"
    },
    {
      name: "Lynne Rang",
      gH: "https://github.com/lynnerang",
      role: "FE",
      summary:
        "TBD"
    },
    {
      name: "Rachael Drennan",
      gH: "https://github.com/rdren0",
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
        <a className="dev" href={dev.gH} target="blank" key={dev.name}>
          <div className="dev-pic" />
          <h4>{dev.name}</h4>
          <h5>Role: {dev.role}</h5>
          <div className="divider" />
          <p>{dev.summary}</p>
        </a>
      );
    })
  }

  return (
    <div className="AboutDevs">
      <i className="fas fa-arrow-alt-circle-left" 
        onClick={() => props.history.goBack()} />
      <h2>Top Secret Case Files:</h2>
      <section className="devs">{renderDevs()}</section>
    </div>
  );
}

export default AboutDevs;