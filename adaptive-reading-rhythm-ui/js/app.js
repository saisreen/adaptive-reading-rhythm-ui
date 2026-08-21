/*
 * Adaptive Reading Rhythm UI
 * Main Application Controller
 *
 * Flow:
 *
 * Reading Interaction
 *        ↓
 * Reading Tracker
 *        ↓
 * Adaptive Reading Engine
 *        ↓
 * Reading Support Score
 *        ↓
 * Normal / Assisted / Chunked Mode
 */


/* =====================================================
   1. GET HTML ELEMENTS
   ===================================================== */

const definitionButtons =
    document.querySelectorAll(".definition-btn");

const revisitButtons =
    document.querySelectorAll(".revisit-btn");

const simpleButton =
    document.getElementById("simpleButton");

const whyButton =
    document.getElementById("whyButton");

const normalButton =
    document.getElementById("normalButton");

const supportPanel =
    document.getElementById("supportPanel");

const supportText =
    document.getElementById("supportText");

const explanationPanel =
    document.getElementById("explanationPanel");

const explanationText =
    document.getElementById("explanationText");

const supportScore =
    document.getElementById("supportScore");

const supportLevel =
    document.getElementById("supportLevel");

const readingMode =
    document.getElementById("readingMode");

const chunkNavigation =
    document.getElementById("chunkNavigation");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const chunkStatus =
    document.getElementById("chunkStatus");

const readingSections =
    document.querySelectorAll(".reading-section");


/* =====================================================
   2. APPLICATION STATE
   ===================================================== */

/*
 * Keeps track of which section is currently
 * displayed in Chunked Mode.
 */

let currentChunk = 0;


/*
 * Stores the latest adaptive decision.
 */

let latestResult = {
    score: 0,
    level: "LOW",
    mode: "NORMAL"
};


/* =====================================================
   3. ADAPTIVE MEMORY
   ===================================================== */

/*
 * Check whether the browser remembers that
 * Assisted Mode was previously useful.
 */

const savedReadingPreference =
    localStorage.getItem(
        "readingAssistancePreference"
    );


if (
    savedReadingPreference ===
    "ASSISTED"
) {

    /*
     * Start the interface with additional
     * reading assistance.
     */

    document.body.classList.add(
        "assisted-mode"
    );

    readingMode.textContent =
        "Assisted";

    supportText.textContent =
        "Assisted reading is enabled because additional reading support was useful during a previous interaction.";

    supportPanel.classList.remove(
        "hidden"
    );

    normalButton.disabled =
        false;
}


/* =====================================================
   4. DEFINITION REQUESTS
   ===================================================== */

definitionButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                 * Record the interaction.
                 */

                ReadingTracker
                    .recordDefinitionRequest();


                /*
                 * Find which definition
                 * the user requested.
                 */

                const word =
                    button.dataset.word;


                /*
                 * Provide a simple explanation.
                 */

                if (
                    word ===
                    "Adaptive Interface"
                ) {

                    supportText.textContent =
                        "Adaptive Interface: A user interface that changes its presentation or behavior based on interaction information or context.";
                }


                if (
                    word ===
                    "Explainable Adaptation"
                ) {

                    supportText.textContent =
                        "Explainable Adaptation: An interface change that also gives the user understandable information about why the change happened.";
                }


                /*
                 * Show assistance.
                 */

                supportPanel.classList.remove(
                    "hidden"
                );


                /*
                 * Recalculate the adaptive score.
                 */

                evaluateReading();
            }
        );
    }
);


/* =====================================================
   5. RE-READ / REVISIT REQUESTS
   ===================================================== */

revisitButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                 * Record that a section
                 * was revisited.
                 */

                ReadingTracker
                    .recordRevisit();


                /*
                 * Give feedback.
                 */

                supportText.textContent =
                    "This section has been marked for another review. The interface will provide additional reading support when needed.";


                supportPanel.classList.remove(
                    "hidden"
                );


                /*
                 * Analyze the new interaction.
                 */

                evaluateReading();
            }
        );
    }
);


/* =====================================================
   6. EXPLAIN SIMPLY
   ===================================================== */

simpleButton.addEventListener(
    "click",
    function () {

        /*
         * Record request for simpler content.
         */

        ReadingTracker
            .recordSimplifyRequest();


        /*
         * Display simplified explanation.
         */

        supportText.textContent =
            "Simple explanation: AI systems can use information and rules to decide what action may be useful. An adaptive interface watches interaction patterns and changes how information is shown when additional support may help.";


        supportPanel.classList.remove(
            "hidden"
        );


        /*
         * Recalculate adaptive state.
         */

        evaluateReading();
    }
);


/* =====================================================
   7. EXPLAIN WHY THE VIEW CHANGED
   ===================================================== */

whyButton.addEventListener(
    "click",
    function () {

        /*
         * Get current interaction information.
         */

        const data =
            ReadingTracker.getData();


        /*
         * Ask the adaptive engine
         * to explain its decision.
         */

        const explanation =
            AdaptiveReadingEngine.explain(
                data,
                latestResult
            );


        /*
         * Display explanation.
         */

        explanationText.textContent =
            explanation;


        explanationPanel.classList.remove(
            "hidden"
        );
    }
);


/* =====================================================
   8. RETURN TO NORMAL READING
   ===================================================== */

