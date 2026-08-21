/*
 * Reading Interaction Tracker
 *
 * Tracks observable reading interactions.
 */

const ReadingTracker = {

    definitionRequests: 0,

    revisitCount: 0,

    simplifyRequests: 0,

    startTime: Date.now(),


    recordDefinitionRequest() {

        this.definitionRequests++;
    },


    recordRevisit() {

        this.revisitCount++;
    },


    recordSimplifyRequest() {

        this.simplifyRequests++;
    },


    getReadingTime() {

        const milliseconds =
            Date.now() - this.startTime;

        return Math.floor(
            milliseconds / 1000
        );
    },


    getData() {

        return {
            definitionRequests:
                this.definitionRequests,

            revisitCount:
                this.revisitCount,

            simplifyRequests:
                this.simplifyRequests,

            readingTime:
                this.getReadingTime()
        };
    },


    reset() {

        this.definitionRequests = 0;

        this.revisitCount = 0;

        this.simplifyRequests = 0;

        this.startTime = Date.now();
    }
};