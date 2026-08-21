<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Adaptive Reading Rhythm</title>

    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<header>
    <h1>Adaptive Reading Rhythm</h1>
    <p>AI-Based Intelligent Reading Interface</p>
</header>

<main class="container">

    <section class="status-card">

        <h2>Adaptive Reading Workspace</h2>

        <p>
            The interface adjusts reading support based on
            observable reading interactions.
        </p>

        <div class="status-grid">

            <div>
                Reading Support Score
                <strong id="supportScore">0</strong>
            </div>

            <div>
                Support Level
                <strong id="supportLevel">Low</strong>
            </div>

            <div>
                Reading Mode
                <strong id="readingMode">Normal</strong>
            </div>

        </div>

    </section>


    <section class="article-card">

        <p class="category">TECHNOLOGY & SOCIETY</p>

        <h2>The Changing Role of Artificial Intelligence</h2>

        <div id="articleContent">

            <div class="reading-section"
                 data-section="1">

                <h3>1. Intelligent Systems</h3>

                <p>
                    Artificial intelligence is increasingly used
                    to create systems that can analyze information,
                    recognize patterns, and support human
                    decision-making.
                </p>

                <button class="revisit-btn">
                    Re-read This Section
                </button>

            </div>


            <div class="reading-section"
                 data-section="2">

                <h3>2. Human-Computer Interaction</h3>

                <p>
                    Human-computer interaction focuses on designing
                    technology that people can use effectively.
                    Adaptive interfaces extend this idea by changing
                    parts of the interface according to interaction
                    patterns or user needs.
                </p>

                <button class="definition-btn"
                        data-word="Adaptive Interface">
                    Explain "Adaptive Interface"
                </button>

                <button class="revisit-btn">
                    Re-read This Section
                </button>

            </div>


            <div class="reading-section"
                 data-section="3">

                <h3>3. Explainable Adaptation</h3>

                <p>
                    An intelligent interface should provide useful
                    assistance without unnecessarily reducing user
                    control. Explainable adaptation can help users
                    understand why an interface changed.
                </p>

                <button class="definition-btn"
                        data-word="Explainable Adaptation">
                    Explain "Explainable Adaptation"
                </button>

                <button class="revisit-btn">
                    Re-read This Section
                </button>

            </div>

        </div>

    </section>


    <section class="reading-tools">

        <h2>Reading Tools</h2>

        <button id="simpleButton">
            Explain Simply
        </button>

        <button id="whyButton"
                disabled>
            Why Did My Reading View Change?
        </button>

        <button id="normalButton"
                disabled>
            Return to Normal Reading
        </button>

    </section>


    <section id="supportPanel"
             class="support-panel hidden">

        <h2>Reading Assistance</h2>

        <p id="supportText"></p>

    </section>


    <section id="explanationPanel"
             class="explanation-panel hidden">

        <h2>Adaptation Explanation</h2>

        <p id="explanationText"></p>

    </section>


    <section id="chunkNavigation"
             class="chunk-navigation hidden">

        <button id="previousButton">
            Previous Section
        </button>

        <span id="chunkStatus">
            Section 1 of 3
        </span>

        <button id="nextButton">
            Next Section
        </button>

    </section>

</main>


<footer>
    Educational prototype for AI-Based Adaptive HCI
</footer>


<script src="js/readingTracker.js"></script>
<script src="js/adaptiveReadingEngine.js"></script>
<script src="js/app.js"></script>

</body>

</html>
