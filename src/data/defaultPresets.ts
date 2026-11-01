import { EventPlan } from '../types';

export const DEFAULT_PRESETS: Record<string, EventPlan> = {
  wedding: {
    id: 'preset-wedding-royal-sunset',
    title: 'The Royal Sunset Coastal Wedding',
    eventType: 'wedding',
    date: '2026-12-18',
    location: 'Cypress Point Cliffside & Grand Pavillion, Monterey CA',
    guestCount: 140,
    vibe: 'Romantic, Cinematic, Warm Sunset Glow, Modern Elegant',
    specialNotes: 'Golden hour ceremony on the lawn, followed by an intimate candlelit dinner under fairy lights and acoustic live violin transitioning into a DJ party.',
    theme: {
      title: 'Dusk & Champagne Elegance',
      tagline: 'Two Souls, One Golden Horizon',
      description: 'A luxurious coastal evening featuring velvet terracotta, dusk rose, muted champagne gold, and raw travertine textures illuminated by warm amber candlelight.',
      palette: [
        { name: 'Terracotta Rose', hex: '#C86D51' },
        { name: 'Champagne Shimmer', hex: '#E7D3B3' },
        { name: 'Warm Dusk', hex: '#634B59' },
        { name: 'Olive Greenery', hex: '#5B6849' },
        { name: 'Candlelight Gold', hex: '#F3B755' }
      ],
      decorIdeas: [
        'Curved asymmetric floral arch adorned with pampas grass, white peonies, and terracotta ranunculus overlooking the ocean',
        'Floating cascading micro-fairy lights canopy above the open-air dining tables',
        'Handmade deckled-edge cotton paper place cards with gold wax seal calligraphy',
        'Lounge nook with mid-century velvet armchairs, vintage Persian rugs, and espresso martini welcome cart'
      ],
      signatureFoodDrinks: [
        { name: 'Golden Hour Spritz', type: 'drink', desc: 'Aperol, blood orange reduction, prosecco, rosemary smoke garnish' },
        { name: 'Monterey Seared Sea Bass', type: 'food', desc: 'Saffron emulsion, roasted baby fennel, and micro herb garden salad' },
        { name: 'Earl Grey & Salted Fig Cake', type: 'dessert', desc: 'Semi-naked tiered sponge with honeycomb crunch and edible 24k gold leaf' }
      ],
      entertainmentConcepts: [
        'Acoustic cello & violin duo playing modern pop ballads (Bridgerton style) during prelude & ceremony',
        'Audio guestbook retro rotary phone for guests to record voice messages',
        'Late-night artisan churros & espresso cart at 10:30 PM'
      ],
      photoOpIdeas: [
        'Neon script sign "Better Together" against an organic botanical moss & rose wall',
        'Sunset polaroid station with custom leather guestbook scrapbook',
        'Vintage convertible getaway car decorated with trailing floral garland'
      ],
      hashtags: ['#ForeverSunset2026', '#MontereyVows', '#ElenaAndJulian']
    },
    budget: {
      totalBudget: 35000,
      currency: 'USD',
      currencySymbol: '$',
      categoryAllocations: {
        'Venue & Rentals': 32,
        'Catering & Bar': 30,
        'Photography & Video': 14,
        'Floral & Decor': 12,
        'Music & DJ': 7,
        'Contingency & Favors': 5
      },
      items: [
        { id: 'b1', category: 'Venue & Rentals', name: 'Cliffside Estate Lawn & Pavilion Rental', estimatedCost: 10500, actualCost: 10200, paid: true, notes: 'Includes 10 hours access & bridal suite' },
        { id: 'b2', category: 'Catering & Bar', name: 'Plated 3-Course Dinner & Craft Bar Service (140 pax)', estimatedCost: 11000, actualCost: 10800, paid: true, notes: 'Includes tastings & bar staff' },
        { id: 'b3', category: 'Photography & Video', name: 'Full Day Hybrid Photo + 4K Drone Cinema Package', estimatedCost: 4800, actualCost: 4800, paid: true, notes: '2 shooters, 8 hours coverage' },
        { id: 'b4', category: 'Floral & Decor', name: 'Ceremony Arch, Centerpieces & Bridal Bouquets', estimatedCost: 4200, actualCost: 3950, paid: false, notes: 'Terracotta & champagne roses' },
        { id: 'b5', category: 'Music & DJ', name: 'Live String Duo (Ceremony) + Evening Sound DJ', estimatedCost: 2600, actualCost: 2500, paid: false, notes: 'Sound system & intelligent wireless uplights' },
        { id: 'b6', category: 'Contingency & Favors', name: 'Personalized Olive Oil Favors & Emergency Fund', estimatedCost: 1900, actualCost: 1400, paid: false, notes: 'Local pressed organic bottles' }
      ],
      aiSavingsTips: [
        'Repurpose ceremony arch florals into the sweetheart table backdrop to save ~$800 in duplicate decor.',
        'Opt for a boutique signature cocktail bar instead of an unlimited full top-shelf open bar to shave 15% off catering.',
        'Order a chic 2-tier display cutting cake paired with gourmet kitchen sheet cake slices for guests to save ~$450 on specialty bakery fees.'
      ]
    },
    milestones: [
      { id: 'm1', phase: '6 Months Before', task: 'Finalize venue contracts & lock deposit', completed: true, priority: 'high', category: 'Venue' },
      { id: 'm2', phase: '6 Months Before', task: 'Book lead photographer & videography team', completed: true, priority: 'high', category: 'Photo' },
      { id: 'm3', phase: '4 Months Before', task: 'Send out formal Save The Dates & launch RSVP link', completed: true, priority: 'medium', category: 'Guests' },
      { id: 'm4', phase: '2 Months Before', task: 'Menu tasting & floral centerpiece mockup review', completed: true, priority: 'medium', category: 'Catering' },
      { id: 'm5', phase: '1 Month Before', task: 'Finalize Day-of Run of Show timeline & vendor contact sheet', completed: false, priority: 'high', category: 'Coordination' },
      { id: 'm6', phase: '2 Weeks Before', task: 'Submit final seating chart & confirmed dietary headcounts', completed: false, priority: 'high', category: 'Catering' },
      { id: 'm7', phase: 'Day Before', task: 'Wedding rehearsal walk-through & welcome sunset dinner', completed: false, priority: 'high', category: 'Ceremony' }
    ],
    runOfShow: [
      { id: 'r1', time: '11:00 AM', title: 'Bridal Party Hair & Makeup', description: 'Bridal suite access opens. Champagne & light bites served.', owner: 'Lead Stylist', completed: false },
      { id: 'r2', time: '01:30 PM', title: 'Vendor Load-in & Floral Arch Setup', description: 'Florist, rentals, and sound tech arrive at lawn.', owner: 'Coordinator', completed: false },
      { id: 'r3', time: '03:15 PM', title: 'First Look & Couple Portraits', description: 'Private cliffside path photo session before guests arrive.', owner: 'Lead Photographer', completed: false },
      { id: 'r4', time: '04:30 PM', title: 'Guest Arrival & Welcome Spritz', description: 'Live string duo begins prelude music on the ocean terrace.', owner: 'Catering Team', completed: false },
      { id: 'r5', time: '05:00 PM', title: 'Ceremony Processional', description: 'Official ceremony, vows exchange, ring blessing, and first kiss.', owner: 'Officiant & Planner', completed: false },
      { id: 'r6', time: '05:45 PM', title: 'Golden Hour Cocktail Reception', description: 'Passed hors d’oeuvres and signature Golden Hour Spritzers.', owner: 'Bar Staff', completed: false },
      { id: 'r7', time: '07:00 PM', title: 'Grand Entrance & Plated Dinner', description: 'Welcome toasts, seated 3-course dinner, champagne pouring.', owner: 'DJ & MC', completed: false },
      { id: 'r8', time: '08:30 PM', title: 'First Dance & Dance Floor Opens', description: 'Father-daughter dance, mother-son dance, upbeat party set.', owner: 'DJ Marcus', completed: false },
      { id: 'r9', time: '10:30 PM', title: 'Late-Night Churro Cart & Sparkler Send-off', description: 'Guests gather on main pathway with cold sparklers.', owner: 'Coordinator', completed: false }
    ],
    vendors: [
      {
        id: 'v1',
        category: 'Venue',
        name: 'Cypress Point Coastal Pavilion',
        contact: 'events@cypresspointweddings.com | (831) 555-0192',
        status: 'booked',
        cost: 10200,
        notes: 'Deposit $3,000 paid. Noise curfew strictly 11:00 PM.',
        checklist: [
          { item: 'Certificate of insurance provided', done: true },
          { item: 'Floor plan seating layout approved', done: true },
          { item: 'Final walkthrough meeting scheduled', done: false }
        ],
        rfpQuestions: [
          'What is the backup weather contingency plan for high coastal winds or sudden rain?',
          'Are there any restrictions on open flames, taper candles, or sparkler exits?',
          'What exact time does vendor teardown need to conclude?'
        ]
      },
      {
        id: 'v2',
        category: 'Catering',
        name: 'Pacific Hearth Culinary Arts',
        contact: 'chef@pacifichearth.com | (831) 555-8421',
        status: 'booked',
        cost: 10800,
        notes: 'Includes 6 waitstaff, 2 bartenders, tableware and glassware.',
        checklist: [
          { item: 'Tasting session completed & menu selected', done: true },
          { item: 'Vegetarian and gluten-free counts recorded', done: true },
          { item: 'Bar liquor permit confirmed', done: true }
        ],
        rfpQuestions: [
          'How do you handle day-of dietary emergencies or unexpected extra plates?',
          'Is water service and coffee/tea included during dessert hour?',
          'What is the staff-to-guest ratio for plated dinner service?'
        ]
      },
      {
        id: 'v3',
        category: 'Photography',
        name: 'Luminary Coastal Film & Cinema',
        contact: 'luminaryvisuals@gmail.com | @luminaryfilms',
        status: 'booked',
        cost: 4800,
        notes: '8 hours of coverage, 2 photographers, full color-graded highlight film.',
        checklist: [
          { item: 'Shot list for family portraits shared', done: false },
          { item: 'Drone airspace clearance approved', done: true },
          { item: 'Deposit payment confirmed', done: true }
        ],
        rfpQuestions: [
          'How many edited high-res photos are guaranteed and what is the turnaround time?',
          'Do you carry backup camera bodies, dual memory slots, and weather sealing?',
          'Can we get a sneak peek gallery within 48-72 hours of the wedding?'
        ]
      },
      {
        id: 'v4',
        category: 'Music & DJ',
        name: 'Soundwave Collective & DJ Marcus',
        contact: 'bookings@soundwavecollective.io',
        status: 'quoted',
        cost: 2500,
        notes: 'Includes wireless lapel mics for officiant, cocktail system, party lighting.',
        checklist: [
          { item: 'Must-play and Do-Not-Play playlist shared', done: false },
          { item: 'Ceremony entrance cue timings synced', done: false }
        ],
        rfpQuestions: [
          'How do you manage guest song requests during high-energy dance sets?',
          'Do you provide backup generators or batteries if outdoor power drops?',
          'Are wireless lapel mics immune to ocean wind distortion?'
        ]
      }
    ],
    guests: [
      { id: 'g1', name: 'Sophia & Alexander Vance', contact: 'sophia.v@example.com', status: 'confirmed', dietary: 'Vegetarian', plusOnes: 1, group: 'VIP / Family' },
      { id: 'g2', name: 'Dr. Marcus Sterling', contact: 'drsterling@example.com', status: 'confirmed', dietary: 'Gluten-Free', plusOnes: 0, group: 'Family' },
      { id: 'g3', name: 'Chloe Chen & Partner', contact: 'chloe.chen@example.com', status: 'confirmed', dietary: 'None', plusOnes: 1, group: 'College Friends' },
      { id: 'g4', name: 'Liam & Maya Thorne', contact: 'thorne.creative@example.com', status: 'pending', dietary: 'Vegan', plusOnes: 1, group: 'Bridal Party' },
      { id: 'g5', name: 'David & Rachel Miller', contact: 'rmiller@example.com', status: 'pending', dietary: 'Nut Allergy', plusOnes: 1, group: 'Friends' }
    ],
    invitations: {
      whatsapp: '💍✨ *Elena & Julian are getting married!* ✨💍\n\nWe are overjoyed to invite you to celebrate our union as the sun sets over the Pacific.\n\n📍 *Where:* Cypress Point Pavillion, Monterey, CA\n📅 *When:* December 18, 2026 at 4:30 PM\n👔 *Dress Code:* Sunset Formal (Terracotta, Warm Neutrals & Black Tie)\n\nPlease RSVP by clicking our link below so we can reserve your dinner seat:\n👉 celebrai.app/rsvp/elena-julian\n\nWe can\'t wait to dance the night away with you!',
      emailSubject: 'Formal Invitation: Elena & Julian’s Wedding Celebration',
      emailBody: 'Dear Loved Ones,\n\nTogether with our families, we invite you to share in our joy as we exchange our wedding vows overlooking the Monterey coastline.\n\nDate: Friday, December 18, 2026\nCeremony Begins: 4:30 PM Sharp\nVenue: Cypress Point Pavillion, Monterey, California\nAttire: Sunset Formal\n\nKindly confirm your attendance and meal preferences by November 15 at our wedding portal.\n\nWith all our love,\nElena & Julian',
      socialCaption: 'The golden hour of our lives begins here. Counting down the days until December 18! 🌅💍 #ElenaAndJulian #ForeverSunset2026'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  birthday: {
    id: 'preset-birthday-synthwave',
    title: 'Neon Horizon: 30th Retro Synthwave Bash',
    eventType: 'birthday',
    date: '2026-11-28',
    location: 'The Vault Loft & Rooftop Lounge, Brooklyn NY',
    guestCount: 45,
    vibe: '80s Arcade Cyberpunk, Electric Retro, High-Energy Glow',
    specialNotes: 'Immersive nostalgic birthday party featuring playable vintage arcade cabinets, neon cocktail bar, synthwave beats, and custom LED photo booth.',
    theme: {
      title: 'Outrun & Cyber Dreams',
      tagline: 'Level 30 Unlocked: Reboot into the Future',
      description: 'An electrifying retro-futuristic aesthetic inspired by 1984 Miami nights, synthwave grids, magenta lasers, and glowing neon wireframe art.',
      palette: [
        { name: 'Neon Magenta', hex: '#FF007F' },
        { name: 'Electric Cyan', hex: '#00F0FF' },
        { name: 'Laser Violet', hex: '#8A2BE2' },
        { name: 'Midnight Grid', hex: '#0F0E26' },
        { name: 'Chrome Yellow', hex: '#FFE600' }
      ],
      decorIdeas: [
        'Custom 3D wireframe grid backdrop with custom neon sign "LEVEL 30: ADITYA"',
        'Retro arcade station with 3 free-to-play multi-game machines (Pac-Man, Street Fighter II, Galaga)',
        'Glowing LED furniture: light-up acrylic cocktail tables and neon cube seats',
        'Blacklight reactive retro confetti and cassette-tape centerpieces'
      ],
      signatureFoodDrinks: [
        { name: 'The Cyberpunk Mule', type: 'drink', desc: 'Vodka, butterfly pea flower tea, ginger beer, lime with glowing neon stirrer' },
        { name: 'Neon Slider Sliders & Truffle Fries', type: 'food', desc: 'Gourmet smash wagyu sliders served in glowing chrome foil baskets' },
        { name: 'Pixel Glitch Birthday Cake', type: 'dessert', desc: 'Geometric 8-bit chocolate ganache cake with popping candy dust' }
      ],
      entertainmentConcepts: [
        'Live Retro DJ spinning 80s new wave, synthwave, Daft Punk, and modern electro hits',
        'High Score Arcade Tournament with retro trophy for the winner',
        'UV glow body paint station with artist drawing geometric cyberpunk patterns'
      ],
      photoOpIdeas: [
        'DeLorean cutout photo-op with magenta fog smoke machine',
        '360-degree rotating video booth with laser tunnel lighting',
        'Retro VHS camcorder station giving guests instant gritty 80s video clips'
      ],
      hashtags: ['#Level30Unlocked', '#NeonHorizonBash', '#RetroAditya']
    },
    budget: {
      totalBudget: 3500,
      currency: 'USD',
      currencySymbol: '$',
      categoryAllocations: {
        'Loft Venue Rental': 35,
        'Craft Drinks & Finger Food': 32,
        'Arcade & DJ Sound': 18,
        'Neon Decor & Lighting': 10,
        'Cake & Favors': 5
      },
      items: [
        { id: 'b1', category: 'Loft Venue Rental', name: 'Industrial Brooklyn Loft (6 Hours)', estimatedCost: 1200, actualCost: 1150, paid: true, notes: 'Includes rooftop terrace access' },
        { id: 'b2', category: 'Craft Drinks & Finger Food', name: 'Tapas Sliders, Bao Buns & Custom Cocktail Kegs', estimatedCost: 1100, actualCost: 1080, paid: false, notes: 'Self-serve glowing cocktail bar' },
        { id: 'b3', category: 'Arcade & DJ Sound', name: '2 Arcade Cabinet Rentals + DJ Pioneer Rig', estimatedCost: 650, actualCost: 600, paid: true, notes: 'Local vintage gaming vendor' },
        { id: 'b4', category: 'Neon Decor & Lighting', name: 'Custom Neon Flex Sign + UV Blacklights', estimatedCost: 350, actualCost: 320, paid: true, notes: 'Keep sign as bedroom souvenir' },
        { id: 'b5', category: 'Cake & Favors', name: 'Pixel 8-Bit Cake + Custom Glowing Sunglasses', estimatedCost: 200, actualCost: 190, paid: false, notes: '45 pairs of EL wire shades' }
      ],
      aiSavingsTips: [
        'Order a DIY custom LED neon flex sign from Etsy 3 weeks in advance instead of rush-renting to save over $150.',
        'Pre-batch signature cocktails in beverage dispensers with neon ice cubes rather than hiring an expensive hourly bartender.',
        'Hook up a Nintendo Switch running retro arcade emulators to a high-lumen projector as a budget-friendly multiplayer arcade!'
      ]
    },
    milestones: [
      { id: 'm1', phase: '4 Weeks Before', task: 'Lock in loft venue and pay security deposit', completed: true, priority: 'high', category: 'Venue' },
      { id: 'm2', phase: '3 Weeks Before', task: 'Order custom neon sign and retro party favors', completed: true, priority: 'medium', category: 'Decor' },
      { id: 'm3', phase: '2 Weeks Before', task: 'Send out WhatsApp video teaser invite to guest list', completed: true, priority: 'high', category: 'Guests' },
      { id: 'm4', phase: '1 Week Before', task: 'Curate 4-hour Synthwave / Electro playlist & confirm DJ gear', completed: false, priority: 'medium', category: 'Music' },
      { id: 'm5', phase: 'Day of Event', task: 'Venue setup, lighting check, sound test, and ice delivery', completed: false, priority: 'high', category: 'Setup' }
    ],
    runOfShow: [
      { id: 'r1', time: '06:00 PM', title: 'Setup & Soundcheck', description: 'Plug in UV lights, test DJ decks, turn on arcade machines.', owner: 'Host & Crew', completed: false },
      { id: 'r2', time: '08:00 PM', title: 'Doors Open & Welcome Shots', description: 'Guests arrive, grab LED glasses, signature neon cocktails poured.', owner: 'Bartender', completed: false },
      { id: 'r3', time: '09:15 PM', title: 'Arcade Pac-Man High Score Showdown', description: 'Friendly mini-tournament with retro prize trophy.', owner: 'MC / Friend', completed: false },
      { id: 'r4', time: '10:30 PM', title: 'Level 30 Cake Cutting & Birthday Toast', description: 'Dim lights, sparkler candles, cake cutting, group cheer.', owner: 'Host', completed: false },
      { id: 'r5', time: '11:00 PM', title: 'Peak DJ Dance Set & Glow Sticks Drop', description: 'Laser lights, synthwave drop, dancing till late.', owner: 'DJ', completed: false },
      { id: 'r6', time: '01:30 AM', title: 'Wrap-up & Late Night Pizza', description: 'Wind-down tracks, slice delivery, venue handoff.', owner: 'Host', completed: false }
    ],
    vendors: [
      {
        id: 'v1',
        category: 'Venue',
        name: 'The Vault Loft Studio',
        contact: 'manager@vaultstudio.nyc',
        status: 'booked',
        cost: 1150,
        notes: 'Deposit cleared. Has freight elevator for arcade machines.',
        checklist: [
          { item: 'Keycode access verified', done: true },
          { item: 'Cleaning fee settled', done: true }
        ],
        rfpQuestions: [
          'Can we use haze / low-fog smoke machines without triggering smoke alarms?',
          'What is the maximum electrical amp limit for lights and audio gear?'
        ]
      },
      {
        id: 'v2',
        category: 'Music & DJ',
        name: 'RetroGroove DJ & Sound Gear',
        contact: 'alex@retrogroove.nyc',
        status: 'booked',
        cost: 600,
        notes: 'Subwoofer + 2 QSC speakers + Pioneer CDJ console.',
        checklist: [
          { item: 'Song preference list provided', done: true },
          { item: 'Mic check done', done: false }
        ],
        rfpQuestions: [
          'Can you incorporate live guest requests from a Spotify queue?',
          'Do you supply wireless microphones for toasts and gaming commentary?'
        ]
      }
    ],
    guests: [
      { id: 'g1', name: 'Samira Patel', contact: 'samira@tech.co', status: 'confirmed', dietary: 'Vegetarian', plusOnes: 1, group: 'Squad' },
      { id: 'g2', name: 'Jordan Hayes', contact: 'jordan.h@design.org', status: 'confirmed', dietary: 'None', plusOnes: 0, group: 'Coworkers' },
      { id: 'g3', name: 'Alex Rivera', contact: 'alex.rivera@gmail.com', status: 'confirmed', dietary: 'Vegan', plusOnes: 1, group: 'Squad' },
      { id: 'g4', name: 'Maya Lin', contact: 'mayalin@studio.com', status: 'pending', dietary: 'Gluten-Free', plusOnes: 0, group: 'College Friends' }
    ],
    invitations: {
      whatsapp: '🕹️ *READY PLAYER ONE!* 🕹️\n\nAditya is officially hitting **LEVEL 30** and we are throwing down the most electric synthwave night in Brooklyn!\n\n👾 *Vibe:* Neon, Cyberpunk, Arcade Games & Heavy Bass\n📅 *When:* Saturday, Nov 28 @ 8:00 PM\n📍 *Where:* The Vault Loft, Brooklyn\n🕶️ *Dress Code:* Cyber chic, glow accents, 80s retro, or all black with neon pop\n\nDrop in and claim your arcade tokens: celebrai.app/rsvp/aditya-30\nDon\'t sleep on this reboot!',
      emailSubject: 'Level 30 Unlocked: Aditya\'s Synthwave Birthday Party',
      emailBody: 'Hey Friend,\n\nI’m turning 30 and celebrating with playable retro arcade cabinets, custom glowing cocktails, and killer beats.\n\nDate: Saturday, November 28, 2026\nTime: 8:00 PM onwards\nLocation: The Vault Loft (142 5th Ave, Brooklyn)\n\nPlease RSVP so we have enough tacos and cocktail fuel for everyone!\n\nCheers,\nAditya',
      socialCaption: 'Turning 30 at 140 BPM with neon lights and arcade highs. Level 30 reboot starts now! ⚡🕹️ #Level30Unlocked #SynthwaveBirthday'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  community: {
    id: 'preset-community-eco-fest',
    title: 'GreenRoots Community Harvest & Eco-Festival',
    eventType: 'community',
    date: '2026-10-10',
    location: 'Riverside Community Park & Amphitheater',
    guestCount: 650,
    vibe: 'Warm, Earthy, Family-Friendly, Sustainable, Celebratory',
    specialNotes: 'Zero-waste neighborhood festival celebrating local artisans, organic farm produce, live folk/acoustic music, and kids eco-workshops.',
    theme: {
      title: 'Earth, Community & Harmony',
      tagline: 'Sown with Love, Celebrated Together',
      description: 'An uplifting natural celebration featuring recycled timber structures, burlap bunting, sun-bleached yellows, fresh forest greens, and solar-powered sound systems.',
      palette: [
        { name: 'Forest Moss', hex: '#2D5A27' },
        { name: 'Warm Terracotta', hex: '#D97746' },
        { name: 'Sunflower Yellow', hex: '#F4B41A' },
        { name: 'Natural Kraft', hex: '#C2A383' },
        { name: 'Sky Meadow', hex: '#87CEEB' }
      ],
      decorIdeas: [
        'Upcycled wooden pallet photo wall with living potted succulents and community message tags',
        'Compostable hemp festival flags and solar-powered paper lantern canopies across walkways',
        'Interactive community mural canvas where attendees paint handprints and sustainability wishes',
        'Hay bale seating clusters surrounded by wildflower planters and picnic blankets'
      ],
      signatureFoodDrinks: [
        { name: 'Fresh Orchard Cider & Ginger Press', type: 'drink', desc: 'Cold pressed local apples, fresh ginger, sparkling spring water and cinnamon' },
        { name: 'Wood-Fired Farm Flatbreads', type: 'food', desc: 'Locally grown heirloom squash, ricotta, caramelized onions and garden herbs' },
        { name: 'Honey-Lavender Shortbread Bites', type: 'dessert', desc: 'Sweet treats sweetened with honey donated by the neighborhood beekeeping club' }
      ],
      entertainmentConcepts: [
        'Acoustic folk band playing live on the solar-powered park amphitheater stage',
        'Kids "Seed Bomb & Little Botanist" DIY planting workshop booth',
        'Neighborhood Great Pie Bake-Off competition with guest celebrity chef judges'
      ],
      photoOpIdeas: [
        'Giant 8-foot wooden picture frame framing the river and autumn trees',
        '"I Grew This!" farmers vegetable weigh-in photo spot with vintage scales',
        'Community living plant wall polaroid board'
      ],
      hashtags: ['#GreenRootsFest2026', '#EcoCommunity', '#RiversideParkTogether']
    },
    budget: {
      totalBudget: 8500,
      currency: 'USD',
      currencySymbol: '$',
      categoryAllocations: {
        'City Permits & Park Facility': 22,
        'Sound, Staging & Solar Power': 28,
        'Kids Workshops & Activities': 18,
        'Eco Waste Stations & Sanitation': 17,
        'Marketing & Banners': 15
      },
      items: [
        { id: 'b1', category: 'City Permits & Park Facility', name: 'Park Reservation, Amplified Sound & Event Insurance', estimatedCost: 1800, actualCost: 1750, paid: true, notes: 'City parks department approval signed' },
        { id: 'b2', category: 'Sound, Staging & Solar Power', name: 'Solar Generator Trailer & Stage Sound System', estimatedCost: 2400, actualCost: 2350, paid: true, notes: 'Zero emissions sound reinforcement' },
        { id: 'b3', category: 'Kids Workshops & Activities', name: 'Planting Pots, Soil, Face Paint & Craft Materials', estimatedCost: 1500, actualCost: 1350, paid: false, notes: 'For 250 youth participants' },
        { id: 'b4', category: 'Eco Waste Stations & Sanitation', name: '3-Stream Composting/Recycling Stations & Portable Restrooms', estimatedCost: 1500, actualCost: 1450, paid: false, notes: 'Zero-waste volunteers will staff bins' },
        { id: 'b5', category: 'Marketing & Banners', name: 'Recycled Fabric Street Banners & Neighborhood Flyers', estimatedCost: 1300, actualCost: 1100, paid: true, notes: 'Distributed to 40 local cafes and libraries' }
      ],
      aiSavingsTips: [
        'Partner with local garden nurseries to sponsor plants and soil in exchange for prominent logo placement on festival program.',
        'Recruit volunteer students from the local university environmental club to staff waste stations for volunteer hours credit.',
        'Use QR codes printed on reusable wooden signs instead of thousands of single-use paper event programs.'
      ]
    },
    milestones: [
      { id: 'm1', phase: '3 Months Before', task: 'Submit park permit application & proof of event insurance', completed: true, priority: 'high', category: 'Permits' },
      { id: 'm2', phase: '2 Months Before', task: 'Open vendor registrations for local food trucks and artisan stalls', completed: true, priority: 'high', category: 'Vendors' },
      { id: 'm3', phase: '1 Month Before', task: 'Lock stage lineup with community acoustic performers', completed: true, priority: 'medium', category: 'Entertainment' },
      { id: 'm4', phase: '2 Weeks Before', task: 'Volunteer briefing meeting & emergency medical readiness drill', completed: false, priority: 'high', category: 'Safety' },
      { id: 'm5', phase: 'Day of Event', task: '06:00 AM park gates open, booth check-in, health inspections', completed: false, priority: 'high', category: 'Logistics' }
    ],
    runOfShow: [
      { id: 'r1', time: '07:00 AM', title: 'Vendor Load-in & Stall Setup', description: 'Artisans and organic farmers arrive to unpack stalls.', owner: 'Market Manager', completed: false },
      { id: 'r2', time: '09:30 AM', title: 'Soundcheck & Waste Stations Placement', description: 'Solar sound system test, compost collection bins checked.', owner: 'Tech Lead', completed: false },
      { id: 'r3', time: '10:00 AM', title: 'Gates Open & Opening Ceremony', description: 'Welcome address by Community Council President, festival kicks off.', owner: 'MC & Council', completed: false },
      { id: 'r4', time: '11:30 AM', title: 'Kids Seed Bomb Workshop Begins', description: 'Children gather at pavilion for seed potting and earthworm demo.', owner: 'Youth Coordinator', completed: false },
      { id: 'r5', time: '01:00 PM', title: 'Folk Trio Acoustic Performance', description: 'Main amphitheater concert with organic cider tasting.', owner: 'Band Lead', completed: false },
      { id: 'r6', time: '02:30 PM', title: 'Annual Community Pie Bake-Off Judging', description: 'Celebrity judges sample 20 local submitted autumn fruit pies.', owner: 'Bake Off Team', completed: false },
      { id: 'r7', time: '04:30 PM', title: 'Community Awards & Golden Trowel Ceremony', description: 'Announcing best garden, bake-off winner, and volunteer of the year.', owner: 'President', completed: false },
      { id: 'r8', time: '06:00 PM', title: 'Festival Conclusion & Clean Sweep', description: 'Music concludes, zero-waste team audits park grounds.', owner: 'Green Team Lead', completed: false }
    ],
    vendors: [
      {
        id: 'v1',
        category: 'Permits & Safety',
        name: 'City Parks & Public Recreation Dept',
        contact: 'specialevents@citygov.org | (555) 912-3000',
        status: 'booked',
        cost: 1750,
        notes: 'Permit #EV-2026-992 approved. Covers 8am - 8pm.',
        checklist: [
          { item: 'Liability policy active', done: true },
          { item: 'Park ranger contact on speed dial', done: true }
        ],
        rfpQuestions: [
          'What are the regulations regarding temporary tent ground stakes vs. water barrel weights on park grass?',
          'Where is designated parking for food trucks requiring electrical plug-in?'
        ]
      },
      {
        id: 'v2',
        category: 'Music & DJ',
        name: 'SolSound Solar-Powered Mobile Stage',
        contact: 'team@solsound.org',
        status: 'booked',
        cost: 2350,
        notes: 'Includes trailer stage, solar battery bank, 4 mics, mixer.',
        checklist: [
          { item: 'Stage delivery timeline scheduled', done: true },
          { item: 'Acoustic performer input list collected', done: false }
        ],
        rfpQuestions: [
          'How many hours of runtime does the solar battery bank provide if weather is overcast?',
          'Does your audio technician stay for the duration of the event?'
        ]
      }
    ],
    guests: [
      { id: 'g1', name: 'Mayor Olivia Bennett', contact: 'mayor@citygov.org', status: 'confirmed', dietary: 'Vegetarian', plusOnes: 2, group: 'VIP / City Officials' },
      { id: 'g2', name: 'Carlos Mendez (Garden Club President)', contact: 'carlos@greenroots.org', status: 'confirmed', dietary: 'None', plusOnes: 1, group: 'Organizers' },
      { id: 'g3', name: 'Sarah & Ben (Artisan Vendors)', contact: 'potterybyben@gmail.com', status: 'confirmed', dietary: 'Vegan', plusOnes: 0, group: 'Vendors' }
    ],
    invitations: {
      whatsapp: '🌻🌱 *GreenRoots Community Eco-Fest 2026!* 🌱🌻\n\nCelebrate our harvest season with farm-fresh food, live folk music, kids workshops, and the famous Annual Pie Bake-Off!\n\n📍 *Where:* Riverside Community Park & Amphitheater\n📅 *When:* Saturday, Oct 10 from 10:00 AM – 6:00 PM\n🎟️ *Admission:* Free for all community members!\n\nCheck out the schedule & sign up for the Pie Bake-Off:\n👉 celebrai.app/event/greenroots2026\n\nBring a picnic blanket and your reusable water bottle!',
      emailSubject: 'You\'re Invited: GreenRoots Community Harvest & Eco-Festival!',
      emailBody: 'Dear Neighbor,\n\nWe are excited to invite you and your family to the Annual GreenRoots Community Eco-Festival!\n\nWhen: Saturday, October 10, 2026 (10 AM - 6 PM)\nWhere: Riverside Community Park\nWhat: Local food artisans, live solar-powered acoustic music, seed planting workshops for kids, and neighborhood pie contest.\n\nFree admission. Everyone is welcome!\n\nWarmly,\nThe GreenRoots Organizing Committee',
      socialCaption: 'Farm fresh flavors, sunny tunes, and community spirit. Join us this Saturday at Riverside Park for GreenRoots Eco-Fest! 🌿🥧 #GreenRootsFest2026'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

