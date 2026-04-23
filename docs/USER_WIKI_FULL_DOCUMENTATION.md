# Pricentrix User Documentation (Wiki Master)

> SEO keywords: pricentrix user guide, competitor price monitoring, product match wizard, catalog import, pricing comparison report, pricing intelligence software

This document is the complete user-facing documentation for Pricentrix.

---

## Table of Contents

1. [What Is Pricentrix](#1-what-is-pricentrix)
2. [Quick Start (10 Minutes)](#2-quick-start-10-minutes)
3. [Main Navigation and Modules](#3-main-navigation-and-modules)
4. [Account and Profile Setup](#4-account-and-profile-setup)
5. [Product Management](#5-product-management)
6. [Competitor Management](#6-competitor-management)
7. [Catalog Imports](#7-catalog-imports)
8. [Product Match Wizard](#8-product-match-wizard)
9. [Reports and Pricing Analysis](#9-reports-and-pricing-analysis)
10. [Jobs and Background Processing](#10-jobs-and-background-processing)
11. [Plan, Usage Limits, and Billing](#11-plan-usage-limits-and-billing)
12. [Security, Authentication, and Email Verification](#12-security-authentication-and-email-verification)
13. [UI Features and Productivity Options](#13-ui-features-and-productivity-options)
14. [Troubleshooting and FAQ](#14-troubleshooting-and-faq)
15. [Best Practices by Team Role](#15-best-practices-by-team-role)
16. [Glossary](#16-glossary)
17. [Wiki Menu Blueprint (SEO-Ready)](#17-wiki-menu-blueprint-seo-ready)

---

## 1. What Is Pricentrix

Pricentrix is a SaaS platform for competitive pricing intelligence.
It helps teams compare their product prices against competitors by using an operating flow:

1. Configure account and competitors.
2. Import catalogs (own catalog and competitor catalog).
3. Match equivalent products.
4. Review comparative pricing reports.
5. Export findings and make pricing decisions.

### Who should use it

- Pricing managers
- eCommerce operators
- Category managers
- Commercial analysts
- Revenue and strategy teams

### Primary outcome

Teams can detect if they are priced above, below, or aligned with market references and react faster.

---

## 2. Quick Start (10 Minutes)

### Step 1: Verify your setup data

- Open Account and set:
  - Base URL
  - Product Base URL
- Open Products and verify product names and prices.
- Open Competitors and verify competitor domains.

### Step 2: Import competitor catalog

- Go to Catalog Imports > Import Competitor Catalog.
- Select a competitor.
- Choose one import method:
  - Paste/upload known competitor product URLs.
  - Create a scraping job.

### Step 3: Track processing in Jobs

- Open Reports > Jobs.
- Wait for import jobs to complete.
- If a job fails, review and fix input, then retry.

### Step 4: Match products

- Go to Catalog Imports > Product Match Wizard.
- Select a competitor (or all competitors).
- Link each internal product to competitor equivalent products.

### Step 5: Review reports

- Go to Reports.
- Review Competitive Pricing Summary and comparison views.

Success criteria:

- Competitor products imported.
- Product mappings created.
- Reports populated with actionable comparison data.

---

## 3. Main Navigation and Modules

### Dashboard

Main operational home.
Includes onboarding checklist and setup progress.

### Tables

- Account: account-level base configuration.
- Products: internal product catalog.
- Competitors: competitor entities and domains.
- Product Type: classification.
- Users: team management (admin context).

### Catalog Imports

- Import Own Catalog
- Import Competitor Catalog
- Product Match Wizard

### Reports

- Competitive Pricing Summary
- Dynamic report pages
- Jobs queue and job tracking

### Plan

- Active plan details
- Usage and limits
- Upgrade or downgrade flows

### Profile and Settings

- Personal profile
- Language preference
- Password and account preferences

---

## 4. Account and Profile Setup

## 4.1 Account configuration

Use Account to define your store-level URL settings.

Required fields:

- Base URL: your store root domain.
- Product Base URL: base path for product pages.

Why it matters:

- Import validation and ownership checks depend on correct domain setup.
- URL-driven operations are more reliable when these values are correct.

## 4.2 Profile configuration

Use Profile to maintain:

- First name
- Last name
- Language preference (English/Spanish)
- Password update actions

## 4.3 Onboarding checklist behavior

Dashboard can show setup checkpoints such as:

- Account URLs configured
- Products created
- Competitors added
- Competitor catalog imported
- Product matching completed
- Report reviewed

Users can continue, restart, or dismiss onboarding guidance.

---

## 5. Product Management

## 5.1 Add products manually

Go to Tables > Products.
Create products with at least:

- Product name
- Price

Recommended fields:

- Product URL
- Product image URL
- Product type
- Description

## 5.2 Maintain quality product data

Best practices:

- Use consistent naming format (brand/model/size).
- Avoid near-duplicate products.
- Keep prices current.
- Add images when possible to improve matching confidence.

## 5.3 Edit product records

Use edit views to update price, metadata, and classification.
Good record quality improves report relevance.

---

## 6. Competitor Management

## 6.1 Add competitors

Go to Tables > Competitors.
Add:

- Competitor name
- Base URL (domain)
- Product base URL (if needed)

## 6.2 Competitor URL rules

Competitor import URLs should belong to the selected competitor domain.
Mismatched domains are usually rejected during validation.

## 6.3 Operational recommendation

Create clear competitor naming conventions for teams (for example: official brand name + country).

---

## 7. Catalog Imports

## 7.1 Import Own Catalog

Use when you need to process your own catalog URLs.

Flow:

1. Paste URLs or upload CSV.
2. Create import job.
3. Track progress in Jobs.

## 7.2 Import Competitor Catalog with known URLs

Flow:

1. Select competitor.
2. Optional: clear competitor catalog before insert (replacement mode).
3. Paste URLs or upload CSV.
4. Create import job.
5. Monitor in Jobs.

## 7.3 Import Competitor Catalog via scraping

Flow:

1. Select competitor.
2. Create scraping job.
3. Confirm warning.
4. Track progress in Jobs.

Important notes:

- Scraping may take minutes to hours.
- Coverage depends on target site structure and access policies.
- App remains usable while jobs run in background.

## 7.4 Supported operating pattern

Teams can combine both methods:

- Known URLs for fast targeted coverage.
- Scraping for broader discovery.

---

## 8. Product Match Wizard

This is the core workflow for creating product equivalences.

## 8.1 Goal

Link each internal product to one or more competitor equivalent products.

## 8.2 Prerequisites

- Internal products exist.
- Competitor catalogs were imported.

## 8.3 Matching modes

- Single competitor mode
- All competitors mode

## 8.4 Main controls

- Link: save selected match.
- Skip: move to next candidate.
- See all: open wider candidate list.
- Similarity threshold: adjust strictness of suggestions.

## 8.5 Similarity threshold guidance

- Around 0.3: broad suggestions.
- Around 0.5: balanced suggestions.
- Around 0.7: stricter suggestions.

Practical use:

- Increase threshold if suggestions are noisy.
- Decrease threshold if too few suggestions appear.

## 8.6 Alternative matching flows

In addition to the wizard, teams may use manual assignment lists such as full-catalog mapping views.
Recommended approach:

1. Start with wizard.
2. Resolve remaining unmatched items through manual full-catalog review.

---

## 9. Reports and Pricing Analysis

## 9.1 Competitive Pricing Summary

Primary visual report for KPI and distribution analysis.
Typical insights:

- Position vs competitor references
- Coverage of mapped products
- Products above, aligned, or below market references

Common filters:

- Product type
- Competitor selection
- Comparison rule (average, minimum, maximum)

Interaction pattern:

- Click chart segments/bars to drill down into product-level details.

## 9.2 Product-level comparison analysis

Use detailed comparison tables/reports to inspect:

- Your price
- Competitor prices
- Relative difference and spread

## 9.3 Exports

List and reporting views can provide data export for external analysis workflows (for example CSV/Excel depending on configuration).

## 9.4 Reporting routine

Daily or weekly cadence:

1. Refresh imports.
2. Match new products.
3. Review report deltas.
4. Export decision packs for pricing meetings.

---

## 10. Jobs and Background Processing

Jobs track long-running processes such as:

- Catalog imports
- Scraping operations
- Batch data processing

What to monitor:

- Job type
- Job status (pending/running/completed/failed)
- Timestamps
- Progress where available

Operational guideline:

- Submit jobs in batches.
- Continue other tasks while they run.
- Retry failed jobs only after fixing data quality or domain issues.

---

## 11. Plan, Usage Limits, and Billing

## 11.1 Plan catalog

Commercial plans documented in the project:

- Free (3-month time-boxed access)
- Starter
- eCommerce
- Enterprise

Base prices documented:

- Starter: 19 USD monthly, 190 USD yearly
- eCommerce: 49 USD monthly, 490 USD yearly
- Enterprise: 159 USD monthly, 1590 USD yearly

## 11.2 Billing and subscriptions

- Stripe is used for paid subscription processing.
- Monthly and yearly cadences are supported.
- Free plan does not auto-renew as paid subscription.

## 11.3 Usage limits

Product and competitor limits are controlled by plan entitlements.
Exact numeric limits can be configured by environment/data model.

User-facing effect when limit is reached:

- Create/add actions can be restricted until plan upgrade.

## 11.4 Upgrade and downgrade

Plan page exposes current plan and transitions.
Teams should coordinate plan changes with budget and usage forecasts.

---

## 12. Security, Authentication, and Email Verification

## 12.1 Authentication model

- Credential-based login
- Session-based access control
- Tenant-scoped data access by account

## 12.2 Registration and verification flow

Implemented flow includes:

- Public registration endpoint
- Email verification token
- Verification link consumption
- Auto-login bridge after successful verification

Verification statuses in user lifecycle include:

- PND: pending
- VER: verified
- BOU: bounced
- SUP: suppressed

## 12.3 Email suppression guardrails

System blocks outbound transactional emails to bounced/suppressed recipients.
This protects sender reputation and improves deliverability.

## 12.4 Password and access protections

- Minimum password constraints
- Password reset flow
- Rate limiting on sensitive auth operations

---

## 13. UI Features and Productivity Options

## 13.1 Language support

Interface supports English and Spanish.
Language preference is persisted by user/session behavior.

## 13.2 Theme switching

Dark/light mode toggle is available through UI theme controls.

## 13.3 Error boundaries and resilient UI states

The app includes loading and error handling components to improve user continuity in case of runtime issues.

## 13.4 Data table usability

Common table features include:

- Search
- Sort
- Filter
- Pagination
- Export actions (where enabled)

---

## 14. Troubleshooting and FAQ

## 14.1 Import errors

Problem:

- URL validation fails.

Checks:

1. Confirm competitor selected.
2. Confirm URLs belong to selected domain.
3. Remove malformed URLs and retry.

## 14.2 No candidates in Match Wizard

Checks:

1. Verify competitor import completed.
2. Reduce threshold slightly.
3. Use See all/manual candidate selection.

## 14.3 Job takes too long

Checks:

1. Confirm it is a scraping job (expected longer runtime).
2. Keep monitoring in Jobs.
3. Continue work in parallel.

## 14.4 Email verification issues

Checks:

1. Resend verification from auth flow.
2. Confirm email was not bounced/suppressed.
3. Retry with a valid inbox if suppression status exists.

## 14.5 Access or permission issues

Checks:

1. Verify logged-in account and role.
2. Confirm session not expired.
3. Re-authenticate if needed.

---

## 15. Best Practices by Team Role

## 15.1 Pricing Manager

- Review summary reports daily.
- Prioritize products with largest negative margin risk.
- Track competitor deltas after major promotions.

## 15.2 Catalog Operations

- Run recurring imports.
- Keep product metadata normalized.
- Resolve unmatched products in scheduled cycles.

## 15.3 Commercial Leadership

- Monitor plan usage and coverage KPIs.
- Enforce weekly decision cadence using exported summaries.

---

## 16. Glossary

- Account Base URL: primary store domain used for account-level validation context.
- Competitor Base URL: competitor domain used to validate imported competitor URLs.
- Match Wizard: guided interface to link internal and competitor products.
- Similarity Threshold: strictness parameter for candidate suggestions.
- Job Queue: background processing tracker for imports/scraping.
- Coverage: proportion of internal products with valid competitor mappings.
- Pricing Rule: calculation basis for benchmark comparison (average/minimum/maximum).

---

## 17. Wiki Menu Blueprint (SEO-Ready)

Use this structure to publish wiki pages while keeping this master file as canonical source.

- Getting Started
- Account and Profile
- Product Management
- Competitor Management
- Catalog Imports
- Product Matching
- Reports and Analysis
- Jobs Monitoring
- Plan and Billing
- Security and Verification
- Troubleshooting
- FAQ and Glossary

Recommended page slugs:

- pricentrix-getting-started
- pricentrix-account-setup
- pricentrix-product-management
- pricentrix-competitor-catalog-import
- pricentrix-product-match-wizard
- pricentrix-competitive-pricing-reports
- pricentrix-jobs-monitoring
- pricentrix-plan-and-billing
- pricentrix-email-verification-security
- pricentrix-troubleshooting

---

## Source Basis

This documentation is based on:

- Current user docs in docs folder
- Functional behavior from user-facing pages and API workflows
- Existing pricing and email verification implementation docs

Main validated source files include docs/quick-start-user.md, docs/functional-user-guide.md, docs/PRICING_MODEL.md, docs/EMAIL_VERIFICATION_QUICKSTART.md, docs/REGISTRATION_AND_EMAIL_VERIFICATION.md, and user-facing routes under pages/.
