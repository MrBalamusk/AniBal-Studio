import { useEffect, useMemo, useState, type DragEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  AudioLines,
  BarChart3,
  Bot,
  Brush,
  Captions,
  Check,
  ChevronRight,
  Clapperboard,
  Coins,
  CreditCard,
  Crown,
  Film,
  FolderKanban,
  Gauge,
  ImagePlus,
  Languages,
  LayoutDashboard,
  Lock,
  Menu,
  Mic2,
  Palette,
  PanelLeft,
  Play,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
  Wand2,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Plan = {
  name: string;
  price: string;
  description: string;
  highlight?: boolean;
  features: string[];
};

type ProjectShowcase = {
  title: string;
  format: string;
  description: string;
  gradient: string;
};

type StudioNavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

const marketingLinks = [
  { label: "Pricing", to: "/pricing" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Generator", to: "/anime-generator" },
  { label: "Login", to: "/login" },
];

const studioLinks: StudioNavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Anime Generator", to: "/anime-generator", icon: Sparkles },
  { label: "Character Creator", to: "/character-creator", icon: Palette },
  { label: "Scene Builder", to: "/scene-builder", icon: Workflow },
  { label: "Voice Studio", to: "/voice-studio", icon: Mic2 },
  { label: "Video Editor", to: "/video-editor", icon: Video },
  { label: "Project Manager", to: "/project-manager", icon: FolderKanban },
  { label: "Render Studio", to: "/render-studio", icon: Clapperboard },
  { label: "User Settings", to: "/settings", icon: Settings },
  { label: "Payment System", to: "/payments", icon: CreditCard },
  { label: "Admin Panel", to: "/admin", icon: ShieldCheck },
];

const platformFeatures: Feature[] = [
  {
    title: "AI Anime Generator",
    description: "Prompt cinematic anime shots with style controls, camera presets, and mood-aware lighting.",
    icon: Sparkles,
  },
  {
    title: "Anime Character Creator",
    description: "Build reusable heroes, rivals, and supporting casts with hair, outfit, accessory, and pose controls.",
    icon: Palette,
  },
  {
    title: "Voice Over Studio",
    description: "Generate anime voiceovers, dub tracks, and voice clones with lip sync-ready outputs.",
    icon: Mic2,
  },
  {
    title: "Anime Scene Builder",
    description: "Compose scenes with drag-and-drop characters, environments, dialogue bubbles, and motion cues.",
    icon: Workflow,
  },
  {
    title: "Automatic Lip Sync",
    description: "Match phonemes to animated dialogue for Japanese and English releases without manual cleanup.",
    icon: AudioLines,
  },
  {
    title: "Background Generator",
    description: "Create streets, shrines, battlefields, classrooms, and dream worlds tailored to your scene prompt.",
    icon: ImagePlus,
  },
  {
    title: "Sound Effects Library",
    description: "Layer fight sounds, magic impacts, footsteps, ambience, and music directly into the timeline.",
    icon: Wand2,
  },
  {
    title: "AI Video Renderer",
    description: "Export anime clips, episodes, and films in 720p, 1080p, or 4K with production-safe render presets.",
    icon: Clapperboard,
  },
];

const projectShowcase: ProjectShowcase[] = [
  {
    title: "Neon Ronin",
    format: "Cyberpunk anime series",
    description: "A serialized city-night thriller generated from script beats, dubbed in two languages, and rendered in 4K.",
    gradient: "from-fuchsia-500/40 via-violet-500/20 to-cyan-400/30",
  },
  {
    title: "Sky Shrine",
    format: "Fantasy anime movie",
    description: "Feature-length project with AI storyboarding, background generation, orchestral effects, and subtitle automation.",
    gradient: "from-cyan-500/35 via-sky-500/15 to-indigo-500/30",
  },
  {
    title: "Crimson Arena",
    format: "Action episode pipeline",
    description: "Fast episode production with shonen action framing, voice cloning, combat sound design, and lip-synced dialogue.",
    gradient: "from-rose-500/35 via-orange-500/10 to-purple-500/30",
  },
];

const plans: Plan[] = [
  {
    name: "Free Plan",
    price: "$0",
    description: "Launch ideas, learn the workflow, and test scene generation.",
    features: ["Limited credits", "Watermarked exports", "Basic scene generation", "Community templates"],
  },
  {
    name: "Pro Plan",
    price: "$39",
    description: "For creators shipping shorts, trailers, and polished episodes.",
    highlight: true,
    features: ["More credits", "HD export", "Priority rendering", "Subtitle generator", "Multi-language dubbing"],
  },
  {
    name: "Studio Plan",
    price: "$129",
    description: "For teams building full anime productions at scale.",
    features: ["Unlimited renders", "4K export", "Voice cloning", "Admin controls", "Production analytics"],
  },
];

const dashboardCollections = [
  { label: "My Projects", value: "18 active", detail: "Movies, series, and trailers in progress." },
  { label: "Recent Renders", value: "7 complete", detail: "Three finished in the last 24 hours." },
  { label: "Characters", value: "46 saved", detail: "Reusable cast library with variants." },
  { label: "Scenes", value: "132 shots", detail: "Storyboard-ready scene catalog." },
  { label: "Voice Studio", value: "12 dubs", detail: "Japanese, English, and child voice packs." },
  { label: "Video Editor", value: "5 timelines", detail: "Episode cutdowns and trailer edits." },
  { label: "Templates", value: "24 packs", detail: "Battle, romance, classroom, and sci-fi kits." },
  { label: "Assets", value: "310 files", detail: "Backgrounds, SFX, music, and dialogue assets." },
  { label: "Settings", value: "Secure", detail: "JWT auth, password protection, and alerts enabled." },
];

const workspacePaths = new Set(studioLinks.map((item) => item.to));

function BrandMark() {
  return (
    <Link to="/" className="inline-flex items-center gap-3 text-white">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/50 bg-violet-500/15 text-violet-200 shadow-[0_0_30px_rgba(139,92,246,0.35)]">
        <Film className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-cyan-300/80">AI Anime Platform</span>
        <span className="block text-lg font-semibold tracking-tight">AniBal Studio</span>
      </span>
    </Link>
  );
}

function PrimaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-violet-400/60 bg-violet-500/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-300 hover:bg-violet-400/25"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function SecondaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
    >
      {children}
    </Link>
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MarketingLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.22),_transparent_38%),radial-gradient(circle_at_80%_15%,_rgba(34,211,238,0.15),_transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <BrandMark />
            <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
              {marketingLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className="transition hover:text-white">
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="hidden items-center gap-3 md:flex">
              <SecondaryButton to="/login">Login</SecondaryButton>
              <PrimaryButton to="/signup">Start Creating</PrimaryButton>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          {menuOpen ? (
            <div className="border-t border-white/10 px-6 py-4 md:hidden">
              <div className="flex flex-col gap-3">
                {marketingLinks.map((item) => (
                  <NavLink key={item.to} to={item.to} className="text-sm text-slate-200" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </NavLink>
                ))}
                <PrimaryButton to="/signup">Start Creating</PrimaryButton>
              </div>
            </div>
          ) : null}
        </header>
        <main className="relative z-10">{children}</main>
      </div>
    </PageTransition>
  );
}

