# Adaptive Reading Rhythm UI

## AI-Based Adaptive Human-Computer Interaction

Adaptive Reading Rhythm UI is an educational prototype that demonstrates an intelligent adaptive reading interface.

The application observes reading interaction patterns and dynamically changes how content is presented when additional reading support may be useful.

## Interaction Signals

The application observes:

- Definition requests
- Section revisits
- Requests for simplified explanations
- Time spent reading

## Adaptive Modes

### Normal Mode

Score 0-29.

The complete article is displayed normally.

### Assisted Mode

Score 30-59.

The interface provides additional visual support and emphasizes the reading content.

### Chunked Mode

Score 60-100.

The article is divided into smaller sections and displayed one section at a time.

## Explainable Adaptation

The user can select "Why Did My Reading View Change?" to see which interaction signals contributed to the adaptive decision.

## User Control

The user can select "Return to Normal Reading" at any time to override the adaptive interface.

## Adaptive Memory

Browser localStorage is used to remember a limited reading assistance preference between sessions.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage
- Rule-Based Adaptive Decision Logic
- Visual Studio Code

## Project Structure

```text
adaptive-reading-rhythm-ui/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    ├── readingTracker.js
    ├── adaptiveReadingEngine.js
    └── app.js
