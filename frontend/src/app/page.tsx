import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GitFork, Sparkles, Rocket } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white dark:bg-gray-950">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 dark:border-gray-800">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Sparkles className="h-6 w-6 text-gray-900 dark:text-gray-50" />
          <span className="sr-only">SkillMatch</span>
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-50">SkillMatch</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            prefetch={false}
          >
            How it Works
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            prefetch={false}
          >
            Contact
          </Link>
          <Button asChild size="sm" className="px-4 py-2 text-sm font-medium">
            <Link href="#">Sign In</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-gray-50 leading-tight">
                Find Your Dream Hackathon Team. Instantly.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                SkillMatch connects students and developers with compatible teammates based on skills, interests, and
                project goals. Stop searching, start building.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center pt-4">
                <Button asChild size="lg" className="px-8 py-3 text-lg font-semibold">
                  <Link href="#">Join SkillMatch</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent"
                >
                  <Link href="#">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="mt-16">
              <Image
                src="/placeholder.svg?height=500&width=900"
                width={900}
                height={500}
                alt="SkillMatch Dashboard Preview"
                className="mx-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
                  How SkillMatch Works
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-lg dark:text-gray-400">
                  Our intelligent platform simplifies team formation, so you can focus on innovation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-16 lg:grid-cols-3">
              <Card className="flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <Users className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                  <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Create Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Highlight your skills, interests, and past projects. Let your expertise shine.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <GitFork className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                  <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Get Matched Smartly
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Our GraphQL engine finds your ideal teammates based on compatibility.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <Rocket className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                  <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Build & Innovate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Connect, collaborate, and create something amazing at your next hackathon.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
                For Hackathon Organizers
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                Empower your participants to form stronger, more effective teams, leading to better projects and a more
                successful event.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <Users className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                    <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
                      Streamlined Team Formation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Reduce friction in team building, allowing participants to quickly find compatible partners and
                      focus on coding.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <Sparkles className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                    <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
                      Higher Quality Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Well-matched teams lead to better collaboration, more innovative ideas, and polished final
                      projects.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <Rocket className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                    <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
                      Boost Participant Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      A positive team-finding experience enhances the overall hackathon journey for every participant.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <GitFork className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                    <CardTitle className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
                      Seamless Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Easy to introduce to your hackathon, providing a valuable tool without adding complexity.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
              <Button asChild size="lg" className="px-8 py-3 text-lg font-semibold mt-12">
                <Link href="#">Partner with Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
              What Our Users Say
            </h2>
            <p className="max-w-[700px] mx-auto mt-4 text-gray-600 md:text-lg dark:text-gray-400">
              Hear from developers and students who found their perfect team with SkillMatch.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <Card className="p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="space-y-4">
                  <p className="text-lg italic text-gray-700 dark:text-gray-300">
                    &quot;SkillMatch saved my hackathon! Found a brilliant backend dev in minutes. Highly
                    recommend.&quot;
                  </p>
                  <div className="font-semibold text-gray-900 dark:text-gray-50">- Alex P., Student Developer</div>
                </CardContent>
              </Card>
              <Card className="p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="space-y-4">
                  <p className="text-lg italic text-gray-700 dark:text-gray-300">
                    &quot;The matching algorithm is spot on. No more random teams, just pure compatibility.&quot;
                  </p>
                  <div className="font-semibold text-gray-900 dark:text-gray-50">- Sarah L., Software Engineer</div>
                </CardContent>
              </Card>
              <Card className="p-6 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="space-y-4">
                  <p className="text-lg italic text-gray-700 dark:text-gray-300">
                    &quot;Finally, a platform that understands hackathon needs. The messaging feature is a
                    game-changer.&quot;
                  </p>
                  <div className="font-semibold text-gray-900 dark:text-gray-50">- Chris T., Hackathon Organizer</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
                Ready to Find Your Team?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                Join SkillMatch today and unlock your hackathon potential.
              </p>
              <Button asChild size="lg" className="px-10 py-4 text-xl font-semibold mt-8">
                <Link href="#">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; {"2024 SkillMatch. All rights reserved."}</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            prefetch={false}
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
