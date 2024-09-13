// components/Timeline.js

const Timeline = () => {
  const milestones = [
    {
      year: "Jan 2020 - Mei 2023",
      job: "Full Stack Developer at Bank KEB Hana Indonesia",
      description: [
        "Led the redesign of the corporate website using React.js, significantly enhancing user engagement through improved UI/UX",
        "Managed the strategic migration of the corporate website to Next.js, boosting site performance and search engine optimization",
        "Led the adoption of Microservices using Java to enhance application scalability and flexibility",
        "Created internal applications using Node.js to automate and streamline company processes, showcasing the efficiency and scalability of Node.js solutions",
        "Directed the strategic migration to Next.js, prioritizing website performance and SEO",
        "Managed the migration to Next.js for the corporate website, optimizing performance and SEO",
        "Implemented CI/CD strategies to improve development efficiency and application robustness",
        "Maintained and improved internal recruitment applications using C# for the API, ASP.NET for the frontend, and SQL Server for databases. This robust web-based application streamlined the entire recruitment lifecycle, encompassing aspects such as job posting, application tracking, candidate shortlisting, interview scheduling, communication, rejection, offer management, and the onboarding process",
      ],
    },
    // {
    //   year: "Jan 2020 - Mei 2023 ",
    //   job: "Full Stack Developer at Bank KEB Hana Indonesia ",
    //   description: [
    //     "Revolutionized the corporate website, leading to a 30% increase in user engagement and a 15% reduction in bounce rate",
    //     "Drove a 25% efficiency improvement in Hana Mobile Apps through strategic development, reducing load times by 40% and enhancing user experience",
    //     "Pioneered the transition to Microservices architecture,enhancing application scalability and flexibility",
    //     "Directed the strategic migration to Next.js, prioritizing website performance and SEO",
    //     "Cultivated synergy with the UI/UX team, embedding designs into the Next.js framework",
    //     "Established advanced CI/CD strategies, enhancing release efficiency and application robustness",
    //     "Maintained and improved internal recruitment applications using C# for the API, ASP.NET for the frontend, and SQL Server for databases. This robust web-based application streamlined the entire recruitment lifecycle, encompassing aspects such as job posting, application tracking, candidate shortlisting, interview scheduling, communication, rejection, offer management, and the onboarding process",
    //   ],
    // },
    // {
    //   year: "Jul 2019 - Dec 2019",
    //   job: "Business Analyst at Bank KEB Hana Indonesia ",
    //   description: [
    //     "Streamlined requirement gathering processes by actively collaborating with stakeholders, reducing project initiation times by 20% and increasing stakeholder satisfaction by 15%",
    //     "Identified efficiency opportunities in existing processes,leading to a 15% reduction in operational costs and a 10% increase in productivity",
    //     "Collaborated in formulating next-gen processes in alignment with core business goals",
    //     "Influenced the enhancement of the Hana Pioneer system",
    //   ],
    // },
    // {
    //   year: "Jul 2018 - Jul 2019 ",
    //   job: "Android Developer at Intikom Berlian Mustika ",
    //   description: [
    //     "Conceived and launched the Hana Recruitment app for iOS and Android",
    //   ],
    // },
    // {
    //   year: "Jun 2017 - Jul 2018",
    //   job: "Android Developer at XYBase Inc.",
    //   description: [
    //     "Innovated hybrid apps tailored for airport environments, leading to a 25% increase in user satisfaction and a 30% reduction in user-reported issues",
    //   ],
    // },
  ];

  return (
    <section
      className="bg-[#1f242d] min-h-screen text-white p-4 sm:p-6"
      id="skill"
      data-aos="zoom-in-down"
      data-aos-duration="1500"
    >
      <div className="flex items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold">
          My
          <span className="text-2xl sm:text-3xl font-bold text-[#0ef] mx-2">
            Journey
          </span>
        </h1>
      </div>

      <div className="relative m-4 sm:m-8 rounded-lg">
        {/* Vertical Line */}
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#0ef] z-0"></div>

        <div className="relative z-10">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row mb-4 sm:mb-8 justify-between"
              data-aos="zoom-in-down"
              data-aos-duration="1500"
            >
              {/* Card */}
              <div
                className={`w-full sm:w-1/2 p-2 sm:p-6 ${
                  index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"
                } relative`}
              >
                {index % 2 === 0 && (
                  <div className="rounded-lg shadow-lg p-4 sm:p-6 bg-[#373f4e] text-slate-300">
                    <h3 className="font-bold text-lg">{milestone.year}</h3>
                    <p className="font-semibold mt-2">{milestone.job}</p>
                    <ul className="m-4 list-disc">
                      {milestone.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Circle Marker */}
              <div className="flex justify-center items-center z-30 relative mb-4 sm:mb-0">
                <div className="w-[16px] sm:w-[24px] h-[16px] sm:h-[24px] rounded-full bg-[#0ef]"></div>
              </div>

              <div
                className={`w-full sm:w-1/2 p-2 sm:p-6 ${
                  index % 2 === 0 ? "sm:pl-12" : "sm:pr-12"
                } relative`}
              >
                {index % 2 !== 0 && (
                  <div className="rounded-lg shadow-lg p-4 sm:p-6 bg-[#373f4e] text-slate-300">
                    <h3 className="font-bold text-lg">{milestone.year}</h3>
                    <p className="font-semibold mt-2">{milestone.job}</p>
                    <ul className="m-4 list-disc">
                      {milestone.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
