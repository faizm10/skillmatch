const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample hackathons
  const hackathons = [
  {
    title: "Hack the 6ix 2025",
    description:
      "Toronto's largest summer student-run hackathon—build, collaborate, and innovate over a 36‑hour weekend at York University.",
    date: "2025-07-18T09:00:00Z",
    endDate: "2025-07-20T18:00:00Z",
    location: "Toronto, ON (York University)",
    status: "Open for Registration",
    theme: "General Innovation",
    maxParticipants: 500,
    prizes: ["$15 k in prizes", "Mentorship", "Tech swag"],
    rules: "Open to all. Students form teams of up to 4 and build during the event weekend.",
    organizers: ["Hack the 6ix"],
    sponsors: ["Deloitte", "Microsoft Reactor", "NordVPN"]
  },
  {
    title: "Hack the North 2025",
    description:
      "Canada’s largest collegiate hackathon—36 hours of building, workshops, and mentorship for over 1,000 hackers at University of Waterloo.",
    date: "2025-09-12T09:00:00Z",
    endDate: "2025-09-14T18:00:00Z",
    location: "Waterloo, ON (University of Waterloo)",
    status: "Open for Registration",
    theme: "General Innovation",
    maxParticipants: 1000,
    prizes: ["Grand prizes", "Scholarships", "Industry mentorship"],
    rules: "Students only; teams up to 4; all projects must be built during the hackathon.",
    organizers: ["Hack the North"],
    sponsors: ["Amazon", "Shopify", "RBC", "Jane Street"]
  },
  {
    title: "TerraHacks 2025",
    description:
      "A sustainability-themed hackathon focused on green tech—36 hours of building eco-friendly solutions at Toronto Metropolitan University.",
    date: "2025-08-01T09:00:00Z",
    endDate: "2025-08-03T18:00:00Z",
    location: "Toronto, ON (Toronto Metropolitan University)",
    status: "Open for Registration",
    theme: "Environmental Technology",
    maxParticipants: 300,
    prizes: ["Incubator support", "Eco-tech grants", "Mentorship"],
    rules: "All skill levels welcome; teams of up to 4; projects must address sustainability.",
    organizers: ["TerraHacks"],
    sponsors: ["TMU", "Sustainable City Partners"]
  }
];


  for (const hackathonData of hackathons) {
    const hackathon = await prisma.hackathon.create({
      data: hackathonData
    });
    console.log(`✅ Created hackathon: ${hackathon.title}`);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 