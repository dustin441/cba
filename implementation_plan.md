# CBA Glass Redesign Upgrade Plan

This plan details the specific enhancements to be applied to the Next.js website codebase. These changes will introduce a dedicated mobile ADAS calibration section (powered by OEM specifications), a categorized image gallery with layout animations, a multi-step Quote Wizard, and updated concierge-style insurance messaging.

---

## Proposed Changes

### 1. Data Layer

#### [MODIFY] [vehicles.ts](file:///Users/dustintrout/Documents/Antigravity/cba-website/src/data/vehicles.ts)
*   **Action:** Add `adas` to the exported `VEHICLES` object to automatically enable a dedicated landing page at `/vehicles/adas`.
*   **Details:** Add key OEM specifications provided for calibration requirements:
    ```typescript
    adas: {
      title: "Mobile ADAS Calibration",
      slug: "adas",
      heroImage: "/assets/photos/PXL_20260218_175954265.jpg",
      images: [
        "/assets/photos/PXL_20260218_175954265.jpg",
        "/assets/photos/PXL_20260218_175946959.MP.jpg",
        "/assets/photos/PXL_20260218_180415731.MP.jpg"
      ],
      description: "After windshield replacement, camera calibration is mandatory to ensure advanced driver assistance safety systems function correctly.",
      content: "When a windshield is replaced, the front-facing safety camera mounted to the glass is disrupted. Even a 1mm misalignment can lead to critical sensor errors down the road. CBA Glass provides complete Mobile ADAS Calibration directly at your location. We carry out both static targets and dynamic road calibrations to ensure safety features like lane-assist and collision braking function flawlessly.",
      oemNotes: [
        { brand: "Tesla", note: "Requires specialized camera pitch/yaw calibration. Model S/3/X/Y require dynamic calibration driving sequence on clear road markings (typically 5-20 miles at speeds above 32 mph) or static target settings depending on software version." },
        { brand: "Toyota / Lexus", note: "TSS (Toyota Safety Sense) cameras require static targets positioned at exact millimeter-level measurements in front of the vehicle, under controlled, glare-free lighting conditions." },
        { brand: "Mazda", note: "FSC (Forward Sensing Camera) calibration is required after any windshield replacement or camera clip replacement, utilizing precise visual target setups." },
        { brand: "Subaru", note: "Subaru EyeSight® dual-cameras are highly sensitive to glass curvature/thickness (OEM glass recommended) and require dual-target static calibration sweeps." },
        { brand: "BMW", note: "KAFAS range cameras require precise calibration to coordinate lane-departure alerts and speed-limit sign recognition." },
        { brand: "Hyundai / Kia", note: "Front view cameras require precise target sweeps or dynamic road calibration to synchronize steering angle and vehicle yaw rates." }
      ]
    }
    ```

---

### 2. Components & Pages

#### [MODIFY] [Services.tsx](file:///Users/dustintrout/Documents/Antigravity/cba-website/src/components/Services.tsx)
*   **Action:** Add ADAS Calibration to the service grid so it links to `/vehicles/adas`.
*   **Details:** Add a card using the `Cpu` icon from Lucide:
    ```typescript
    {
      icon: Cpu,
      title: "Mobile ADAS Calibration",
      description: "Windshield camera calibration done in your driveway. Static and dynamic OEM procedures supported.",
      image: "/assets/photos/PXL_20260218_175954265.jpg",
      accent: "#6366f1",
      slug: "adas",
    }
    ```

#### [MODIFY] [WhyUs.tsx](file:///Users/dustintrout/Documents/Antigravity/cba-website/src/components/WhyUs.tsx)
*   **Action:** Update the Insurance section to remove any cash-back implications.
*   **Details:** Emphasize the white-glove, hand-held insurance walkthrough:
    *   *Headline:* "Complete Insurance Walkthrough"
    *   *Description:* *"Filing an auto glass claim can be confusing. We don't just 'approve' insurance — we walk you through the entire process. Our team will get on a 3-way call with your provider, handle all the paperwork with you step-by-step, and coordinate the claim directly to make the process completely hassle-free (usually taking under 10 minutes)."*

#### [MODIFY] [Gallery.tsx](file:///Users/dustintrout/Documents/Antigravity/cba-website/src/components/Gallery.tsx)
*   **Action:** Add category filtering at the top of the photo gallery.
*   **Details:**
    *   Update `GALLERY_IMAGES` to include a `category` property (e.g. `"rv"`, `"classics"`, `"luxury"`, `"heavy-machinery"`, `"tesla"`, `"standard"`).
    *   Add a category navigation bar with filter buttons: *All, RVs, Classics, Luxury, Heavy Machinery, Tesla, Standard*.
    *   Import and use `framer-motion` (`motion.div` and `motion.button`) to animate the items dynamically when categories change using `layout` attributes.

#### [MODIFY] [Contact.tsx](file:///Users/dustintrout/Documents/Antigravity/cba-website/src/components/Contact.tsx)
*   **Action:** Replace the static form with a Step-by-Step Interactive Quote Wizard.
*   **Details:**
    *   Create a clean, multi-step state machine:
        *   **Step 1: Vehicle Specs:** Text inputs for Year, Make, and Model.
        *   **Step 2: Billing Method:** Buttons for "Filing Insurance Claim" vs "Cash / Self-Pay".
        *   **Step 3: Contact & Submit:** Text inputs for Name, Phone, and Email, plus a prompt highlighting the insurance walkthrough service.
    *   Show a progress indicator at the top of the card.
    *   Apply smooth Framer Motion transitions between steps.

#### [MODIFY] [page.tsx](file:///Users/dustintrout/Documents/Antigravity/cba-website/src/app/vehicles/%5Bslug%5D/page.tsx)
*   **Action:** Adapt the dynamic vehicle details page to support the new `oemNotes` structure for ADAS.
*   **Details:** If the current vehicle matches the `adas` slug, render a dedicated card or list showing the OEM calibration requirements for Toyota, Tesla, Mazda, Subaru, Hyundai, and BMW.

---

## Verification Plan

### Automated Tests
*   Run `npm run build` to ensure all TypeScript typings, dynamic params generation, and Framer Motion components compile without errors.
*   Verify link resolution to `/vehicles/adas`.

### Manual Verification
*   **Interactive Quote Wizard:** Verify multi-step form flow, state transitions, validation, and layout responsiveness.
*   **Gallery Filter:** Click categories and confirm that images filter correctly with smooth transitions.
*   **ADAS Page:** Navigate to `/vehicles/adas` and confirm that the detailed OEM specifications render beautifully.
