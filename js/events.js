/* =========================================================================
   EVENTS SECTION CONTROLLER
   100% Verbatim Synchronized with Official Abhigyan '26 Syllabus PDF
   Editorial Design System • Zero HUD / Zero Monospace / Zero Glow
   ========================================================================= */

export const EVENTS_DATA = [
  // =========================================================================
  // TECHNICAL ARENAS (5)
  // =========================================================================
  {
    id: 'research-quest',
    title: 'Research Quest',
    category: 'technical',
    seq: '01',
    fee: 'Rs. 250 per team',
    teamSize: 'Team of 3',
    format: 'Paper Presentation',
    faculty: 'Dr. A Shirly Edward (95000 91541)',
    students: 'Gokul E P (ECE) [+91 91502 87120], Gokul K (EE VLSI) [+91 82483 03181]',
    poster: '/assets/posters/research_quest_poster.png',
    regLink: 'https://forms.gle/FrMT6Kmp58vneJDN6',
    fullDesc: 'This is a paper presentation event where participants can present their innovative works in Quantum Technologies, including areas such as quantum computing, quantum communication, quantum electronics, quantum-AI, and other emerging applications. The scope is not limited to Quantum Technologies. Participants are also welcome to present their novel research and innovative works in any other field. Participants will be asked to submit their abstract prior to the event on a notified date. The participants will be judged on their innovativeness, presentation skills and novelty.'
  },
  {
    id: 'quantum-imprint',
    title: 'Quantum Imprint',
    category: 'technical',
    seq: '02',
    fee: 'Rs. 140 per team',
    teamSize: 'Team of 2',
    format: 'Creative Poster Making Challenge',
    faculty: 'Dr. T.S. Balaji (+91 97107 69781)',
    students: 'Harini S (ECE) [+91 88386 11051], Jaffrine Refina R (ECE DS) [+91 78456 07087]',
    poster: '/assets/posters/quantum_imprint_poster.jpg',
    regLink: 'https://forms.gle/D1d5Zjf1rsMUjkQo9',
    fullDesc: 'This event is a creative poster-making challenge where participants will be given a specific theme or technical concept and asked to visually represent it through an original poster. The activity will test their creativity, design skills, conceptual understanding, and ability to communicate an idea effectively through visual elements. Participants will work within a given time limit, and the entries will be evaluated based on creativity, relevance to the theme, visual appeal, originality, and clarity of presentation.'
  },
  {
    id: 'binary-bingo',
    title: 'Binary Bingo',
    category: 'technical',
    seq: '03',
    fee: 'Rs. 150 per team',
    teamSize: 'Team of 3',
    format: 'Bit & Brain 2-Round Technical Game',
    faculty: 'Dr. Glaret Subin (+91 94453 81372)',
    students: 'Bhavana (ECE) [+91 81229 99413], Anju Elizabeth (ECE) [+91 73053 18781]',
    poster: '/assets/posters/binary_bingo_poster.jpg',
    fullDesc: 'Bit & Brain is a two-round technical game designed to test participants\u2019 number-system skills, speed, teamwork, and creativity. In Round 1 \u2013 Number System Bingo, participants convert numbers announced in binary, octal, or hexadecimal into decimal and mark the corresponding numbers on their Bingo sheet to complete the required pattern. In Round 2 \u2013 ECE Draw & Guess, participants work in teams where one member draws a whispered ECE-related word without speaking or writing, while the teammates try to guess it within 30 seconds. The team with the highest score in Round 2 wins, making the event a fun combination of technical knowledge, quick thinking, communication, and teamwork.'
  },
  {
    id: 'data-heist',
    title: 'Data Heist',
    category: 'technical',
    seq: '04',
    fee: 'Rs. 160 per team',
    teamSize: 'Team of 3',
    format: 'High-Stakes Digital Investigation',
    faculty: 'Dr. S Bestley Joe (+91 99946 05395)',
    students: 'Dev Raj (ECE) [+91 6206 943 704], Sriram [+91 80158 69435]',
    poster: '/assets/posters/data_heist_poster.jpg',
    regLink: 'https://forms.gle/Tj2R4j7XVV8E9e717',
    fullDesc: 'A high-stakes digital investigation where teams must uncover the truth hidden within a massive trail of IoT data, system logs, network traces, technical documents, device telemetry, and digital evidence. Nothing tells the whole story\u2014participants must connect fragmented clues, identify false leads, reconstruct the chain of events, and expose what really happened.'
  },
  {
    id: 'quantum-bits',
    title: 'Quantum Bits',
    category: 'technical',
    seq: '05',
    fee: 'Rs. 120 per team',
    teamSize: 'Team of 2',
    format: 'Three-Round Technical Quiz',
    faculty: 'Dr. P Rathinakumar (94862 43234)',
    students: 'Swethaasankari (ECE DS) [+91 99946 59486], Swetha S [+91 98404 44134]',
    poster: '/assets/posters/quantum_bits_poster.jpg',
    regLink: 'https://q.me-qr.com/qh403zow',
    fullDesc: 'Quantum Bits is a three-round technical quiz designed to challenge participants\u2019 technical knowledge, analytical thinking, and ability to connect concepts across quantum technology, electronics, communication, computing, and emerging technologies.'
  },

  // =========================================================================
  // NON-TECHNICAL ARENAS (6)
  // =========================================================================
  {
    id: 'byte-hunt',
    title: 'Byte Hunt',
    category: 'non-technical',
    seq: '01',
    fee: 'Rs. 155 per team',
    teamSize: 'Team of 3',
    format: 'Campus-Wide Cryptic Treasure Hunt',
    faculty: 'Dr. S Daphin Lilda (+91 74015 63458)',
    students: 'Sagana [+91 94455 41207], Nithilam [+91 94447 02609]',
    poster: '/assets/posters/byte_hunt_poster.jpg',
    regLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfHb62IaO3Tp2NPZGXmpD9ycHaHur3KopJO-5z_4tlLKMd2xw/viewform',
    fullDesc: 'Clues will be hidden all over the campus and it is upto you to find the clues and crack them. Hints will be provided. Only quick thinking, communication and speed can lead your team to the ultimate treasure!'
  },
  {
    id: 'electro-scribble',
    title: 'Electro Scribble',
    category: 'non-technical',
    seq: '02',
    fee: 'Rs. 110 per team',
    teamSize: 'Team of 2',
    format: 'Time-Attack Electronic Pictionary',
    faculty: 'Mrs. V Bhuvaneswari (98419 50762)',
    students: 'Aradhana (ECE DS) [+91 94458 18840], P. S. Namritha (ECE DS) [+91 95660 22568]',
    poster: '/assets/posters/electro_scribble_poster.jpg',
    regLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfQoUm-LLAYpP3sZZcXh0qR9WRzULmS5E5mfT4Q6rJ5Gkh2lQ/viewform',
    fullDesc: 'Participants compete in teams of two, where one player draws an electronic component without using words, letters while their teammate races against the clock to guess the component correctly under limited time.'
  },
  {
    id: 'ipl-auction',
    title: 'IPL Auction',
    category: 'non-technical',
    seq: '03',
    fee: 'Rs. 200 per team',
    teamSize: 'Team of 4',
    format: 'Live Strategic Budget Bidding',
    faculty: 'Dr. Sanjay Kumar (94574 78916)',
    students: 'Varun Raj (ECE) [+91 97785 43734], Tharunika (ECE) [+91 78240 21263]',
    poster: '/assets/posters/ipl_auction_poster.jpg',
    regLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdKuvzUbCUPtkqLX8cHtc891UDMvr9DYiMp1ut7cp0qdP3wPQ/viewform',
    fullDesc: 'An IPL-based quiz will be conducted to shortlist the top 10 participants for the main event. The shortlisted participants will then take part in a live IPL auction, where they build their own teams using a fixed virtual budget. The event combines cricket knowledge, strategy, bidding, decision-making, and budget management, making it competitive, interactive, and entertaining.'
  },
  {
    id: 'free-fire',
    title: 'Free Fire',
    category: 'non-technical',
    seq: '04',
    fee: 'Rs. 190 per team',
    teamSize: 'Team of 4',
    format: 'Battle Royale & Clash Royale Tournament',
    faculty: 'Mr. Dinesh Babu (98400 67763)',
    students: 'Kausik Venket (ECE) [+91 99402 74512], Soundarya [+91 63697 72927]',
    poster: '/assets/posters/free_fire_poster.jpg',
    regLink: 'https://docs.google.com/forms/d/e/1FAIpQLScRaPzIHIVGD_EjLbJvQSnVk3P6fgqqlbuDwTKGzioAJNcQuA/viewform',
    fullDesc: 'The Fire-Free Tournament is a 4-player team-based competition featuring Battle Royale (BR) followed by Clash Royale (CR). In the BR round, teams will compete for survival and points, with 5 points awarded for 1st place, 3 points for 2nd place, 2 points for 3rd place, and 1 point for every kill. Based on the BR results and eliminations, the qualifying teams will advance to the CR round, where they will compete under No Roof, Unlimited Ammo, Unlimited Walls, and Goal Wall rules. In the final CR stage, 1st place will receive 5 points, 2nd place 3 points, and 3rd place 2 points. The team with the strongest overall performance will be crowned the Fire-Free Tournament Champion. All participants must maintain fair play and sportsmanship throughout the tournament, and the use of cheats, hacks, glitches, exploits, or any unauthorized assistance will result in disqualification.'
  },
  {
    id: 'muted-mayhem',
    title: 'Muted Mayhem',
    category: 'non-technical',
    seq: '05',
    fee: 'Rs. 135 per team',
    teamSize: 'Team of 3',
    format: 'Headphone Lip-Reading Challenge',
    faculty: 'Dr. Manikandan Devaraj (+91 93457 99777)',
    students: 'Lathika [+91 80728 52523], Lakshmi [+91 63851 22276]',
    poster: '/assets/posters/muted_mayhem_poster.jpg',
    regLink: 'https://forms.gle/Rs2yrtPdUZd7kE95A',
    fullDesc: 'Get ready for a chaotic battle of lip-reading, guessing, and hilarious misunderstandings! In Muted Mayhem, one teammate wears headphones with loud music while the others mouth out words or phrases for them to guess within a limited time. With communication completely muted, only teamwork, expressions, and quick thinking can lead your team to victory!'
  },
  {
    id: 'connections-movie-mastermind',
    title: 'Connections / Movie Mastermind',
    category: 'non-technical',
    seq: '06',
    fee: 'Rs. 170 per team',
    teamSize: 'Team of 3',
    format: 'Three-Round Movie Strategy Challenge',
    faculty: 'Dr. P Kabilamani (+91 97890 91674)',
    students: 'Karthikeyan (ECE DS) [+91 6380 482 177], Pugal (ECE DS) [+91 91235 87828]',
    poster: '/assets/posters/connections_poster.jpg',
    regLink: 'https://docs.google.com/forms/d/1vJlQqH7PHbdq0SkJfF0N_xudXwJsrpTMFMHCod69K3Y/viewform',
    fullDesc: 'A three-round movie-based challenge where participants put their movie knowledge, quick thinking, deduction, and strategy to the test. Teams will identify movies through cast images and tricky plot clues before the top 4 teams advance to an intense actor-based bidding challenge, where they compete to name movies and maximize their scores.'
  }
];

