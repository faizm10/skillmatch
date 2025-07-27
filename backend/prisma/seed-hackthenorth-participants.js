const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Realistic participant data for Hack the North 2025
const participants = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@uwaterloo.ca",
    password: "password123",
    username: "sarahchen",
    bio: "Computer Science student passionate about AI/ML and building impactful solutions. Love working on projects that can make a real difference in people's lives.",
    skills: ["Python", "TensorFlow", "React", "Node.js", "Machine Learning"],
    interests: ["Artificial Intelligence", "Healthcare Technology", "Open Source", "Data Science"],
    devpost: "https://devpost.com/sarahchen",
    github: "https://github.com/sarahchen",
    linkedin: "https://linkedin.com/in/sarahchen",
    website: "https://sarahchen.dev"
  },
  {
    name: "Alex Rodriguez",
    email: "alex.rodriguez@uwaterloo.ca",
    password: "password123",
    username: "alexrodriguez",
    bio: "Software Engineering student focused on full-stack development and cloud architecture. Experienced in building scalable applications and passionate about clean code.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "AWS", "Docker"],
    interests: ["Web Development", "Cloud Computing", "DevOps", "Startups"],
    devpost: "https://devpost.com/alexrodriguez",
    github: "https://github.com/alexrodriguez",
    linkedin: "https://linkedin.com/in/alexrodriguez",
    website: "https://alexrodriguez.dev"
  },
  {
    name: "Emma Thompson",
    email: "emma.thompson@uwaterloo.ca",
    password: "password123",
    username: "emmathompson",
    bio: "Computer Engineering student with a love for hardware and embedded systems. Building the bridge between software and physical world.",
    skills: ["C++", "Python", "Arduino", "Raspberry Pi", "IoT", "Circuit Design"],
    interests: ["Hardware Hacking", "IoT", "Robotics", "Smart Cities"],
    devpost: "https://devpost.com/emmathompson",
    github: "https://github.com/emmathompson",
    linkedin: "https://linkedin.com/in/emmathompson",
    website: "https://emmathompson.dev"
  },
  {
    name: "Michael Kim",
    email: "michael.kim@uwaterloo.ca",
    password: "password123",
    username: "michaelkim",
    bio: "Data Science enthusiast and competitive programmer. Love solving complex problems and turning data into actionable insights.",
    skills: ["Python", "R", "SQL", "Tableau", "Competitive Programming", "Algorithms"],
    interests: ["Data Science", "Competitive Programming", "Analytics", "Research"],
    devpost: "https://devpost.com/michaelkim",
    github: "https://github.com/michaelkim",
    linkedin: "https://linkedin.com/in/michaelkim",
    website: "https://michaelkim.dev"
  },
  {
    name: "Priya Patel",
    email: "priya.patel@uwaterloo.ca",
    password: "password123",
    username: "priyapatel",
    bio: "UX/UI designer and frontend developer. Creating beautiful, accessible, and user-centered digital experiences.",
    skills: ["Figma", "Adobe XD", "React", "CSS", "JavaScript", "User Research"],
    interests: ["UX/UI Design", "Accessibility", "Design Systems", "User Experience"],
    devpost: "https://devpost.com/priyapatel",
    github: "https://github.com/priyapatel",
    linkedin: "https://linkedin.com/in/priyapatel",
    website: "https://priyapatel.design"
  },
  {
    name: "David Wilson",
    email: "david.wilson@uwaterloo.ca",
    password: "password123",
    username: "davidwilson",
    bio: "Cybersecurity student and ethical hacker. Passionate about securing the digital world and teaching others about security.",
    skills: ["Python", "Network Security", "Penetration Testing", "Cryptography", "Linux"],
    interests: ["Cybersecurity", "Ethical Hacking", "Privacy", "Digital Forensics"],
    devpost: "https://devpost.com/davidwilson",
    github: "https://github.com/davidwilson",
    linkedin: "https://linkedin.com/in/davidwilson",
    website: "https://davidwilson.security"
  },
  {
    name: "Lisa Zhang",
    email: "lisa.zhang@uwaterloo.ca",
    password: "password123",
    username: "lisazhang",
    bio: "Mobile app developer and entrepreneur. Building apps that solve real problems and create meaningful connections.",
    skills: ["Swift", "Kotlin", "React Native", "Firebase", "App Store Optimization"],
    interests: ["Mobile Development", "Startups", "Product Management", "User Growth"],
    devpost: "https://devpost.com/lisazhang",
    github: "https://github.com/lisazhang",
    linkedin: "https://linkedin.com/in/lisazhang",
    website: "https://lisazhang.dev"
  },
  {
    name: "James O'Connor",
    email: "james.oconnor@uwaterloo.ca",
    password: "password123",
    username: "jamesoconnor",
    bio: "Blockchain developer and DeFi enthusiast. Building the future of decentralized finance and Web3 applications.",
    skills: ["Solidity", "JavaScript", "Web3.js", "Ethereum", "Smart Contracts"],
    interests: ["Blockchain", "DeFi", "Web3", "Cryptocurrency", "Decentralization"],
    devpost: "https://devpost.com/jamesoconnor",
    github: "https://github.com/jamesoconnor",
    linkedin: "https://linkedin.com/in/jamesoconnor",
    website: "https://jamesoconnor.eth"
  },
  {
    name: "Nina Johnson",
    email: "nina.johnson@uwaterloo.ca",
    password: "password123",
    username: "ninajohnson",
    bio: "Game developer and 3D artist. Creating immersive experiences that tell stories and bring joy to players.",
    skills: ["Unity", "C#", "Blender", "3D Modeling", "Game Design", "Animation"],
    interests: ["Game Development", "3D Art", "Virtual Reality", "Storytelling"],
    devpost: "https://devpost.com/ninajohnson",
    github: "https://github.com/ninajohnson",
    linkedin: "https://linkedin.com/in/ninajohnson",
    website: "https://ninajohnson.games"
  },
  {
    name: "Carlos Martinez",
    email: "carlos.martinez@uwaterloo.ca",
    password: "password123",
    username: "carlosmartinez",
    bio: "Backend developer and database specialist. Building robust, scalable systems that power modern applications.",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Microservices", "Kubernetes"],
    interests: ["Backend Development", "Database Design", "System Architecture", "Performance Optimization"],
    devpost: "https://devpost.com/carlosmartinez",
    github: "https://github.com/carlosmartinez",
    linkedin: "https://linkedin.com/in/carlosmartinez",
    website: "https://carlosmartinez.dev"
  },
  {
    name: "Aisha Rahman",
    email: "aisha.rahman@uwaterloo.ca",
    password: "password123",
    username: "aisharahman",
    bio: "Computer vision researcher and ML engineer. Working on AI systems that can see and understand the world around us.",
    skills: ["Python", "OpenCV", "PyTorch", "Computer Vision", "Deep Learning", "NLP"],
    interests: ["Computer Vision", "Machine Learning", "AI Ethics", "Research"],
    devpost: "https://devpost.com/aisharahman",
    github: "https://github.com/aisharahman",
    linkedin: "https://linkedin.com/in/aisharahman",
    website: "https://aisharahman.ai"
  },
  {
    name: "Ryan Park",
    email: "ryan.park@uwaterloo.ca",
    password: "password123",
    username: "ryanpark",
    bio: "DevOps engineer and cloud architect. Automating everything and building resilient infrastructure for modern applications.",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Linux"],
    interests: ["DevOps", "Cloud Computing", "Automation", "Infrastructure as Code"],
    devpost: "https://devpost.com/ryanpark",
    github: "https://github.com/ryanpark",
    linkedin: "https://linkedin.com/in/ryanpark",
    website: "https://ryanpark.dev"
  },
  {
    name: "Sophie Anderson",
    email: "sophie.anderson@uwaterloo.ca",
    password: "password123",
    username: "sophieanderson",
    bio: "Full-stack developer and tech community organizer. Passionate about mentoring and building inclusive tech communities.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "GraphQL", "Community Building"],
    interests: ["Community Building", "Mentorship", "Diversity in Tech", "Open Source"],
    devpost: "https://devpost.com/sophieanderson",
    github: "https://github.com/sophieanderson",
    linkedin: "https://linkedin.com/in/sophieanderson",
    website: "https://sophieanderson.dev"
  }
];

