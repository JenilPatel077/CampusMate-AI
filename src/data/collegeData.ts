import { Complaint, FAQ, Notice, Contact, UserProfile } from '../types';

export const CAMPUS_METADATA = {
  institutionName: 'Apex Institute of Technology & Sciences (AITS)',
  tagline: 'Official Central Student Portal & Digital Services',
  academicYear: '2026-2027',
  currentSemester: 'Spring 2027',
  accreditation: 'NAAC A++ Accredited • NIRF Top Ranked Institution',
};

export const INITIAL_STUDENT_PROFILE: UserProfile = {
  id: 'usr_student_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@student.aits.edu',
  rollNo: 'AITS-2024-CS042',
  department: 'Computer Science & Engineering',
  semester: '4th Semester (Sophomore)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  theme: 'light',
  emailNotifications: true,
  complaintUpdates: true,
  aiConciseMode: false,
};

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-2026-1042',
    title: 'High-speed Wi-Fi dropping repeatedly in CS Lab 3',
    category: 'Internet/Wi-Fi',
    description: 'During network programming practicals in CS Lab 3 (Turing Hall, 2nd Floor), the AITS-Secure-Student Wi-Fi repeatedly disconnects every 10-15 minutes, interrupting socket lab assessments.',
    location: 'Turing Hall, 2nd Floor, Room CS-203',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-26T09:15:00.000Z',
    updatedAt: '2026-10-27T14:30:00.000Z',
    attachmentName: 'lab3_speedtest_log.txt',
    resolutionNotes: 'Assigned to Network Operations Team. Access point AP-TH-203 firmware inspected; switch port rebooted. Technician scheduled to replace antenna cabling.',
    studentName: 'Alex Rivera',
    studentRollNo: 'AITS-2024-CS042',
  },
  {
    id: 'CMP-2026-1038',
    title: 'Faulty ceiling projector HDMI port in Lecture Hall 4',
    category: 'Classroom',
    description: 'The overhead digital projector in Lecture Hall 4 has an unstable HDMI input port. The display flickers red during algorithms lectures.',
    location: 'Babbage Academic Block, LH-04',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-10-22T11:00:00.000Z',
    updatedAt: '2026-10-24T16:45:00.000Z',
    attachmentName: 'projector_flicker.jpg',
    resolutionNotes: 'Audio-Visual team replaced the damaged HDMI cable harness and wall-plate connector. Verified working with faculty laptop.',
    studentName: 'Alex Rivera',
    studentRollNo: 'AITS-2024-CS042',
  },
  {
    id: 'CMP-2026-1049',
    title: 'Water cooler filtration unit maintenance needed on 3rd Floor',
    category: 'Water Supply',
    description: 'The automated drinking water dispenser near the South staircase on 3rd floor shows an overdue filter replacement indicator light.',
    location: 'Aryabhata Science Block, 3rd Floor South',
    priority: 'Low',
    status: 'Submitted',
    createdAt: '2026-10-28T08:20:00.000Z',
    updatedAt: '2026-10-28T08:20:00.000Z',
    attachmentName: 'filter_indicator.png',
    resolutionNotes: 'Ticket acknowledged by Facilities Helpdesk. Routine filter cartridge dispatch pending.',
    studentName: 'Alex Rivera',
    studentRollNo: 'AITS-2024-CS042',
  },
  {
    id: 'CMP-2026-1051',
    title: 'AC temperature control thermostat locked in Study Hall B',
    category: 'Electricity',
    description: 'The central air conditioning thermostat in Central Library Study Hall B is frozen at 18°C, making the hall uncomfortable for late evening study.',
    location: 'Central Library, 1st Floor Study Hall B',
    priority: 'Medium',
    status: 'Under Review',
    createdAt: '2026-10-28T18:40:00.000Z',
    updatedAt: '2026-10-29T08:00:00.000Z',
    attachmentName: 'thermostat_panel.jpg',
    resolutionNotes: 'Under review by Library Maintenance supervisor. HVAC BMS schedule recalibration scheduled for this afternoon.',
    studentName: 'Alex Rivera',
    studentRollNo: 'AITS-2024-CS042',
  },
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-01',
    category: 'Examinations',
    question: 'What is the minimum attendance required to appear for end-semester examinations?',
    answer: 'Students must maintain a minimum cumulative attendance of 75% in each enrolled theory and laboratory course. Students with attendance between 65% and 74.9% due to verified medical emergencies or official university representation may apply for Dean-approved condonation with supporting documentation before the semester deadline. Below 65%, students are strictly detained from sitting for final examinations.',
    tags: ['attendance', 'exams', 'hall ticket', 'condonation', 'rules'],
  },
  {
    id: 'faq-02',
    category: 'Examinations',
    question: 'How do I apply for re-evaluation or paper rechecking after results are declared?',
    answer: 'Applications for answer sheet photocopy or grade re-evaluation must be submitted through the Examination Cell portal within 10 working days of result declaration. The fee is $30 per course for re-evaluation and $15 for answer script copy. Results of re-evaluation are published within 21 working days.',
    tags: ['rechecking', 'results', 'grades', 'exam cell', 'fees'],
  },
  {
    id: 'faq-03',
    category: 'Fees',
    question: 'When is the tuition fee payment deadline and what are the late fee penalties?',
    answer: 'Tuition fees for the Spring Semester must be paid in full by February 15. A grace period is provided until February 22. Payments made after February 22 incur a late penalty of $25 per week up to a maximum cap of $100. Unpaid dues after March 10 may result in provisional course registration freeze.',
    tags: ['tuition', 'deadlines', 'late fee', 'accounts', 'finance'],
  },
  {
    id: 'faq-04',
    category: 'Fees',
    question: 'What scholarship schemes are available for undergraduate students?',
    answer: 'AITS offers three primary scholarship categories: (1) Merit Scholarship (top 5% of class by CGPA receives 40% tuition waiver), (2) Means-cum-Merit Financial Aid (family annual income below $35,000 with CGPA > 3.0), and (3) National Sports & Research Excellence Awards. Applications open in the first month of each academic year at the Student Welfare Office.',
    tags: ['scholarship', 'financial aid', 'merit', 'waiver', 'grants'],
  },
  {
    id: 'faq-05',
    category: 'Library',
    question: 'What are the Central Library operating hours and book borrowing limits?',
    answer: 'The Central Library is open Monday to Friday from 8:00 AM to 10:00 PM, and Saturdays/Sundays from 9:00 AM to 5:00 PM. During mid-term and end-semester examination periods, the 2nd Floor Silent Reading Room remains accessible 24/7. Undergraduate students can borrow up to 4 books for 14 calendar days, renewable once online if no hold exists.',
    tags: ['library hours', 'borrowing', 'books', 'overdue', 'renewal'],
  },
  {
    id: 'faq-06',
    category: 'Library',
    question: 'What is the overdue book fine policy in the campus library?',
    answer: 'Overdue books incur a fine of $0.50 per book per day for standard lending stack titles, and $2.00 per hour for high-demand reserve course reserve materials. Library accounts with unpaid fines exceeding $15 are temporarily restricted from new checkouts until cleared.',
    tags: ['fine', 'overdue', 'library dues', 'penalties'],
  },
  {
    id: 'faq-07',
    category: 'Student Services',
    question: 'How do I register my laptop or phone on the campus Wi-Fi network?',
    answer: 'Connect your device to the SSID "AITS-Secure-Student". In the browser captive portal, sign in using your official student roll number and campus portal password. Each student is permitted up to 3 registered devices simultaneously. For MAC address whitelisting issues, visit the IT Helpdesk at Ramanujan Hall Ground Floor.',
    tags: ['wifi', 'internet', 'portal login', 'it helpdesk', 'devices'],
  },
  {
    id: 'faq-08',
    category: 'Student Services',
    question: 'What are the hostel in-time curfews and night-out leave procedures?',
    answer: 'Campus hostel in-time curfew is strictly 9:30 PM on weekdays and 10:00 PM on weekends. Overnight leaves or weekend home visits require a digital Out-Pass approved by the resident warden at least 24 hours in advance through the CampusMate portal with parental confirmation.',
    tags: ['hostel', 'curfew', 'out pass', 'warden', 'accommodation'],
  },
  {
    id: 'faq-09',
    category: 'Admissions',
    question: 'How do international and transfer students submit credit transfer requests?',
    answer: 'Transfer applicants must submit verified official syllabi and certified transcripts to the Academic Registrar office before July 15 for Fall or December 1 for Spring admissions. A departmental academic committee reviews course equivalencies. Up to 45 semester credits can be transferred toward undergraduate degrees.',
    tags: ['transfer', 'credits', 'admission', 'transcripts', 'registrar'],
  },
  {
    id: 'faq-10',
    category: 'General Information',
    question: 'What is the standard procedure and turnaround time for student complaints?',
    answer: 'Complaints submitted through CampusMate AI are categorized and routed immediately to relevant service heads: Classroom & Electrical issues (within 24-48 hours), Network & Wi-Fi issues (within 24 hours), Water & Cleanliness (within 12-24 hours), and Administrative or Examination appeals (within 5 working days). Students can track live status in the "My Complaints" tab.',
    tags: ['complaints', 'sla', 'turnaround', 'grievance', 'maintenance'],
  },
  {
    id: 'faq-11',
    category: 'General Information',
    question: 'Where is the campus medical center located and what emergency services are provided?',
    answer: 'The campus Health & Wellness Center is located in Building G (Ground Floor, adjacent to the Sports Complex). A qualified doctor and nursing staff are on duty 24/7. Basic consultation, emergency first aid, prescription dispensing, and free ambulance transfer to City Hospital are provided to all enrolled students with ID cards.',
    tags: ['medical', 'doctor', 'emergency', 'health', 'ambulance', 'hospital'],
  },
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    title: 'Mid-Term Spring Examination Schedule & Hall Ticket Download',
    description: 'The detailed timetable for Mid-Term Spring 2027 Examinations has been published. Eligible students with over 75% attendance can download electronic hall tickets from the student portal starting Nov 1.',
    category: 'Examination',
    publishDate: '2026-10-27',
    eventDate: '2026-11-10',
    importance: 'Urgent',
    department: 'Controller of Examinations',
    isEvent: true,
    location: 'Campus Academic Blocks (All Halls)',
  },
  {
    id: 'not-02',
    title: 'Annual HackAITS 2026: 36-Hour National Student Hackathon',
    description: 'Registrations are open for the flagship 36-hour hackathon themed "AI for Sustainable Campuses". Prize pool of $15,000, mentor sessions with industry leaders, and direct internship interview slots.',
    category: 'Academic',
    publishDate: '2026-10-25',
    eventDate: '2026-11-18',
    importance: 'Important',
    department: 'Department of Computer Science & Innovation Lab',
    isEvent: true,
    location: 'Auditorium Complex & Turing Hall',
  },
  {
    id: 'not-03',
    title: 'Scheduled Campus Power Grid Maintenance & Generator Backup Notice',
    description: 'The Facilities & Electrical Engineering department will conduct routine substation maintenance on Saturday from 6:00 AM to 10:00 AM. Emergency generator backups will power hostels, server rooms, and medical center.',
    category: 'Administration',
    publishDate: '2026-10-28',
    eventDate: '2026-11-01',
    importance: 'Normal',
    department: 'Facilities & Campus Services',
    isEvent: false,
    location: 'North & East Campus Substation',
  },
  {
    id: 'not-04',
    title: 'Fall Campus Placement Drive: Tier-1 Tech & Core Engineering Firms',
    description: 'Final year and pre-final year students are requested to update verified resume portfolios on the Placement Portal. Company presentation rounds commence from November 15.',
    category: 'Placement',
    publishDate: '2026-10-24',
    eventDate: '2026-11-15',
    importance: 'Important',
    department: 'Career Development & Placement Cell',
    isEvent: true,
    location: 'Placement Training Auditorium',
  },
  {
    id: 'not-05',
    title: 'Inter-Collegiate Sports Meet "AcroApex 2026" Registrations Open',
    description: 'Student teams for Basketball, Football, Badminton, Chess, and Track & Field can register with the Sports Director. Trials scheduled every weekday evening at 4:30 PM.',
    category: 'Sports & Culture',
    publishDate: '2026-10-21',
    eventDate: '2026-11-25',
    importance: 'Normal',
    department: 'Department of Physical Education & Sports',
    isEvent: true,
    location: 'Sports Complex & Athletic Stadium',
  },
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'con-01',
    department: 'Examination Cell',
    contactPerson: 'Dr. Evelyn Vance',
    designation: 'Controller of Examinations',
    email: 'examcell@aits.edu',
    phone: '+1 (555) 234-5671',
    officeLocation: 'Administration Building, Room AD-104',
    officeHours: 'Mon - Fri: 10:00 AM - 4:00 PM',
    category: 'Academic Administration',
  },
  {
    id: 'con-02',
    department: 'Academic Affairs & Registrar',
    contactPerson: 'Prof. Marcus Chen',
    designation: 'Dean of Academic Affairs',
    email: 'academic.dean@aits.edu',
    phone: '+1 (555) 234-5672',
    officeLocation: 'Main Administration Building, 2nd Floor',
    officeHours: 'Mon - Fri: 11:00 AM - 3:00 PM',
    category: 'Academic Administration',
  },
  {
    id: 'con-03',
    department: 'Central Library & Digital Archives',
    contactPerson: 'Ms. Sarah Jenkins',
    designation: 'Chief Librarian',
    email: 'library.help@aits.edu',
    phone: '+1 (555) 234-5673',
    officeLocation: 'Central Library Building, Ground Floor Helpdesk',
    officeHours: 'Mon - Sat: 8:30 AM - 7:00 PM',
    category: 'Library & Learning',
  },
  {
    id: 'con-04',
    department: 'IT Infrastructure & Wi-Fi Helpdesk',
    contactPerson: 'Eng. Dev Patel',
    designation: 'Head of IT & Network Operations',
    email: 'ithelpdesk@aits.edu',
    phone: '+1 (555) 234-5674',
    officeLocation: 'Ramanujan Computing Center, Room CC-02',
    officeHours: 'Mon - Sat: 8:00 AM - 8:00 PM',
    category: 'Technical Support',
  },
  {
    id: 'con-05',
    department: 'Student Welfare & Hostel Office',
    contactPerson: 'Dr. Anita Desai',
    designation: 'Dean of Student Welfare & Chief Warden',
    email: 'studentwelfare@aits.edu',
    phone: '+1 (555) 234-5675',
    officeLocation: 'Student Activity Center, Room SAC-101',
    officeHours: 'Mon - Fri: 9:30 AM - 5:30 PM',
    category: 'Student Life',
  },
  {
    id: 'con-06',
    department: 'Accounts & Student Finance',
    contactPerson: 'Mr. Robert Sterling',
    designation: 'Finance Officer & Bursar',
    email: 'accounts@aits.edu',
    phone: '+1 (555) 234-5676',
    officeLocation: 'Administrative Wing, Room AD-08',
    officeHours: 'Mon - Fri: 10:00 AM - 2:00 PM (Cash/Online counters)',
    category: 'Finance & Tuition',
  },
  {
    id: 'con-07',
    department: 'Health, Wellness & Medical Center',
    contactPerson: 'Dr. Rebecca Foster, MD',
    designation: 'Chief Medical Officer',
    email: 'healthcenter@aits.edu',
    phone: '+1 (555) 234-5699 (24/7 Emergency)',
    officeLocation: 'Building G, Ground Floor (Near Sports Complex)',
    officeHours: 'Open 24/7 for Medical Emergencies',
    category: 'Health & Safety',
  },
  {
    id: 'con-08',
    department: 'Career Development & Placement Cell',
    contactPerson: 'Mr. Vikram Malhotra',
    designation: 'Director of Training & Placements',
    email: 'placements@aits.edu',
    phone: '+1 (555) 234-5678',
    officeLocation: 'Placement & Industry Liaison Block, Room PL-201',
    officeHours: 'Mon - Fri: 9:00 AM - 5:00 PM',
    category: 'Career Services',
  },
];

