/*
 * Adaptive Reading Engine
 *
 * Uses transparent rule-based logic to determine
 * how much reading assistance should be provided.
 */

const AdaptiveReadingEngine = {

    calculateScore(data) {

        let score = 0;

        score +=
            data.definitionRequests * 15;

        score +=
            data.revisitCount * 15;

        score +=
            data.simplifyRequests * 20;


        if (data.readingTime > 60) {
            score += 10;
        }

        if (data.readingTime > 120) {
            score += 10;
        }


        return Math.min(
            score,
            100
        );
    },


    getLevel(score) {

        if (score >= 60) {
            return "HIGH";
        }

        if (score >= 30) {
            return "MEDIUM";
        }

        return "LOW";
    },


    getMode(level) {

        if (level === "HIGH") {
            return "CHUNKED";
        }

        if (level === "MEDIUM") {
            return "ASSISTED";
        }

        return "NORMAL";
    },


    analyze(data) {

        const score =
            this.calculateScore(data);

        const level =
            this.getLevel(score);

        const mode =
            this.getMode(level);

        return {
            score,
            level,
            mode
        };
    },


    explain(data, result) {

        const reasons = [];


        if (data.definitionRequests > 0) {

            reasons.push(
                `${data.definitionRequests} definition request(s)`
            );
        }


        if (data.revisitCount > 0) {

            reasons.push(
                `${data.revisitCount} section revisit(s)`
            );
        }


        if (data.simplifyRequests > 0) {

            reasons.push(
                `${data.simplifyRequests} simple explanation request(s)`
            );
        }


        if (data.readingTime > 60) {

            reasons.push(
                "extended reading time"
            );
        }


        if (reasons.length === 0) {

            return (
                "No reading adaptation was required."
            );
        }


        return (
            `The interface changed to ${result.mode} mode ` +
            `because the system observed ` +
            `${reasons.join(", ")}. ` +
            `The current Reading Support Score is ` +
            `${result.score} out of 100.`
        );
    }
};