// Helper to convert phone numbers into tel: links
function formatPhoneLinks(text) {
  if (!text) return '';
  return text.replace(/(\+?\d[\d\s-]{8,15}\d)/g, '<a href="tel:$1" class="coord-tel-link">$1</a>');
}

export function createEventRow(event) {
  const isTech = event.category === 'technical';
  const row = document.createElement('div');
  row.className = `event-row-item ${isTech ? 'item-tech' : 'item-nontech'}`;
  row.dataset.eventId = event.id;
  row.dataset.category = event.category;

  row.innerHTML = `
    <!-- Clickable Header Row: Min Height 56px -->
    <button class="event-row-trigger" type="button" aria-expanded="false" aria-controls="detail-${event.id}">
      <span class="event-color-bar" aria-hidden="true"></span>
      <span class="event-num">${event.seq}</span>
      <div class="event-info">
        <span class="event-name">${event.title}</span>
        <span class="event-meta">${event.fee} \u00B7 ${event.teamSize}</span>
      </div>
      <span class="event-expand-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
    </button>

    <!-- Expanded Detail Drawer (Hardware-accelerated 0fr -> 1fr grid) -->
    <div class="event-detail-drawer" id="detail-${event.id}" role="region">
      <div class="event-detail-inner">
        <div class="event-detail-grid">
          
          ${event.poster ? `
            <!-- Integrated Official Poster Card (Directly Visible) -->
            <div class="event-poster-pane">
              <div class="event-poster-card" role="button" tabindex="0" title="Click to enlarge ${event.title} poster" data-poster-url="${event.poster}" data-poster-title="${event.title}" data-event-id="${event.id}">
                <img src="${event.poster}" alt="${event.title} Official Poster" class="event-poster-preview" loading="lazy" />
                <div class="poster-overlay-zoom">
                  <span class="poster-zoom-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    <span>Click to Enlarge</span>
                  </span>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Detailed Information & Action Column -->
          <div class="event-info-pane">
            <!-- Clean Horizontal Value Strip -->
            <div class="event-data-row">
              <div class="event-data-item">
                <span class="data-dot" aria-hidden="true"></span>
                <span class="event-data-val">${event.fee}</span>
              </div>
              <div class="event-data-item">
                <span class="data-dot" aria-hidden="true"></span>
                <span class="event-data-val">${event.teamSize}</span>
              </div>
              <div class="event-data-item">
                <span class="data-dot" aria-hidden="true"></span>
                <span class="event-data-val">${event.format}</span>
              </div>
            </div>

            <!-- Full Description Text -->
            <p class="event-description">${event.fullDesc}</p>

            <!-- Coordinators with tel: links -->
            <div class="event-coordinators">
              <div class="coord-entry">
                <span class="coord-label">Faculty Coordinator:</span>
                <span class="coord-val">${formatPhoneLinks(event.faculty)}</span>
              </div>
              <div class="coord-entry">
                <span class="coord-label">Student Coordinators:</span>
                <span class="coord-val">${formatPhoneLinks(event.students)}</span>
              </div>
            </div>

            <!-- Uiverse.io Rotating Lattice Register CTA Button + Enlarge Button -->
            <div class="event-action-wrap">
              <button class="event-btn-register" type="button" data-event-id="${event.id}" data-event-title="${event.title}">
                <span class="btn-reg-text">Register for ${event.title} \u2192</span>
              </button>
              ${event.poster ? `
                <button class="event-btn-poster" type="button" data-poster-url="${event.poster}" data-poster-title="${event.title}" data-event-id="${event.id}">
                  <span class="fill-container" aria-hidden="true"></span>
                  <span class="button-text">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Full-Screen Poster</span>
                  </span>
                </button>
              ` : ''}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  // Row trigger click handler: Only one row expanded at a time
  const triggerBtn = row.querySelector('.event-row-trigger');
  triggerBtn.addEventListener('click', () => {
    const isExpanded = row.classList.contains('active');

    // Close any other open row across the entire events section
    document.querySelectorAll('.event-row-item.active').forEach(openRow => {
      if (openRow !== row) {
        openRow.classList.remove('active');
        const otherTrigger = openRow.querySelector('.event-row-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    if (isExpanded) {
      row.classList.remove('active');
      triggerBtn.setAttribute('aria-expanded', 'false');
    } else {
      row.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Flat gold register button click handler: opens Google Form link directly if available, else modal
  const regBtn = row.querySelector('.event-btn-register');
  if (regBtn) {
    regBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (event.regLink) {
        window.open(event.regLink, '_blank', 'noopener,noreferrer');
        return;
      }
      if (window.openRegistrationModal) {
        window.openRegistrationModal();
        const selectEl = document.getElementById('regEvent');
        if (selectEl) {
          for (let i = 0; i < selectEl.options.length; i++) {
            const optVal = selectEl.options[i].value;
            const optText = selectEl.options[i].text.toLowerCase();
            if (optVal === event.id || optText.includes(event.title.toLowerCase().split(' ')[0])) {
              selectEl.selectedIndex = i;
              break;
            }
          }
        }
      }
    });
  }

  // Poster card click & keyboard handlers: opens lightbox modal
  const posterCard = row.querySelector('.event-poster-card');
  if (posterCard) {
    posterCard.addEventListener('click', (e) => {
      e.stopPropagation();
      openPosterLightbox(event.poster, event.title, event.id);
    });
    posterCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        openPosterLightbox(event.poster, event.title, event.id);
      }
    });
  }

  // Uiverse.io Poster Button click handler: opens lightbox modal
  const posterBtn = row.querySelector('.event-btn-poster');
  if (posterBtn) {
    posterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPosterLightbox(event.poster, event.title, event.id);
    });
  }

  return row;
}

