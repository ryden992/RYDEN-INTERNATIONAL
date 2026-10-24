# RYDEN INTERNATIONAL — Initial Security Audit

Audit date: 2026-10-23
Scope: Public GitHub repository files inspected through the connected GitHub read interface.
Branch: security-audit-fixes-2026-10

## Confirmed from inspected source

- The main JavaScript explicitly describes the site as a frontend catalog and says Firebase, supplier API, and payment gateway are not connected.
- The login/register/Google-login UI in script.js currently displays notices and alerts; it does not authenticate users. Do not collect customer credentials until a real auth provider is configured.
- No rate-limit implementation was found in the inspected frontend JavaScript. Frontend-only rate limits would not be a security boundary anyway.
- recharge.html builds the product/pack form in client-side JavaScript and sends an enquiry to WhatsApp. Player ID / zone ID fields are customer-provided information; users should be told it is sent to WhatsApp.
- There was a duplicate "mlbb-accounts" key in the recharge product map. The later entry overwrote the earlier one. One duplicate was removed from this branch.
- Static HTML pages contain inline JavaScript and CSS. A strict Content-Security-Policy cannot be safely enabled without first refactoring these into approved external files and testing every page.
- Product images, the store logo, and the promotional videos are referenced by pages. No media assets were deleted in this pass because an asset should not be removed without a verified reference audit across all pages.

## Changes in this branch

- Added .htaccess baseline response headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and a restrictive Permissions-Policy.
- Disabled directory listing through Options -Indexes.
- Removed the duplicate mlbb-accounts entry from recharge.html.
- Added this audit report.

## Important limitations / follow-up

- .htaccess headers apply only if the production host serves this directory through Apache/LiteSpeed with .htaccess support and this branch is deployed. Verify response headers on the live domain after deployment.
- This is not a full penetration test and cannot inspect Firebase Console, Hostinger control-panel settings, DNS/CDN configuration, GitHub secrets settings, or deployment secrets.
- Firebase Authentication, database rules, App Check, email enumeration protection, and sign-in quotas must be configured and tested in the Firebase/Google Cloud project separately.
- No rate limiting has been added by these changes. Do not claim brute-force protection until a supported auth/backend control is configured and verified.
- No production files are deleted by this branch; only a duplicate JavaScript object key was removed.


## Expanded repository inventory (branch scan)

- Scanned all 62 tracked tree entries and all 8 text/config/document files in this branch.
- Found 4 HTML pages, 1 shared JavaScript file, 1 shared stylesheet, 2 video assets, and image assets.
- All literal local image/video references discovered in the scanned text files resolved to tracked paths.
- `images/banner-starlight.png` was not referenced by any current page, stylesheet, or JavaScript in the branch and was marked as an orphan asset. It was removed from this branch to reduce repository size; its size was about 2.3 MB.
- Removed inline `onerror` HTML event attributes from the main catalog and MLBB hub page. Image fallbacks are now attached with JavaScript event listeners.
- GitHub code search returned no current-branch matches for common secret indicators (AIza, private_key, service_account, sk_live, secret_key). This is not proof that no secret exists in Git history, deployment settings, or unsupported files.
- No package manifest, automated test workflow, server-side API, or Firebase security-rules file was present in the tracked tree.

## Additional caveats

- The public live domain could not be fetched through the available web inspection channel, so live HTTP response headers, browser console errors, and deployed-file parity remain unverified.
- A repository-wide current-tree reference scan cannot prove that a future design will never use an orphan asset. The removal is confined to this draft branch and can be reverted before merge if needed.


## Post-change static validation

- Final draft branch contains 61 tracked entries, including 4 HTML pages, 1 JavaScript file, 1 stylesheet, the security header configuration, and this report.
- 71 local image/video references were checked; no missing local image/video paths were found.
- After removing the orphan banner image, all 51 remaining tracked media assets are referenced by the current source scan.
- All 47 product IDs in the homepage catalog have matching recharge-page entries; no duplicate product IDs were found in either list.
- JavaScript syntax parsing passed for `script.js` and the three inline scripts in `available-mlbb-accounts.html`, `mlbb-diamond.html`, and `recharge.html`.
- No inline HTML event-handler attributes remain in the scanned text files.
- These are static checks only. They do not replace browser/device tests, dependency scanning, penetration testing, or live Hostinger header verification.