normalButton.addEventListener(
    "click",
    function () {

        /*
         * Remove adaptive CSS modes.
         */

        document.body.classList.remove(
            "assisted-mode"
        );

        document.body.classList.remove(
            "chunked-mode"
        );


        /*
         * Reset interaction information.
         */

        ReadingTracker.reset();


        /*
         * Remove saved assistance preference.
         *
         * The user explicitly requested
         * Normal Mode.
         */

        localStorage.removeItem(
            "readingAssistancePreference"
        );


        /*
         * Reset application state.
         */

        latestResult = {
            score: 0,
            level: "LOW",
            mode: "NORMAL"
        };


        currentChunk = 0;


        /*
         * Reset visible status.
         */

        supportScore.textContent =
            "0";

        supportLevel.textContent =
            "Low";

        readingMode.textContent =
            "Normal";


        /*
         * Hide support information.
         */

        supportPanel.classList.add(
            "hidden"
        );

        explanationPanel.classList.add(
            "hidden"
        );

        chunkNavigation.classList.add(
            "hidden"
        );


        /*
         * Disable adaptive controls.
         */

        whyButton.disabled =
            true;

        normalButton.disabled =
            true;


        /*
         * Remove active chunk markers.
         */

        readingSections.forEach(
            function (section) {

                section.classList.remove(
                    "active-chunk"
                );
            }
        );
    }
);


/* =====================================================
   9. MAIN ADAPTIVE EVALUATION
   ===================================================== */

function evaluateReading() {

    /*
     * STEP 1:
     * Get observable reading interaction data.
     */

    const data =
        ReadingTracker.getData();


    /*
     * STEP 2:
     * Send interaction data to the
     * adaptive reading engine.
     */

    latestResult =
        AdaptiveReadingEngine.analyze(
            data
        );


    /*
     * STEP 3:
     * Display current score.
     */

    supportScore.textContent =
        latestResult.score;


    /*
     * Display Low / Medium / High.
     */

    supportLevel.textContent =
        formatWord(
            latestResult.level
        );


    /*
     * STEP 4:
     * Change reading interface.
     */

    applyReadingMode(
        latestResult.mode
    );
}


/* =====================================================
   10. APPLY READING MODE
   ===================================================== */

function applyReadingMode(mode) {

    /*
     * Remove previous adaptive styles first.
     */

    document.body.classList.remove(
        "assisted-mode"
    );

    document.body.classList.remove(
        "chunked-mode"
    );


    /*
     * Hide chunk navigation unless
     * Chunked Mode is activated.
     */

    chunkNavigation.classList.add(
        "hidden"
    );


    /* -------------------------------------------------
       NORMAL MODE
       Score: 0 - 29
       ------------------------------------------------- */

    if (mode === "NORMAL") {

        readingMode.textContent =
            "Normal";

        return;
    }


    /*
     * Adaptation occurred.
     *
     * Allow the user to understand the
     * change or override the adaptation.
     */

    whyButton.disabled =
        false;

    normalButton.disabled =
        false;


    /* -------------------------------------------------
       ASSISTED MODE
       Score: 30 - 59
       ------------------------------------------------- */

    if (mode === "ASSISTED") {

        document.body.classList.add(
            "assisted-mode"
        );


        readingMode.textContent =
            "Assisted";


        /*
         * Remember that reading assistance
         * was useful.
         */

        localStorage.setItem(
            "readingAssistancePreference",
            "ASSISTED"
        );


        /*
         * Keep support information visible.
         */

        supportPanel.classList.remove(
            "hidden"
        );


        return;
    }


    /* -------------------------------------------------
       CHUNKED MODE
       Score: 60 - 100
       ------------------------------------------------- */

    if (mode === "CHUNKED") {

        document.body.classList.add(
            "chunked-mode"
        );


        readingMode.textContent =
            "Chunked";


        /*
         * Save Assisted Mode rather than
         * Chunked Mode.
         *
         * Chunked Mode is temporary support
         * for the current reading session.
         */

        localStorage.setItem(
            "readingAssistancePreference",
            "ASSISTED"
        );


        /*
         * Begin with the first article section.
         */

        currentChunk = 0;


        showChunk(
            currentChunk
        );


        /*
         * Display Previous / Next controls.
         */

        chunkNavigation.classList.remove(
            "hidden"
        );


        /*
         * Keep reading assistance visible.
         */

        supportPanel.classList.remove(
            "hidden"
        );
    }
}


/* =====================================================
   11. DISPLAY ONE ARTICLE SECTION
   ===================================================== */

function showChunk(index) {

    /*
     * Hide all reading sections first.
     */

    readingSections.forEach(
        function (section) {

            section.classList.remove(
                "active-chunk"
            );
        }
    );


    /*
     * Display only the selected section.
     */

    readingSections[index]
        .classList.add(
            "active-chunk"
        );


    /*
     * Display section progress.
     */

    chunkStatus.textContent =
        `Section ${index + 1} of ${readingSections.length}`;


    /*
     * Previous button should not work
     * on the first section.
     */

    previousButton.disabled =
        index === 0;


    /*
     * Next button should not work
     * on the final section.
     */

    nextButton.disabled =
        index ===
        readingSections.length - 1;
}


/* =====================================================
   12. PREVIOUS SECTION
   ===================================================== */

previousButton.addEventListener(
    "click",
    function () {

        /*
         * Move backward only when
         * another section exists.
         */

        if (currentChunk > 0) {

            currentChunk--;


            showChunk(
                currentChunk
            );
        }
    }
);


/* =====================================================
   13. NEXT SECTION
   ===================================================== */

nextButton.addEventListener(
    "click",
    function () {

        /*
         * Move forward only when
         * another section exists.
         */

        if (
            currentChunk <
            readingSections.length - 1
        ) {

            currentChunk++;


            showChunk(
                currentChunk
            );
        }
    }
);


/* =====================================================
   14. FORMAT WORD
   ===================================================== */

/*
 * Convert:
 *
 * LOW      → Low
 * MEDIUM   → Medium
 * HIGH     → High
 */

function formatWord(word) {

    return (
        word.charAt(0) +
        word.slice(1).toLowerCase()
    );
}