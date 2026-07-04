// ============ DUMMY DATA FOR RICHO DEMO ============
// All data here is fake/mocked — no backend calls anywhere in this app.

const CATEGORIES = [
  "All", "Home Services", "Delivery & Moving", "Errands",
  "Outdoor Tasks", "Tech Support", "Tutoring", "Pet Care", "Cleaning"
];

const USERS = {
  u1: { id: "u1", name: "Aditi Rao", avatar: "https://i.pravatar.cc/150?img=47", rating: 4.9, reviews: 38, occupation: "Working Professional", location: "Indiranagar, Bengaluru" },
  u2: { id: "u2", name: "Rohan Mehta", avatar: "https://i.pravatar.cc/150?img=12", rating: 4.7, reviews: 22, occupation: "Freelancer" },
  u3: { id: "u3", name: "Sneha Kulkarni", avatar: "https://i.pravatar.cc/150?img=32", rating: 4.8, reviews: 51, occupation: "Student" },
  u4: { id: "u4", name: "Arjun Nair", avatar: "https://i.pravatar.cc/150?img=15", rating: 4.6, reviews: 14, occupation: "Business Owner" },
  u5: { id: "u5", name: "Priya Singh", avatar: "https://i.pravatar.cc/150?img=25", rating: 5.0, reviews: 9, occupation: "Homemaker" },
  u6: { id: "u6", name: "Karan Das", avatar: "https://i.pravatar.cc/150?img=53", rating: 4.5, reviews: 30, occupation: "Job Seeker" }
};

const TASKS = [
  { id: "t1", title: "Assemble a bookshelf", category: "Home Services", budget: 500, distance: "1.2 km", time: "10 min ago", status: "open", posterId: "u1", desc: "Need help assembling a 5-shelf IKEA bookshelf. Tools will be provided. Should take about an hour." },
  { id: "t2", title: "Walk my dog this evening", category: "Pet Care", budget: 300, distance: "0.8 km", time: "25 min ago", status: "open", posterId: "u4", desc: "Looking for someone to walk my golden retriever for 30-40 mins around the block. He's friendly and well-behaved." },
  { id: "t3", title: "Math tutoring for 10th grader", category: "Tutoring", budget: 600, distance: "2.1 km", time: "1 hr ago", status: "in_progress", posterId: "u5", desc: "Need weekly algebra tutoring sessions for my daughter, board exam prep. Flexible timing." },
  { id: "t4", title: "Help moving a sofa upstairs", category: "Delivery & Moving", budget: 800, distance: "3.4 km", time: "2 hr ago", status: "open", posterId: "u2", desc: "Sofa needs to go from ground floor to 2nd floor apartment. No elevator, narrow staircase." },
  { id: "t5", title: "Grocery pickup and drop", category: "Errands", budget: 250, distance: "1.5 km", time: "3 hr ago", status: "completed", posterId: "u3", desc: "Pick up a grocery list from the supermarket and drop it at my apartment." },
  { id: "t6", title: "Fix a leaking kitchen tap", category: "Home Services", budget: 150, distance: "0.5 km", time: "4 hr ago", status: "open", posterId: "u6", desc: "Small leak under the kitchen sink, likely just needs a washer replaced." },
  { id: "t7", title: "Set up new laptop + transfer files", category: "Tech Support", budget: 400, distance: "2.8 km", time: "5 hr ago", status: "open", posterId: "u1", desc: "Need help setting up a new Windows laptop and transferring files from the old one." },
  { id: "t8", title: "Water my plants while I'm away", category: "Outdoor Tasks", budget: 200, distance: "1.9 km", time: "6 hr ago", status: "in_progress", posterId: "u5", desc: "Away for a week, need someone to water balcony plants every 2 days." },
  { id: "t9", title: "Deep clean 2BHK apartment", category: "Cleaning", budget: 1200, distance: "4.0 km", time: "Yesterday", status: "completed", posterId: "u4", desc: "Full deep clean including kitchen, bathrooms, and windows." },
  { id: "t10", title: "Pick up medicine from pharmacy", category: "Errands", budget: 100, distance: "0.6 km", time: "Yesterday", status: "completed", posterId: "u3", desc: "Quick pharmacy run, prescription already called in." }
];

const APPLICANTS = {
  t1: [
    { userId: "u3", quote: 500, note: "I've assembled IKEA furniture many times, can come today evening." },
    { userId: "u6", quote: 450, note: "Available now, bring my own basic toolkit too." }
  ],
  t4: [
    { userId: "u5", quote: 800, note: "Have moving experience, can bring a friend to help lift." },
    { userId: "u3", quote: 750, note: "Free this afternoon, live close by." }
  ],
  t2: [
    { userId: "u6", quote: 300, note: "Love dogs! Free every evening this week." }
  ]
};

const REVIEWS = [
  { reviewerId: "u2", rating: 5, text: "Super punctual and did a great job assembling my shelf!" },
  { reviewerId: "u4", rating: 5, text: "Very trustworthy, would hire again." },
  { reviewerId: "u5", rating: 4, text: "Good work, communicated well throughout." },
  { reviewerId: "u6", rating: 5, text: "Finished early and cleaned up after. Highly recommend." }
];

const NOTIFICATIONS = [
  { icon: "📥", text: "Sneha Kulkarni applied to your task 'Assemble a bookshelf'", time: "5 min ago" },
  { icon: "📍", text: "New task posted 0.8 km away: 'Fix a leaking kitchen tap'", time: "20 min ago" },
  { icon: "💬", text: "Rohan Mehta sent you a message", time: "1 hr ago" },
  { icon: "✅", text: "Your task 'Grocery pickup and drop' was marked complete", time: "3 hr ago" },
  { icon: "⭐", text: "You received a new 5-star review from Arjun Nair", time: "Yesterday" }
];

const CHAT_MESSAGES = [
  { from: "them", text: "Hi! I saw your task, happy to help with the bookshelf assembly.", time: "10:02 AM" },
  { from: "me", text: "Great! Do you have your own tools?", time: "10:03 AM" },
  { from: "them", text: "Yes, I have a full toolkit. I can come by around 5 PM today.", time: "10:05 AM" },
  { from: "me", text: "Perfect, that works for me. See you then!", time: "10:06 AM" },
  { from: "them", text: "Sounds good, confirming ₹500 for the job.", time: "10:06 AM" }
];

const WEEKLY_EARNINGS = [
  { day: "Mon", amount: 300 },
  { day: "Tue", amount: 450 },
  { day: "Wed", amount: 200 },
  { day: "Thu", amount: 600 },
  { day: "Fri", amount: 350 },
  { day: "Sat", amount: 800 },
  { day: "Sun", amount: 150 }
];

const PAYOUTS = [
  { title: "Grocery pickup and drop", amount: 250, date: "Jul 2" },
  { title: "Deep clean 2BHK apartment", amount: 1200, date: "Jun 29" },
  { title: "Pick up medicine from pharmacy", amount: 100, date: "Jun 27" }
];

const CATEGORY_ICONS = {
  "Home Services": "🏠",
  "Delivery & Moving": "📦",
  "Errands": "🛒",
  "Outdoor Tasks": "🌿",
  "Tech Support": "💻",
  "Tutoring": "📚",
  "Pet Care": "🐾",
  "Cleaning": "🧹"
};

const QUICK_TASKS = [
  "Shopping companion",
  "Pet sitting, 2 days",
  "Rent or borrow an item",
  "Math tutor needed",
  "Vehicle drop to mechanic",
  "Bike / car wash"
];