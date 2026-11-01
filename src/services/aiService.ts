import { EventPlan, EventType, CurrencyCode, ThemeDetails, BudgetPlan, MilestoneItem, RunOfShowItem, VendorItem } from '../types';

export interface GenerateEventParams {
  title: string;
  eventType: EventType;
  date: string;
  location: string;
  guestCount: number;
  totalBudget: number;
  currency: CurrencyCode;
  vibe: string;
  specialNotes?: string;
  apiKey?: string;
}

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'AU$'
};

// Generates an intelligent, bespoke celebration plan
export async function generateCelebrationPlan(params: GenerateEventParams): Promise<EventPlan> {
  const currencySymbol = CURRENCY_SYMBOLS[params.currency] || '$';

  // If Gemini API Key is provided, attempt live Gemini API call
  if (params.apiKey && params.apiKey.trim().length > 10) {
    try {
      const response = await callGeminiAPI(params);
      if (response) return response;
    } catch (err) {
      console.warn('Gemini API call failed or timed out, switching to dynamic creative generator engine:', err);
    }
  }

  // Built-in intelligent generative engine
  return generateCustomBespokePlan(params, currencySymbol);
}

// Calls Google Gemini 1.5 Flash endpoint
async function callGeminiAPI(params: GenerateEventParams): Promise<EventPlan | null> {
  const prompt = `You are Celebrai, an elite creative event designer and master celebration planner.
Generate a complete, highly structured JSON plan for this event:
- Event Title: "${params.title}"
- Type: ${params.eventType}
- Target Date: ${params.date}
- Location: ${params.location}
- Guest Count: ${params.guestCount}
- Total Budget: ${params.totalBudget} ${params.currency}
- Vibe / Atmosphere: "${params.vibe}"
- Special Notes/Wishes: "${params.specialNotes || 'None'}"

You must return ONLY pure valid JSON (no markdown formatting, no backticks, no explanations) conforming to this exact TypeScript structure:
{
  "theme": {
    "title": string,
    "tagline": string,
    "description": string,
    "palette": [{"name": string, "hex": string}],
    "decorIdeas": [string, string, string, string],
    "signatureFoodDrinks": [{"name": string, "type": "drink" | "food" | "dessert", "desc": string}],
    "entertainmentConcepts": [string, string, string],
    "photoOpIdeas": [string, string, string],
    "hashtags": [string, string, string]
  },
  "budget": {
    "categoryAllocations": {"CategoryName": number},
    "items": [{"id": string, "category": string, "name": string, "estimatedCost": number, "actualCost": number, "paid": boolean, "notes": string}],
    "aiSavingsTips": [string, string, string]
  },
  "milestones": [{"id": string, "phase": string, "task": string, "completed": boolean, "priority": "high" | "medium" | "low", "category": string}],
  "runOfShow": [{"id": string, "time": string, "title": string, "description": string, "owner": string, "completed": boolean}],
  "vendors": [{"id": string, "category": string, "name": string, "contact": string, "status": "researching" | "contacted" | "quoted" | "booked", "cost": number, "notes": string, "checklist": [{"item": string, "done": boolean}], "rfpQuestions": [string, string, string]}],
  "invitations": {
    "whatsapp": string,
    "emailSubject": string,
    "emailBody": string,
    "socialCaption": string
  }
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${params.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini API');

  const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);

  return {
    id: 'plan-' + Date.now(),
    title: params.title,
    eventType: params.eventType,
    date: params.date,
    location: params.location,
    guestCount: params.guestCount,
    vibe: params.vibe,
    specialNotes: params.specialNotes,
    theme: parsed.theme,
    budget: {
      totalBudget: params.totalBudget,
      currency: params.currency,
      currencySymbol: CURRENCY_SYMBOLS[params.currency] || '$',
      categoryAllocations: parsed.budget.categoryAllocations || { Venue: 35, Catering: 30, Decor: 15, Photo: 10, Misc: 10 },
      items: parsed.budget.items || [],
      aiSavingsTips: parsed.budget.aiSavingsTips || []
    },
    milestones: parsed.milestones || [],
    runOfShow: parsed.runOfShow || [],
    vendors: parsed.vendors || [],
    guests: [
      { id: 'g1', name: 'VIP Guest / Key Contact', contact: 'vip@example.com', status: 'confirmed', dietary: 'Vegetarian', plusOnes: 1, group: 'VIP' },
      { id: 'g2', name: 'Primary Host & Family', contact: 'family@example.com', status: 'confirmed', dietary: 'None', plusOnes: 2, group: 'Family' }
    ],
    invitations: parsed.invitations,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Creative rule & theme generator for instant offline/zero-config generation
function generateCustomBespokePlan(params: GenerateEventParams, currencySymbol: string): EventPlan {
  const { eventType, vibe, totalBudget, guestCount, title, location, date } = params;

  // Derive palette and theme based on vibe keywords
  let palette = [
    { name: 'Velvet Rose', hex: '#E11D48' },
    { name: 'Warm Amber', hex: '#F59E0B' },
    { name: 'Champagne Cream', hex: '#FEF3C7' },
    { name: 'Midnight Charcoal', hex: '#1E293B' },
    { name: 'Emerald Leaf', hex: '#10B981' }
  ];

  const lowerVibe = vibe.toLowerCase();
  if (lowerVibe.includes('neon') || lowerVibe.includes('cyber') || lowerVibe.includes('electric') || lowerVibe.includes('party')) {
    palette = [
      { name: 'Laser Fuchsia', hex: '#D946EF' },
      { name: 'Electric Cyan', hex: '#06B6D4' },
      { name: 'Ultraviolet', hex: '#8B5CF6' },
      { name: 'Hyper Yellow', hex: '#FACC15' },
      { name: 'Abyss Black', hex: '#090D16' }
    ];
  } else if (lowerVibe.includes('eco') || lowerVibe.includes('nature') || lowerVibe.includes('rustic') || lowerVibe.includes('garden')) {
    palette = [
      { name: 'Sage Leaf', hex: '#84A98C' },
      { name: 'Forest Moss', hex: '#354F52' },
      { name: 'Earthy Terracotta', hex: '#D4A373' },
      { name: 'Linen Sand', hex: '#FAEDCD' },
      { name: 'Golden Honey', hex: '#E9C46A' }
    ];
  } else if (lowerVibe.includes('royal') || lowerVibe.includes('luxury') || lowerVibe.includes('gold') || lowerVibe.includes('traditional')) {
    palette = [
      { name: 'Royal Crimson', hex: '#991B1B' },
      { name: 'Imperial Gold', hex: '#D97706' },
      { name: 'Ivory Silk', hex: '#FFFBEB' },
      { name: 'Deep Emerald', hex: '#064E3B' },
      { name: 'Regal Indigo', hex: '#1E1B4B' }
    ];
  }

  // Budget calculations
  const venueBudget = Math.round(totalBudget * 0.34);
  const cateringBudget = Math.round(totalBudget * 0.32);
  const photoBudget = Math.round(totalBudget * 0.14);
  const decorBudget = Math.round(totalBudget * 0.12);
  const entertainmentBudget = Math.round(totalBudget * 0.08);

  const theme: ThemeDetails = {
    title: `${vibe.charAt(0).toUpperCase() + vibe.slice(1)} Celebration Concept`,
    tagline: `An Unforgettable Experience Tailored for ${guestCount} Cherished Guests`,
    description: `A bespoke experiential event designed around ${vibe} aesthetics, curated sensory lighting, and cohesive culinary touchpoints hosted at ${location || 'your dream venue'}.`,
    palette,
    decorIdeas: [
      `Signature entrance tunnel illuminated with warm ambient uplighting and custom thematic welcome signage`,
      `Custom floral & botanical arrangements echoing the ${palette[0].name} and ${palette[1].name} color story`,
      `Interactive lounge zone with bespoke soft furnishings, ambient lamps, and cozy guest seating`,
      `Curated tablescapes featuring textured linen runners, matte cutlery, and personalized menu cards`
    ],
    signatureFoodDrinks: [
      { name: `Signature "${title.split(' ')[0]}" Elixir`, type: 'drink', desc: 'Craft mixology blend with fresh citrus cordial, aromatic bitters, and botanical foam garnish' },
      { name: 'Artisan Chef Station & Grazing Board', type: 'food', desc: 'Handcrafted seasonal tapas, roasted vegetable terrine, and local artisanal delicacies' },
      { name: 'Sweet Finale Tasting Trio', type: 'dessert', desc: 'Deconstructed mini patisseries infused with Madagascar vanilla and gold sugar drizzle' }
    ],
    entertainmentConcepts: [
      'Live interactive musicians during welcome cocktails transitioning into curated soundscape',
      'Themed memory lane audio/photo installation allowing guests to record personal stories',
      'Spectacular grand finale moment (synchronized countdown / sparkler reveal / light show)'
    ],
    photoOpIdeas: [
      `Architectural photo wall with customized neon or brass monogram tagline`,
      `Mirror selfie station with custom floral framing and instant print polaroids`,
      'Roaming social video team capturing candid high-energy reel moments'
    ],
    hashtags: [`#${title.replace(/[^a-zA-Z0-9]/g, '')}`, `#CelebrateWithUs`, `#${eventType.toUpperCase()}2026`]
  };

  const budgetPlan: BudgetPlan = {
    totalBudget,
    currency: params.currency,
    currencySymbol,
    categoryAllocations: {
      'Venue & Location': 34,
      'Catering & Hospitality': 32,
      'Photo & Cinematography': 14,
      'Styling & Floral Decor': 12,
      'Music & Production': 8
    },
    items: [
      { id: 'b1', category: 'Venue & Location', name: `${eventType.toUpperCase()} Venue Rental & Security Deposit`, estimatedCost: venueBudget, actualCost: Math.round(venueBudget * 0.98), paid: true, notes: 'Reserved for 8-10 hours access' },
      { id: 'b2', category: 'Catering & Hospitality', name: `Catered Dining & Beverage Service (${guestCount} guests)`, estimatedCost: cateringBudget, actualCost: Math.round(cateringBudget * 0.96), paid: false, notes: `Approx. ${currencySymbol}${Math.round(cateringBudget / guestCount)} per guest` },
      { id: 'b3', category: 'Photo & Cinematography', name: 'Lead Visual Artist + Highlight Film', estimatedCost: photoBudget, actualCost: photoBudget, paid: true, notes: 'Full coverage + drone stills' },
      { id: 'b4', category: 'Styling & Floral Decor', name: 'Ambient Lighting, Centerpieces & Entrance Wall', estimatedCost: decorBudget, actualCost: Math.round(decorBudget * 0.92), paid: false, notes: 'Aligned with custom color palette' },
      { id: 'b5', category: 'Music & Production', name: 'Professional Sound System, DJ / Live Act', estimatedCost: entertainmentBudget, actualCost: entertainmentBudget, paid: false, notes: 'Mics, lighting rig & curated playlist' }
    ],
    aiSavingsTips: [
      `Leverage multi-purpose decor: transition entrance statement pieces into the main stage backdrop after guest arrival to save ~15% on floral costs.`,
      `Book local artisanal beverage kegs or signature craft cocktail dispensers rather than open individual bartender pours to save up to 20%.`,
      `Distribute digital interactive RSVP invites with calendar sync instead of heavy custom print postage to save money and speed up guest confirmations.`
    ]
  };

  const milestones: MilestoneItem[] = [
    { id: 'm1', phase: '6-8 Weeks Before', task: `Finalize booking for ${location || 'venue'} and review event permits`, completed: true, priority: 'high', category: 'Venue' },
    { id: 'm2', phase: '4-5 Weeks Before', task: 'Lock in catering headcount, menu tasting, and dietary requirements', completed: true, priority: 'high', category: 'Catering' },
    { id: 'm3', phase: '3 Weeks Before', task: 'Send out digital invitations and launch RSVP tracker', completed: true, priority: 'medium', category: 'Invitations' },
    { id: 'm4', phase: '1 Week Before', task: 'Final vendor walkthrough and sound/lighting test schedule verification', completed: false, priority: 'high', category: 'Production' },
    { id: 'm5', phase: 'Day of Event', task: 'Oversee vendor load-in, coordinate run of show, and welcome guests', completed: false, priority: 'high', category: 'Execution' }
  ];

  const runOfShow: RunOfShowItem[] = [
    { id: 'r1', time: '02:00 PM', title: 'Vendor Load-in & Production Setup', description: 'Sound tech, florist, and catering equipment setup begin.', owner: 'Production Lead', completed: false },
    { id: 'r2', time: '04:30 PM', title: 'Final Lighting & Audio Soundcheck', description: 'Test microphones, ambient music levels, and lighting dimmers.', owner: 'Audio Lead', completed: false },
    { id: 'r3', time: '05:30 PM', title: 'Guest Arrival & Welcome Refreshments', description: 'Doors open, signature drinks poured, ambient background music.', owner: 'Hospitality Team', completed: false },
    { id: 'r4', time: '06:15 PM', title: 'Main Program & Ceremonial Welcome', description: 'Welcome address, opening speech or ceremony commencement.', owner: 'Host / MC', completed: false },
    { id: 'r5', time: '07:30 PM', title: 'Dinner Service & Social Mingling', description: 'Plated dining or buffet service with background live acoustic music.', owner: 'Catering Head', completed: false },
    { id: 'r6', time: '09:00 PM', title: 'Main Entertainment, Dancing & Cheers', description: 'Energy elevates with DJ set, toasts, and dancing.', owner: 'DJ / MC', completed: false },
    { id: 'r7', time: '11:00 PM', title: 'Grand Finale Send-off & Teardown', description: 'Farewell celebration, guest favors, and venue handoff.', owner: 'Event Coordinator', completed: false }
  ];

  const vendors: VendorItem[] = [
    {
      id: 'v1',
      category: 'Venue',
      name: location ? `${location.split(',')[0]} Space` : 'Grand Event Hall',
      contact: 'events@celebrationspace.com | (555) 234-5678',
      status: 'booked',
      cost: venueBudget,
      notes: 'Load-in begins 3 hours prior. Noise curfew enforced at 11:30 PM.',
      checklist: [
        { item: 'Security deposit confirmed', done: true },
        { item: 'Floor plan seating diagram submitted', done: true },
        { item: 'Certificate of insurance provided', done: false }
      ],
      rfpQuestions: [
        'What are the power outlet specifications and maximum electrical load for audio/lighting equipment?',
        'What is your rain or adverse weather contingency protocol?',
        'Are there any restrictions on catering prep or open flame heating?'
      ]
    },
    {
      id: 'v2',
      category: 'Catering',
      name: 'Artisan Culinary & Craft Hospitality',
      contact: 'catering@artisanculinary.com | (555) 876-5432',
      status: 'quoted',
      cost: cateringBudget,
      notes: `Service designed for ${guestCount} guests including bar staff and glassware.`,
      checklist: [
        { item: 'Tasting appointment scheduled', done: true },
        { item: 'Special dietary breakdown provided', done: false }
      ],
      rfpQuestions: [
        'How are special dietary requests (vegan, gluten-free, allergies) labeled and separated?',
        'Do you supply ice, chillers, and compostable serviceware or glassware?',
        'What is the staff-to-guest ratio during peak dining hours?'
      ]
    },
    {
      id: 'v3',
      category: 'Photography',
      name: 'Aura Lens Media & Cinema',
      contact: 'auralens@creatives.co',
      status: 'booked',
      cost: photoBudget,
      notes: 'Includes full event day shoot, drone coverage, and high-resolution digital gallery.',
      checklist: [
        { item: 'Essential shot list approved', done: false },
        { item: 'Contract signed', done: true }
      ],
      rfpQuestions: [
        'What is your expected delivery timeline for the highlight sneak-peek vs. full edited gallery?',
        'Do you shoot with dual memory card slots for automatic real-time backup?',
        'Are drone photography flight permissions included in the package?'
      ]
    }
  ];

  const invitations = {
    whatsapp: `🎉 *You're Invited to ${title}!* 🎉\n\nJoin us for an unforgettable ${eventType} celebration filled with incredible music, great food, and magical memories!\n\n📅 *Date:* ${date}\n📍 *Location:* ${location}\n✨ *Atmosphere:* ${vibe}\n\nPlease confirm your RSVP so we can finalize our guest list:\n👉 celebrai.app/rsvp/${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}\n\nWe cannot wait to celebrate together!`,
    emailSubject: `You're Invited: ${title}`,
    emailBody: `Dear Friends & Family,\n\nYou are cordially invited to celebrate ${title} with us!\n\nDate: ${date}\nLocation: ${location}\nTheme & Vibe: ${vibe}\n\nPlease let us know if you can make it and any dietary preferences by submitting your RSVP on our portal.\n\nWarm regards,\nThe Celebration Team`,
    socialCaption: `Counting down the days to ${title}! Can't wait to make unforgettable memories on ${date} ✨🥂 ${theme.hashtags.join(' ')}`
  };

  return {
    id: 'plan-' + Date.now(),
    title,
    eventType,
    date,
    location,
    guestCount,
    vibe,
    specialNotes: params.specialNotes,
    theme,
    budget: budgetPlan,
    milestones,
    runOfShow,
    vendors,
    guests: [
      { id: 'g1', name: 'Primary Host / Organizer', contact: 'host@example.com', status: 'confirmed', dietary: 'None', plusOnes: 1, group: 'Host' },
      { id: 'g2', name: 'Special Guest of Honor', contact: 'vip@example.com', status: 'confirmed', dietary: 'Vegetarian', plusOnes: 1, group: 'VIP' },
      { id: 'g3', name: 'Key Vendor Coordinator', contact: 'coordinator@example.com', status: 'confirmed', dietary: 'None', plusOnes: 0, group: 'Staff' }
    ],
    invitations,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Celebration Copilot AI Chat response generator
export async function askCelebrationCopilot(
  userQuery: string,
  eventContext: EventPlan,
  chatHistory: { role: 'user' | 'assistant'; content: string }[],
  apiKey?: string
): Promise<string> {
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{
                text: `You are Celebrai Copilot, a witty, brilliant, highly organized event producer and creative director.
Context of the current event:
- Event: "${eventContext.title}" (${eventContext.eventType})
- Date: ${eventContext.date} at ${eventContext.location}
- Guests: ${eventContext.guestCount}
- Budget: ${eventContext.budget.currencySymbol}${eventContext.budget.totalBudget} ${eventContext.budget.currency}
- Theme & Vibe: ${eventContext.theme.title} (${eventContext.vibe})
- Key Palette: ${eventContext.theme.palette.map(p => p.name).join(', ')}

Chat History:
${chatHistory.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

User question: "${userQuery}"

Provide a concise, practical, inspiring, and actionable response formatted nicely with markdown bullet points or steps.`
              }]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      console.warn('Gemini chat failed, fallback to local AI responses', e);
    }
  }

  // Local AI responses based on common event planning intents
  const q = userQuery.toLowerCase();
  const symbol = eventContext.budget.currencySymbol;

  if (q.includes('budget') || q.includes('save') || q.includes('cut') || q.includes('cost')) {
    return `💡 **Smart Cost Optimization Ideas for "${eventContext.title}"**:

1. **Strategic Beverage Control**: Instead of an open bar with full liquor inventories, serve 2 signature craft cocktails plus wine & craft beer. This reliably saves **15% to 22%** on hospitality.
2. **Repurpose Ceremony & Entrance Florals**: Move the welcome arch or entrance planters to the main stage or cake table immediately after guest arrival. You eliminate paying for duplicate focal arrangements!
3. **Digital-First Experience**: Keep physical printouts to a bare minimum. Rely on dynamic QR codes on wooden signage for schedules, menus, and photo uploads.
4. **Negotiation Tip**: Ask your venue if booking load-in during off-peak morning hours unlocks a package discount or waived cleaning fee.`;
  }

  if (q.includes('rain') || q.includes('weather') || q.includes('outdoor') || q.includes('contingency')) {
    return `🌧️ **Weather Contingency & Plan B Protocol**:

- **Tenting Threshold**: If chance of rain or heavy wind exceeds 40% 72 hours before the event, activate your clear-span tent rental hold. Clear tops preserve the outdoor sky view while staying 100% dry.
- **Flooring & Walkways**: Arrange rubber-backed synthetic grass runners or wooden decking planks to prevent damp footwear.
- **Cozy Comfort Station**: Prepare a basket of branded fleece throw blankets or custom clear umbrellas. Guests love them and they look spectacular in candid photography!`;
  }

  if (q.includes('speech') || q.includes('toast') || q.includes('words')) {
    return `🥂 **Warm & Memorable Toast Outline (3-Minute Rule)**:

1. **The Hook (15s)**: A warm greeting and gratitude to everyone who traveled from near and far to be here at ${eventContext.location}.
2. **The Essence (60s)**: Share one specific, heartfelt anecdote that captures the spirit of this milestone celebration.
3. **The Ripple Effect (45s)**: Acknowledge the community, family, and loved ones who made this journey possible.
4. **The Climax Toast (30s)**: "Raise your glasses high to unforgettable memories, good health, and a luminous journey ahead. Cheers!"`;
  }

  if (q.includes('music') || q.includes('song') || q.includes('dj') || q.includes('playlist')) {
    return `🎶 **Curated Musical Arc for "${eventContext.vibe}"**:

- **Arrival & Cocktails (0-90 min)**: Upbeat acoustic, lofi beats, or modern Bridgerton string covers to encourage easy conversation.
- **Dinner / Seated Mingling**: Smooth soul, indie neo-jazz, or deep melodic house at 95-105 BPM.
- **The Turn (Post-Dinner)**: Seamless transition starting with timeless multi-generational anthems to pack the floor, followed by high-energy dance favorites at 120-128 BPM!`;
  }

  return `✨ **Celebrai Advice for "${eventContext.title}"**:

Regarding **"${userQuery}"**:
- Align this directly with your **${eventContext.vibe}** aesthetic and color palette (${eventContext.theme.palette.map(p => p.name).slice(0, 3).join(', ')}).
- For ${eventContext.guestCount} guests, ensure smooth flow by delegating this checkpoint to a dedicated lead on your Day-of Run of Show.
- If you need immediate checklist updates or custom vendor RFP questions, you can click into the **Vendors** or **Timeline** tabs right above!

Would you like me to draft an announcement, calculate budget adjustments, or suggest specific vendor interview questions?`;
}
