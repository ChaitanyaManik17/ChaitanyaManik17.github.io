import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Code, BrainCircuit, Database, Cloud, Star } from 'lucide-react';

// Main App Component: Manages navigation and renders pages
const App = () => {
    const [page, setPage] = useState('home');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigateTo = (newPage) => {
        setPage(newPage);
    };

    const navLinks = [
        { id: 'home', title: 'Home' },
        { id: 'about', title: 'About' },
        { id: 'experience', title: 'Experience' },
        { id: 'projects', title: 'Projects' },
    ];

    const mainContent = {
        home: <HomePage navigateTo={navigateTo} />,
        about: <AboutPage />,
        experience: <ExperiencePage />,
        projects: <ProjectsPage />,
    };

    return (
        <div className="bg-slate-900 text-slate-300 min-h-screen font-sans antialiased flex flex-col md:flex-row">
            <Navbar currentPage={page} navigateTo={navigateTo} navLinks={navLinks} isMobile={isMobile} />
            <MainContentArea>
                <AnimatePresence mode="wait">
                    {React.cloneElement(mainContent[page], { key: page })}
                </AnimatePresence>
            </MainContentArea>
        </div>
    );
};


// Navigation Component (Sidebar on Desktop, Top bar on Mobile)
const Navbar = ({ currentPage, navigateTo, navLinks, isMobile }) => {
    if (isMobile) {
        return (
            <nav className="fixed bottom-0 left-0 w-full bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 z-50">
                <div className="flex justify-around items-center h-16">
                    {navLinks.map(link => (
                        <button key={link.id} onClick={() => navigateTo(link.id)} className={`capitalize text-xs transition-colors duration-300 ${currentPage === link.id ? 'text-sky-400' : 'text-slate-400 hover:text-sky-400'}`}>
                            {link.title}
                        </button>
                    ))}
                </div>
            </nav>
        );
    }

    return (
        <aside className="w-1/5 min-w-[280px] border-r border-slate-800 p-8 flex flex-col justify-between h-screen sticky top-0">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Chaitanya Manik</h1>
                <h2 className="text-lg text-sky-400 mb-8">AI Application Developer</h2>
                <nav>
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.id} className="mb-4">
                                <button onClick={() => navigateTo(link.id)} className="flex items-center group transition-all duration-300">
                                    <span className={`w-8 h-px mr-4 bg-slate-500 group-hover:w-16 group-hover:bg-white transition-all duration-300 ${currentPage === link.id ? 'w-16 bg-white' : ''}`}></span>
                                    <span className={`text-sm font-bold tracking-wider uppercase group-hover:text-white transition-colors duration-300 ${currentPage === link.id ? 'text-white' : 'text-slate-500'}`}>
                                        {link.title}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <a href="https://github.com/ChaitanyaManik17" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors duration-300"><Github size={20} /></a>
                <a href="https://linkedin.com/in/chaitanya-manik" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors duration-300"><Linkedin size={20} /></a>
                <a href="mailto:chaitanyamanik283@gmail.com" className="text-slate-400 hover:text-white transition-colors duration-300"><Mail size={20} /></a>
            </div>
        </aside>
    );
};

// Main Content Wrapper with Padding
const MainContentArea = ({ children }) => (
    <main className="w-full md:w-4/5 p-6 md:p-12 lg:p-24 overflow-y-auto h-screen-safe pb-24 md:pb-12">
        {children}
    </main>
);

// Animation Variants for Pages
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
};


// --- PAGES ---

// Home Page Component
const HomePage = ({ navigateTo }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex flex-col justify-center h-full"
    >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.img
                src="https://api1.iloveimg.com/v1/download/vzvq6tzw6sw20rw3x586b20j8ydlksfldrgcv3g4gtjvh7s26rbrnkb37qmpbwqk8hv7A2t1fy8y8dk8yz62wlmsxsy81ddk090834glzh4rdggkch2b5my2xqgkj2lpnz34pbk712rg08649jk5Agg1qhgbl51p3mvy7809md7hndx5k1p1"
                alt="Chaitanya Manik"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-slate-700 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            />
            <div className="text-center md:text-left">
                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 block md:hidden">Chaitanya Manik</h1>
                <h2 className="text-xl md:text-2xl text-sky-400 mb-4 block md:hidden">AI Application Developer</h2>
                <p className="text-lg max-w-xl mb-6">
                    I build intelligent applications and systems. Currently pursuing a Master's in Computer Science at <span className="text-white">Rutgers University</span>, I specialize in applying AI and machine learning to create impactful, real-world solutions.
                </p>
                <motion.button
                    onClick={() => navigateTo('projects')}
                    className="group inline-flex items-center bg-sky-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-sky-600 shadow-lg shadow-sky-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View My Work
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </motion.button>
            </div>
        </div>
    </motion.div>
);