// Official institutional context string used for grounding the Gemini Assistant
export const COLLEGE_GROUNDING_KNOWLEDGE = `
[OFFICIAL UNIVERSITY REGULATIONS & HANDBOOK - APEX INSTITUTE OF TECHNOLOGY & SCIENCES (AITS)]

1. INSTITUTION OVERVIEW:
- Name: Apex Institute of Technology & Sciences (AITS)
- Current Academic Year: 2026-2027 (Spring Semester)
- Campus Location: North Ridge Campus, Innovation Corridor
- Working Days: Monday to Friday (Instructional classes), Saturdays (Labs & Library)

2. ACADEMIC & ATTENDANCE REGULATIONS:
- Attendance Policy: Minimum 75% attendance is strictly mandatory in every registered subject (theory and lab).
- Medical Condonation: Attendance between 65% and 74.9% may be condoned solely on genuine medical grounds or official university sports/cultural representation. Requires formal application with hospital certificates submitted to the Dean of Academic Affairs within 7 days of returning to campus.
- Detention Rule: Any student with under 65% attendance cannot sit for end-semester exams under any circumstances and must repeat the course.
- Grading System: 10-point scale (A+: 10, A: 9, B+: 8, B: 7, C: 6, P: 5, F: 0 Fail). Minimum passing grade is P (5.0).
- Mid-Term Exams: 30% weightage, held in mid-semester (November for Fall, March for Spring).
- End-Semester Exams: 50% weightage. Internal Continuous Assessment: 20%.

3. TUITION FEES & SCHOLARSHIPS:
- Spring Tuition Deadline: February 15. Grace period extends until February 22.
- Late Fee Fine: $25 per week late fee starting February 23, capped at a maximum of $100.
- Payment Methods: Online via CampusMate Student Portal (Debit/Credit Card, ACH NetBanking, UPI). Cash deposits accepted only at Accounts Counter AD-08 between 10:00 AM - 2:00 PM.
- Refund Policy: 100% refund (less $50 processing fee) if withdrawal is within 15 days before term start; 50% within first 14 days of classes; 0% after 15 days of instruction.
- Merit Scholarship: 40% tuition waiver for the top 5% CGPA holders in each department.
- Financial Need Aid: Up to 50% waiver for students whose family annual income is below $35,000 and maintain CGPA > 3.0.

4. CENTRAL LIBRARY SERVICES:
- Timings: Mon-Fri: 8:00 AM - 10:00 PM; Sat-Sun: 9:00 AM - 5:00 PM.
- Exam 24/7 Hours: 2nd Floor Silent Reading Room remains open 24 hours daily during mid-term and end-term exam periods.
- Book Quota: Undergraduate students can borrow up to 4 books for 14 days. Graduate students up to 6 books for 28 days.
- Renewal: Books can be renewed once online if no other student has placed a hold reservation.
- Overdue Fines: $0.50/day per standard book; $2.00/hour for Course Reserve reading room titles. If fines exceed $15, borrowing privileges are locked.
- Digital Library: Access to IEEE Xplore, ACM Digital Library, and Springer via campus intranet credentials.

5. IT, WI-FI & COMPUTING:
- Wi-Fi Network Name: "AITS-Secure-Student"
- Login: Student Roll Number (e.g., AITS-2024-CS042) and campus portal password.
- Device Quota: Maximum 3 active devices per student.
- Speed & Bandwidth: High-speed 100 Mbps per user with fair usage policy. Gaming/streaming sites throttled during class hours (8:30 AM - 4:30 PM).
- IT Support Desk: Ramanujan Hall Room CC-02, Mon-Sat 8:00 AM - 8:00 PM. Email: ithelpdesk@aits.edu.

6. HOSTEL, MESS & CAMPUS LIVING:
- Hostels: Boys Hostels A, B, C; Girls Hostels Alpha, Beta, Gamma.
- Curfew: 9:30 PM on weekdays, 10:00 PM on Saturdays/Sundays.
- Out-Pass: Night-out or home visit requests must be submitted digitally via CampusMate portal at least 24 hours prior and require parental verification code.
- Mess Hours: Breakfast: 7:30 AM - 9:00 AM, Lunch: 12:30 PM - 2:00 PM, Evening Tea: 4:30 PM - 5:30 PM, Dinner: 7:30 PM - 9:30 PM.
- Laundry: Automated laundromat on ground floor of each hostel block, tokens available at warden office.

7. GRIEVANCE & COMPLAINT REDRESSAL:
- Complaint Categories: Classroom, Electricity, Internet/Wi-Fi, Cleanliness, Water Supply, Library, Hostel, Other.
- Standard Turnaround Times:
  - Cleanliness & Water issues: within 12 - 24 hours.
  - Wi-Fi & Electrical issues: within 24 - 48 hours.
  - Classroom equipment (projectors/desks): within 48 hours.
  - Academic & Administrative queries: within 3 - 5 business days.
- Status Workflow: Submitted -> Under Review -> In Progress -> Resolved.

8. HEALTH & EMERGENCY:
- Health Center: Building G Ground Floor, open 24 hours.
- 24/7 Emergency Line: +1 (555) 234-5699. Free ambulance transport to City Hospital for emergencies.
- Counseling & Mental Wellness: Confidential student counseling available Mon-Fri 9:00 AM - 5:00 PM at SAC Room 204.
`;
