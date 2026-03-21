import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const base = import.meta.env.BASE_URL
const img = {
  hero: `${base}images/hero-endorsements.jpg`,
  jeffreyRobbins:     `${base}images/endorsement-jeffrey-robbins.jpg`,
  christineWhitlock:  `${base}images/endorsement-christine-whitlock.jpg`,
  danMartillotti:     `${base}images/endorsement-dan-martillotti.jpg`,
  joelHarper:         `${base}images/endorsement-joel-harper.jpg`,
  amarRama:           `${base}images/endorsement-amar-rama.jpg`,
  benCoble:           `${base}images/endorsement-ben-coble.jpg`,
  neilMcGlennon:      `${base}images/endorsement-neil-mcglennon.jpg`,
  stefanEstrada:      `${base}images/endorsement-stefan-estrada.jpg`,
  scottPhillips:      `${base}images/endorsement-scott-phillips.jpg`,
  randallGibson:      `${base}images/endorsement-randall-gibson.jpg`,
  beckyLewis:         `${base}images/endorsement-becky-lewis.jpg`,
  johnMilitello:      `${base}images/endorsement-john-militello.jpg`,
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section
      className="relative flex h-[70vh] w-full flex-col overflow-hidden"
      aria-label="Endorsements hero"
    >
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={img.hero}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full flex-col justify-between pl-8 pr-6 pb-8 pt-14 md:pl-16 md:pr-12 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">

        {/* Upper-left: intro quote */}
        <div>
          <h1 className="relative max-w-[260px] text-[1.5rem] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[1.75rem] md:text-[2.75rem] md:leading-[1.1] md:tracking-[-0.04em] md:max-w-[600px]">
            <span
              className="absolute -top-10 -left-3 select-none text-[10rem] leading-none text-white/[0.15] md:-top-16 md:-left-4 md:text-[18rem]"
              aria-hidden
            >
              &ldquo;
            </span>
            <em className="relative z-10">
              I've been fortunate to work with some exceptional people who've generously shared their feedback.
            </em>
          </h1>
        </div>

        {/* Bottom-left: tagline */}
        <div className="flex flex-col gap-0 text-[1.5rem] font-bold leading-tight text-white/80 md:text-[2rem]">
          <span>—</span>
          <span>Colleagues.</span>
          <span>Partners.</span>
          <span>Advocates.</span>
        </div>

      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Endorsement card
// ---------------------------------------------------------------------------

interface EndorsementProps {
  avatar: string
  name: string
  title: string
  paragraphs: string[]
}

function Endorsement({ avatar, name, title, paragraphs }: EndorsementProps) {
  return (
    <div className="flex flex-col gap-5 border-t border-neutral-200 pt-10">
      {/* Attribution */}
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-neutral-900">{name}</span>
          <span className="text-xs font-light text-neutral-500">{title}</span>
        </div>
      </div>
      {/* Quote */}
      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base font-light leading-[26px] text-neutral-700">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

function Body() {
  return (
    <div className="bg-[#f9fafb] px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20 lg:pt-24 lg:pb-24">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-10">

        <Endorsement
          avatar={img.joelHarper}
          name="Joel D Harper"
          title="Digital Product Leader at Apple"
          paragraphs={[
            "I had the privilege to work with Franck on a recent project that we co-led together. Franck brought a lot of skill and passion to the team and was instrumental in the projects success. Franck has excellent qualitative and quantitative data experience and a fantastic eye for UX design. He does a great job of breaking down complex digital experiences into disparate elements and then reformatting those elements into better experiences. He also does a great job of thinking about how to maintain designs so teams can scale his design concepts into other global regions with slightly different UX engagement patterns.",
            "His skill and experience are awesome but my favorite part about Franck is how good a human he is. He is a natural leader and is always putting other people on the team first. He is caring and thoughtful and wants to ensure that everyone is not only working hard but enjoying themselves as well. He is the first person to check on others to see how they're doing/feeling and if there is anything he can do to help. This creates trust and increases team happiness and collaboration. Interpersonal relationships can be tricky but he navigates these situations with style and grace.",
          ]}
        />

        <Endorsement
          avatar={img.danMartillotti}
          name="Dan Martillotti"
          title="VP of Product Management at SailPoint"
          paragraphs={[
            "Franck did a wonderful job of creating a UX culture when he joined the SailPoint. The UX team was a loose group of designers - Franck helped introduce structure and a collaborative environment. He worked to balance the urgent with the strategic. He lead the team in updating and refining the design library. He worked across teams to help build an understanding of the value of UX. His efforts lead to the UX designers being involved earlier and earlier in the product requirements definition process. He introduced UX research and built a team. Franck is a good and caring leader. Every conversation we've had is interesting and insightful.",
            "Franck would be an excellent addition to any UX team.",
          ]}
        />

        <Endorsement
          avatar={img.jeffreyRobbins}
          name="Jeffrey Robbins"
          title="Sr. UX Researcher at SailPoint"
          paragraphs={[
            "Franck's maturity in UX principles, psychology, and strategy is highly sophisticated. But you would expect that from the background of experiences in his profile. What is highly differentiating is his approach to people leadership and the inclusion of empathy not only in his craft but also his leadership. Ask him the three topical areas he prioritizes for a 1:1 discussion. I still remember hearing his approach during the interview process and being absolutely convinced that this was a leader and mentor I wanted to personally associate. He takes risks, trusts his employees, is very well read, and truly cares for everyone he interacts. Whether it was sharing a personal blog post on imposter syndrome in design on my first week or the perfect text citation to complement what the team needed for that day and week's challenges, Franck has a great ability to read the social context and motivate those around him with supporting, challenging, and often novel advice.",
          ]}
        />

        <Endorsement
          avatar={img.amarRama}
          name="Amar Rama"
          title="Senior Vice President Product Management at BackBox"
          paragraphs={[
            "I worked with Franck at SailPoint. I recall when Franck first joined SailPoint, we had a small and spirited crew of UX designers. I admired Franck's ability to balance the urgent with the important. When the team is small and the debt list is large, it is easy to spent 98% of your time in just execution. It is rewarded and everyone sees the results. The downside of course is that you are constantly bailing the boat but not plugging the hole. Franck was great at finding time and ways to invest in building a center that could hold and grow. Creating a UX culture and process. Looking for opportunities to understand and inspire the UX talent. He was just as keen in educating the rest of the management on how Usability should be approached. In my opinion, this went a long way in helping SailPoint over the next several years.",
            "Franck is thoughtful, well read, patient and a high EQ UX leader. He is excellent at connecting, attracting, retaining, and growing UI, UX talent. If you are looking for a user experience / usability change agent, leader — give Franck a call.",
          ]}
        />

        <Endorsement
          avatar={img.neilMcGlennon}
          name="Neil McGlennon"
          title="Global Field CTO at SailPoint"
          paragraphs={[
            "Franck is an innovative and insightful thought leader with a passion for user-centric design, in all mediums. He is no stranger to tackling complex problems and breaking them down into simple yet sophisticated solutions, and looking at things through a different lens than we're accustomed. It was always delightful to work alongside Franck — brainstorming, white-boarding, and coming up with creative concepts to be further validated by user studies. Through Franck's leadership, our user experience has grown tremendously, and I appreciate all of his efforts. Every mature product needs someone as dedicated as Franck on their team!",
          ]}
        />

        <Endorsement
          avatar={img.stefanEstrada}
          name="Stefan Estrada"
          title="Senior Engineering Manager at SailPoint"
          paragraphs={[
            "It is my pleasure to recommend Franck. As a UI engineering manager, I worked closely with him at SailPoint on initiatives to improve the product's user experience and modernize its UI. Franck was instrumental in driving the product's UX vision and always thinking deeply about how to improve the experience for our customers. Under his leadership, we were able to make many strides in improving the customer experience and have common design language. Working alongside him has been a privilege, and I can confidently say he would be an invaluable asset to any organization aiming for design excellence.",
          ]}
        />

        <Endorsement
          avatar={img.randallGibson}
          name="Randall Gibson"
          title="Director of Growth at Matillion"
          paragraphs={[
            "Franck is constantly questioning the status quo and pushing the boundaries of what's possible. He is a design thinker who utilizes his strong quantitative and qualitative skills to inspire innovative ideas. When I worked with Franck, I always found myself collaborating towards better ideas personally and professionally.",
            "What was great about him is that he is always thinking long-term about how to deliver value to human beings. In my eyes, this is what our innovators, consultants, and executives overlook. We lose focus on short term outcomes like dollar signs and revenue and forget that delivering long term value to human beings is what brings us the revenue.",
            "Franck will make those revenue driven types uncomfortable but we need minds like Franck if we desire sustained success in a world full of QBRs.",
            "He is an avid learner and always positive and those are two things you can't coach.",
          ]}
        />

        <Endorsement
          avatar={img.johnMilitello}
          name="John Militello"
          title="Head of Creative at Google"
          paragraphs={[
            "In my role at Google I get to meet with some of the world's best creative technologists and I can honestly say Franck Hoffmann is in the top five. Franck exemplifies the title: digital technologist. Beyond his development knowledge Franck has an eye for design and is highly creative.",
            "The work he has done for Art + Commerce is not only beautiful but functional — and THAT is beautiful. When you boil it down, Franck has the ability to develop ideas that manifest themselves in smart ways while expressing them through beauty and simplicity. His thoughtful designs are inviting, approachable and intuitive.",
            "Relentless in his pursuit of great, Franck is never satisfied with just great, he wants better than great. He always pushes for the very best outcome, every time. Franck balances the unrestrained use of technology with the bandwidth of the user, always leading to an outstanding outcome.",
            "A wonderful photographer and dedicated dad, Franck understands humanity as well as technology, and that makes all the difference.",
          ]}
        />

        <Endorsement
          avatar={img.christineWhitlock}
          name="Christine Whitlock"
          title="Sr. Product Manager at SailPoint"
          paragraphs={[
            "Franck is a passionate, thoughtful UX leader. Working alongside him to understand business problems was thought-provoking, as he was always trying to challenge my way of thinking as a product manager to understand different points of view.",
            "In addition to his design expertise, Franck was one of the first people to reach out and congratulate me on a promotion into people management and offered tips and support in my new venture. I truly appreciated his offer without even having to ask and will always remember his outreach and interest in helping others.",
          ]}
        />

        <Endorsement
          avatar={img.scottPhillips}
          name="Scott Phillips"
          title="Staff Software Engineer at SailPoint"
          paragraphs={[
            "Franck has a wealth of experience with UX principles, and he is a master at breaking down complex problems into their core issues. He is also an excellent communicator and facilitator, and he is able to get everyone on the same page quickly and easily.",
            "I was particularly impressed with Franck's ability to frame problems in a way that made them easy to understand for everyone involved. He has a knack for identifying the root cause of an issue and then communicating that to the team in a way that everyone can understand. This ability has been invaluable in helping us to solve some of our most challenging UX problems.",
          ]}
        />

        <Endorsement
          avatar={img.benCoble}
          name="Ben Coble"
          title="Staff UI Developer at SailPoint"
          paragraphs={[
            "I highly recommend Franck as a UX partner and leader. He always brings a spirit of collaboration and open ideation to every meeting. It was great to see the wonderful progress that SailPoint achieved under his guidance and I would happily work with him again in the future. As an engineer, it was great to see my input well received and understood by my UX partner.",
            "I know any company would be lucky and happy to have Franck as part of their team. Best of luck in your future endeavors Franck!",
          ]}
        />

        <Endorsement
          avatar={img.beckyLewis}
          name="Becky Lewis"
          title="VP at Art + Commerce"
          paragraphs={[
            "Franck is a creative and a technician who is always able to find unexpected and valuable ways to solve problems elegantly. He makes things happen and is a great member of the team.",
          ]}
        />

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Endorsements() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Body />
      </main>
      <Footer />
    </div>
  )
}