// About Page Component
const AboutPage = () => {
    const skills = {
        "ML / AI": ["TensorFlow", "PyTorch", "Scikit-learn", "Vision Transformers", "NLP (Transformers, T5)", "Deep Learning"],
        "Data Science": ["Data Wrangling", "EDA", "Statistical Modeling", "Predictive Modeling", "Data Visualization"],
        "Languages": ["Python", "Java", "C", "SQL", "JavaScript", "HTML/CSS"],
        "Cloud & Data Engineering": ["GCP (BigQuery, GCS)", "AWS", "Azure", "Apache Airflow", "ETL Pipelines"],
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <h3 className="text-3xl font-bold text-white mb-8">About Me</h3>
            <div className="space-y-12">
                <section>
                    <p className="text-lg leading-relaxed">
                        I am a driven and curious developer with a Bachelor's in Computer Science from Vellore Institute of Technology and an upcoming Master's from Rutgers University. My focus is on leveraging AI to build practical, user-centric applications. I thrive on transforming complex problems into elegant, efficient solutions—from creating a digital health system for over 2,000 users to architecting AI models for early disease detection with 98% accuracy.
                    </p>
                </section>

                <section>
                    <h4 className="text-2xl font-bold text-white mb-6">Technical Skills</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(skills).map(([category, list]) => (
                            <div key={category}>
                                <h5 className="flex items-center text-sky-400 font-semibold mb-3">
                                    {category === "ML / AI" && <BrainCircuit className="mr-2" size={20}/>}
                                    {category === "Data Science" && <Database className="mr-2" size={20}/>}
                                    {category === "Languages" && <Code className="mr-2" size={20}/>}
                                    {category === "Cloud & Data Engineering" && <Cloud className="mr-2" size={20}/>}
                                    {category}
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {list.map(skill => (
                                        <span key={skill} className="bg-slate-800 text-slate-300 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                 <section>
                    <h4 className="text-2xl font-bold text-white mb-6">Certifications</h4>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center bg-slate-800 p-3 rounded-lg">
                            <Star className="text-yellow-400 mr-3" size={20}/>
                            <span className="font-semibold">AWS Certified Cloud Practitioner</span>
                        </div>
                         <div className="flex items-center bg-slate-800 p-3 rounded-lg">
                            <Star className="text-yellow-400 mr-3" size={20}/>
                            <span className="font-semibold">Microsoft Azure Administrator Associate</span>
                        </div>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

// Experience Page Component
const ExperiencePage = () => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
        <h3 className="text-3xl font-bold text-white mb-12">Work Experience</h3>
        <div className="relative border-l-2 border-slate-700 pl-8 space-y-16">
            <div className="absolute w-4 h-4 bg-sky-400 rounded-full -left-2 top-1 border-4 border-slate-900"></div>
            <div>
                <p className="text-sm font-semibold text-slate-400 mb-1">Jan 2025 — Jul 2025</p>
                <h4 className="text-xl font-bold text-white">AI Application Developer Intern</h4>
                <h5 className="text-md text-slate-300 mb-4">Patio Digital · Raipur, Chhattisgarh</h5>
                <ul className="list-disc list-outside space-y-2 text-slate-400 pl-5">
                    <li>Contributed to an Ayurvedic Digital Health System serving <span className="text-sky-400 font-semibold">2,000+ users</span>.</li>
                    <li>Increased diagnostic accuracy by <span className="text-sky-400 font-semibold">30%</span> by implementing AI-powered tongue and pulse analysis.</li>
                    <li>Boosted user engagement by <span className="text-sky-400 font-semibold">40%</span> using Python, TensorFlow Lite, and ARKit/ARCore.</li>
                    <li>Reduced system downtime by <span className="text-sky-400 font-semibold">25%</span> through rigorous testing and performance optimization.</li>
                </ul>
            </div>
        </div>
    </motion.div>
);

// Projects Page Component
const ProjectsPage = () => {
    const projects = [
        {
            title: "ParkinsAI: MRI-Based Parkinson's Detection",
            description: "A medical AI project that applies Vision Transformers and Capsule Networks to detect Parkinson's Disease from MRI scans, achieving 98% classification accuracy.",
            tags: ["Python", "Vision Transformers", "Capsule Networks"],
        },
        {
            title: "Travel Buddies",
            description: "A web app connecting travelers for safe and eco-friendly commuting. Its real-time carpooling features reduced costs by up to 30% and encouraged sustainable travel.",
            tags: ["C", "HTML"],
        },
        {
            title: "Rock Paper Scissors AI",
            description: "An interactive AI-powered game in Python demonstrating human-computer interaction. It gained over 200 plays in its first month, showcasing strong user engagement.",
            tags: ["Python"],
        },
    ];

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <h3 className="text-3xl font-bold text-white mb-8">Personal Projects</h3>
            <div className="grid grid-cols-1 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        className="group relative bg-slate-800/50 p-6 rounded-lg border border-transparent hover:border-sky-500/50 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors duration-300">{project.title}</h4>
                        <p className="text-slate-400 mb-4 text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-sky-900/50 text-sky-300 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default App;