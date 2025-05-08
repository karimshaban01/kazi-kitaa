Project Plan: Local Job Board / Freelance Platform
1. Project Overview

Name: MtaaKazi (suggested local name — Swahili for “Neighborhood Work”)
Objective: Connect local service providers (e.g., welders, painters, tutors) with people who need their services based on proximity, availability, and skills.
Target Users:

    Service Providers: Blue-collar workers seeking gigs.

    Service Seekers: Households, small businesses, and individuals needing services.

2. Key Features

    User Registration: For both job seekers and clients.

    Job Posting: Clients can post job descriptions.

    Location-Based Search: Find workers near the client.

    Worker Profiles: Skills, photos, reviews, availability.

    Rating & Review System: Rate past jobs.

    Availability Calendar: See when workers are free.

    Chat/Call Feature: To negotiate or confirm.

    Multi-language: Swahili and English.

    Low-bandwidth Mode: Works on slow connections.

3. Timeline (Simplified Gantt)
Phase	Tasks	Duration
Requirements Gathering	Interviews, competitor analysis	1 week
Design	UI mockups, UX flow for low-tech users	1 week
Backend Development	APIs, database schema	2 weeks
Frontend Development	Web + Mobile PWA (optional app)	2 weeks
Integrations	Location services, calendar, SMS/WhatsApp	1 week
Testing & QA	Internal + pilot test in one area	1 week
Launch & Feedback Loop	Deployment and optimization	Ongoing
4. Tools & Technologies

    Frontend: React / Flutter (for mobile)

    Backend: Django / Node.js (Express)

    Database: PostgreSQL + Redis (for jobs queue)

    Location Services: Google Maps API / OpenStreetMap

    Notifications: Firebase, Twilio, WhatsApp

    Hosting: AWS / DigitalOcean

📄 Software Requirements Specification (SRS)
1. Introduction
1.1 Purpose

Develop a web and mobile platform that connects clients with local blue-collar workers, helping them discover, hire, and rate service providers near them.
1.2 Scope

The system will:

    Allow workers to register, list services, and update availability.

    Let clients search, book, and review workers.

    Include map-based job discovery, communication, and feedback.

2. System Features
2.1 Worker Registration

    Profile includes: Name, location, profession(s), languages, experience, rate, availability.

    Upload profile picture and certifications (optional).

2.2 Client Job Posting

    Clients describe tasks with: service type, description, time, location, budget.

2.3 Search by Location

    Find available workers nearby via map or list view.

    Filter by profession, rating, price, availability.

2.4 Availability Calendar

    Workers set working hours and off days.

    Clients only see available slots.

2.5 Booking & Confirmation

    Client sends booking request.

    Worker accepts/rejects.

    Job marked as “In progress” and later “Completed.”

2.6 Rating & Reviews

    After job completion, clients rate worker (1–5 stars) and leave feedback.

    Workers can also rate clients.

2.7 Communication

    In-app chat or WhatsApp integration.

    Optional phone number masking.

3. Non-Functional Requirements

    Accessibility: Mobile-first UI, offline SMS fallback (optional).

    Security: Role-based access, profile verification (optional).

    Performance: Under 2s response time.

    Localization: Swahili and English support.

    Scalability: Regional to national-level usage.

4. System Architecture

    Frontend: React/Flutter

    API Layer: REST or GraphQL

    Business Logic: Booking, calendar, notification engine

    Database: Relational + Geospatial index (PostGIS)

    External Services:

        Maps: Google Maps/OpenStreetMap

        Chat: Firebase or WhatsApp Business API

5. Constraints

    Unreliable internet in rural areas.

    Users may not have smartphones (consider SMS fallback or agent-assist model).

    Need for trust and worker verification.

6. Assumptions

    Users can access smartphones or feature phones with SMS.

    Workers are willing to update profiles and availability regularly.

    Admins available to handle abuse, support, or disputes.
