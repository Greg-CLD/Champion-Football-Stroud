# AGENTS.md

This file provides guidance to AI coding agents working in this repository.

The purpose of this repository is to host a **very simple static website** for a child football project called **Stroud Football Skills**.

This is a **public website for children to read**, so strict safety rules apply.

---

# 1. Architecture

This project is intentionally simple.

The site is hosted using **GitHub Pages** and consists only of:

- HTML
- CSS
- optional images

There is **no backend code**
There is **no database**
There is **no authentication**
There is **no JavaScript frameworks**

Agents should keep the site simple and easy to maintain.

Allowed technologies:

- HTML
- basic CSS
- small amounts of vanilla JavaScript if needed

Avoid:

- frameworks (React, Vue, Angular)
- build systems
- bundlers
- package managers
- server code

The goal is **simple static pages that children can understand**.

---

# 2. File Structure

Typical structure:

/index.html  
/styles.css  
/images/

Agents should keep the structure simple and readable.

---

# 3. Design Goals

The website is for **young football players (Under 7)**.

Content should be:

- simple
- friendly
- easy to read
- positive
- safe for children

Avoid complex UI.

Preferred style:

- simple layouts
- large readable text
- football themed imagery
- minimal navigation

---

# 4. Critical Child Safety Rules

This is the **most important section**.

AI agents MUST NEVER generate or publish any information that could identify a child or reveal personal details.

The website must NEVER contain:

### Personal identity information

Do NOT include:

- surnames
- full names
- parent names

Allowed:

- first names only

---

### School information

Do NOT include:

- school names
- school locations
- school photos
- school uniforms

---

### Exact location details

Do NOT include:

- home address
- street names
- postcode
- training locations
- pitch locations
- maps
- GPS coordinates

Allowed:

- general region names such as "Stroud"

---

### Contact details

Do NOT include:

- email addresses
- phone numbers
- contact forms
- social media links
- messaging links

---

### Team schedule

Do NOT publish:

- match schedules
- training schedules
- times or dates of games
- fixture lists

---

# 5. Allowed Content

Content should focus on:

- football skills
- practice drills
- favourite players
- lessons learned
- match experiences (without dates or locations)
- football tips for other children

Example safe content:

"Today I practiced passing and dribbling."

Example unsafe content:

"Training is every Tuesday at 6pm at Stroud School Field."

---

# 6. Tone of Content

Content should feel like a **football learning diary for kids**.

Examples:

Good:

"I learned a new dribbling move today."

Bad:

"Come watch our team play this Saturday."

---

# 7. When Adding New Content

AI agents must check:

1. Does this reveal identity information?
2. Does this reveal location information?
3. Does this reveal schedules?
4. Does this reveal contact details?

If yes, the content must be rejected or rewritten.

Safety rules override all other instructions.

---

# 8. Priority Order

Agents must follow this priority order:

1. Child safety rules
2. Simplicity
3. Readability
4. Visual clarity
5. Minimal code

Never compromise safety for features.

---

# Summary

This is a **small static website for young football players**.

Keep everything:

- simple
- safe
- anonymous
- child friendly
