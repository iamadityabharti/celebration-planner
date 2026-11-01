export type EventType = 'wedding' | 'birthday' | 'community' | 'anniversary' | 'corporate' | 'festival';

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface MenuItem {
  name: string;
  type: 'drink' | 'food' | 'dessert';
  desc: string;
}

export interface ThemeDetails {
  title: string;
  tagline: string;
  description: string;
  palette: ColorSwatch[];
  decorIdeas: string[];
  signatureFoodDrinks: MenuItem[];
  entertainmentConcepts: string[];
  photoOpIdeas: string[];
  hashtags: string[];
}

export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  actualCost: number;
  paid: boolean;
  notes?: string;
}

export interface BudgetPlan {
  totalBudget: number;
  currency: CurrencyCode;
  currencySymbol: string;
  categoryAllocations: Record<string, number>; // percentages e.g. { Venue: 35, Catering: 25, ... }
  items: BudgetItem[];
  aiSavingsTips: string[];
}

export interface MilestoneItem {
  id: string;
  phase: string; // e.g. '6 Months Before', '1 Month Before', 'Day Before'
  task: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface RunOfShowItem {
  id: string;
  time: string; // e.g. '04:00 PM'
  title: string;
  description: string;
  owner: string; // e.g. 'Coordinator', 'Caterer', 'Host'
  completed: boolean;
}

export interface VendorItem {
  id: string;
  category: 'Venue' | 'Catering' | 'Photography' | 'Decor & Floral' | 'Music & DJ' | 'Bakery' | 'Attire' | 'Permits & Safety' | 'Other';
  name: string;
  contact: string;
  status: 'researching' | 'contacted' | 'quoted' | 'booked' | 'paid';
  cost: number;
  notes: string;
  checklist: { item: string; done: boolean }[];
  rfpQuestions: string[];
}

export interface GuestItem {
  id: string;
  name: string;
  contact: string;
  status: 'confirmed' | 'pending' | 'declined';
  dietary: string; // e.g. 'Vegan', 'Gluten-Free', 'Halal', 'None'
  plusOnes: number;
  group: string; // e.g. 'Family', 'VIP', 'Friends', 'Neighborhood'
}

export interface InvitationTemplates {
  whatsapp: string;
  emailSubject: string;
  emailBody: string;
  socialCaption: string;
}

export interface EventPlan {
  id: string;
  title: string;
  eventType: EventType;
  date: string;
  location: string;
  guestCount: number;
  vibe: string;
  specialNotes?: string;
  theme: ThemeDetails;
  budget: BudgetPlan;
  milestones: MilestoneItem[];
  runOfShow: RunOfShowItem[];
  vendors: VendorItem[];
  guests: GuestItem[];
  invitations: InvitationTemplates;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
