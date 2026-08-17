// ============================================================
// POORANI'S PORTFOLIO — Vue.js 3 App
// ============================================================

const { createApp } = Vue;

createApp({
  data() {
    return {
      // ---------- Nav ----------
      isScrolled: false,
      activeSection: 'hero',
      menuOpen: false,

      // ---------- Typewriter ----------
      typewriterRoles: [
        'Frontend Developer',
        'Vue.js Developer',
        'vibe Coder',
      ],
      typewriterText: '',
      typewriterIndex: 0,
      typewriterCharIndex: 0,
      typewriterDeleting: false,

      // ---------- Projects ----------
      projects: [
        {
          id: 1,
          title: 'ShopVue — E-Commerce App',
          description: 'A fully responsive e-commerce platform with product filtering, cart management, and smooth checkout flow built with Vue.js 3 and Vuex.',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop',
          tags: ['Vue.js', 'Vuex', 'Bootstrap 5', 'REST API'],
          github: '#',
          live: '#',
          featured: true,
        },
        {
          id: 2,
          title: 'TaskFlow — Project Manager',
          description: 'A drag-and-drop Kanban board app for managing projects and tasks. Features real-time updates, priority labels, and deadline tracking.',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&auto=format&fit=crop',
          tags: ['React.js', 'CSS3', 'LocalStorage', 'DnD'],
          github: '#',
          live: '#',
          featured: false,
        },
        {
          id: 3,
          title: 'WeatherSphere — Weather App',
          description: 'A beautiful weather dashboard that fetches real-time weather data via API, featuring animated weather icons and 7-day forecasts.',
          image: 'https://images.unsplash.com/photo-1504608524841-42584120d833?w=600&auto=format&fit=crop',
          tags: ['JavaScript', 'OpenWeather API', 'CSS Animations'],
          github: '#',
          live: '#',
          featured: false,
        },
        {
          id: 4,
          title: 'BlogMind — Content Platform',
          description: 'A modern blogging platform with rich-text editor, category filtering, author profiles, and dark/light mode toggle.',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop',
          tags: ['Vue.js', 'Firebase', 'Quill Editor'],
          github: '#',
          live: '#',
          featured: false,
        },
        {
          id: 5,
          title: 'FinTrack — Budget Tracker',
          description: 'A personal finance dashboard with animated charts, expense categorization, and monthly summaries to help manage spending.',
          image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop',
          tags: ['React.js', 'Chart.js', 'Tailwind CSS'],
          github: '#',
          live: '#',
          featured: false,
        },
        {
          id: 6,
          title: 'ConnectMe — Social UI',
          description: 'A social media interface concept with animated feeds, story components, real-time-like interactions, and a profile builder.',
          image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&auto=format&fit=crop',
          tags: ['Vue.js', 'Bootstrap 5', 'GSAP'],
          github: '#',
          live: '#',
          featured: false,
        },
      ],

      // ---------- Skills ----------
      skills: [
        { name: 'HTML5 / CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 88 },
        { name: 'Vue.js 3', level: 85 },
        { name: 'React.js', level: 80 },
        { name: 'Bootstrap 5', level: 90 },
        { name: 'REST APIs & Fetch', level: 82 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Figma / UI Design', level: 75 },
      ],

      // ---------- Tech pills ----------
      techPills: [
        { icon: 'bi-filetype-html', label: 'HTML5' },
        { icon: 'bi-filetype-css', label: 'CSS3' },
        { icon: 'bi-filetype-js', label: 'JavaScript' },
        { icon: 'bi-bootstrap', label: 'Bootstrap' },
        { icon: 'bi-git', label: 'Git' },
        { icon: 'bi-github', label: 'GitHub' },
        { icon: 'bi-phone', label: 'Responsive' },
        { icon: 'bi-palette', label: 'Figma' },
      ],

      // ---------- Education / Experience Timeline ----------
      timeline: [
        {
          title: 'B.Sc Physics',
          org: 'Sadakathullah Appa College',
          date: 'Education',
          desc: 'Bachelor of Science in Physics — built a strong analytical and problem-solving foundation.',
        },
        {
          title: 'Assistant Office Admin & DTP',
          org: 'Sri Jayendra Swamigal Vidhya Kendra',
          date: 'May 2017 — May 2019',
          desc: 'Managed office administration tasks and desktop publishing (DTP) work, handling documentation and data organization.',
        },
        {
          title: 'Typist',
          org: 'Netcom Private Limited',
          date: 'Jun 2019 — Dec 2019',
          desc: 'Performed high-speed and accurate data typing assignments, maintaining document quality and deadline adherence.',
        },
        {
          title: 'Data Entry Operator',
          org: 'Handloom Society',
          date: 'Aug 2020 — Nov 2022',
          desc: 'Handled large-scale data entry operations, ensuring accuracy and integrity of records in the handloom sector.',
        },
        {
          title: 'Frontend Developer',
          org: 'Self-employed / Freelance',
          date: 'Aug 2024 — Jun 2026',
          desc: 'Building modern, responsive web applications using HTML, CSS, JavaScript, and Vue.js. Passionate about clean UI and great user experiences.',
        },
      ],

      // ---------- Contact form ----------
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      formSubmitted: false,
      formErrors: {},
    };
  },

  mounted() {
    // Scroll listener
    window.addEventListener('scroll', this.onScroll);

    // Intersection Observer for scroll reveal
    this.initScrollReveal();

    // Typewriter
    this.startTypewriter();

    // Animate progress bars when resume section enters view
    this.initProgressBars();
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    // ---------- Scroll ----------
    onScroll() {
      const scrollY = window.scrollY;
      this.isScrolled = scrollY > 60;

      // Back to top
      const btn = document.getElementById('backToTop');
      if (btn) btn.classList.toggle('show', scrollY > 400);

      // Active section detection
      const sections = ['hero', 'about', 'projects', 'resume', 'contact'];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            this.activeSection = id;
          }
        }
      });
    },

    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ---------- Scroll Reveal ----------
    initScrollReveal() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
      });
    },

    // ---------- Progress Bars ----------
    initProgressBars() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.querySelectorAll('.progress-bar').forEach(bar => {
                const target = bar.getAttribute('data-width');
                setTimeout(() => { bar.style.width = target + '%'; }, 200);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      const resumeSection = document.getElementById('resume');
      if (resumeSection) observer.observe(resumeSection);
    },

    // ---------- Typewriter ----------
    startTypewriter() {
      const type = () => {
        const current = this.typewriterRoles[this.typewriterIndex];
        if (this.typewriterDeleting) {
          this.typewriterText = current.substring(0, this.typewriterCharIndex - 1);
          this.typewriterCharIndex--;
          if (this.typewriterCharIndex === 0) {
            this.typewriterDeleting = false;
            this.typewriterIndex = (this.typewriterIndex + 1) % this.typewriterRoles.length;
            setTimeout(type, 400);
            return;
          }
          setTimeout(type, 60);
        } else {
          this.typewriterText = current.substring(0, this.typewriterCharIndex + 1);
          this.typewriterCharIndex++;
          if (this.typewriterCharIndex === current.length) {
            this.typewriterDeleting = true;
            setTimeout(type, 1800);
            return;
          }
          setTimeout(type, 90);
        }
      };
      setTimeout(type, 800);
    },

    // ---------- Contact Form ----------
    validateForm() {
      const errors = {};
      if (!this.form.name.trim()) errors.name = 'Name is required.';
      if (!this.form.email.trim()) {
        errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        errors.email = 'Please enter a valid email.';
      }
      if (!this.form.subject.trim()) errors.subject = 'Subject is required.';
      if (!this.form.message.trim()) errors.message = 'Message is required.';
      this.formErrors = errors;
      return Object.keys(errors).length === 0;
    },

    submitForm() {
      if (!this.validateForm()) return;
      // Simulate submission
      this.formSubmitted = true;
      this.form = { name: '', email: '', subject: '', message: '' };
      this.formErrors = {};
      this.showToast();
      setTimeout(() => { this.formSubmitted = false; }, 5000);
    },

    showToast() {
      const toast = document.getElementById('successToast');
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }
    },

    // ---------- Download Resume ----------
    downloadResume() {
      // Creates a simple text resume for download
      const content = `POORANI — Frontend Developer\n\n` +
        `Email: poorani@email.com | GitHub: github.com/poorani | LinkedIn: linkedin.com/in/poorani\n\n` +
        `SKILLS\n------\nHTML5, CSS3, JavaScript (ES6+), Vue.js 3, React.js, Bootstrap 5, REST APIs, Git/GitHub, Figma\n\n` +
        `EDUCATION\n---------\nB.Sc Physics\nSadakathullah Appa College\n\n` +
        `EXPERIENCE\n----------\nFrontend Developer | Aug 2024 – Jun 2026\n` +
        `• Built modern, responsive web applications using HTML, CSS, JavaScript, and Vue.js\n\n` +
        `Data Entry Operator | Handloom Society | Aug 2020 – Nov 2022\n` +
        `• Handled large-scale data entry, ensuring accuracy and integrity of records\n\n` +
        `Typist | Netcom Private Limited | Jun 2019 – Dec 2019\n` +
        `• Performed high-speed and accurate data typing assignments\n\n` +
        `Assistant Office Admin & DTP | Sri Jayendra Swamigal Vidhya Kendra | May 2017 – May 2019\n` +
        `• Managed office administration and desktop publishing work\n\n` +
        `PROJECTS\n--------\n• ShopVue — E-Commerce App (Vue.js, Vuex, Bootstrap 5)\n` +
        `• TaskFlow — Kanban Board (React.js, CSS3)\n` +
        `• WeatherSphere — Weather Dashboard (JS, OpenWeather API)\n`;

      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Poorani_Resume.txt';
      link.click();
    },
  },
}).mount('#app');