export function initEvents() {
  const techList = document.getElementById('techRosterList');
  const nonTechList = document.getElementById('nonTechRosterList');
  const techGroup = document.getElementById('techEventsGroup');
  const nonTechGroup = document.getElementById('nonTechEventsGroup');
  const tabs = document.querySelectorAll('.events-filter-tab');

  if (!techList || !nonTechList) return;

  techList.innerHTML = '';
  nonTechList.innerHTML = '';

  const techEvents = EVENTS_DATA.filter(e => e.category === 'technical');
  const nonTechEvents = EVENTS_DATA.filter(e => e.category === 'non-technical');

  techEvents.forEach(e => techList.appendChild(createEventRow(e)));
  nonTechEvents.forEach(e => nonTechList.appendChild(createEventRow(e)));

  // Plain text filter tab controls
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;

      if (filter === 'all') {
        if (techGroup) techGroup.style.display = 'block';
        if (nonTechGroup) nonTechGroup.style.display = 'block';
        const rosterContainer = document.getElementById('eventsRosterContainer');
        if (rosterContainer) {
          rosterContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (filter === 'technical') {
        if (techGroup) {
          techGroup.style.display = 'block';
          techGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (nonTechGroup) nonTechGroup.style.display = 'none';
      } else if (filter === 'non-technical') {
        if (techGroup) techGroup.style.display = 'none';
        if (nonTechGroup) {
          nonTechGroup.style.display = 'block';
          nonTechGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

export function openPosterLightbox(src, title, eventId) {
  const modal = document.getElementById('posterLightboxModal');
  const img = document.getElementById('posterLightboxImg');
  const titleEl = document.getElementById('posterLightboxTitle');
  const fullLink = document.getElementById('posterLightboxFullLink');
  const regBtn = document.getElementById('posterLightboxRegBtn');

  if (!modal || !img) return;

  img.src = src;
  img.alt = `${title} Official Poster`;
  if (titleEl) titleEl.textContent = title;
  if (fullLink) fullLink.href = src;

  const event = EVENTS_DATA.find(e => e.id === eventId);

  if (regBtn) {
    regBtn.onclick = () => {
      closePosterLightbox();
      if (event && event.regLink) {
        window.open(event.regLink, '_blank', 'noopener,noreferrer');
        return;
      }
      if (window.openRegistrationModal) {
        window.openRegistrationModal();
        const selectEl = document.getElementById('regEvent');
        if (selectEl && eventId) {
          for (let i = 0; i < selectEl.options.length; i++) {
            if (selectEl.options[i].value === eventId) {
              selectEl.selectedIndex = i;
              break;
            }
          }
        }
      }
    };
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closePosterLightbox() {
  const modal = document.getElementById('posterLightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePosterLightbox();
  }
});

window.openPosterLightbox = openPosterLightbox;
window.closePosterLightbox = closePosterLightbox;

