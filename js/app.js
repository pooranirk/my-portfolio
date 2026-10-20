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
          title: 'SkyCast — Modern Weather App',
          description: 'A responsive, real-time weather forecast application built with Vue.js 3 and Vite. Fetches live meteorological data with dynamic weather conditions, temperature metrics, humidity, wind stats, and sleek glassmorphic UI.',
          image: 'assets/weather-app.jpg',
          tags: ['Vue.js 3', 'Vite', 'REST API', 'JavaScript', 'CSS3'],
          github: 'https://github.com/pooranirk/weather',
          live: 'https://pooranirk.github.io/weather/',
          featured: true,
        },
      ],

      // ---------- Skills ----------
      skills: [
        { name: 'HTML5 / CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 88 },
        { name: 'Vue.js 3', level: 85 },
        { name: 'React.js (Basic)', level: 45 },
        { name: 'REST APIs & Fetch', level: 82 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Figma / UI Design', level: 75 },
      ],

      // ---------- Tech pills ----------
      techPills: [
        { icon: 'bi-filetype-html', label: 'HTML5' },
        { icon: 'bi-filetype-css', label: 'CSS3' },
        { icon: 'bi-filetype-js', label: 'JavaScript' },
        { icon: 'bi-code-slash', label: 'Vue.js' },
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
          org: 'Senzr',
          date: 'Aug 2024 — Present (1+ Year)',
          desc: 'Building modern, responsive web applications using HTML, CSS, JavaScript, and Vue.js. Passionate about clean UI and great user experiences.',
        },
      ],

      // ---------- Contact form & Email setup ----------
      // Web3Forms: Access Key configured
      web3FormsKey: 'f3a0cdea-e81a-43a6-b15b-b2f0ee88377e',
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      isSubmitting: false,
      formSubmitted: false,
      formErrors: {},
      toastMessage: 'Thank you! Your message has been sent successfully.',
      toastIsError: false,
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

    async submitForm() {
      if (!this.validateForm()) return;

      // If Web3Forms key is not yet pasted, use direct email client fallback (mailto)
      if (!this.web3FormsKey || this.web3FormsKey === 'YOUR_ACCESS_KEY_HERE') {
        const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${this.form.subject}`);
        const mailtoBody = encodeURIComponent(
          `Hi Poorani,\n\nName: ${this.form.name}\nEmail: ${this.form.email}\n\nMessage:\n${this.form.message}`
        );
        window.location.href = `mailto:pooranism97@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        this.showToast('Please add your free Web3Forms Access Key in app.js. Opening mail client...', false);
        return;
      }

      this.isSubmitting = true;

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: this.web3FormsKey,
            name: this.form.name,
            email: this.form.email,
            subject: this.form.subject,
            message: this.form.message,
            from_name: `${this.form.name} (Portfolio Inquiry)`,
          })
        });

        const result = await response.json();

        if (result.success) {
          this.formSubmitted = true;
          this.form = { name: '', email: '', subject: '', message: '' };
          this.formErrors = {};
          this.showToast('Thank you! Your message has been sent directly to Poorani.', false);
          setTimeout(() => { this.formSubmitted = false; }, 5000);
        } else {
          this.showToast(result.message || 'Error sending message. Please try again.', true);
        }
      } catch (err) {
        console.error('Submission error:', err);
        this.showToast('Failed to send message. Please email directly to pooranism97@gmail.com', true);
      } finally {
        this.isSubmitting = false;
      }
    },

    showToast(message = 'Thank you! Your message has been sent successfully.', isError = false) {
      this.toastMessage = message;
      this.toastIsError = isError;
      const toast = document.getElementById('successToast');
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
      }
    },

    // ---------- Download Resume ----------
    downloadResume() {
      // Creates a simple text resume for download
      const content = `POORANI — Frontend Developer\n\n` +
        `Email: pooranism97@gmail.com | GitHub: github.com/pooranirk\n\n` +
        `SKILLS\n------\nHTML5, CSS3, JavaScript (ES6+), Vue.js 3, React.js (Basic), REST APIs, Git/GitHub, Figma\n\n` +
        `EDUCATION\n---------\nB.Sc Physics\nSadakathullah Appa College\n\n` +
        `EXPERIENCE\n----------\nFrontend Developer | Senzr | Aug 2024 – Present (1+ Year)\n` +
        `• Built modern, responsive web applications using HTML, CSS, JavaScript, and Vue.js\n\n` +
        `Data Entry Operator | Handloom Society | Aug 2020 – Nov 2022\n` +
        `• Handled large-scale data entry, ensuring accuracy and integrity of records\n\n` +
        `Typist | Netcom Private Limited | Jun 2019 – Dec 2019\n` +
        `• Performed high-speed and accurate data typing assignments\n\n` +
        `Assistant Office Admin & DTP | Sri Jayendra Swamigal Vidhya Kendra | May 2017 – May 2019\n` +
        `• Managed office administration and desktop publishing work\n\n` +
        `PROJECTS\n--------\n• SkyCast — Modern Weather App (Vue.js 3, Vite, REST API)\n  Live Demo: https://pooranirk.github.io/weather/\n  GitHub: https://github.com/pooranirk/weather\n`;

      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Poorani_Resume.txt';
      link.click();
    },
  },
}).mount('#app');