async function main() {
  console.log('🌱 Starting Hack the North participants seed...');

  // First, find the Hack the North hackathon
  const hackTheNorth = await prisma.hackathon.findFirst({
    where: {
      title: "Hack the North 2025"
    }
  });

  if (!hackTheNorth) {
    console.error('❌ Hack the North 2025 hackathon not found. Please run the main seed first.');
    return;
  }

  console.log(`✅ Found Hack the North hackathon with ID: ${hackTheNorth.id}`);

  // Create participants and join them to Hack the North
  for (const participantData of participants) {
    try {
      // Create the user
      const user = await prisma.user.create({
        data: participantData
      });

      // Join the user to Hack the North
      await prisma.hackathonParticipant.create({
        data: {
          userId: user.id,
          hackathonId: hackTheNorth.id
        }
      });

      console.log(`✅ Created participant: ${user.name} (${user.username})`);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️  User ${participantData.username} already exists, skipping...`);
      } else {
        console.error(`❌ Error creating participant ${participantData.name}:`, error);
      }
    }
  }

  // Get final count
  const participantCount = await prisma.hackathonParticipant.count({
    where: {
      hackathonId: hackTheNorth.id
    }
  });

  console.log(`🎉 Successfully seeded ${participantCount} participants for Hack the North 2025!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding participants:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 