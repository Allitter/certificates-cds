sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/certificates/test/integration/FirstJourney',

    ],
    function(JourneyRunner, opaJourney, ) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/certificates') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 

                }
            },
            opaJourney.run
        );
    }
);