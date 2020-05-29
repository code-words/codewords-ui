/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';

const AboutDevs = (props) => {
  const devs = [
    {
      name: "Jon Peterson",
      gH_Link: "https://github.com/joequincy",
      l_Link: "https://www.linkedin.com/in/joequincy/",
      p_Link: "https://alumni.turing.io/alumni/jon-peterson",
      role: "BE",
      img:
        "https://media.licdn.com/dms/image/C4E03AQEhILN-5s-jEw/profile-displayphoto-shrink_800_800/0?e=1571270400&v=beta&t=WBZ4ztxssw3W-PwaLADES30A7HvX-4anP6oPfkRLpYs",
      summary:
        "A tinkerer by nature, I enjoy hacking away on an interesting idea and learning new tricks along the way. I’m always looking for a new idea or technology to explore!"
    },
    {
      name: "Justin Pyktel",
      gH_Link: "https://github.com/SiimonStark",
      l_Link: "https://www.linkedin.com/in/justinpyktel/",
      p_Link: "https://alumni.turing.io/alumni/justin-pyktel",
      role: "FE",
      img:
        "https://media.licdn.com/dms/image/C4E03AQGFJ9zu6O-7Zw/profile-displayphoto-shrink_200_200/0?e=1571270400&v=beta&t=KmObYjlcIRPiKy0wB2itsWgIJAwBNVyHPKoXlobY_0o",
      summary:
        "Transitioning into the tech field I intend to keep my audience at the forefront of design choices. Creating a more enjoyable and fun experience is certainly a win win!"
    },
    {
      name: "Lynne Rang",
      gH_Link: "https://github.com/lynnerang",
      l_Link: "https://www.linkedin.com/in/lynne-rang/",
      p_Link: "https://alumni.turing.io/alumni/lynne-rang",
      role: "FE",
      img:
        "https://media.licdn.com/dms/image/C4E03AQFu8BraqA9MJA/profile-displayphoto-shrink_800_800/0?e=1571270400&v=beta&t=u4QsbYsdbK4CYp0MaKpv0I6Ky9jKs3h0b_lF_3VC8vY",
      summary:
        "My skills as a developer come together with a holistic understanding of what it takes to make a great product"
    },
    {
      name: "Rachael Drennan",
      gH_Link: "https://github.com/rdren0",
      l_Link: "https://www.linkedin.com/in/rachael-drennan/",
      p_Link: "https://alumni.turing.io/alumni/rachael-drennan",
      role: "FE/BE",
      img:
        "https://media.licdn.com/dms/image/C4E03AQFmgk9OS5Z88Q/profile-displayphoto-shrink_800_800/0?e=1571270400&v=beta&t=A8lyTbvCZ7IxW1ctg19Oqw0EfVq06xUh1kMK14vybSI",
      summary:
        "As an artist and problem solver, I was drawn to software engineering because it allows me to be both creative and analytical in my approach to a project."
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
        <div className="dev" key={dev.name}>
          <div className="dev-pic">
            <img
              className="dev-img"
              src={dev.img}
              alt={`Pic of Dev: ${dev.name}`}
            />
          </div>
          <h4>{dev.name}</h4>
          <h5>Role: {dev.role}</h5>
          <div className="divider" />
          <p>{dev.summary}</p>
          <div className="social">
            <a
              className="fab fa-linkedin"
              href={dev.l_Link}
              target="blank"
            />
            <a
              className="fab fa-github-square"
              href={dev.gH_Link}
              target="blank"
            />
            <a
              className="fas fa-address-card"
              href={dev.p_Link}
              target="blank"
            />
          </div>
        </div>
      );
    })
  }

  return (
    <div className="backdrop">
      <div className="AboutDevs">
        <i
          id="back"
          className="fas fa-arrow-alt-circle-left"
          onClick={() => props.history.goBack()}
        />
        <h2>Top Secret Case Files:</h2>
        <section className="devs">{renderDevs()}</section>
      </div>
    </div>
  );
}

export default AboutDevs;