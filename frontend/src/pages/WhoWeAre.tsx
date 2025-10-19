import { Target, Eye, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BoardCard from "@/components/BoardCard";
import LeadershipTeam from "@/components/LeadershipTeam";
// Local images for board & leadership members
import profAbuelImg from '@/assets/Prof. Abuelgasim A. A. Ahmed.jpg';
import profDavidImg from '@/assets/Prof. David Musoke.jpg';
import alimahImg from '@/assets/Dr. Alimah Komuhangi.jpg';
import hiromuImg from '@/assets/Dr. Hiromu Yakura.jpg';
import ritahImg from '@/assets/Ms. Ritah Nabukeera.jpg';
import mercyAwinoImg from '@/assets/Ms. Mercy Awino.jpg';
import chraishImg from '@/assets/Chraish.jpg';
import maureenImg from '@/assets/maureen.jpg';
import paulImg from '@/assets/Paul.jpg';
import audreyImg from '@/assets/audrey.jpg';
import ireneImg from '@/assets/irene.jpg';
import namataImg from '@/assets/namata portrait (1).jpg';
import collinsImg from '@/assets/Collins (1).jpg';
import ronaldImg from '@/assets/ronald.jpg';
import teamImg from '@/assets/team.jpg';

const WhoWeAre = () => {
  const leadershipTeam = [
    {
      id: 1,
      name: "Chraish Miiro",
      role: "Co-founder & Chief Executive Officer",
      badge: "CEO & Co-Founder",
      image: chraishImg,
      bio: "Chraish is a digital health systems expert and pharmacist passionate about transforming healthcare delivery in resource-limited settings. He leads Impala Healthtech Research Limited's vision, strategy, and product innovation, driving the development of scalable health technologies such as DIGAMS. His work focuses on improving diagnostic access, data-driven antimicrobial stewardship, and smarter health system design."
    },
    {
      id: 2,
      name: "Kisaakye Maureen",
      role: "Co-founder & Chief Operating Officer",
      badge: "COO & Co-Founder",
      image: maureenImg,
      bio: "Maureen is a medical laboratory scientist and antimicrobial resistance (AMR) advocate with extensive experience in implementing AMR capacity-building programs across schools, universities, and professional networks. Recognized as a ReAct Africa champion, she leads operations and strategic partnerships at Impala Healthtech Research Limited, ensuring high-impact project delivery and community engagement."
    },
    {
      id: 3,
      name: "Paul Kakande",
      role: "Co-founder & Chief Technology Officer",
      badge: "CTO & Co-Founder",
      image: paulImg,
      bio: "Paul is a pharmacist and AI specialist who leads platform architecture and machine learning integration for DIGAMS and other Impala technologies. He combines expertise in pharmaceutical systems and data science to design intelligent, interoperable platforms that strengthen clinical decision-making and antibiotic stewardship across care levels."
    },
    {
      id: 4,
      name: "Mark Collins Lusiba",
      role: "Technical Product Manager, DIGAMS",
      badge: "Product Manager",
      image: collinsImg,
      bio: "Lusiba holds dual degrees in Computer Science and Biomedical Sciences and leads backend development and systems engineering for DIGAMS. He bridges clinical and technical perspectives to ensure that DIGAMS remains reliable, secure, and responsive to real-world healthcare challenges."
    },
    {
      id: 5,
      name: "Dr. Irene Nakiyingi",
      role: "Marketing Lead",
      badge: "Marketing Lead",
      image: ireneImg,
      bio: "Dr. Irene Nakiyingi is a medical doctor, trained marketer, and computer scientist, bringing a rare blend of clinical insight, strategic communications, and technical acumen to Impala Healthtech Research Limited. In her role, she leads all marketing initiatives — from brand strategy and user engagement to product outreach and community education. Irene ensures our health technologies resonate with clinicians, policy makers, and end users alike, driving adoption and impact in both local and regional health ecosystems."
    },
    {
      id: 6,
      name: "Namata Haula Muanaisha",
      role: "UX, AI and Integrations Lead",
      badge: "UX & AI Lead",
      image: namataImg,
      bio: "Haula is a creative front-end designer specializing in intuitive and empathetic user interfaces for the health sector. She designed the UI for DIGAMS and THIVA, ensuring accessibility, usability, and a seamless experience for healthcare workers and community users."
    },
    {
      id: 7,
      name: "Ronald Sserunjogi",
      role: "Sales Lead",
      badge: "Sales Lead",
      image: ronaldImg,
      bio: "Ronald Sserunjogi is a pharmacist with a strong background in pharmaceutical operations, sales, and client relations. He leads Impala Healthtech Research Limited's sales operations, driving customer acquisition and engagement across healthcare facilities, pharmacies, and community networks. Ronald plays a key role in expanding access to Impala's digital health solutions and building strong partnerships that support sustainable growth and health impact."
    },
    {
      id: 8,
      name: "Bawoomya Christine Audrey",
      role: "Quality Assurance Lead",
      badge: "QA Lead",
      image: audreyImg,
      bio: "Christine leads Impala's quality management and assurance processes. She spearheaded the company's ISO certification efforts, developed internal quality management systems, and integrates customer feedback into actionable insights that improve product and operational excellence."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Who We Are</h1>
              <p className="text-xl text-primary-foreground/90">
                Impala Healthtech Research Limited - building a strong evidence base for health technology solutions using strong research methodologies.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Impala Healthtech Research Limited</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded with a sole purpose of building a strong evidence base for internally and externally designed health technology solutions using strong research methodologies, as a means of achieving sustainably impactful health technology interventions.
                </p>
                <div className="bg-accent/10 p-6 rounded-lg">
                  <p className="text-lg font-semibold">
                    We are a multidisciplinary team of passionate young professionals supported by a team of highly experienced non executive directors.
                  </p>
                </div>
              </div>
              <div className="animate-slide-up">
                <img 
                  src={teamImg} 
                  alt="Impala Healthtech Team"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Foundation</h2>
              <p className="text-xl text-muted-foreground">
                Driven by evidence, guided by purpose
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border rounded-xl p-8 animate-slide-up">
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To build a strong evidence base for health technology solutions using rigorous research methodologies, enabling sustainably impactful healthcare interventions.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="h-14 w-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To be the leading research organization that transforms healthcare through evidence-based health technology solutions across Africa and beyond.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Team</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Multidisciplinary Professionals</li>
                  <li>• Experienced Non-Executive Directors</li>
                  <li>• Passionate Young Researchers</li>
                  <li>• Evidence-Based Approach</li>
                  <li>• Collaborative Partnerships</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Success in 1 Year</h2>
              <p className="text-xl text-muted-foreground">
                Measurable impact through evidence-based solutions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-card border rounded-xl p-8 animate-slide-up">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-4">2</div>
                <div className="text-lg text-muted-foreground">Health technology solutions built to scale</div>
              </div>
              <div className="text-center bg-card border rounded-xl p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="text-4xl lg:text-5xl font-bold text-accent mb-4">4</div>
                <div className="text-lg text-muted-foreground">Companies supported in their product development journey</div>
              </div>
              <div className="text-center bg-card border rounded-xl p-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-4">5</div>
                <div className="text-lg text-muted-foreground">Research projects with 3 publications</div>
              </div>
            </div>
          </div>
        </section>

        {/* Board Members Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Board Members</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Strategic oversight and governance from experienced leaders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <BoardCard
                name="Prof. Abuelgasim A.A. Ahmed"
                role="Board Chair"
                image={profAbuelImg}
                bio={`Prof. Abuelgasim Abdalla Adam Ahmed is an environmental governance and natural resource management expert with over three decades of experience in academia, research, and field-based interventions. Formerly with the University of Zalingei's Faculty of Forestry Sciences, he has specialized in participatory and community-centered approaches to sustainable natural resource use, climate resilience, and peacebuilding in conflict-affected regions.

Prof. Adam has contributed as an expert to the United Nations Environment Programme (UNEP), co-authoring technical publications such as Community Environmental Action Planning: A Handbook for Practitioners in Sudan and Environmental Governance in Sudan: An Expert Review. His scholarship and field engagement reflect a strong commitment to linking environmental sustainability with social stability and development.

As Chair of our Board, Prof. Adam brings this systems perspective to guide the company's governance and long-term strategy. His expertise ensures that our innovations in health technology are not only technically and commercially viable but also socially inclusive, sustainable, and responsive to the wider challenges of climate vulnerability, governance, and community resilience. His leadership strengthens our mission to embed health innovation within the broader ecosystem of sustainable development.`}
              />

              <BoardCard
                name="Dr. David Musoke"
                role="Non-Executive Director"
                image={profDavidImg}
                bio={`Dr. David Musoke is an Associate Professor at Makerere University School of Public Health (MakSPH), specializing in disease control and environmental health. He holds a BSc in Environmental Health Sciences from Makerere University, an MSc in International Primary Health Care from the University of London, and a PhD in Public Health from Cardiff Metropolitan University.

As Chair of MakSPH's Grants & Research Capacity Building Committee and Coordinator of its Water, Sanitation, and Hygiene (WASH) short course, he plays a pivotal role in advancing institutional research capability. Dr. Musoke's research spans malaria prevention, environmental health, health systems strengthening—particularly Community Health Workers (CHWs)—One Health, and antimicrobial resistance.

He has organized landmark events including the first International Symposium on CHWs (2017) and the IFEH World Academic Conference (2019) in Uganda. He currently serves as President-Elect of the International Federation of Environmental Health (IFEH) for 2026–2028. Additionally, he is an Affiliate Member of the African Academy of Sciences (2022–2026), Co-Chair of Health Systems Global's CHWs Working Group, and an Academic Editor for leading journals such as BMC Public Health and PLOS Global Public Health.

Dr. Musoke's dynamic leadership, robust research portfolio, and global engagements make him a vital contributor to our board's strategic vision.`}
              />

              <BoardCard
                name="Dr. Alimah Komuhangi"
                role="Non-Executive Director"
                image={alimahImg}
                bio={`Alimah is the current dean at Afiya na Haki Institute. She is a results-driven Public Health Specialist and Monitoring and Evaluation Expert with 19 years of experience in health professions education, research, community practice, and healthcare service delivery. She holds two Master's degrees in Management Studies and Public Health, a postgraduate diploma in M & E, Bachelor of Sciences in Public Health and an Advanced Diploma in Orthopedic medicine.

She is a doctoral candidate at Central University of Nicaragua (UCN), Managua, in association with Texila American University (TAU), a South American-based University. Her doctoral research focuses on Sexual and Reproductive Health Education for Adolescent Girls and Young Women (AGYW) in resource-limited settings in Africa. She has supervised and mentored over 200 undergraduate and master's students from Uganda, Somalia, Nigeria, Sierra Leone, and Tanzania, and has authored 14 publications in peer-reviewed journals.

Throughout her career, she has led interdisciplinary projects influencing national health policies, including contributions to national immunisation campaigns and Uganda's costed National HIV/AIDS Strategic Plan as a social support and protection expert. She is also an alumna of the Higher Education Resource Services, East Africa (HERS-EA) 3rd Academy.

As a member of the Board of Directors at Impala Healthtech Research Limited, Alimah brings visionary leadership and a wealth of experience in public health, research, and monitoring and evaluation. Her expertise in policy influence, multidisciplinary training, and strategic program design strengthens the board's ability to guide the company's growth, foster evidence-driven innovations, and shape health solutions that respond to Africa's most pressing challenges.`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BoardCard
                name="Dr. Hiromu Yakura"
                role="Non-Executive Director"
                image={hiromuImg}
                bio={`Dr. Hiromu Yakura is a researcher at the intersection of machine learning and human–computer interaction, with extensive experience in designing interactive systems that bridge the gap between humans and imperfect AI models. He is currently a Postdoctoral Researcher at the Max Planck Institute for Human Development's Center for Humans and Machines in Berlin, and also serves as a Visiting Researcher at Osaka Metropolitan University and Mercari R4D.

Dr. Yakura earned his Ph.D. in Computer Science from the University of Tsukuba, where his doctoral work was recognized with prestigious Ph.D. fellowships from Google Research and Microsoft Research. His research explores how off-the-shelf AI tools and large language models can be adapted to augment human creativity, improve decision-making, and strengthen real-world applications in healthcare and beyond.

With over 40 peer-reviewed publications and multiple contributions to leading conferences such as CHI, Dr. Yakura brings cutting-edge expertise in human-AI collaboration, creativity support systems, and applied AI design. His insights guide our strategy in leveraging AI responsibly to build scalable, human-centered health technologies.`}
              />

              <BoardCard
                name="Ms. Ritah Nabukeera"
                role="Non-Executive Director"
                image={ritahImg}
                bio={`Ritah Nabukeera is a seasoned commercial executive with extensive experience in international trade and investment. She currently serves as the Trade and Investment Advisor (Sector and Market Access Lead) at the British High Commission in Uganda, under the UK Department for Business and Trade. In this role, Ritah leads efforts to expand market access, shape investment strategies, manage portfolios, and drive trade policy across high-value sectors. She has played a pivotal role in fostering economic partnerships and facilitating business opportunities between the United Kingdom and Uganda, with a particular focus on the health sector.

Ritah holds a Master of Business Administration (MBA) from Edinburgh Business School, Heriot-Watt University. She also holds a Bachelor's degree in Industrial Engineering and Management, and has completed interdisciplinary certifications in Global Business Management from the London School of Business and Finance, UK. She offers strategic business development insights to the board and management, ensuring self sustainability of the innovative products and the company.`}
              />

              <BoardCard
                name="Ms. Awino Mercy"
                role="Non-Executive Director"
                image={mercyAwinoImg}
                bio={`Mercy Awino is a lawyer and human rights advocate. She is currently an LLM Candidate (International Law) at the University of Johannesburg, having completed her LLB from Makerere University and a postgraduate diploma in Legal Studies from the Law Development Center.

She worked at the Personal Data Protection Office of Uganda - where she advised data controllers and data processing entities on data protection and privacy issues, conducted training on the principles of data protection and supported investigations of complaints brought before the Office.

Notably, she contributed to the working group to develop the course content for the Advanced Short Course On Digital Health offered by Afya na Haki.

Her work and academic interests in international human rights and humanitarian law seek to not only advocate for protection of individuals, but also interrogate the implications of emerging technologies and data in various fields including health. She offers critical legal, and ethical insights in data protection, intellectual property and general compliance.`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <BoardCard
                name="Dr. Chraish Miiro"
                role="CEO, Executive Director"
                image={chraishImg}
                bio={`Chraish Miiro is a registered pharmacist and published health technology researcher and innovator, specializing in the design and deployment of digital health solutions in low-income settings. He served as Head of Research and Development at MobiKlinic for three years, leading the design and deployment of digital community health tools that reached over 150,000 people. Earlier, he coordinated the deployment of pharmacovigilance tools among people living with HIV, generating over 10,000 adverse reaction reports for the National Drug Authority.

In 2024, he represented the digital health constituency on the WHO Civil Society Commission and continues to serve as a regional digital health opinion leader. He is an active member of expert groups shaping digital health policy and strategy across the region.`}
              />

              <BoardCard
                name="Ms. Maureen Kisaakye"
                role="COO, Executive Director"
                image={maureenImg}
                bio={`Maureen Kisaakye, our COO, has a background in Medical Laboratory Science that strengthens our ability to innovate and drive meaningful change in AMR through improving diagnosis using our digital Laboratory market place. With over four years of experience in research and community engagement, she has developed a hands-on approach to AMR advocacy, actively empowering youth as AMR ambassadors and educating communities about infection prevention. As a member of the National Executive Committee of the Uganda Medical Laboratory Professionals Association, she also plays a pivotal role in shaping policy and advancing medical laboratory standards, ensuring a strong foundation for sustainable AMR interventions through facilitating quality of microbiological diagnosis.`}
              />

              <BoardCard
                name="Dr. Paul Kakande"
                role="CTO, Executive Director"
                image={paulImg}
                bio={`Paul Kakande is co-founder, CTO and executive director at Impala Healthtech Research Limited. A pharmacist and bioinformatician, Paul has critically contributed to the design and development of data systems for leading research institutions such as the Uganda Cancer institution. He has laid data pipelines for DIGAMS that enable automated data ingestion and streaming, to facilitate adoptive learning and continuous reliability of infection treatment recommendations.`}
              />
            </div>
          </div>
        </section>

        {/* Our Leadership Team */}
        <LeadershipTeam members={leadershipTeam} />

        {/* About Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center animate-fade-in">
                Our Approach
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground animate-slide-up">
                <p>
                  At Impala Healthtech Research, we believe that sustainable impact in healthcare can only be achieved through rigorous evidence generation. Our multidisciplinary team combines expertise in health systems, economics, pharmaceutics, and technology to create solutions that truly work.
                </p>
                <p>
                  We conduct both explorative and evaluative research, ensuring that every health technology solution we develop or assess is backed by solid scientific evidence. This approach enables us to guide the design, development, and deployment of transformative healthcare technologies.
                </p>
                <p>
                  Our commitment to evidence-based methodology sets us apart, ensuring that the health technology interventions we support have the highest potential for sustainable, scaled impact in improving healthcare outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
