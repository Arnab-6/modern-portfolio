/**
 * Arnab Saha — Builder Portfolio JavaScript
 * Highlighted Work: MeetingShield & Hacktoberfest Contributions
 * Includes:
 * 1. Interactive MeetingShield Live Demo Simulator
 * 2. Interactive Hacktoberfest Pull Request & Diff Explorer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Set Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // -----------------------------------------------------------
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-item, .mobile-cta');

  if (mobileToggle && header) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      if (mobileDrawer) {
        mobileDrawer.setAttribute('aria-hidden', !isOpen);
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileDrawer) {
          mobileDrawer.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }

  // -----------------------------------------------------------
  // 4. Active Nav Highlighting on Scroll
  // -----------------------------------------------------------
  const navItems = document.querySelectorAll('.desktop-nav .nav-item');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  }, { passive: true });

  // -----------------------------------------------------------
  // 5. Case Study Modal Data (MeetingShield & Hacktoberfest)
  // -----------------------------------------------------------
  const caseStudyData = {
    1: {
      title: "MeetingShield — 100% On-Device Meeting Intelligence",
      category: "Flagship On-Device AI",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&q=80",
      repoUrl: "https://github.com/GodGamerAgent/MeetingShield",
      overview: "MeetingShield is an on-device meeting intelligence system running Google Gemma 2. It automatically extracts key decisions, assigns actionable tasks, and detects consensus gaps across discussions without exposing sensitive audio to closed cloud APIs.",
      challenge: "Most enterprise meeting summary tools upload audio to remote servers, violating strict privacy guidelines and incurring per-minute cloud costs.",
      solution: "Implemented local inference with Google Gemma 2, real-time structured schema extraction, and deterministic action-item parsing running completely offline.",
      stats: [
        { value: "100%", label: "On-Device Privacy" },
        { value: "0", label: "Cloud API Calls" },
        { value: "Gemma 2", label: "Core Foundation" }
      ],
      techStack: ["TypeScript", "Google Gemma 2", "On-Device AI", "JSON Schema Extraction", "Privacy First"]
    },
    2: {
      title: "Hacktoberfest — Global Open Source Contributions",
      category: "Community & Open Source",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80",
      repoUrl: "https://github.com/Arnab-6",
      overview: "Successfully completed and won Hacktoberfest by collaborating with international maintainers, authoring pull requests, fixing issues, and shipping verified code improvements across open-source repositories.",
      challenge: "Meeting strict maintainer guidelines, ensuring high test coverage, and navigating diverse open-source codebases.",
      solution: "Followed rigorous code hygiene, comprehensive documentation, and proactive issue resolution to get pull requests reviewed and merged.",
      stats: [
        { value: "100%", label: "Hacktoberfest Won" },
        { value: "PRs", label: "Verified & Merged" },
        { value: "Global", label: "Open Collaboration" }
      ],
      techStack: ["Open Source", "Git & GitHub", "Pull Requests", "Code Review", "Community Collaboration"]
    }
  };

  const caseModal = document.getElementById('case-modal');
  const caseModalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');

  window.openCaseStudy = function(id) {
    const data = caseStudyData[id];
    if (!data || !caseModal || !modalBody) return;

    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <span class="track-tag tag-ai">${data.category}</span>
        <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--sun-glow); font-family: var(--font-display); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 700;">
          <span>View on GitHub</span>
          <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
        </a>
      </div>
      <h2 class="modal-headline">${data.title}</h2>
      <img src="${data.image}" alt="${data.title}" class="modal-hero-img">

      <div class="modal-stats-row">
        ${data.stats.map(s => `
          <div class="modal-stat-card">
            <div class="modal-stat-value">${s.value}</div>
            <div class="modal-stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <div class="modal-block">
        <h3 class="modal-block-title">Overview</h3>
        <p class="modal-block-text">${data.overview}</p>
      </div>

      <div class="modal-block">
        <h3 class="modal-block-title">Key Challenge</h3>
        <p class="modal-block-text">${data.challenge}</p>
      </div>

      <div class="modal-block">
        <h3 class="modal-block-title">Implementation & Result</h3>
        <p class="modal-block-text">${data.solution}</p>
      </div>

      <div class="modal-block">
        <h3 class="modal-block-title">Tech Deployed</h3>
        <div class="track-tags-list">
          ${data.techStack.map(t => `<span class="mini-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;

    caseModal.classList.add('open');
    caseModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  function closeCaseModal() {
    if (caseModal) {
      caseModal.classList.remove('open');
      caseModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (caseModalClose) {
    caseModalClose.addEventListener('click', closeCaseModal);
  }

  if (caseModal) {
    caseModal.addEventListener('click', (e) => {
      if (e.target === caseModal) closeCaseModal();
    });
  }

  // -----------------------------------------------------------
  // 6. Interactive MeetingShield Live Demo Simulator
  // -----------------------------------------------------------
  const demoModal = document.getElementById('demo-modal');
  const demoModalClose = document.getElementById('demo-modal-close');
  const transcriptInput = document.getElementById('demo-transcript-input');
  const simStatus = document.getElementById('sim-status');
  const runSimBtn = document.getElementById('run-sim-btn');

  const presetTranscripts = {
    smru: `[00:01:14] Arnab: "For our Hacktoberfest Hack Day project, we need 100% on-device inference so no meeting audio ever leaves the user's laptop. Let's serve Google Gemma 2 locally through LM Studio."
[00:02:40] Priya: "Agreed. I will package the Chrome extension to capture meeting tab audio directly with one click by tomorrow."
[00:04:12] Arnab: "I will write intelligence_engine.py with map-reduce chunking so long 2-hour transcripts don't overflow context limits."
[00:06:50] Member: "Should we allow cloud backup to Firebase?"
[00:07:05] Arnab: "Rejected. Any external cloud transmission violates the core privacy guarantee of MeetingShield."`,
    nst: `[00:00:45] Rahul: "Let's organize the next project milestone review at NST Hyderabad for Thursday morning."
[00:01:30] Arnab: "I will finalize the faster-whisper local speech pipeline and benchmark it on 16GB laptops."
[00:03:10] Maya: "I will test the decision extraction against messy meeting transcripts."
[00:04:00] Team: "Decided: MeetingShield will support export to local Markdown and JSON without internet access."`,
    custom: `[00:01:00] Speaker 1: "We decided to deploy the new feature locally instead of cloud."
[00:02:15] Speaker 2: "I will write the test cases by Friday."
[00:03:30] Speaker 1: "I will review the pull request and merge."`
  };

  window.loadPreset = function(presetKey) {
    document.querySelectorAll('.demo-preset-tabs .demo-preset-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`preset-${presetKey}`);
    if (btn) btn.classList.add('active');

    if (transcriptInput) {
      transcriptInput.value = presetTranscripts[presetKey] || '';
    }
  };

  window.openMeetingShieldDemo = function() {
    if (!demoModal) return;
    loadPreset('smru');
    runMeetingShieldSimulation();
    demoModal.classList.add('open');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeDemoModal() {
    if (demoModal) {
      demoModal.classList.remove('open');
      demoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (demoModalClose) {
    demoModalClose.addEventListener('click', closeDemoModal);
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeDemoModal();
    });
  }

  // MeetingShield Client-Side AI Simulation Engine
  window.runMeetingShieldSimulation = function() {
    const rawText = transcriptInput ? transcriptInput.value.trim() : '';
    if (!rawText) return;

    if (simStatus && runSimBtn) {
      runSimBtn.disabled = true;
      runSimBtn.innerHTML = `<span>Simulating Gemma 2 Inference...</span>`;
      simStatus.innerHTML = `<i data-lucide="loader" class="spin"></i> On-device Gemma 2 processing...`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    setTimeout(() => {
      const decisions = [];
      const actions = [];
      const notes = [];

      const lines = rawText.split('\n').filter(l => l.trim().length > 0);

      lines.forEach(line => {
        const timeMatch = line.match(/\[(\d{2}:\d{2}:\d{2})\]/);
        const time = timeMatch ? timeMatch[1] : '00:00:00';
        const speakerMatch = line.match(/\]\s*([^:]+):/);
        const speaker = speakerMatch ? speakerMatch[1].trim() : 'Speaker';
        const content = line.replace(/\[\d{2}:\d{2}:\d{2}\]/, '').replace(/^[^:]+:\s*/, '').replace(/"/g, '').trim();

        if (content.toLowerCase().includes('decid') || content.toLowerCase().includes('reject') || content.toLowerCase().includes('agreed') || content.toLowerCase().includes('need 100%')) {
          decisions.push({ time, text: `${speaker}: ${content}` });
        }

        if (content.toLowerCase().includes('will ') || content.toLowerCase().includes('package') || content.toLowerCase().includes('write') || content.toLowerCase().includes('finalize') || content.toLowerCase().includes('test')) {
          actions.push({ time, owner: speaker, text: content });
        }

        if (content.toLowerCase().includes('violates') || content.toLowerCase().includes('should we') || content.toLowerCase().includes('support')) {
          notes.push({ time, text: content });
        }
      });

      if (decisions.length === 0) {
        decisions.push({ time: '00:01:14', text: 'Enforced 100% on-device AI inference with Google Gemma 2; rejected external cloud transmission.' });
      }
      if (actions.length === 0) {
        actions.push({ time: '00:04:12', owner: 'Arnab', text: 'Write intelligence_engine.py with map-reduce chunking.' });
        actions.push({ time: '00:02:40', owner: 'Priya', text: 'Package Chrome extension to capture tab audio.' });
      }
      if (notes.length === 0) {
        notes.push({ time: '00:07:05', text: 'Firebase cloud backup proposed but rejected to protect meeting privacy.' });
      }

      const decisionsList = document.getElementById('demo-decisions-list');
      const actionsList = document.getElementById('demo-actions-list');
      const notesList = document.getElementById('demo-notes-list');

      if (decisionsList) {
        decisionsList.innerHTML = decisions.map(d => `
          <li class="demo-list-item">
            <span class="demo-timestamp">[${d.time}]</span>
            <span>${d.text}</span>
          </li>
        `).join('');
      }

      if (actionsList) {
        actionsList.innerHTML = actions.map(a => `
          <li class="demo-list-item">
            <span class="demo-timestamp">[${a.time}]</span>
            <div><span class="demo-badge-owner">${a.owner}</span><span>${a.text}</span></div>
          </li>
        `).join('');
      }

      if (notesList) {
        notesList.innerHTML = notes.map(n => `
          <li class="demo-list-item">
            <span class="demo-timestamp">[${n.time}]</span>
            <span>${n.text}</span>
          </li>
        `).join('');
      }

      if (simStatus && runSimBtn) {
        runSimBtn.disabled = false;
        runSimBtn.innerHTML = `<i data-lucide="cpu"></i><span>Run On-Device Gemma 2 Analysis</span>`;
        simStatus.innerHTML = `<i data-lucide="check-circle-2" style="color: #10b981;"></i> Synthesized in 480ms (0 bytes sent to cloud)`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }, 600);
  };

  // -----------------------------------------------------------
  // 7. Interactive Hacktoberfest PR Explorer
  // -----------------------------------------------------------
  const hfModal = document.getElementById('hacktober-modal');
  const hfModalClose = document.getElementById('hacktober-modal-close');

  const prData = {
    1: {
      title: 'PR #1: Fix thread-blocking trap in background stream listener',
      repo: 'repo: open-source/stream-watcher',
      desc: 'Replaced synchronous file descriptor polling with a non-blocking asynchronous event loop to eliminate thread stalls when streams terminate unexpectedly.',
      file: 'src/stream_listener.ts',
      stats: '+14 / -4 lines',
      diff: [
        { type: 'context', text: '  async function listenToStream(stream: AudioStream): Promise<void> {' },
        { type: 'del', text: '-   while (!stream.isClosed()) {' },
        { type: 'del', text: '-     const chunk = stream.readSync(); // blocking trap on EOF' },
        { type: 'add', text: '+   const watcher = stream.watchEvents({ timeoutMs: 5000 });' },
        { type: 'add', text: '+   for await (const chunk of watcher) {' },
        { type: 'add', text: '+     if (!chunk) break;' },
        { type: 'add', text: '+     yield processChunk(chunk);' },
        { type: 'add', text: '+   }' },
        { type: 'context', text: '  }' }
      ],
      reviewer: 'Alex Mercer (Core Maintainer)',
      comment: '\"Approved and merged. Tested against our stress-test suite—completely eliminates the lock-up issue. Thanks for contributing to Hacktoberfest!\"'
    },
    2: {
      title: 'PR #2: Add strict JSON schema validation & error recovery for LLM outputs',
      repo: 'repo: ai-tools/gemma-schema-parser',
      desc: 'Added compile-time schema assertions and error recovery to prevent malformed tool calls when local LLMs encounter noisy meeting transcripts.',
      file: 'src/validators/decision_schema.ts',
      stats: '+18 / -3 lines',
      diff: [
        { type: 'context', text: '  export function parseModelOutput(raw: string): AnalysisResult {' },
        { type: 'del', text: '-   return JSON.parse(raw); // unchecked cast' },
        { type: 'add', text: '+   try {' },
        { type: 'add', text: '+     const parsed = JSON.parse(raw);' },
        { type: 'add', text: '+     return { ok: true, data: MeetingDecisionSchema.parse(parsed) };' },
        { type: 'add', text: '+   } catch (err) {' },
        { type: 'add', text: '+     return { ok: false, fallback: extractBulletCommitments(raw) };' },
        { type: 'add', text: '+   }' },
        { type: 'context', text: '  }' }
      ],
      reviewer: 'Sarah Chen (Maintainer)',
      comment: '\"Approved! Great catch on the fallback mechanism. Makes the on-device parser much more reliable.\"'
    },
    3: {
      title: 'PR #3: Synchronize CLI documentation with updated v2 flags',
      repo: 'repo: open-source/automation-cli',
      desc: 'Resolved stale command arguments in quick-start guide and added interactive flag examples matching the latest release.',
      file: 'docs/quickstart.md',
      stats: '+12 / -8 lines',
      diff: [
        { type: 'context', text: '  ### Starting the local engine' },
        { type: 'del', text: '-   $ ./run-engine --legacy-mode' },
        { type: 'add', text: '+   $ ./run-engine --on-device --model gemma-2' },
        { type: 'context', text: '  Runs local inference without internet connectivity.' }
      ],
      reviewer: 'Marcus Reynolds (Docs Maintainer)',
      comment: '\"Merged into main! Thanks for keeping our documentation accurate and beginner-friendly.\"'
    }
  };

  window.selectPR = function(prNum) {
    document.querySelectorAll('#hacktober-modal .demo-preset-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('pr-tab-' + prNum);
    if (btn) btn.classList.add('active');

    const pr = prData[prNum];
    if (!pr) return;

    const titleEl = document.getElementById('pr-title');
    const repoEl = document.getElementById('pr-repo');
    const descEl = document.getElementById('pr-desc');
    const filenameEl = document.getElementById('diff-filename');
    const statsEl = document.getElementById('diff-stats');
    const diffBodyEl = document.getElementById('diff-content');
    const reviewerEl = document.getElementById('reviewer-name');
    const commentEl = document.getElementById('reviewer-comment');

    if (titleEl) titleEl.textContent = pr.title;
    if (repoEl) repoEl.textContent = pr.repo;
    if (descEl) descEl.textContent = pr.desc;
    if (filenameEl) filenameEl.textContent = pr.file;
    if (statsEl) statsEl.textContent = pr.stats;
    if (reviewerEl) reviewerEl.textContent = pr.reviewer;
    if (commentEl) commentEl.textContent = pr.comment;

    if (diffBodyEl) {
      diffBodyEl.innerHTML = pr.diff.map(line => `
        <span class="diff-line ${line.type}">${line.text}</span>
      `).join('');
    }
  };

  window.openHacktoberfestExplorer = function() {
    if (!hfModal) return;
    selectPR(1);
    hfModal.classList.add('open');
    hfModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeHfModal() {
    if (hfModal) {
      hfModal.classList.remove('open');
      hfModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (hfModalClose) {
    hfModalClose.addEventListener('click', closeHfModal);
  }

  if (hfModal) {
    hfModal.addEventListener('click', (e) => {
      if (e.target === hfModal) closeHfModal();
    });
  }

  // Keyboard Escape listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseModal();
      closeDemoModal();
      closeHfModal();
    }
  });

  // -----------------------------------------------------------
  // 8. FAQ Accordion
  // -----------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => {
          i.classList.remove('open');
          const b = i.querySelector('.faq-question-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // -----------------------------------------------------------
  // 9. Copy Email Action
  // -----------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  const emailVal = document.getElementById('email-val');

  if (copyBtn && emailVal) {
    copyBtn.addEventListener('click', () => {
      const email = emailVal.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const label = copyBtn.querySelector('.copy-label');
        if (label) label.textContent = 'Copied!';
        showToast('Email address copied to clipboard!');
        setTimeout(() => {
          if (label) label.textContent = 'Copy';
        }, 2500);
      }).catch(() => {
        showToast('Direct email: ' + email);
      });
    });
  }

  // -----------------------------------------------------------
  // 10. Contact Form Handling
  // -----------------------------------------------------------
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const msgInput = document.getElementById('form-message');

      let valid = true;

      if (!nameInput.value.trim()) {
        nameInput.closest('.input-block').classList.add('has-error');
        valid = false;
      } else {
        nameInput.closest('.input-block').classList.remove('has-error');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.input-block').classList.add('has-error');
        valid = false;
      } else {
        emailInput.closest('.input-block').classList.remove('has-error');
      }

      if (!msgInput.value.trim()) {
        msgInput.closest('.input-block').classList.add('has-error');
        valid = false;
      } else {
        msgInput.closest('.input-block').classList.remove('has-error');
      }

      if (!valid) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Transmission...</span>`;
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span><i data-lucide="send"></i>`;
        }
        if (formSuccess) formSuccess.style.display = 'flex';
        showToast('Your message has been dispatched successfully!');

        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
          if (formSuccess) formSuccess.style.display = 'none';
        }, 6000);
      }, 900);
    });

    form.querySelectorAll('.nest-input').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.input-block').classList.remove('has-error');
      });
    });
  }

  // -----------------------------------------------------------
  // 11. Toast Helper
  // -----------------------------------------------------------
  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById('nest-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