function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <MarketingLayout>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-stretch gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              AniBal Studio Pipeline
            </span>
            <div className="space-y-4">
              <h1 className="max-w-lg text-5xl font-semibold tracking-tight text-white">Professional anime creation from prompt to final render.</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Generate shots, direct scenes, dub dialogue, edit timelines, and ship anime projects from one secure AI workspace.
              </p>
            </div>
          </div>
          <div className="grid gap-5 text-sm text-slate-300 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <span className="text-xs uppercase tracking-[0.24em] text-violet-200">Story</span>
              <p className="mt-2 text-white">AI Story Generator and Script Writer for episode-ready outlines.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <span className="text-xs uppercase tracking-[0.24em] text-cyan-200">Voice</span>
              <p className="mt-2 text-white">Voice cloning, lip sync, subtitle generation, and dub exports.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#091122]/85 p-8 shadow-[0_30px_120px_rgba(5,8,22,0.65)] backdrop-blur-xl">
            <div className="mb-8 space-y-2">
              <h2 className="text-3xl font-semibold text-white">{title}</h2>
              <p className="text-sm text-slate-400">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

function StudioLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const location = useLocation();

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#040712] text-white">
        <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <aside className="border-r border-white/10 bg-[#060b18] px-5 py-6">
            <div className="mb-8 flex items-center justify-between">
              <BrandMark />
              <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden">
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-[0.24em] text-violet-200">Credits</span>
                <Coins className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="mt-4 text-3xl font-semibold text-white">4,280</div>
              <p className="mt-2 text-slate-300">Enough for two 1080p episodes, 11 voice renders, and 18 concept batches.</p>
            </div>
            <nav className="mt-8 space-y-2">
              {studioLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                        isActive ? "border border-violet-400/30 bg-violet-500/15 text-white" : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-white",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                Secure workspace
              </div>
              <p className="mt-2">JWT sessions, encrypted passwords, Stripe billing, and protected project storage are wired into the platform architecture.</p>
            </div>
          </aside>

          <div className="min-w-0">
            <header className="sticky top-0 z-30 border-b border-white/10 bg-[#040712]/85 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-violet-200">AniBal Studio</div>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{title}</h1>
                  <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-100">AI usage 73%</div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">Release branch: production</div>
                  <Link to="/render-studio" className="rounded-full border border-violet-400/50 bg-violet-500/20 px-4 py-2 font-semibold text-white transition hover:bg-violet-400/25">
                    New render
                  </Link>
                </div>
              </div>
            </header>
            <main className="px-6 py-8">
              <div className="mx-auto max-w-7xl">{children}</div>
              {!workspacePaths.has(location.pathname) ? null : (
                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-[0.24em] text-slate-500">
                  <span>Workspace online</span>
                  <span>MongoDB + Express + Node architecture included</span>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl space-y-4">
      <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="text-lg leading-8 text-slate-300">{description}</p>
    </div>
  );
}

function HomePage() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-7"
          >
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                AniBal Studio
              </span>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl xl:text-7xl">Create Anime with AI</h1>
              <p className="max-w-xl text-xl leading-8 text-slate-300">Make Anime Videos, Movies and Series in Minutes</p>
            </div>

            <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              AniBal Studio is a professional AI-powered anime creation platform for scene generation, character design, voiceovers, dubbing, sound design, editing, and final rendering.
            </p>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton to="/signup">Start Creating</PrimaryButton>
              <SecondaryButton to="/dashboard">
                <Play className="h-4 w-4" />
                Watch Demo
              </SecondaryButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative min-h-[560px]"
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-500/30 via-transparent to-cyan-400/20 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#080d1a] shadow-[0_40px_140px_rgba(17,24,39,0.85)]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <div className="text-sm font-semibold text-white">AniBal Studio Production Suite</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.28em] text-slate-400">AI anime movie pipeline</div>
                </div>
                <div className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-100">
                  Live render preview
                </div>
              </div>

              <div className="grid h-[calc(100%-73px)] gap-4 p-4 lg:grid-cols-[220px_1fr]">
                <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Production flow</div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Story generator locked to shonen pacing",
                      "Character pack synced to episode cast",
                      "Dual-language dub active",
                      "Lip sync and subtitle pass ready",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-rows-[1.2fr_0.9fr]">
                  <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-violet-600/25 via-slate-950 to-cyan-500/15 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="max-w-md">
                        <div className="text-xs uppercase tracking-[0.28em] text-violet-100">Scene preview</div>
                        <h3 className="mt-3 text-2xl font-semibold text-white">Moonlit duel with neon rain, low-angle tracking shot, intense expression.</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          Cyberpunk Anime style with crowd ambience, hard rim lighting, rain particles, and synchronized English dub.
                        </p>
                      </div>
                      <div className="space-y-2 text-right text-xs uppercase tracking-[0.24em] text-slate-300">
                        <div>4K target</div>
                        <div>30fps</div>
                        <div>MP4 export</div>
                      </div>
                    </div>
                    <motion.div
                      className="mt-6 grid h-64 grid-cols-[1.2fr_0.8fr] gap-4"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(30,41,59,0.6),rgba(15,23,42,0.9)),radial-gradient(circle_at_top,rgba(139,92,246,0.65),transparent_40%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.25),transparent_35%)] p-5">
                        <div className="flex h-full flex-col justify-between">
                          <div className="text-xs uppercase tracking-[0.28em] text-cyan-100">Main frame</div>
                          <div className="space-y-2">
                            <div className="h-32 rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.45),transparent_25%),linear-gradient(180deg,rgba(17,24,39,0),rgba(17,24,39,0.7)),linear-gradient(120deg,rgba(12,18,33,0.95),rgba(42,22,84,0.65))]" />
                            <div className="flex gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                              <span className="rounded-full border border-white/10 px-3 py-1">Camera: Low angle</span>
                              <span className="rounded-full border border-white/10 px-3 py-1">Emotion: Intense</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4">
                        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                          <div className="text-xs uppercase tracking-[0.24em] text-slate-300">Voice layers</div>
                          <div className="mt-4 flex items-end gap-2">
                            {[32, 48, 22, 58, 36, 54, 28, 44].map((height, index) => (
                              <motion.span
                                key={height}
                                className="w-3 rounded-full bg-gradient-to-t from-violet-500 to-cyan-300"
                                style={{ height }}
                                animate={{ scaleY: index % 2 === 0 ? [1, 1.2, 1] : [1, 0.8, 1] }}
                                transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, delay: index * 0.08 }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
                          <div className="text-xs uppercase tracking-[0.24em] text-slate-300">Timeline</div>
                          <div className="mt-4 space-y-3">
                            <div className="h-4 rounded-full bg-violet-500/45" />
                            <div className="h-4 w-4/5 rounded-full bg-cyan-500/45" />
                            <div className="h-4 w-2/3 rounded-full bg-fuchsia-500/40" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Story Generator", value: "Episode arc and script draft completed", icon: Bot },
                      { label: "Thumbnail Engine", value: "Poster frames rendered for launch", icon: ImagePlus },
                      { label: "Dub Orchestrator", value: "Japanese and English tracks aligned", icon: Languages },
                    ].map((item, index) => {
                      const SafeIcon = item.icon;

                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + index * 0.08 }}
                          className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4"
                        >
                          <SafeIcon className="h-5 w-5 text-cyan-300" />
                          <div className="mt-4 text-sm font-semibold text-white">{item.label}</div>
                          <p className="mt-2 text-sm leading-6 text-slate-400">{item.value}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Feature Stack"
          title="AI tools for every stage of anime production"
          description="AniBal Studio combines generation, direction, voice, editing, rendering, and delivery in one fast workflow built for creators and studios."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="border-b border-white/10 pb-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-2xl border border-violet-400/30 bg-violet-500/10 p-3 text-violet-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 max-w-xl text-base leading-7 text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow="Example Projects"
            title="From concept shorts to studio-scale releases"
            description="Build anime clips, movies, and serialized productions with AI-generated visuals, scripts, dialogue, and final renders."
          />
          <div className="mt-12 space-y-6">
            {projectShowcase.map((project) => (
              <div
                key={project.title}
                className={`overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r ${project.gradient} p-[1px]`}
              >
                <div className="grid gap-6 rounded-[calc(2rem-1px)] bg-[#070c18] px-6 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-cyan-200">{project.format}</div>
                    <h3 className="mt-4 text-3xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <div className="flex items-center justify-between gap-6 text-sm leading-7 text-slate-300">
                    <p className="max-w-2xl">{project.description}</p>
                    <div className="hidden rounded-full border border-white/10 px-4 py-2 font-semibold text-white lg:block">Production ready</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Advanced Features"
          title="Story, dubbing, subtitles, and templates built in"
          description="Beyond generation, AniBal Studio ships the tooling needed to move from idea to audience with less manual work."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "AI Story Generator", description: "Generate arcs, episode beats, and cinematic pacing from a single idea.", icon: Bot },
            { title: "Auto Anime Script Writer", description: "Turn plot prompts into screenplay-ready dialogue and shot descriptions.", icon: Brush },
            { title: "AI Anime Thumbnail Generator", description: "Create launch thumbnails, posters, and title cards for every release.", icon: ImagePlus },
            { title: "Subtitle Generator", description: "Auto-create subtitle tracks from generated or uploaded voice performances.", icon: Captions },
            { title: "Multi Language Dubbing", description: "Publish Japanese anime voice, English dub, and multilingual voice tracks.", icon: Languages },
            { title: "Anime Template Library", description: "Start faster with prebuilt battle, romance, fantasy, and sci-fi project templates.", icon: Star },
          ].map((item) => {
            const SafeIcon = item.icon;

            return (
              <div key={item.title} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <SafeIcon className="h-5 w-5 text-violet-200" />
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-base font-semibold text-white">AniBal Studio</div>
            <p className="mt-2 max-w-lg">Professional AI anime creation for videos, movies, series, scenes, voiceovers, dubbing, and rendering.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            {[
              ["About", "/pricing"],
              ["Contact", "/signup"],
              ["Privacy", "/settings"],
              ["Terms", "/payments"],
            ].map(([label, to]) => (
              <Link key={String(label)} to={String(to)} className="transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </MarketingLayout>
  );
}

function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your anime projects, renders, and voice sessions.">
      <form className="space-y-5">
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input
            type="email"
            defaultValue="director@anibal.studio"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Password</span>
          <input
            type="password"
            defaultValue="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
          />
        </label>
        <button type="submit" className="w-full rounded-2xl border border-violet-400/60 bg-violet-500/20 px-4 py-3 font-semibold text-white transition hover:bg-violet-400/25">
          Login
        </button>
        <button type="button" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-100 transition hover:bg-white/10">
          Continue with Google
        </button>
        <button type="button" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-100 transition hover:bg-white/10">
          Continue with Discord
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-400">
        New to AniBal Studio?{" "}
        <Link to="/signup" className="font-semibold text-cyan-200 transition hover:text-white">
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}

function SignupPage() {
  return (
    <AuthLayout title="Create your studio" subtitle="Start generating anime projects with secure JWT authentication and protected billing.">
      <form className="space-y-5">
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Name</span>
          <input type="text" placeholder="Studio director" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" />
        </label>
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input type="email" placeholder="name@studio.com" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" />
        </label>
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Password</span>
          <input type="password" placeholder="Create a secure password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" />
        </label>
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Confirm Password</span>
          <input type="password" placeholder="Confirm your password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" />
        </label>
        <button type="submit" className="w-full rounded-2xl border border-violet-400/60 bg-violet-500/20 px-4 py-3 font-semibold text-white transition hover:bg-violet-400/25">
          Create Account
        </button>
        <button type="button" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-100 transition hover:bg-white/10">
          Continue with Google
        </button>
      </form>
    </AuthLayout>
  );
}

function PricingPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Flexible plans for solo creators and full studios"
          description="Choose the subscription that matches your production scale, rendering volume, and dubbing needs."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "rounded-[2rem] border p-8",
                plan.highlight
                  ? "border-violet-400/50 bg-gradient-to-b from-violet-500/15 to-cyan-400/10 shadow-[0_30px_80px_rgba(139,92,246,0.2)]"
                  : "border-white/10 bg-white/5",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{plan.description}</p>
                </div>
                {plan.highlight ? <Crown className="h-7 w-7 text-cyan-300" /> : null}
              </div>
              <div className="mt-8 text-5xl font-semibold text-white">{plan.price}<span className="text-lg text-slate-400">/mo</span></div>
              <div className="mt-8 space-y-4 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/payments"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-violet-300/50 hover:bg-violet-400/10"
              >
                Choose plan
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}

function DashboardPage() {
  return (
    <StudioLayout title="Dashboard" subtitle="Track your projects, credits, renders, and core production tools from one command center.">
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dashboardCollections.map((item) => (
              <div key={item.label} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{item.value}</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-violet-200">Production snapshot</div>
                <h2 className="mt-3 text-2xl font-semibold text-white">Current release: Neon Ronin Episode 03</h2>
              </div>
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">78% complete</div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Script", "Final dialog approved and subtitle cues generated."],
                ["Voice", "Japanese lead and English dub tracks are synced."],
                ["Render", "4K trailer pass queued in Render Studio."],
              ].map(([label, value]) => (
                <div key={String(label)} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white">
              <Gauge className="h-5 w-5 text-cyan-300" />
              <h2 className="text-xl font-semibold">Credit usage</h2>
            </div>
            <div className="mt-6 h-3 rounded-full bg-white/10">
              <div className="h-3 w-[72%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
              <span>3,090 used</span>
              <span>1,190 remaining</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white">
              <Zap className="h-5 w-5 text-violet-200" />
              <h2 className="text-xl font-semibold">Recent renders</h2>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              {[
                ["Episode trailer", "1080p MP4", "Ready"],
                ["Scene pack 12", "4K MOV", "Rendering"],
                ["Dub preview", "720p MP4", "Queued"],
              ].map(([name, format, status]) => (
                <div key={String(name)} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <div className="font-semibold text-white">{name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{format}</div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">{status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function AnimeGeneratorPage() {
  const [prompt, setPrompt] = useState("A neon swordsman facing a colossal mech beneath monsoon rain");
  const [style, setStyle] = useState("Cyberpunk Anime");
  const [characterCount, setCharacterCount] = useState("2");
  const [sceneType, setSceneType] = useState("Climactic duel");
  const [cameraAngle, setCameraAngle] = useState("Low angle tracking shot");
  const [lighting, setLighting] = useState("Purple neon storm");
  const [emotion, setEmotion] = useState("Intense");
  const [version, setVersion] = useState(1);

  const generatedScenes = useMemo(
    () =>
      [1, 2, 3].map((index) => ({
        id: `${style}-${version}-${index}`,
        title: `Shot ${index}`,
        note: `${style} | ${sceneType} | ${cameraAngle}`,
      })),
    [cameraAngle, sceneType, style, version],
  );

  return (
    <StudioLayout title="Anime Generator" subtitle="Generate anime scenes with prompt control, stylistic presets, and production-aware output previews.">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Scene prompt</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-300">
            <label className="block space-y-2">
              <span>Text prompt</span>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              {[{
                label: "Style",
                value: style,
                onChange: setStyle,
                options: ["Shonen", "Naruto Style", "Attack on Titan Style", "Studio Ghibli Style", "Cyberpunk Anime"],
              }, {
                label: "Character count",
                value: characterCount,
                onChange: setCharacterCount,
                options: ["1", "2", "3", "4+"],
              }, {
                label: "Scene type",
                value: sceneType,
                onChange: setSceneType,
                options: ["Climactic duel", "Quiet dialogue", "Training montage", "City reveal", "Transformation"],
              }, {
                label: "Camera angle",
                value: cameraAngle,
                onChange: setCameraAngle,
                options: ["Low angle tracking shot", "Wide aerial", "Close-up", "Over-the-shoulder", "Dynamic orbit"],
              }, {
                label: "Lighting",
                value: lighting,
                onChange: setLighting,
                options: ["Purple neon storm", "Golden sunset", "Cold moonlight", "Lantern glow", "Explosion flare"],
              }, {
                label: "Emotion",
                value: emotion,
                onChange: setEmotion,
                options: ["Intense", "Hopeful", "Fearless", "Melancholic", "Triumphant"],
              }].map((field) => (
                <label key={field.label} className="block space-y-2">
                  <span>{field.label}</span>
                  <select
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option} className="bg-slate-900">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setVersion((current) => current + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/20 px-5 py-3 font-semibold text-white transition hover:bg-violet-400/25"
            >
              Generate scene images
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/12 via-transparent to-cyan-400/10 p-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              <span>{style}</span>
              <span>{characterCount} characters</span>
              <span>{emotion}</span>
              <span>{lighting}</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">Generated anime scene outputs</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{prompt}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {generatedScenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5"
              >
                <div className="aspect-[3/4] bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.32),transparent_28%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.18),transparent_30%),linear-gradient(140deg,rgba(7,12,24,0.95),rgba(49,25,92,0.7))] p-5">
                  <div className="flex h-full flex-col justify-between rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.28em] text-cyan-100">{scene.title}</div>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-white">{emotion} anime frame</div>
                      <div className="text-sm leading-6 text-slate-300">{scene.note}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function CharacterCreatorPage() {
  const [hairStyle, setHairStyle] = useState("Twin tails");
  const [eyeColor, setEyeColor] = useState("Cyan");
  const [outfit, setOutfit] = useState("Future combat jacket");
  const [accessories, setAccessories] = useState("Holographic earrings");
  const [pose, setPose] = useState("Battle ready");
  const [emotion, setEmotion] = useState("Fearless");
  const [library, setLibrary] = useState<string[]>(["Aiko Stormblade", "Ren Kurogami", "Mika Lumen"]);

  const previewName = `${hairStyle.split(" ")[0]} ${emotion}`;

  return (
    <StudioLayout title="Character Creator" subtitle="Design anime characters with custom styling, AI-assisted variations, and a reusable cast library.">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Character settings</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-slate-300">
            {[{
              label: "Hair style",
              value: hairStyle,
              onChange: setHairStyle,
              options: ["Twin tails", "Spiky cut", "Long flowing", "Short bob", "Samurai ponytail"],
            }, {
              label: "Eye color",
              value: eyeColor,
              onChange: setEyeColor,
              options: ["Cyan", "Amber", "Crimson", "Emerald", "Violet"],
            }, {
              label: "Outfit",
              value: outfit,
              onChange: setOutfit,
              options: ["Future combat jacket", "School uniform", "Mage robe", "Stealth suit", "Kimono armor"],
            }, {
              label: "Accessories",
              value: accessories,
              onChange: setAccessories,
              options: ["Holographic earrings", "Katana harness", "Magic sigil ring", "Battle visor", "Spirit charms"],
            }, {
              label: "Pose",
              value: pose,
              onChange: setPose,
              options: ["Battle ready", "Hero landing", "Casual stance", "Dramatic turn", "Running attack"],
            }, {
              label: "Emotion",
              value: emotion,
              onChange: setEmotion,
              options: ["Fearless", "Calm", "Joyful", "Determined", "Mysterious"],
            }].map((field) => (
              <label key={field.label} className="block space-y-2">
                <span>{field.label}</span>
                <select
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option} className="bg-slate-900">
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setLibrary((current) => [previewName, ...current])}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/20 px-5 py-3 font-semibold text-white transition hover:bg-violet-400/25"
          >
            Save to character library
            <Users className="h-4 w-4" />
          </button>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_0.6fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/12 via-transparent to-cyan-400/10 p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">AI character preview</div>
            <div className="mt-5 aspect-[4/5] rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.28),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.3),transparent_32%),linear-gradient(150deg,rgba(10,15,26,0.98),rgba(51,27,93,0.75))] p-6">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div>
                  <h3 className="text-3xl font-semibold text-white">{previewName}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
                    {pose}, wearing {outfit}, with {hairStyle.toLowerCase()}, {eyeColor.toLowerCase()} eyes, and {accessories.toLowerCase()}.
                  </p>
                </div>
                <div className="grid gap-2 text-xs uppercase tracking-[0.22em] text-slate-300 sm:grid-cols-2">
                  <span className="rounded-full border border-white/10 px-3 py-2">Pose: {pose}</span>
                  <span className="rounded-full border border-white/10 px-3 py-2">Emotion: {emotion}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Character library</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              {library.map((character) => (
                <div key={character} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  {character}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function SceneBuilderPage() {
  const assetBank = ["Lead character", "Rival character", "Temple background", "Magic burst", "Dialogue bubble", "Camera pan"];
  const [canvasItems, setCanvasItems] = useState<string[]>(["Lead character", "Temple background"]);
  const [timelineItems, setTimelineItems] = useState<string[]>(["Dialogue bubble", "Camera pan"]);

  const handleDragStart = (event: DragEvent<HTMLButtonElement>, value: string) => {
    event.dataTransfer.setData("text/plain", value);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, setter: (update: (current: string[]) => string[]) => void) => {
    event.preventDefault();
    const value = event.dataTransfer.getData("text/plain");

    if (!value) {
      return;
    }

    setter((current) => (current.includes(value) ? current : [...current, value]));
  };

  return (
    <StudioLayout title="Scene Builder" subtitle="Compose anime scenes with drag-and-drop assets, dialogue bubbles, effects, and timeline direction.">
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Asset bank</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">Drag characters, backgrounds, effects, dialogue, and camera moves into the shot composer and timeline.</p>
          <div className="mt-6 grid gap-3">
            {assetBank.map((asset) => (
              <button
                key={asset}
                type="button"
                draggable
                onDragStart={(event) => handleDragStart(event, asset)}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
              >
                {asset}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div
            className="rounded-[2rem] border border-dashed border-violet-400/40 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10 p-6"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, setCanvasItems)}
          >
            <div className="text-xs uppercase tracking-[0.24em] text-violet-200">Shot composer</div>
            <div className="mt-4 min-h-[320px] rounded-[1.7rem] border border-white/10 bg-black/20 p-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {canvasItems.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="rounded-[2rem] border border-dashed border-cyan-400/40 bg-white/5 p-6"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, setTimelineItems)}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-white">Timeline editor</h2>
              <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">Movie editing style</span>
            </div>
            <div className="mt-6 space-y-4">
              {timelineItems.map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => setTimelineItems((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function VoiceStudioPage() {
  const [script, setScript] = useState("You crossed the wrong skyline, Kairo. Tonight this city answers to our blade.");
  const [voiceStyle, setVoiceStyle] = useState("Japanese anime voice");
  const [voiceType, setVoiceType] = useState("Female");
  const [language, setLanguage] = useState("Japanese");
  const [queue, setQueue] = useState<string[]>(["Fight sounds", "Wind", "Background music"]);

  return (
    <StudioLayout title="Voice Studio" subtitle="Generate voices, clone performances, sync lips, and layer sound effects for anime dialogue and action.">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Voice generation</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-300">
            <label className="block space-y-2">
              <span>Text to speech</span>
              <textarea
                rows={6}
                value={script}
                onChange={(event) => setScript(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              {[{
                label: "Anime voice styles",
                value: voiceStyle,
                onChange: setVoiceStyle,
                options: ["Japanese anime voice", "English dub voice", "Heroic narrator", "Mystic elder"],
              }, {
                label: "Voice type",
                value: voiceType,
                onChange: setVoiceType,
                options: ["Male", "Female", "Child"],
              }, {
                label: "Language",
                value: language,
                onChange: setLanguage,
                options: ["Japanese", "English", "Spanish", "Korean"],
              }].map((field) => (
                <label key={field.label} className="block space-y-2">
                  <span>{field.label}</span>
                  <select
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option} className="bg-slate-900">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="rounded-full border border-violet-400/50 bg-violet-500/20 px-5 py-3 font-semibold text-white transition hover:bg-violet-400/25">
                Generate voice
              </button>
              <button type="button" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                Enable voice cloning
              </button>
              <button type="button" className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/15">
                Auto lip sync
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/12 via-transparent to-cyan-400/10 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Preview</div>
                <h2 className="mt-3 text-2xl font-semibold text-white">{voiceStyle}</h2>
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">{voiceType} voice</div>
            </div>
            <div className="mt-6 flex items-end gap-2">
              {[26, 44, 32, 60, 42, 54, 38, 64, 46, 30, 52, 36].map((height, index) => (
                <motion.span
                  key={height + index}
                  className="w-4 rounded-full bg-gradient-to-t from-violet-500 to-cyan-300"
                  style={{ height }}
                  animate={{ scaleY: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, delay: index * 0.05 }}
                />
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">Multi-language dubbing, subtitle generation, and automatic lip sync are ready for export in {language} and alternate dub tracks.</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Sound effects library</h2>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              {["Fight sounds", "Magic effects", "Footsteps", "Wind", "Explosions", "Background music"].map((effect) => (
                <button
                  key={effect}
                  type="button"
                  onClick={() => setQueue((current) => (current.includes(effect) ? current : [...current, effect]))}
                  className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
                >
                  {effect}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {queue.map((effect) => (
                <div key={effect} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                  <span>{effect}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Added to timeline</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function VideoEditorPage() {
  const clips = ["Opening reveal", "Rooftop sprint", "Boss encounter", "Transformation flash", "Final strike"];
  const [selectedClip, setSelectedClip] = useState(clips[0]);
  const [speed, setSpeed] = useState("1.0x");

  return (
    <StudioLayout title="Video Editor" subtitle="Cut, trim, sequence, subtitle, and stylize your anime footage with production-focused editing tools.">
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Editor controls</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            {[
              "Timeline",
              "Cut",
              "Trim",
              "Transitions",
              "Anime filters",
              "Camera zoom",
              "Speed control",
              "Subtitles",
            ].map((control) => (
              <div key={control} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <span>{control}</span>
                <Check className="h-4 w-4 text-cyan-300" />
              </div>
            ))}
            <label className="block space-y-2">
              <span>Speed control</span>
              <select
                value={speed}
                onChange={(event) => setSpeed(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
              >
                {[
                  "0.5x",
                  "1.0x",
                  "1.25x",
                  "1.5x",
                  "2.0x",
                ].map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/12 via-transparent to-cyan-400/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Preview window</div>
                <h2 className="mt-3 text-2xl font-semibold text-white">{selectedClip}</h2>
              </div>
              <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">Playback {speed}</div>
            </div>
            <div className="mt-6 aspect-[16/9] rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.28),transparent_24%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.18),transparent_32%),linear-gradient(145deg,rgba(8,13,26,1),rgba(45,24,87,0.75))]" />
            <div className="mt-6 space-y-3">
              <div className="h-4 rounded-full bg-violet-500/45" />
              <div className="h-4 w-4/5 rounded-full bg-cyan-500/45" />
              <div className="h-4 w-2/3 rounded-full bg-fuchsia-500/40" />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {clips.map((clip) => (
              <button
                key={clip}
                type="button"
                onClick={() => setSelectedClip(clip)}
                className={[
                  "rounded-[1.4rem] border px-4 py-4 text-left text-sm transition",
                  clip === selectedClip ? "border-cyan-300/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10",
                ].join(" ")}
              >
                {clip}
              </button>
            ))}
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function ProjectManagerPage() {
  return (
    <StudioLayout title="Project Manager" subtitle="Organize movies, series, episodes, and scene libraries with centralized production tracking.">
      <div className="grid gap-6">
        <section className="grid gap-5 lg:grid-cols-4">
          {[
            ["Anime Movies", "3 active titles"],
            ["Anime Series", "2 live seasons"],
            ["Episodes", "18 scheduled exports"],
            ["Scenes", "132 managed shots"],
          ].map(([title, detail]) => (
            <div key={String(title)} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{title}</div>
              <div className="mt-4 text-2xl font-semibold text-white">{detail}</div>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Saved projects</h2>
            <button type="button" className="rounded-full border border-violet-400/50 bg-violet-500/20 px-5 py-3 font-semibold text-white transition hover:bg-violet-400/25">
              Save project
            </button>
          </div>
          <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-white/10">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.6fr_0.6fr] bg-black/25 px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-400">
              <span>Project</span>
              <span>Type</span>
              <span>Status</span>
              <span>Scenes</span>
            </div>
            {[
              ["Neon Ronin", "Anime Series", "In production", "48"],
              ["Sky Shrine", "Anime Movie", "Storyboard", "65"],
              ["Crimson Arena", "Episode Pack", "Rendering", "19"],
            ].map(([name, type, status, scenes]) => (
              <div key={String(name)} className="grid grid-cols-[1.2fr_0.8fr_0.6fr_0.6fr] border-t border-white/10 px-5 py-4 text-sm text-slate-300">
                <span className="font-semibold text-white">{name}</span>
                <span>{type}</span>
                <span>{status}</span>
                <span>{scenes}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function RenderStudioPage() {
  const [resolution, setResolution] = useState("1080p");
  const [frameRate, setFrameRate] = useState("30fps");
  const [format, setFormat] = useState("MP4");
  const [progress, setProgress] = useState(26);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    if (!rendering) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer);
          setRendering(false);
          return 100;
        }

        return Math.min(current + 8, 100);
      });
    }, 450);

    return () => window.clearInterval(timer);
  }, [rendering]);

  return (
    <StudioLayout title="Render Studio" subtitle="Finalize anime exports with production-grade render settings and live progress tracking.">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Render options</h2>
          <div className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            {[{
              label: "Resolution",
              value: resolution,
              onChange: setResolution,
              options: ["720p", "1080p", "4K"],
            }, {
              label: "Frame rate",
              value: frameRate,
              onChange: setFrameRate,
              options: ["24fps", "30fps", "60fps"],
            }, {
              label: "Export format",
              value: format,
              onChange: setFormat,
              options: ["MP4", "MOV"],
            }].map((field) => (
              <label key={field.label} className="block space-y-2">
                <span>{field.label}</span>
                <select
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option} className="bg-slate-900">
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setProgress(0);
              setRendering(true);
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-violet-500/20 px-5 py-3 font-semibold text-white transition hover:bg-violet-400/25"
          >
            Start render
            <Clapperboard className="h-4 w-4" />
          </button>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/12 via-transparent to-cyan-400/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-cyan-200">Render progress</div>
              <h2 className="mt-3 text-2xl font-semibold text-white">{resolution} • {frameRate} • {format}</h2>
            </div>
            <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
              {rendering ? "Rendering" : progress === 100 ? "Ready to export" : "Idle"}
            </div>
          </div>
          <div className="mt-8 h-4 rounded-full bg-white/10">
            <motion.div className="h-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" animate={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
            <span>Frame synthesis and compositing</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Export queue", "Episode trailer / Opening credits / Dub preview"],
              ["Output safety", "Auto-save, crash recovery, and resumable render jobs"],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">{label}</div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function UserSettingsPage() {
  return (
    <StudioLayout title="User Settings" subtitle="Manage profile details, login security, and production notifications.">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Profile</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-300">
            <label className="block space-y-2">
              <span>Profile photo</span>
              <div className="rounded-[1.6rem] border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center text-slate-400">Upload profile photo</div>
            </label>
            <label className="block space-y-2">
              <span>Username</span>
              <input type="text" defaultValue="AniBal Director" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" />
            </label>
            <label className="block space-y-2">
              <span>Email</span>
              <input type="email" defaultValue="director@anibal.studio" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" />
            </label>
            <label className="block space-y-2">
              <span>Password</span>
              <input type="password" defaultValue="securepassword" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" />
            </label>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white">
              <Lock className="h-5 w-5 text-cyan-300" />
              <h2 className="text-2xl font-semibold">Security</h2>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              {[
                "JWT authentication enabled",
                "Encrypted passwords with bcrypt",
                "Protected user data storage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <Check className="h-4 w-4 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Notification settings</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              {[
                "Render complete alerts",
                "Payment receipts",
                "Credit usage warnings",
                "Admin announcements",
              ].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <span>{item}</span>
                  <div className={[
                    "h-7 w-12 rounded-full border p-1 transition",
                    index < 3 ? "border-cyan-300/40 bg-cyan-400/10" : "border-white/10 bg-white/5",
                  ].join(" ")}>
                    <div className={[
                      "h-5 w-5 rounded-full transition",
                      index < 3 ? "translate-x-5 bg-cyan-300" : "bg-slate-500",
                    ].join(" ")} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function PaymentSystemPage() {
  return (
    <StudioLayout title="Payment System" subtitle="Offer secure subscriptions through Stripe with plans tailored to anime creation at every scale.">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "rounded-[1.8rem] border p-6",
                plan.highlight ? "border-violet-400/50 bg-violet-500/10" : "border-white/10 bg-white/5",
              ].join(" ")}
            >
              <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
              <div className="mt-4 text-4xl font-semibold text-white">{plan.price}<span className="text-base text-slate-400">/mo</span></div>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/12 via-transparent to-cyan-400/10 p-6">
            <div className="flex items-center gap-3 text-white">
              <CreditCard className="h-5 w-5 text-cyan-300" />
              <h2 className="text-2xl font-semibold">Stripe checkout</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">Secure payments, subscription lifecycle management, and credit top-ups are configured through Stripe-backed backend routes.</p>
            <button type="button" className="mt-6 rounded-full border border-violet-400/50 bg-violet-500/20 px-5 py-3 font-semibold text-white transition hover:bg-violet-400/25">
              Upgrade with Stripe
            </button>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Payment history</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                ["Pro Plan Renewal", "$39.00", "Paid"],
                ["Extra Credits", "$19.00", "Paid"],
                ["Studio Trial Hold", "$0.00", "Released"],
              ].map(([name, amount, status]) => (
                <div key={String(name)} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <div className="font-semibold text-white">{name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Secure billing</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{amount}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-cyan-100">{status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function AdminPanelPage() {
  return (
    <StudioLayout title="Admin Panel" subtitle="Monitor users, payments, credits, AI usage, and platform health from a central operations view.">
      <div className="grid gap-6">
        <section className="grid gap-5 lg:grid-cols-4">
          {[
            ["Users", "12,480"],
            ["Payments", "$184k"],
            ["Credits used", "8.2M"],
            ["Reports", "17 open"],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
              <div className="mt-4 text-3xl font-semibold text-white">{value}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3 text-white">
              <BarChart3 className="h-5 w-5 text-cyan-300" />
              <h2 className="text-2xl font-semibold">Platform analytics</h2>
            </div>
            <div className="mt-6 space-y-4">
              {[70, 86, 58, 92, 64].map((value, index) => (
                <div key={value + index}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                    <span>Node cluster {index + 1}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">AI usage overview</h2>
            <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-white/10">
              <div className="grid grid-cols-[1fr_1fr_1fr] bg-black/25 px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-400">
                <span>Service</span>
                <span>Requests</span>
                <span>Status</span>
              </div>
              {[
                ["Image generation model", "128k", "Healthy"],
                ["Video generation model", "42k", "Healthy"],
                ["Voice cloning AI", "17k", "Monitoring"],
                ["Sound effects generator", "58k", "Healthy"],
              ].map(([service, requests, status]) => (
                <div key={String(service)} className="grid grid-cols-[1fr_1fr_1fr] border-t border-white/10 px-5 py-4 text-sm text-slate-300">
                  <span className="font-semibold text-white">{service}</span>
                  <span>{requests}</span>
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudioLayout>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/anime-generator" element={<AnimeGeneratorPage />} />
        <Route path="/character-creator" element={<CharacterCreatorPage />} />
        <Route path="/scene-builder" element={<SceneBuilderPage />} />
        <Route path="/voice-studio" element={<VoiceStudioPage />} />
        <Route path="/video-editor" element={<VideoEditorPage />} />
        <Route path="/project-manager" element={<ProjectManagerPage />} />
        <Route path="/render-studio" element={<RenderStudioPage />} />
        <Route path="/settings" element={<UserSettingsPage />} />
        <Route path="/payments" element={<PaymentSystemPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
